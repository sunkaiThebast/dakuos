<template>
	<view class="content" style="height: 100%;">
		<hx-navbar
			title="点数轉贈" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
			<view slot="left" style="color: #fff;" @click="Goback" >
				<uni-icons type="back" size="25" color="#fff" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view style="width: 90%;margin: 0 auto;color: #FFFFFF;">
			<text>轉贈人手機號</text>
			<view style="margin-top: 20rpx;">
				<input 	
					class="zdyinnput"
					v-model="Rebatephone"
					type="number"
					placeholder="請輸入轉贈人手機號"
					></input>
			</view>
			
			<view style="margin-top: 20rpx;">
				<text style="margin-bottom: 20rpx;">轉贈点数</text>
				<input 	
					class="zdyinnput"
					v-model="Rebateval"
					type="number"
					placeholder="输入轉贈点数"
					></input>
			</view>
			<view style="display: flex;margin:40rpx 0;justify-content: space-between;">
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(500)" >+500</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(1000)" >+1000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(2000)">+2000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(5000)">+5000</button>
			</view>
			<view>
				<button class="cu-btn bg-grey lg"  style="width: 100%;background-color: #0075a9;" @click="Nextstep">确认轉贈</button>
			</view>
			<view style="margin-top: 50rpx;text-align: center;border-top:1px solid #505050 ;padding-top: 50rpx;">
				<h3 style='color: red;'> * 注意事項 *</h3>
				<view style="color: red;font-size: 30rpx;">請先綁定手機號，才可以進行存提款及找回密碼等功能。</view>
			</view>
		</view>
		 <best-payment-password :show="payframe" :value="paymentPwd" digits="6" @submit="submitRebate" @cancel="outpayframe"></best-payment-password>
		 <yangr-msg v-if="Toastshow" :title="Toasttitle" :type="Toasttype" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
		 <view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
		 	<view class="cu-load load-modal" v-if="loading" >
		 		<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
		 		<view class="gray-text">處理中</view> 
		 	</view>
		 </view>
	</view>
</template>

<script>
	import bestPaymentPassword from '../../components/best-payment-password/best-payment-password.vue'
	import yangrMsg from "../../components/yangr-msg/yangr-msg.vue"
	export default {
		data() {
			return {
				Rebatephone:"",//转赠手机号
				Rebateval:'',//转赠点数
				payment_pwd:'',//支付密码
				Toasttitle:'',
				Toasttype:'',
				payframe:false,
				loading:false,
				Toastshow:false
			}
		},
		components:{
			 bestPaymentPassword,
			 yangrMsg
		},
		onLoad() {
			console.log(this.$store.state.userdata.merber_id)
		},
		methods: {
			plusNum(val){
				this.Rebateval = Number(this.Rebateval) + val
			},
			outpayframe(){
				this.payframe = false
			},
			outToast(){
				this.Toastshow = false
				this.Rebatephone = ''
				this.Rebateval = ''
			},
			Nextstep(){
				const phoneReg=/^[0][9]\d{8}$/;
				if(!phoneReg.test(this.Rebatephone)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入正確的手機號碼',
						duration:2000
					});
				}else if(this.Rebateval == ''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入轉贈點數',
						duration:2000
					});
				}else{
					this.payframe = true
				}
			},
			submitRebate(pwd){
				this.loading = true
				console.log(this.$store.state.userdata.merber_id,this.$store.state.userdata.token,this.$store.state.userdata.user_type,this.Rebatephone,this.Rebateval,pwd)
				uni.request({
					url: this.$store.state.api+'shift_money',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id:this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
						phone:this.Rebatephone,
						money:this.Rebateval,
						payment_code:pwd
					},
					success: (res) => {
						console.log(res)
						this.loading = false
						if(res.data.success == 1){
							this.payframe = false
							this.Toasttype = 'success'
							this.Toastshow = true	
						}
						if(res.data.success==4){
							uni.showToast({
								icon: 'none', 
								position: 'bottom',
								title: '支付密碼錯誤',
								duration:2000
							});
						}	
						if(res.data.success == 2){
							this.payframe = false
							this.Toasttype = 'error'
							this.Toasttitle = '該用戶不存在'
							this.Toastshow = true	
						}	
						if(res.data.success == 3){
							this.payframe = false
							this.Toasttype = 'error'
							this.Toasttitle = '餘額不足'
							this.Toastshow = true	
						}
						if(res.data.success == 3){
							uni.showToast({
								icon: 'none', 
								position: 'bottom',
								title: '網絡錯誤',
								duration:2000
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.btn-box{
		height: 80rpx;
		position: relative;
		margin: 20rpx auto;
		color: #fff;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
	
	}
	.zdyinnput{
		background: #fff;
		border: 1px solid #fff;
		margin: 0 auto;
		height: 80rpx;
		border-radius:20rpx;
		text-align: left;
		padding: 0 20rpx;
	}
</style>
