<template>
	<view class="content"> 
		<hx-navbar
			title="Dakuoss" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			@click-right='qrcode()'
			:backgroundColor='[52,56,59]'
			>
			<view slot="right" style="color: #fff;" v-if="userdata.user_type == 1" >
				<uni-icons type="scan" size="25" color="#ffffff" ></uni-icons>
			</view>
		</hx-navbar>
		<view style="padding: 20rpx;display: flex;">
			<view class="portrait">
			   <image v-if="merberdata.head_portrait != null" :src="merberdata.head_portrait" alt="">
			   <image v-else src="../../static/96x96.png" alt="">
			</view>
			<view style="color: #Fff;font-size: 30rpx;min-width: 70%;">
				<view class="username" v-if="userdata.user_type == 1">
					<view style="font-size: 40rpx;">Hi,{{userdata.name}}</view>
					<view class="viplv">LV {{merberdata.lv}}</view>
				</view>
				<view class="username" v-if="userdata.user_type == 2">
					<view style="font-size: 40rpx;">{{userdata.name}}</view>
				</view>
				<view class="dianshu" v-if="userdata.user_type == 1"> 
					<view>
						<view>儲值點數</view>
						<view style="margin-top: 10rpx;color: #FFFFFF;" >{{merberdata.money}}</view>
					</view>   
					<view>
						<view>分紅點數</view>
						<view style="margin-top: 10rpx;color: #ff4b69;">{{merberdata.bonus}}</view>
					</view>
					<view>
						<view>Bonus</view>
						<view style="margin-top: 10rpx;color: #08ecf4;">{{merberdata.bonus_num}}</view>
					</view>
				</view>
				<view  style="display: flex;align-items: center;height: 100rpx;padding: 0 20rpx;" v-if="userdata.user_type == 2">
					<view>當日營業額(TWD) : <text style="margin-left: 30rpx;color:#ff4b69 ;">{{merberdata.business_money}}</text></view>
					
				</view>
			</view>
		</view>
		
		<view style="padding: 20rpx;background-color: #191b1c;">
			    <text style="font-size: 35rpx;color: #FFFFFF;">Star</text>
				<view  style="border: 1px solid #505050;margin-top: 30rpx;border-radius: 10rpx;background-color: #2b2e30;" @click="golsit('https://www.instagram.com/love__me1008/?igshid=7vd60gs0pbyu')">
					<view style="height: 600rpx;width: 100%;border-bottom:1px solid #505050;padding: 20rpx;">
						<image style="width: 100%;height: 100%;" src="../../static/list1.png"></image>
					</view>
					<view style="text-align: center;color: #fff;font-weight: bold;font-size: 30rpx;padding:15rpx 20rpx;">love__me1008 張小于</view>
				</view>
				<view  style="border: 1px solid #505050;margin-top: 30rpx;border-radius: 10rpx;background-color: #2b2e30;" @click="golsit('https://www.instagram.com/p/B6nlDaNnzQY/')">
					<view style="height: 600rpx;width: 100%;border-bottom:1px solid #505050;padding: 20rpx;">
						<image style="width: 100%;height: 100%;" src="../../static/list2.png"></image>
					</view>
					<view style="text-align: center;color: #fff;font-weight: bold;font-size: 30rpx;padding:15rpx 20rpx;">wg_vivi 貓貓</view>
				</view>
				<view  style="border: 1px solid #505050;margin-top: 30rpx;border-radius: 10rpx;background-color: #2b2e30;" @click="golsit('https://www.instagram.com/p/B29QFYxnPRb/')">
					<view style="height: 600rpx;width: 100%;border-bottom:1px solid #505050;padding: 20rpx;">
						<image style="width: 100%;height: 100%;" src="../../static/list3.png"></image>
					</view>
					<view style="text-align: center;color: #fff;font-weight: bold;font-size: 30rpx;padding:15rpx 20rpx;">姸予.Queenie</view>
				</view>
				<view  style="border: 1px solid #505050;margin-top: 30rpx;border-radius: 10rpx;background-color: #2b2e30;" @click="golsit('https://www.instagram.com/p/B3t5OFCHu2b/')">
					<view style="height: 600rpx;width: 100%;border-bottom:1px solid #505050;padding: 20rpx;">
						<image style="width: 100%;height: 100%;" src="../../static/list4.png"></image>
					</view>
					<view style="text-align: center;color: #fff;font-weight: bold;font-size: 30rpx;padding:15rpx 20rpx;" >ccleehom1128 蜜瓜</view>
				</view>
				<view  style="border: 1px solid #505050;margin-top: 30rpx;border-radius: 10rpx;background-color: #2b2e30;" @click="golsit('https://www.instagram.com/p/B1Dl45tgM9Q/')">
					<view style="height: 600rpx;width: 100%;border-bottom:1px solid #505050;padding: 20rpx;">
						<image style="width: 100%;height: 100%;" src="../../static/list5.png"></image>  
					</view>
					<view style="text-align: center;color: #fff;font-weight: bold;font-size: 30rpx;padding:15rpx 20rpx;">張媛媛（ hyesung02272019）</view>
				</view>
		</view>
	</view>
</template>

<script>
	import Voice from "../../js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy.js" 
	import {  mapMutations  } from 'vuex';
	var bitmap = null;
	export default {
		data() {
			return {
			     num:200000,
				 loading:false,
				 userdata:this.$store.state.userdata,
				 merberdata:{}
			}
		},
		components:{},
		onShow() {
			this.getmerber()
		}, 
		onLoad() { 
			if(this.$store.state.haslogin == true){
				this.getmerber()
			}
		},
		onLaunch(){
		},	
		methods: {
			...mapMutations(['getmerberdata']),
			getmerber(){
				var _this =this
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
								_this.getmerberdata(res.data.data)
								console.log(this.merberdata.head_portrait)
							}
						}
					});
			},
			golsit(url){
				plus.runtime.openURL( url ) 
			},
			// openVoice() {
			// 	console.log('准备播报语音'); 
			// 	Voice({
			// 		  voiceSet: {
			// 			tex: '支付宝到账'+this.num+'元',
			// 			per	: '0',//发音员
			// 			spd:'5'//语速
			// 		  }
			// 	  }) 
			// },
			qrcode(){
				console.log(111)
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			}
		}
		
	}
</script>

<style>
 .portrait{
	 width:200rpx;
	 height: 200rpx;
	 border-right:1px solid #505050;
	 padding: 20rpx;
 }
 
.portrait image{
	width: 100%;
	height: 100%;
	border-radius:50% ;
}
.username{
	text-align: left;
	display: flex;
	justify-content: space-between;
	align-items: center;
	hefont-size: 40rpx;
	height: 100rpx;
	padding: 0 20rpx;
	border-bottom:1px solid #505050 ;
	
}
.dianshu{
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	padding: 15rpx 20rpx;
}
.dianshu view{
	text-align: center;
}
.viplv{
	background-color: #191b1c;
	padding: 10rpx 30rpx;
	border-radius: 20rpx;
	color:#ffde00 ;
}
.balance{
	display: flex;
	justify-content: space-between;
}
.balance view{
	width: 120rpx;
	margin-right: 30rpx;
	text-align: center;
}
</style>
