<template>
	<view class="content" >
		<hx-navbar
			title="交易記錄" 
			:back="false"
			:fixed="true"
			color="#ffffff"
			statusBarFontColor="#ffffff"
			:backgroundColor="[52,56,59]"
			>
		</hx-navbar>
		<view style="display:flex;justify-content:space-between;color: #FFFFFF;border-bottom:1px solid #505050 ;">
			<view @click="Pointstype = 1" style="width: 50%;height:150rpx;background: #25292;border-right:1px solid #505050;text-align: center;padding: 40rpx 0">
				<view style="">儲值點數</view>
				<view style="margin-top: 10rpx;">{{money}}</view>	
			</view>
			<view @click="Pointstype = 2" style="width: 50%;height:150rpx;background: #25292;text-align: center;padding: 40rpx 0">
				<view style="">紅利點數</view>
				<view style="margin-top: 10rpx;color: #ff4b69;">{{bonus}}</view>	
			</view>
		</view>
		<view style="display:flex;justify-content:space-between;background: #25292c;height: 100rpx;text-align: center;color: #FFFFFF;line-height: 100rpx;">
			<view @click="Switchtab(2)" :style="{color:clickcolor}" style="width: 33.33%;border-right:1px solid #505050;" >所有紀錄</view>
			<view @click="Switchtab(1)" :style="{color:clickcolor2}" style="width: 33.33%;border-right:1px solid #505050;">累積紀錄</view>
			<view @click="Switchtab(0)" :style="{color:clickcolor3}" style="width: 33.33%;">消費記錄</view>
		</view>
		<view class="lsit">
			<view class="listbody" v-for="item in Pointsdata">
				<view style="color: #00CE47;" v-if="item.plus_minus == 1">{{item.detail}}</view>
				<view style="color: #ff0000;" v-else>{{item.detail}}</view>
				<view style="font-size: 30rpx;text-align: center;">
					<view>{{item.source_name}}</view>
					<view>{{item.create_time | formatDate}}</view>
				</view>
				<view style="color: #06ff00;" v-if="item.plus_minus == 1">+ {{item.income_expenses}}</view>
				<view style="color: #ff0000;" v-else>-{{item.income_expenses}}</view>
			</view>
		</view>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text">正在加载</view>
			</view>
		</view>
	</view>
</template>

<script>
    import sibList from '@/components/sib-list/sib-list.vue'
	export default {
		data() {
			return {
				clickcolor:'#09f6ff',
				clickcolor2:'#ffffff',
				clickcolor3:'#ffffff',
				Pointstype:'1',
				Pointsdata:[],
				loading:false,
				money:0,
				bonus:0
			};
		},
		components: {
			sibList
		},
		filters: {
		  formatDate: function (value) {
			  let date = new Date(value * 1000);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d 
		  }
		},
		onLoad() {
			this.Switchtab(2)
		},
		onShow() {
			this.getmerber()
		},
		watch:{
			Pointstype(val){
				this.Switchtab(2)
			}
		},
		methods: {	 
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
							if(res.data.success == 1){
								this.money = res.data.data.money
								this.bonus = res.data.data.bonus
							}
						}
					});
			},
			//消费记录
			Switchtab(type){
				this.loading = true
				if(type == 2){
					this.clickcolor = '#09f6ff'
					this.clickcolor2 = '#ffffff'
					this.clickcolor3 = '#ffffff'
				}else if(type == 1){
					this.clickcolor = '#ffffff'
					this.clickcolor2 = '#09f6ff'
					this.clickcolor3 = '#ffffff'
				}else if(type == 0){
					this.clickcolor = '#ffffff'
					this.clickcolor2 = '#ffffff'
					this.clickcolor3 = '#09f6ff'
				}
				this.Pointsdata = []
				uni.request({
					url: this.$store.state.api+'m_detail',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						user_id: this.$store.state.userdata.merber_id,
						token:this.$store.state.userdata.token,
						user_type:this.$store.state.userdata.user_type,
						type:this.Pointstype
					},
					success: (res) => {
						console.log(res)
						this.loading = false
						// this.loading = false
						if(res.data.success==1){
							if(type == 2){
								this.Pointsdata = res.data.data
							}
							if(type == 1){
								for(var i = 0 ;i < res.data.data.length; i++){
									if(res.data.data[i].plus_minus == 1){
										this.Pointsdata.push(res.data.data[i])
									}
								}
							}
							if(type == 0){
								for(var i = 0 ;i < res.data.data.length; i++){
									if(res.data.data[i].plus_minus == 0){
										this.Pointsdata.push(res.data.data[i])
									}
								}
							}
						}
					}
				});
			},
		}
	}
</script>

<style>
	.list{
		height: 100%;
		background-color: #191B1C;
	},
	
	.listbody{
		height:150rpx;
		color: #fff;
		padding: 30rpx;
		background-color: #191B1C;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom:1px solid #505050 
	}
	.clicktab{
		background-color: 313131;
		color: #09f6ff;
	}
</style>
