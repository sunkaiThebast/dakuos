<template>
	<view class="forget">
		<hx-navbar
			title="修改密碼" 
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
					v-model="password"
					type="password"
					placeholder="請輸入舊密碼"
					isShowPass
				></wInput>
				<wInput
					v-model="new_password"
					type="password"
					maxlength="20"
					placeholder="請輸入新密碼"
					
					isShowPass
				></wInput>
			</view>
			
			<wButton 
				text="修改密碼"
				:rotate="isRotate" 
				@click.native="up_pwd()"
			></wButton>

		</view>
		<yangr-msg v-if="Toastshow" title="修改成功" :type="Toasttype" :info="info" btn="确定" @yangrMsgEvent="outToast"></yangr-msg>
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
				password: "", //旧密码
				new_password:"",//新密码
				isRotate: false, //是否加载旋转
				Toastshow:false,
				Toasttype:'success'
			}
		},
		components:{
			wInput,
			wButton,
			uniIcons,
		},
		mounted() {
			_this= this;
		},
		methods: {
			outToast(){
				this.Toastshow = false
				uni.navigateBack(1)
			},
			up_pwd() {
				const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
                if(!passwordReg.test(this.password)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '舊密碼必須是由數字與字母組成的6-20位元長度',
						duration:2000
					});
				}else if(!passwordReg.test(this.new_password)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '新密碼必須是由數字與字母組成的6-20位元長度',
						duration:2000
					});
				}else{
					_this.isRotate=true
					uni.request({
					    url: this.$store.state.api+'up_pwd', //仅为示例，并非真实接口地址。
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							user_id: this.$store.state.userdata.merber_id,
							token:this.$store.state.userdata.token,
							user_type:this.$store.state.userdata.user_type,
							password:this.password,
							new_password:this.new_password
					    },
					    success: (res) => {
							console.log(res)
							if(res.data.success == 1){
								this.Toastshow = true
								uni.setStorageSync('passData',  this.new_password);
							}else if(res.data.success == 2){
								_this.isRotate = false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '原密碼錯誤',
									duration:2000
								}); 
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

