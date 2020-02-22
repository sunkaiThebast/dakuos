<template>
	<view  class="content" style="min-height: 100%;">
		<hx-navbar
			title="附近店家" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff" 
			:backgroundColor='[52,56,59]' 
			>
		</hx-navbar>
		<view class="fjdj"  v-for="(item,index) in storelist"  >
			<view style="width:160rpx;height: 160rpx;border-radius: 50%;">
				<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574609715828&di=202c4ae485ab9d2e1b86d5264cae78be&imgtype=0&src=http%3A%2F%2Fpic18.nipic.com%2F20111228%2F8022226_153114315000_2.jpg" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<view style="font-size: 30rpx;color: #fff;text-align: left;margin-left: 50rpx;width: 70%;" >
				<view style="display: flex;justify-content: space-between;">
					<view>{{item.name}}</view>
					  <view>{{item.distance}}</view>
				</view>
				<view style="margin-top: 15rpx;"> {{item.address}}</view> 
				<view style="display: flex;margin-top: 15rpx;">
					<view class='cu-tag  radius' :class="'bg-'+ ColorList[index].name" v-for="(list,index) in item.label" :key="index">{{list.label}}</view>
		    	</view>	
			</view>
		</view> 
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text">加載中</view>
			</view> 
		</view>
		
	</view>
</template>

<script>
	 import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	 import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		data() {
			return {
				loading:false,
				storedata:[],
				storelist:[],
				newstoredata:[],
				testlist:[
					{name:'zopp',age:0},
					{name:'gpp',age:18},
					{name:'yjj',age:8},
					{name:'yjsssj',age:9}
				],
				ColorList:[{
						title: '嫣红',
						name: 'red',
						color: '#e54d42'
					},
					{
						title: '桔橙',
						name: 'orange',
						color: '#f37b1d'
					},
					{
						title: '明黄',
						name: 'yellow',
						color: '#fbbd08'
					},
					{
						title: '橄榄',
						name: 'olive',
						color: '#8dc63f'
					},
					{
						title: '森绿',
						name: 'green',
						color: '#39b54a'
					}],
				val:'',
				origins:'',
				num:0
			};
		},
		components: {
			uniTag,
			uniSearchBar
		},
		onShow() {
			this.get_business()
		},
		onLoad(){
			var _this = this
			// plus.runtime.openURL( this.$store.state.api+'test') 	
		},
		methods: {
			compare(){
				return function(a,b){
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			},
			distance(res){ 
				this.storelist = []
				this.newstoredata = []
				var _this = this
				console.log(res)
				console.log(this.storedata)
				console.log(this.storedata[0].longitude_and_latitude,)
				for(let i = 0 ;i < this.storedata.length;i++){
					uni.request({
						url:"https://maps.googleapis.com/maps/api/distancematrix/json",
						method:'GET', 
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data:{
							'origins':res, 
							'destinations':this.storedata[i].longitude_and_latitude, 
							"key":'AIzaSyDiH4KI8kdu4ta_1oqinIwQJ8u1rlDiYVI' 
						},
						success: (res) => { 
							Vue.set(this.storedata[i],'distance',res.data.rows[0].elements[0].distance.text)
							Vue.set(this.storedata[i],'distancevalue',res.data.rows[0].elements[0].distance.value)
							this.newstoredata.push(this.storedata[i])
							console.log(this.newstoredata)
						}
					}); 
				}
				setTimeout(function(){
					console.log(_this.newstoredata)
					_this.storelist = _this.newstoredata.sort( (a,b) => a.distancevalue-b.distancevalue)
					_this.loading = false
				},1000)
				// console.log()
				// this.storelist = this.newstoredata.sort( () => a.distancevalue-b.distancevalue)
				// setTimeout(function(){_this.loading = false},1000)
			},
			get_business(){
				this.loading = true
				var _this =this
					uni.request({
						url: this.$store.state.api+'get_business',
						method:'POST', 
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
						success: (res) => {
							console.log(res)
							if(res.data.success==1){
								console.log(res.data)
								this.storedata = res.data.data	
								uni.getLocation({
									type: 'wgs84',
									success: function (res) {
										console.log('当前位置的经度：' + res.longitude);
										console.log('当前位置的纬度：' + res.latitude);
										 _this.distance(res.latitude+','+res.longitude)
									}
								}); 
							}
						}
					});
			}
		}
	}
</script>

<style>
	.fjdj{
		display: flex;
		align-items: center;
		width: 90%;
		margin:  20rpx  auto  40rpx;
		
	}
</style>
