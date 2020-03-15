<template>
	<view class="forget">
		<hx-navbar
			title="重置密碼" 
			:back="false"
			:fixed="true"
			color="#000000"
			statusBarFontColor="#000000"
			transparent="hidden"
			>
			<view slot="left" @click="clickReturn()">
				<uni-icons type="back" size="25" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view >
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘記了密碼，可在此重置新密碼。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="10"
					placeholder="請輸入手機號碼"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="請輸入新密碼"
					isShowPass
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
				text="重置密碼"
				:rotate="isRotate" 
				@click.native="submit()"
			></wButton>

		</view>
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
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
				user_type:""//会员类型
			}
		},
		components:{
			wInput,
			wButton,
			uniIcons
		},
	    onLoad: function(options) {  
			 this.user_type = options.user_type
		},
		mounted() {
			_this= this;
		},
		methods: {
			clickReturn() {
				uni.navigateBack()
			},
			getVerCode(){
			    var phoneReg = /^[0][9]\d{8}$/;
				if (!phoneReg.test(_this.phoneData)) {
				     uni.showToast({
				        icon: 'none', 
						position: 'center',
				        title: '手机号不正确',
						duration:2000
				    });
				}else{
					uni.request({
					    url: this.$store.state.api+'getCode', //仅为示例，并非真实接口地址。
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							moblie:this.phoneData,
					    },

					    success: (res) => {
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: '驗證碼已發送'
							});
							
					    }
					});
				}	
			},
			submit() {
			    const phoneReg = /^[0][9]\d{8}$/;
				const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
				if (!phoneReg.test(this.phoneData)) {
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '手机号不正确',
						duration:2000
					});
				}else if(!passwordReg.test(this.passData)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '密碼必須是由數字與字母組成的6-20位元長度',
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
					    url: this.$store.state.api+'forget_password', //仅为示例，并非真实接口地址。
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							phone:this.phoneData,
							phone_code:this.verCode,
							new_password:this.passData,
							user_type:this.user_type
					    },
					    success: (res) => {
							console.log(res)
							if(res.data.success == 1){
								uni.showToast({
								    icon: 'none',
									position: 'bottom',
								    title: '密碼已                                                                                                                                                                                                                                                                                                                                                                                                                                          重置'
								});
								uni.reLaunch({
									url:'./Loginmode'
								})
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

