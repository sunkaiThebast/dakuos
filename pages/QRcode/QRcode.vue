<template>
	<view class="content"  style="background-color: #191b1c;">
		<hx-navbar
			:title="title" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
		</hx-navbar>
<!-- 		<view style="width: 90%;margin:0 auto;display: flex;justify-content: space-between;">
			<button type="warn" style="background: #3F7CFF;width: 45%;color: #FFFFFF;">我的條碼</button>
			<button style="background: #F98B31;width: 45%;color: #FFFFFF;" @click="qrcode()">掃碼</button>
		</view> -->
			<view  v-if="user_type == 1" style="margin-top: 400rpx;">
				<view class="saoyisao"  @click="getqrcode">
					<image src="../../static/sys.png" style="width: 100%;height: 100%;"></image>
				</view>
				<text></text>
			</view>
			<view style="min-height: 600rpx;background: #fff;width: 90%;margin:100rpx auto;border-radius: 20rpx;padding: 20rpx;" v-if="user_type == 2">
				<image :src="qrcode" style="height: 600rpx;"></image>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'我的條碼',
				user_type:this.$store.state.userdata.user_type,
				qrcode:''
			};
		},
		onLoad() {
			console.log(this.$store.state.qr_code)
			if(this.user_type == 1){
				this.title = '掃一掃'
			}else{
				this.title = '我的條碼'
				this.getmerber()
			}
		},
		components:{},
		methods:{
			getqrcode(){
				console.log(111)
				uni.scanCode({
				    success: function (res) {
						var parameter =  res.result.substr(23)
						uni.navigateTo({
						    url: '../Pay/Pay?'+parameter
						});
				    },
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
								this.qrcode = res.data.data.qr_code
							}
						}
					});
			},
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height:100%;
		position: fixed;
		background-color:#2C2D30;
		text-align: center;
		
	}
	.saoyisao{
		height: 300rpx;
		width: 300rpx;
		margin: 0 auto;
		background-color:#2b2e30 ;
		padding: 50rpx;
		border-radius: 50%;
		border: 1px solid #505050;
	}
	.btn-box{
		height: 80rpx;
		width:300rpx ;
		position: relative;
		color: #fff;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
	
	}
</style>
