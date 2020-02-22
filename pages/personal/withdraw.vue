<template>
	<view class="content">
		<hx-navbar
			title="提領" 
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
		<view class="renzhen">
			<span>身份認證</span>
			<span class="yesrzbt" v-if="isCertification == true">已认证</span>
			<navigator url="./addidentity" open-type="navigate" v-else>
			   <span class="yesrzbt" style="background-color: #ff3a3a;" >未認證(點擊認證)</span>
			</navigator>
		</view>
		<view class="renzhen">
			<span>可提領點數</span>
			<span>{{current}}</span>
		</view>
		<view style="width: 90%;margin: 20rpx auto;color: #FFFFFF;">
			<text>提領金額</text>
			<view style="margin-top: 20rpx;">
				<input 	
					class="zdyinnput"
					v-model="withdrawval"
					type="number"
					placeholder="請輸入提領金額"
					style="color: #000000;"  
					></input>
			</view>
			<view style="display: flex;margin:40rpx 0;justify-content: space-between;">
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(500)" >+500</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(1000)" >+1000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum(2000)">+2000</button>
				<button class="cu-btn round" style="background:#000000;color: #05fec6;"  @click="plusNum('all')">全部提領</button>
			</view>
            <text>提現賬戶</text>
			<view >
				<radio-group style="width: 100%;">
					<label class="radio" style="display: flex;justify-content: space-between;margin:30rpx 0;" @click="bank_id = '1'">
						<text>联邦银行 (6546541564164156)</text>
						<radio value="1" checked="true" />
					</label>
				</radio-group>
			</view>
			<view>
				<button class="cu-btn bg-grey lg"  style="width: 100%;background-color: #0075a9;" @click="Nextstep">确认轉贈</button>
			</view>
			<view style="margin-top: 50rpx;text-align: center;border-top:1px solid #505050 ;padding-top: 50rpx;">
				<h3 style='color: red;'> * 注意事項 *</h3>
				<view style="color: red;font-size: 30rpx;">請先綁定手機號，才可以進行存提款及找回密碼等功能。</view>
			</view>
		</view>
		<best-payment-password :show="payframe" :value="paymentPwd" digits="6" @submit="submit" @cancel="outpayframe"></best-payment-password>
		<yangr-msg v-if="Toastshow" :title="Toasttitle" :type="Toasttype" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
	</view>
</template>

<script>
	import bestPaymentPassword from '../../components/best-payment-password/best-payment-password.vue'
	import yangrMsg from "../../components/yangr-msg/yangr-msg.vue"
	export default {
		data() {
			return {
				withdrawval:'',
				isCertification:false,
				bankdata:[],
				current:Number,
				payframe:false,
				paymentPwd:'',
				bankitems: [{
                    value: '1',
                    name: '联邦银行',
					bankNUM:'451641651561651'
                },
                {
                    value: '2',
                    name: '联邦银行',
                    checked: 'true',
					bankNUM:'451644564654652'
                },
                ],
				bank_id:'',
			}
		},
		components:{
			bestPaymentPassword,
			yangrMsg
		},
		methods: {
			plusNum(val){
				if(val == 'all'){
					this.withdrawval = this.current
				}else{
					this.withdrawval = Number(this.withdrawval) + val
				}
				
			},
			Nextstep(){
				if(this.withdrawval == ''){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '請輸入金額'
					});
				}else if(this.isCertification == true){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '請先進行身份認證'
					});
				}else if(this.withdrawval > this.current){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '可提現金額不足'
					});
				}else{
					this.payframe = true
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
				uni.request({
					url: this.$store.state.api+'merber',
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
						if(res.data.success==1){ 
							this.current = res.data.data.money
						}
					}
				});
			},
			submit(pwd){
				uni.request({
					url: this.$store.state.api+'withdraw',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
						payment_code:pwd,
						order_money:this.withdrawval,
						bank_id:1
					},
					success: (res) => {
						console.log(res)
						this.loading = false
						if(res.data.success==1){
							
						}
					}
				});
			},
			outpayframe(){
				this.payframe = false
			},
		},
		onLoad(){
			this.getbank()
		}
	}
</script>

<style>
	.renzhen{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 30rpx;
		width: 90%;
		margin: 20rpx auto;
	}
	.yesrzbt{
		background-color: #00CE47;
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		
	}

</style>
