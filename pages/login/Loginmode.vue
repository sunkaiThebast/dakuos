<template>
	<view class="loginmode ">
			<hx-navbar
				title="登 入" 
				:back="false"
				:fixed="true"
				color="#000000"
				statusBarFontColor="#000000"
				transparent="hidden"
				>

			</hx-navbar>
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.jpg"  ></image>
			</view>
			<view class="bodyer">
				<view style="text-align: center;width: 100%;">選擇登錄方式</view>
				<button type="warn" style="margin-top: 100rpx;"  @click="gologinshop()" >商 家 登 入 / 注 册</button>
				<button type="primary" style="margin-top: 50rpx;" @click="gologin()">會 員 登 入 / 注 册</button>
			</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	export default {
		data() {
			return {
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			uniIcons
		},
		mounted() {
		},
	onBackPress() {  

		  uni.showModal({  
			title: '提示',  
			content: '是否退出Dakuos？',  
			success: function(res) {  
				if (res.confirm) {  
					// 退出当前应用，改方法只在App中生效  
					plus.runtime.quit();  
				} else if (res.cancel) {  
					console.log('用户点击取消');  
				}  
			}  ,
		  });  
		  return true
	},
		methods: {
			gologin(){
				uni.navigateTo({
					url: './login'
				});
			},
			gologinshop(){
				uni.navigateTo({
					url: './loginShop'
				});
			}
		}
	}
</script>

<style>
	@import url("./css/main.css");
	.loginmode{
		
	}
	.bodyer{
		width: 80%;
		height: 500rpx;
		border: 3rpx solid #E7E7E7;
		border-radius: 20rpx;
		margin: 0 auto;
		padding: 20rpx;
	}

</style>
