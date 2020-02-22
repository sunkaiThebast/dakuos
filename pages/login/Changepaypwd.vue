<template>
	<view class="forget">
		<hx-navbar
			title="修改支付密碼" 
			:back="false"
			:fixed="true"
			color="#000000"
			statusBarFontColor="#000000"
			transparent="hidden"
			>
			<view slot="left" @click="Goback">
				<uni-icons type="back" size="25" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view >
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="payment_code"
					type="text"
					maxlength="6"
					placeholder="請輸入新支付密碼"
				></wInput>
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="驗證碼"
					isShowCode
					codeText="獲取驗證碼"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			<wButton 
				text="重置支付密碼"
				:rotate="isRotate" 
				@click.native="submit()"
			></wButton>

		</view>
		<yangr-msg v-if="Toastshow" title="修改成功" type="success" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				payment_code: "", //新支付密码
				phone:'',//手机号码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
				Toastshow:false,
			}
		},
		components:{
			wInput,
			wButton,
			uniIcons
		},
	    onLoad: function(options) {  
			 this.getmerber()
		},
		mounted() {
			_this= this;
		},
		methods: {
			outToast(){
				this.Toastshow = false
				uni.navigateBack(1)
			},
			getmerber(){
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
							if(res.data.success == 1){
								this.phone = res.data.data.phone
								console.log(this.phone)
							}
						}
					});
			},
			getVerCode(){
				console.log(this.phone)
					uni.request({
					    url: this.$store.state.api+'getCode', //仅为示例，并非真实接口地址。
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							moblie:this.phone,
					    },
					    success: (res) => {
							console.log(res)
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: '驗證碼已發送'
							});
							
					    }
					});
				
			},
			submit() {
                if(this.payment_code.length !=6){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '支付密碼必須是6位數字',
						duration:2000
					});
				}else if(this.verCode.length != 6){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '驗證碼不正確',
						duration:2000
					});
				}else{
					_this.isRotate=true
					uni.request({
					    url: this.$store.state.api+'up_payment', //仅为示例，并非真实接口地址。
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							user_id: this.$store.state.userdata.merber_id,
							token:this.$store.state.userdata.token,
							user_type:this.$store.state.userdata.user_type,
							payment_code:this.payment_code,
							phone:this.phone,
							phone_code:this.verCode
					    },
					    success: (res) => {
							_this.isRotate = false
							console.log(res)
							if(res.data.success == 1){
								this.Toastshow = true
							}else if(res.data.success == 2){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼已過期',
									duration:2000
								});
								this.verCode == ''
							}else if(res.data.success == 3){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼錯誤',
									duration:2000
								});
								this.verCode == ''
							}else{
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '网络错误,请检查网络',
									duration:2000
								});
							}

							
					    }
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

