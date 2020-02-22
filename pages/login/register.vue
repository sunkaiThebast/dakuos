<template>
	<view class="register">
		<hx-navbar
			title="會員註冊" 
			:back="false"
			:fixed="true"
			color="#000000"
			statusBarFontColor="#000000"
			transparent="hidden"
			>
			<view slot="left"  @click="clickReturn()">
				<uni-icons type="back" size="25" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view >
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.jpg"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
						v-model="phoneData"
						type="number"
						placeholder="手機號碼"
					></wInput>				
					<wInput
						v-model="passData"
						type="password"
						placeholder="登入密碼"
						isShowPass
					></wInput>
					<wInput
						v-model="verCode"
						type="number"
						placeholder="驗證碼"
						maxlength="6"
						isShowCode
						ref="runCode"
						@setCode="getVerCode()"
					></wInput>
					<wInput
						v-model="Paymentpwd"
						type="number"
						placeholder="支付密碼"
						maxlength="6"
					></wInput>
					<wInput
						v-model="name"
						type="text"
						placeholder="真實姓名"
						isShowPass
					></wInput>
					<wInput
						v-model="Email"
						type="text"
						placeholder="電子信箱"
						isShowPass
					></wInput>
					<wInput
						v-model="Invitecode"
						type="text"
						placeholder="邀請碼(可不填)"
						isShowPass
					></wInput>
				</view>
				
				<wButton 
					text="註 冊"
					:rotate="isRotate" 
					@click.native="startReg()"
				></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
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
				//logo图片 base64
				phoneData:'', // 用户/电话
				passData:'', //密码
				Email:'',//电子邮箱
				name:'',//真实姓名
				verCode:"", //验证码
				Invitecode:'',//邀请码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				Paymentpwd:''//支付密码
			}
		},
		components:{
			wInput,
			wButton,
			uniIcons
		},
		mounted() {
			_this= this;
		},
		methods: {
			clickReturn() {
				uni.navigateBack()
			},
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode(){
				//获取验证码
			    var phoneReg=/^[0][9]\d{8}$/;
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
				// setTimeout(function(){
				// 	_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
				// 	uni.showToast({
				// 	    icon: 'none',
				// 		position: 'bottom',
				// 	    title: '模拟倒计时终止'
				// 	});
				// },3000)
			},
		    startReg() {
				const phoneReg=/^[0][9]\d{8}$/;
				const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
				const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
				const verCodeReg=/^[0-9]{6}$/
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}else if (!phoneReg.test(_this.phoneData)) {
				     uni.showToast({
				        icon: 'none', 
						position: 'center',
				        title: '手机号不正确',
						duration:2000
				    });
				}else if(!passwordReg.test(_this.passData)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '密碼必須是由數字與字母組成的6-20位元長度',
						duration:2000
					});
				}else if(!verCodeReg.test(_this.verCode)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '驗證碼不正確',
						duration:2000
					});
				}else if(_this.name.length==''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請填寫真實姓名',
						duration:2000
					});
				}else if(!mailReg.test(_this.Email)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入正確的信箱格式',
						duration:2000
					});
				}else if(_this.showAgree == false){
					uni.showToast({
					    icon: 'none',  
						position: 'center',
					    title: '請先同意《協議》',
						duration:2000
					});
				}else{
					_this.isRotate=true
					console.log(_this.name,_this.phoneData,_this.Email,_this.passData,_this.Invitecode,_this.verCode)
					uni.request({
					    url:this.$store.state.api+'register',
						method:'POST',
						
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
					        name:_this.name,
							phone:_this.phoneData,
							email:_this.Email,
							password:_this.passData,
							invitation_code:_this.Invitecode,
							phone_code:_this.verCode,
							payment_code:_this.Paymentpwd
					    },
					    success: (res) => {
					        console.log(res.data);
							if(res.data.success==1){
								_this.isRotate=false
								uni.reLaunch({
									url:'./login'
								})	
							}else if(res.data.success==2){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼已過期',
									duration:2000
								});
								_this.isRotate=false
								_this.verCode=''
							}else if(res.data.success==3){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼錯誤',
									duration:2000
								});
								_this.isRotate=false
								_this.verCode=''
							}else if(res.data.success==6){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '此手機號已註冊',
									duration:2000
								});
								_this.isRotate=false
								_this.phoneData=''
							}else if(res.data.success==7){
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '此郵箱已註冊',
									duration:2000
								});
								_this.isRotate=false
								_this.Email=''
							}else{
								console.log('网络错误')
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