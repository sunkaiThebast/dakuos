<template>
	<view class="login">
		<view>
			<hx-navbar
				title="商家登入" 
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
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.jpg" ></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="手機號碼"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密碼"
				></wInput>
			</view>
			<wButton 
				text="登 入"
				:rotate="isRotate" 
				@click.native="startLogin()"
			></wButton>	
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="./forget?user_type=2" open-type="navigate">找回密碼</navigator>
				<text>|</text>
				<navigator url="registershop" open-type="navigate">商家註冊帳號</navigator>
			</view>
		</view>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text">登入中</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {  mapMutations  } from 'vuex';
	export default {
		data() {
			return {
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				loading:false,//
			};
		},
		components:{
			wInput,
			wButton,
			uniIcons
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
			...mapMutations(['login']),
			clickReturn() {
                uni.navigateBack()
			},
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'error',
						position: 'bottom',
				        title: '用戶名不能為空'
				    });
					return;
				}else if (this.passData.length == "") {
		            uni.showToast({
		                icon: 'error',
						position: 'bottom',
		                title: '密碼不能為空'
		            });
		            return;
		        }else{
					this.loading = true
					uni.request({
					    url: this.$store.state.api+'business_login',
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							phone:this.phoneData,
							password:this.passData
					    },
					    success: (res) => {
						    if(res.data.success==1){
								console.log(res.data)
								this.login(res.data)
								this.loading = false
								uni.showToast({
								    icon: 'none',
									position: 'bottom',
								    title: '登入成功'
								});
								uni.reLaunch({
									url:'../index/index'
								})
							}
							if(res.data.success==2){
								this.loading = false
								uni.showToast({
									icon: 'none',
									position: 'bottom', 
									title: '賬號密碼錯誤'
								});
							}	
							if(res.data.success==0){
								this.loading = false
								uni.showToast({
									icon: 'success',
									position: 'bottom',
									title: '網絡錯誤'
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
