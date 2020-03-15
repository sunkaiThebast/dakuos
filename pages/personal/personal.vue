<template>
	<view class="content" style="background-color: #191B1C;">
		<hx-navbar
			title="個人中心" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
		</hx-navbar>
		<view style="background: #25292c; padding: 20rpx 0;">
			<view style="width: 200rpx;height: 200rpx;margin: 0 auto 20rpx;"  @tap="chooseImage()">
					<img v-if="merberdata.head_portrait != null"  :src="merberdata.head_portrait" style="width: 100%;height: 100%;border-radius: 50%;">
					<image v-else src="../../static/96x96.png" alt="" style="width: 100%;height: 100%;border-radius: 50%;">
			</view>
			<view style="text-align: center;font-size: 40rpx;color: #FFFFFF;">{{merberdata.phone}}</view>
			<view style="display:flex;height: 150rpx;text-align: center;color: #FFFFFF;border-top:1px solid #505050;border-bottom:1px solid #505050;margin-top: 20rpx;">
				<view style="width: 33.33%;border-right:1px solid #505050;padding: 40rpx 0;" >
					<view>儲值點數</view>
					<view v-if="userdata.user_type == 1">{{merberdata.money}}</view>
					<view v-if="userdata.user_type == 2">0</view>
				</view>
				<view style="width: 33.33%;border-right:1px solid #505050;padding: 40rpx 0;">
					<view>分紅點數</view>
					<view v-if="userdata.user_type == 1" style="color: #fc4867;">{{merberdata.bonus}}</view>
					<view v-if="userdata.user_type == 2">0</view>
				</view>
				<view style="width: 33.33%;padding: 40rpx 0;">
					<view>會員等級</view>
					<view  v-if="userdata.user_type == 1" style="color: #1a8d94;">LV.{{merberdata.lv}}</view>
					<view v-if="userdata.user_type == 2">0</view>
				</view>
			</view>
			<view class="tuijianma">
				<text style="">我的推薦碼</text>
				<text style="color: #f4b102;">{{merberdata.referral_code}}</text>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<navigator url="./Addbank" open-type="navigate">
					<view class="li " >
						<view class="icon"><image src="../../static/user/yhk.png"></image></view>
						<view class="text">銀行賬戶</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<navigator url="./withdraw" open-type="navigate">
					<view class="li " >
						<view class="icon"><image src="../../static/user/yhk.png"></image></view>
						<view class="text">上傳身分證／提領</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<view class="li " >
					<view class="icon"><image src="../../static/user/xx.png"></image></view>
					<view class="text">訊息中心</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<navigator url="./Rebate" open-type="navigate">
					<view class="li " >
						<view class="icon"><image src="../../static/user/dszc.png"></image></view>
						<view class="text">點數轉贈</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<navigator url="./Stored" open-type="navigate">
					<view class="li " >
						<view class="icon"><image src="../../static/user/dscz.png"></image></view>
						<view class="text">點數儲值</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<navigator url="./Renew" open-type="navigate"> 
					<view class="li " >
						<view class="icon"><image src="../../static/user/xf.png"></image></view>
						<view class="text">續費專區</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<navigator url="./Setup" open-type="navigate"> 
					<view class="li " >
						<view class="icon"><image src="../../static/user/set.png"></image></view>
						<view class="text">賬號設定</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
				<navigator url="./PolicyCenter" open-type="navigate"> 
					<view class="li " >
						<view class="icon"><image src="../../static/user/zczx.png"></image></view>
						<view class="text">政策中心</view>
						<image class="to" src="../../static/user/to.png"></image>
					</view>
				</navigator>
			</view>
		</view>
		<view  style="padding: 30rpx 20rpx;background-color: #191B1C;">
			<button class="cu-btn bg-red lg"  style="width: 100%;background-color: #0075AA;" @click="dropout">登 出</button>
		</view>
	    <kps-image-cutter @ok="onok" @cancel="oncancle" :url="url"  :width="200" :height="300"></kps-image-cutter>

	</view>
</template>
<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import {  mapMutations  } from 'vuex';
	export default {
		data() {
			return {
				url: "",
				path: "",
				merberdata:{},
				userdata:this.$store.state.userdata,
			};
		},
		onLoad() {
			this.getmerber()
		},
		onBackPress() {  
			
		},
		components:{
			kpsImageCutter
		},
		onShow() {
			this.getmerber()
		},
		methods: {
			...mapMutations(['logout']),
			dropout(){
				var _this = this
				uni.showModal({
					title: '提示',
					content: '您確定登出嗎',
					success: function (res) {
						if (res.confirm) {
							_this.logout()
							uni.navigateTo({
								url: '../login/Loginmode'
							});
						} else if (res.cancel) {
						}
					}
				});
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
							this.loading = false
							if(res.data.success==1){
								this.merberdata = res.data.data
							}
						}
					});
			},
			chooseImage() {
				uni.chooseImage({
					sizeType: ['compressed'],
					success: (res) => {
						// 设置url的值，显示控件
						this.url = res.tempFilePaths[0];
						console.log(res) 
					}
				});
			}, 
			onok(ev) {
				uni.showLoading({
				    title: '正在上傳',
					mask:'true'
				}); 
				
				var _this = this
				uni.uploadFile({
					url: this.$store.state.api+'change_head',
					header: {
						'content-type': 'multipart/form-data', 
					},
					filePath:ev.path,
					name: 'head_portrait',
					formData:{
						user_id: _this.$store.state.userdata.merber_id,
						token:_this.$store.state.userdata.token,
						user_type:_this.$store.state.userdata.user_type,
					},
					success: (res) => {
						console.log(res.data);
						res.data = JSON.parse(res.data)
						this.url = "";
						uni.hideLoading();
						if(res.data.success == 1){
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '更換成功'
							});
							this.getmerber()
						}
					}
				});
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
			}
		}
	}
</script>

<style lang="scss" scoped>
.header{
	background: #2C2D30;
	height: 300upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#2C2D30;
	}
}
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	position: relative;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff; 
}
.list{
	width:100%;
	border-bottom:15upx solid  #505050;
	background: #191B1C;
	&:last-child{
		border: none;
	}
	.li{
		width:100%;
		height:100upx;
		padding:0 4%;
		border-bottom:1rpx solid  #505050;
		display:flex;
		align-items:center;
	&.noborder{
		   border-bottom:0;
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			image{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
<style>
	.tuijianma{
		width: 90%; 
		height:80rpx;
		 background-color: #000000;
		 border-radius:40rpx ;
		 margin: 20rpx auto 0;
		 font-size: 30rpx;
		 font-weight: bold;
		 display: flex;
		 align-items: center;
		 justify-content: space-around;
		 color: #FFFFFF;
	}
</style>