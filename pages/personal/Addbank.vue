<template>
	<view class="content" style="min-height:100%;">
		<hx-navbar
			title="銀行賬戶" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			@click-right='addbank'
			:backgroundColor="[44,45,48]"
			>
			<view slot="right" style="color: #fff;" >
				<uni-icons type="plusempty" size="30" color="#fff" style="font-weight: bold;"></uni-icons>
			</view>
			<view slot="left" style="color: #fff;"  @click="Goback">
				<uni-icons type="back" size="30" color="#fff" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view v-if="isCertification == false" style="padding: 0 30rpx;text-align: center;color: #FFFFFF;">暫未進行身份認證 </view>
		<view class="banklist" v-for="item in bankdata" >
			<view style="display: flex;justify-content: space-between ;align-items: center;width: 100%;">
				<text>联邦银行</text>
				<text class="cuIcon-deletefill"></text>
			</view>
			<view style="margin-top: 20rpx;">
				<text>開戶名稱：</text>
				<text>{{item.account_name}}</text>
			</view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;">
				<view>
					<text>銀行代碼：</text>
					<text>{{item.bank_code}} </text>
				</view>
				<view>
					<text>分行代碼：</text>
					<text>{{item.branch_code}}</text>
				</view>
			</view>
			<view style="font-size: 60rpx;font-weight: bold;margin-top: 20rpx;">
				{{item.bank_num}}
			</view>
		</view>
		<uni-popup ref="popup" type="center" >
			<view class="addpopup">
			   <view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
				    <view>
						<wInput
							v-model="account_name"
							type="text"
							placeholder="開戶名稱"
							isShowPass
						></wInput>
					</view>
					<view style="margin-top: 30rpx;">
						<wInput
							v-model="account_num"
							type="number"
							style="margin-top: 50rpx;"
							placeholder="收款賬戶"
							isShowPass
						></wInput>
					</view>
					<view style="margin-top: 30rpx;">
						<wInput
							v-model="bank_num"
							type="number"
							placeholder="銀行賬戶"
							isShowPass
						></wInput>
					</view>
					<view style="margin-top: 30rpx;">
						<wInput
							v-model="bank_code"
							type="number"
							placeholder="銀行代碼"
							isShowPass
						></wInput>
					</view>
					<view style="margin-top: 30rpx;">
						<wInput
							v-model="branch_code"
							type="number"
							placeholder="分行代碼"
							isShowPass
						></wInput>
					</view>
				</view>
	
				<view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
			     	<button class="cu-btn bg-grey lg" style="width: 100%;background: rgba(0,0,0,0.6);" @click="add_bank" >確定</button>
				</view>
			</view>
		</uni-popup>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text" style="color: #000000;">處理中</view>
			</view>
		</view>
		<yangr-msg v-if="Toastshow" :title="Toasttitle" :type="Toasttype" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import wInput from '../../components/watch-login/watch-input.vue' 
	import yangrMsg from "../../components/yangr-msg/yangr-msg.vue"
	export default {
		data() {
			return {
				account_name:'',
				bank_num:'',
				bank_code:'',
				branch_code:'',
				loading:false,
				Toastshow:false,
				Toasttitle:'',
				Toasttype:'',
				isCertification:'',
				bankdata:'',
			}
		},
		onLoad(){
			
		},
		components:{
			uniPopup,
			wInput,
			yangrMsg
		},
		methods: {
			addbank(){
				if(this.isCertification == false){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '暫未進行身份認證'
					});
				}else{
					this.$refs.popup.open()
				}
				
			},
			outToast(){
				this.Toastshow = false
				this.Rebatephone = ''
				this.Rebateval = ''
			},
			add_bank(){
				if(this.account_name == '' || this.account_num == '' || this.bank_num == '' || this.bank_code == '' || this.branch_code == ''){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '請填寫完整資料'
					});
				}else{
					this.loading = true
					uni.request({
						url: this.$store.state.api+'add_bank',
						method:'POST', 
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
						data: {
							user_id: this.$store.state.userdata.merber_id,
							token:this.$store.state.userdata.token,
							user_type:this.$store.state.userdata.user_type,
							account_name:this.account_name,
							account_num:this.account_num,
							bank_num:this.bank_num,
							bank_code:this.bank_code,
							branch_code:this.branch_code
						},
						success: (res) => {
							console.log(res)
							this.$refs.popup.close()
							this.loading = false
							if(res.data.success==1){
								this.Toastshow  = true
								this.Toasttype = 'success'
								this.Toasttitle = '添加成功'
							}
						}
					});	
				}
			
			},
			getbank(){
				uni.request({
					url: this.$store.state.api+'get_bank',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
					},
					success: (res) => {
						console.log(res)
						if(res.data.success == 2){
							this.isCertification = false
						}
						if(res.data.success == 1){
							this.isCertification = true
							this.bankdata = res.data.data
						}
					}
				});	
			}
		}
		
	}
</script>

<style>
	.banklist{
		height: 300rpx;
		width: 90%;
		margin: 20rpx auto 0;
		background: #3F7CFF;
		border-radius:10rpx ;
		padding: 20rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.addpopup{
		 width: 600rpx;
		 height:720rpx;
		 background: #fff;
		 border-radius: 20rpx;
		 box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
	}
</style>
