<template>
	<view class="content">
		<hx-navbar
			title="支付" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
			<view slot="left"  >
				<uni-icons type="back" size="25" color="#ffffff" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view style="width: 90%;margin: 30rpx auto;font-size: 35rpx;">
			<view style="color: #fff;padding: 20rpx 0;">收款商家 ：{{name}}</view>
			<view style="color: #fff;padding: 20rpx 0;">支付金額</view>
			<input  class="zdyinnput" type="number" v-model="order_money" focus="true" />
		</view>
		<view style="width: 90%;margin: 100rpx auto;">
	      	<button class="cu-btn bg-grey lg"   style="width: 100%;background-color: #0075a9;" @click="Nextstep">確認儲值</button>
		</view>
		<best-payment-password :show="payframe" :value="paymentPwd" digits="6" @submit="submitRebate" @cancel="outpayframe"></best-payment-password>
		<yangr-msg v-if="Toastshow" :title="Toasttitle" :type="Toasttype" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
		<view v-show="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
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
				order_money:'',
				payframe:false,
				loading:false,
				paymentPwd:'',
				id:'',
				name:'',
				Toastshow:false,
				Toasttitle:'支付成功',
				Toasttype:''
			}
		},
		components:{
			bestPaymentPassword,
			yangrMsg
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.b); //打印出上个页面传递的参数。
			this.id = option.b
			this.name = option.n
		},
		methods: {
			submitRebate(pwd){
				this.loading = true
				uni.request({
					url: this.$store.state.api+'payment_business',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
						business_id:this.id, 
						order_money:this.order_money,
						payment_code:pwd
					},
					success: (res) => {
						console.log(res)
						this.loading = false
						if(res.data.success == 1){
							this.payframe = false
							this.Toasttype = 'success'
							this.Toastshow = true
						}else if(res.data.success == 4){
							uni.showToast({
								icon: 'none', 
								position: 'bottom',
								title: '支付密碼錯誤',
								duration:2000
							});
						}	
					}
				});			
			},
			outToast(){
				this.Toastshow = false
				uni.navigateBack()
			},
			outpayframe(){
				this.payframe = false
			},
			Nextstep(){
				if(this.order_money == ''){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '請輸入支付金額'
						});					
				}else{
					this.payframe = true
				}
			},
		}
	}
</script>

<style>
  .zdyinnput{
	  background: #fff;
	  border: 1px solid #fff; 
	  height: 120rpx;
	  border-radius:10rpx;
	  text-align: left;
	  padding: 20rpx;
	  font-size: 60rpx;
	  margin-top: 50rpx;
  }
</style>
