<template>
	<view class="content">
		<hx-navbar
			title="上傳身分證" 
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
		<view style="width: 90%;margin: 0 auto;">
			<view style="color: #fff;font-size: 30rpx;line-height: 100rpx;">身份證正面</view>
			<view style="height: 400rpx;padding: 15rpx;background-color: #d9d9d9;width: 100%;display: flex;align-items: center;justify-content: center;" @click="uploadimgfront"> 
				 <image :src="topimg"  style="width: 100%;height: 100%;" v-show="topimg"></image>
				 <image src="../../static/paizhao.png" mode="" style="width: 200rpx;height: 200rpx;" v-show="!topimg"></image>
			</view>
			<view style="color: #fff;font-size: 30rpx;line-height: 100rpx;">身份證反面</view>
			<view  style="height: 400rpx;padding: 15rpx;background-color: #d9d9d9;width: 100%;display: flex;align-items: center;justify-content: center;" @click="uploadimgreverse">
				 <image :src="bottonimg"  style="width: 100%;height: 100%;" v-show="bottonimg"></image>
				 <image src="../../static/paizhao.png" mode="" style="width: 200rpx;height: 200rpx;" v-show="!bottonimg"></image>
			</view>
			<view style="margin-top: 50rpx">
				<button class="cu-btn bg-grey lg"   style="width: 100%;background-color: #0075a9;" @click="sub">提交認證</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topimg:'',
				bottonimg:'',
				imgpath:[],
				upimgpath:[],
			}
		},
		methods: {
			uploadimgfront(){
				var _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有 
				    success: function (res) {
				        console.log(res);
						_this.topimg = res.tempFilePaths[0]
						_this.imgpath[0]=res.tempFiles[0]
						console.log(_this.imgpath)
				    }
				});
			},
			uploadimgreverse(){
				var _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有 
				    success: function (res) {
				        console.log(res);
						_this.bottonimg = res.tempFilePaths[0]
						_this.imgpath[1]=res.tempFiles[0]
                         console.log(_this.imgpath)
				    } 
				});
			}, 
			sub(){
				uni.showLoading({
				    title: '正在上傳',
					mask:'true'
				}); 
				var _this = this
				let obj = new Object();  
				obj.name = "identity_front";
				obj.uri = this.imgpath[0].path;
				this.upimgpath.push(obj); 

				let obj2 = new Object();  
				obj2.name = "identity_reverse";
				obj2.uri = this.imgpath[1].path;
				this.upimgpath.push(obj2); 
				uni.uploadFile({
					url: _this.$store.state.api+'identity',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					fileType:'image', 
					files:_this.upimgpath,
					formData: {
						user_id:'3',
						token:"8b3c89f8c2d0cc9e3f8ed2f41a7638b3d7313d0d",
						user_type:'1', 
					},
					success: (res) => {
						console.log(res)
						res.data = JSON.parse(res.data)
						uni.hideLoading();
						if(res.data.success == 1){
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '上傳成功'
							});
						}else{ 
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '網絡錯誤'
							});
						}
						
					}
				})
			}
			
		}
	}
</script>

<style>

</style>

