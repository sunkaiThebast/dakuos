<script>
	import {  mapMutations  } from 'vuex';  
	export default {
		onLaunch: function () {
			 // this.logout() 
			 console.log('App Launch')
             uni.getStorage({
				 key: 'userdata',
				 success:(res) => {
					 console.log(res)
					 this.login(res) 
				 },
				 fail(res) {
				 	console.log(res)
					uni.reLaunch({
						url:'./pages/login/Loginmode'
					})
				 }
			 }) 
			// uni.navigateTo({
			// 	url: 'pages/login/SendEmail'
			// });
		},
		methods: {  
			...mapMutations(['login','logout'])  
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	*{
		color: #fff;
	}
	/*每个页面公共css */
	.content {
		width: 100%;
		min-height:100%;
		background-color:#2C2D30;
		position: absolute;
	}
	.zdyinnput{
		background: #fff;
		border: 1px solid #fff;
		margin: 0 auto;
		height: 80rpx;
		border-radius:20rpx;
		text-align: left;
		padding: 0 20rpx;
	}
</style>

<style>
    @import "colorui/main.css";
    @import "colorui/icon.css";   
</style>