<template>
	<view class="content">
		<hx-navbar
			title="賬號設置" 
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
		<view class="setbody">
			
			<navigator url="../login/Changeloginpwd" open-type="navigate">
			<view class="setlist">
				<view>修改登入密碼</view>
				<image class="to" src="../../static/user/to.png"></image>
			</view>
			</navigator>
			<navigator url="../login/Changepaypwd" open-type="navigate">
				<view class="setlist">
					<view>修改支付密碼</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.setbody{
		width: 90%;
		margin:20rpx auto;
	}
	.setlist{
		display: flex;
		color: #fff;
		font-size: 30rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom:1px solid #505050 ;
		padding: 20rpx 0;
	}
	.setlist image{
		width: 50rpx;
		height: 50rpx;
	}
</style>
