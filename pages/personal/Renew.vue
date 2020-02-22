<template>
	<view class="content" style="min-height: 100%;">
		<hx-navbar
			title="成為會員" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
			<view slot="left" style="color: #fff;" @click="Goback" >
				<uni-icons type="back" size="25" color="#fff" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view class="isxufei">
			<span>開啟分紅會員</span>
			<evan-switch v-model="close" size="25" inactive-color="#c1d2ff" @change="joinbonus"></evan-switch>
		</view>
		<view class="Notice">
			<view class="Noticetitle">會員須知 </view>
			<view>1、三大法师打发斯蒂芬阿斯顿发斯蒂芬</view>
			<view>2、三师打发斯蒂芬发斯蒂芬</view>
			
		</view>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text">處理中</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import evanSwitch from "../../components/evan-switch/evan-switch.vue"
	export default {
		data() {
			return {
				close:false,
				loading:false
			}
		},
		components:{
            evanSwitch
		},
		onLoad() {
			this.is_renew()
		},
		methods: {
			is_renew(){
				uni.request({
					url: this.$store.state.api+'is_renew',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type
					},
					success: (res) => {
						console.log(res)
						if(res.data.success==1){
							this.close = true
						}
						if(res.data.success==2){
							this.close = false
						}	
					}
				});
			},
			joinbonus(val){
				this.loading = true
				uni.request({
					url: this.$store.state.api+'join_bonus',
					method:'POST', 
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
						close:val?'':'1'
					},
					success: (res) => {
						console.log(res)
						this.loading = false
						if(res.data.success==1){
							uni.showToast({
							    icon: 'none', 
								position: 'center',
							    title: '自動續費已開啟',
								duration:2000
							});
						}
						if(res.data.success==2){
							uni.showToast({
							    icon: 'none', 
								position: 'center',
							    title: '自動續費已關閉',
								duration:2000
							});
						}	
						if(res.data.success==0){
						}	
					}
				});
			}
		}
	}
</script>

<style>
	.isxufei{
		color: #fff;
		width: 90%;
		margin:20rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 35rpx;
	}
	.Notice{
		width: 90%;
		margin: 0 auto;
		border-top:1px solid #505050 ;
		color: #505050;
	}
	.Notice>view{
		margin: 20rpx 0;
	}
	.Noticetitle{

		text-align: center;
		font-weight: bold;
		font-size: 35rpx;
	}
</style>
