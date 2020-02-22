<template>
	<view class="content">
		<hx-navbar
			title="儲值點數" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
			<view slot="left" style="color: #fff;" @click="Goback">
				<uni-icons type="back" size="25" color="#ffffff" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view style="padding: 20rpx;color: #FFFFFF;">
			<text>儲值點數</text>
			<view style="margin-top: 20rpx;color: #000000;">
				<input 	
					class="zdyinnput"
					v-model="Storedval"
					type="number"
					placeholder="输入儲值點數"
					></input>
			</view>
			<view style="display: flex;margin:40rpx 0;justify-content: space-between;">
				<button class="cu-btn round" style="background:#000000;color: #05fec6;" @click="plusNum(500)" >+500</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;" @click="plusNum(1000)" >+1000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;" @click="plusNum(2000)">+2000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;" @click="plusNum(5000)">+5000</button>
			</view>
			<view>
				<h3 style='color: #fff;'>選擇付款方式</h3>
				<view >
					<radio-group style="width: 100%;">
						<label class="radio" style="display: flex;justify-content: space-between;margin:30rpx 0;" @click="payment_method = '1'">
							<text>ATM（虛擬賬戶）</text>
							<radio value="1" checked="true" />
						</label>
						<label class="radio" style="display: flex;justify-content: space-between;" @click="payment_method = '2'">
							<text >超商代收</text>
							<radio value="2" />
						</label>
					</radio-group>
				</view>
			</view>
			<view style="margin-top: 50rpx;">
				<button class="cu-btn bg-grey lg"   style="width: 100%;background-color: #0075a9;" @click="Nextstep">確認儲值</button>
			</view>
			<!-- <button type="primary" style="width: 90%;">确认储值</button> -->
			<view style="margin-top: 50rpx;text-align: center;border-top:1px solid #505050 ;padding-top: 50rpx;">
				<h3 style='color: red;'> * 注意事項 *</h3>
				<view style="color: red;font-size: 30rpx;">請先綁定手機號，才可以進行存提款及找回密碼等功能。</view>
			</view>

		</view>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text" style="color: #000000;">處理中</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				Storedval:'',//储值金额
				payment_method:'1',//付款方式
				orderdata:{},
				loading:false
			}
		},
		components:{
		},
		onShow() {

		},
		methods: {
			plusNum(val){
				this.Storedval = Number(this.Storedval) + val
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			Nextstep(){
				if(this.Storedval == ''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請確認輸入儲值金額',
						duration:2000
					});
				}else if(this.payment_method == ''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請選擇付款方式',
						duration:2000
					});
				}else{
					this.loading = true
					console.log(
					this.$store.state.userdata.merber_id,
					this.$store.state.userdata.token,
					this.$store.state.userdata.user_type) 
					uni.request({
						url: this.$store.state.api+'chg_order',
						method:'POST', 
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
						data: {
							user_id: this.$store.state.userdata.merber_id,
							token:this.$store.state.userdata.token,
							user_type:this.$store.state.userdata.user_type,
							payment_method:this.payment_method,
							order_money:this.Storedval,
						},
						success: (res) => {
							console.log(res)
							// this.loading = false
							if(res.data.success==1){
								plus.runtime.openURL( "https://www.dakuos.com/1.0/open_order?num="+res.data.data.order_id+"&sign="+res.data.data.sign) 
								this.loading = false
								this.Storedval = ''
							} 
						}
					});
				}
			},

		}
	}
</script>

<style>
	.btn-box{
		height: 80rpx;
		width:90% ;
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
