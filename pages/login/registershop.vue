<template>
	<view class="register">
		<hx-navbar
			title="商家註冊" 
			:back="false"
			:fixed="true"
			color="#000000"
			statusBarFontColor="#000000"
			transparent="hidden"
			>
			<view slot="left"  @click="clickReturn()">
				<uni-icons type="back" size="25" style="margin-left: 15rpx;"></uni-icons>
			</view>
		</hx-navbar>
		<view >
			<!-- 头部logo -->
			<view class="header" style="margin-top: 20rpx;">
				<image src="../../static/logo.jpg"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
						v-model="phoneData"
						type="text"
						maxlength="11"
						placeholder="手機號碼"
					></wInput>				
					<wInput
						v-model="passData"
						type="password"
						maxlength="11"
						placeholder="登入密碼"
						isShowPass
					></wInput>
					<wInput
						v-model="Paymentpwd"
						type="password"
						maxlength="6"
						placeholder="支付密碼"
						isShowPass
					></wInput>
					<wInput
						v-model="verCode"
						type="number"
						maxlength="6"
						placeholder="驗證碼"
						isShowCode
						ref="runCode"
						@setCode="getVerCode()"
					></wInput>
					<wInput
						v-model="name"
						type="text"
						placeholder="真實姓名"
						isShowPass
					></wInput>
					<wInput
						v-model="Email"
						type="text"
						placeholder="電子信箱"
						isShowPass
					></wInput>
					<wInput
						v-model="Shopname"
						type="text"
						placeholder="店家名稱"
						isShowPass
					></wInput>
					<wInput
						v-model="Uniformnum"
						type="number"
						maxlength="8"
						placeholder="統一編號"
						isShowPass
					></wInput>
					<button class="selectadd"  @click="open()">{{Storeaddress}}</button>
				</view>	
				<view class="footer">
					<text 
						@tap="isShowAgree" 
						class="cuIcon"
						:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
					>同意</text>
					<!-- 协议地址 -->
					<navigator url="" open-type="navigate">《协议》</navigator>
				</view>
				<wButton 
					text="註 冊"
					:rotate="isRotate" 
					@click.native="startReg()"
				></wButton>
			
			<!-- 底部信息 -->

		</view>
		<uni-popup ref="popup" type="center" >
			<view class="addpopup">
			   <view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
					<view class="oneData">
						<view class="title">請選擇市/縣：</view>
						<jPicker  class="cont"  position="top" @sure="citychange" showKey="city" valKey="city" :val="city" :options="citydata" />
					</view>
				</view>
				<view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
					<view class="oneData">
						<view class="title">請選擇區/鎮：</view>
						<jPicker  class="cont"  position="top" @sure="countryChange" showKey="country" valKey="country" :val="country" :options="countrydata" />
					</view>
				</view>
				<view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
					<view class="oneData">
						<view class="title">請選擇路/街道：</view>
						<jPicker  class="cont"  position="top" @sure="roadChange" showKey="road" valKey="road" :val="road" :options="roaddata" />
					</view>
				</view>		
				<view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
					<textarea  v-model="Address" placeholder-style="font-size:30rpx;color:#333333;" placeholder="請輸入詳細地址" style="width: 100%;height: 200rpx;border: 2rpx solid #E0E0E0;padding: 20rpx;font-size:30rpx;color:#333333"/>
				</view>
				<view style=" margin: auto; margin-bottom: 10px;padding: 20rpx;">
			     	<button class="cu-btn bg-grey lg" style="width: 100%;background: rgba(0,0,0,0.6);" @click="Confirmadd">確定</button>
				</view>
			</view>
		</uni-popup>
		<view v-if="loading" style="width: 100%;height: 100%;z-index: 9999;position: fixed;top: 0;">
			<view class="cu-load load-modal" v-if="loading" >
				<image src="../../static/logo.jpg" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="gray-text">{{loadingtext}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import wInput from '../../components/watch-login/watch-input.vue' 
	import wButton from '../../components/watch-login/watch-button.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import jPicker from '../../components/J-Picker/jPicker.vue';
	export default {
		data() {
			return {
				//logo图片 base64
				phoneData:'', // 用户/电话
				passData:'', //密码
				Paymentpwd:'',//支付密码
				Email:'',//电子邮箱
				name:'',//真实姓名
				verCode:"", //验证码
				Shopname:'',//商店名称
				city:'',//选择的市级
				country:'',//选择的县级
				road:'',//选择的街道
				Address:'',//详细地址
				Storeaddress:'點擊選擇商店地址',//商店地址
				Uniformnum:'',//统一编号
				longitude_and_latitude:'',//商家地址经纬度
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				citydata:[
					{city: '金門縣',},
					{city: '宜蘭縣',},
					{city: '新竹縣',},
					{city: '苗栗縣',},
					{city: '彰化縣',},
					{city: '南投縣',},
					{city: '雲林縣',},
					{city: '嘉義縣',},
					{city: '屏東縣',},
					{city: '臺東縣',},
					{city: '花蓮縣',},
					{city: '澎湖縣',},
					{city: '基隆市',},
					{city: '新竹市',},
					{city: '嘉義市',},
					{city: '臺北市',},
					{city: '高雄市',},
					{city: '新北市',},
					{city: '臺中市',},
					{city: '臺南市',},
					{city: '桃園市',}
				],
				countrydata:[],
				roaddata:[],
				loading:false,
				loadingtext:'加載中...'
			}
		},
		components:{
			wInput,
			wButton,
			uniIcons,
			uniPopup,
			jPicker
		},
		mounted() {
			_this= this;
		},
		methods: {
			//选择市后调取县级
			citychange(e){
				this.loading = true
				this.city=e.city
				uni.request({
				    url: 'https://www.egopay.com.tw/1.0/gain_site',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
				    data: {
						city:this.city
				    },
				    success: (res) => {
					    if(res.data.success == 1){
							this.loading = false
							this.countrydata = res.data.data
						}
					} 
				});
			},
			//选择县级后调取街道
			countryChange(e){
				this.loading = true
				this.country=e.country
				uni.request({
					url: 'https://www.egopay.com.tw/1.0/gain_site',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						city:this.city,
						country:this.country
					},
					success: (res) => {
						if(res.data.success == 1){
							this.loading = false
							this.roaddata = res.data.data
						}
					} 
				});
			},
			//选择街道
			roadChange(e){
				this.road = e.road
			},
			//确认地址调取经纬度
			Confirmadd(){
				this.loading = true
				this.loadingtext = '定位中...'
				this.Storeaddress = this.city+this.country+this.road+this.Address
				console.log(this.Storeaddress) 
				uni.request({
				    url: this.$store.state.api+'business_location',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
				    data: {
						address:this.Storeaddress,
				    },
				    success: (res) => {
						console.log(res)
						if(res.data.success == 1){
							this.loadingtext = '加載中...'
							this.loading = false
							this.longitude_and_latitude = res.data.data.longitude_and_latitude
							this.$refs.popup.close()
						}else if(res.data.success == 2){
							this.loadingtext = '加載中...'
							this.loading = false
							this.Storeaddress='點擊選擇商店地址'
							this.$refs.popup.close()
							uni.showToast({
							    icon: 'none', 
								position: 'center',
							    title: '地址獲取失敗，請再次嘗試',
								duration:2000
							});
						}
				    },
					fail:(res) => {
						console.log(res)
					}
				});
			},
			//打开选择地址弹出层
			open(){
				 this.$refs.popup.open()
			},
			//返回上个页面
			clickReturn() {
				uni.navigateBack()
			},
			//是否选择协议
			isShowAgree(){
				_this.showAgree = !_this.showAgree;
			},
			//获取验证码
			getVerCode(){
			    var phoneReg=/^[0][9]\d{8}$/;
				if (!phoneReg.test(_this.phoneData)) {
				     uni.showToast({
				        icon: 'none', 
						position: 'center',
				        title: '手机号不正确',
						duration:2000
				    });
				}else{
					uni.request({
					    url: this.$store.state.api+'getCode', 
						method:'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
					    data: {
							moblie:this.phoneData,
					    },
					    success: (res) => {
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
							if(res.data.success == 1){
								uni.showToast({
								    icon: 'none',
									position: 'bottom',
								    title: '驗證碼已發送'
								});
							}else{
								uni.showToast({
								    icon: 'none',
									position: 'bottom',
								    title: '网络错误...'
								});
							}

							
					    }
					});
				}	
			},
			isValidGUI (taxId) {
			    var invalidList = "00000000,11111111";
			    if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
			        return false;
			    }
			    var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
			        sum = 0,
			        calculate = function(product) { // 個位數 + 十位數
			            var ones = product % 10,
			                tens = (product - ones) / 10;
			            return ones + tens;
			        };
			    for (var i = 0; i < validateOperator.length; i++) {
			        sum += calculate(taxId[i] * validateOperator[i]);
			    }
			    return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
			},
			//提交注册
		    startReg() {
				const phoneReg=/^[0][9]\d{8}$/;
				const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
				const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
				const verCodeReg=/^[0-9]{6}$/
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}else if (!phoneReg.test(_this.phoneData)) {
				     uni.showToast({
				        icon: 'none', 
						position: 'center',
				        title: '手机号不正确',
						duration:2000
				    });
				}else if(!passwordReg.test(_this.passData)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '密碼必須是由數字與字母組成的6-20位元長度',
						duration:2000
					});
				}else if(!verCodeReg.test(_this.Paymentpwd)){
					uni.showToast({
					    icon: 'none',
						position: 'center',
					    title: '請輸入六位數字支付密碼',
						duration:2000
					});
				}else if(!verCodeReg.test(_this.verCode)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '驗證碼不正確',
						duration:2000
					});
				}else if(_this.name.length==''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請填寫真實姓名',
						duration:2000
					});
				}else if(!mailReg.test(_this.Email)){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入正確的信箱格式',
						duration:2000
					});
				}else if(this.Shopname == ''){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入店家名稱',
						duration:2000
					});
				}else if(!this.isValidGUI(this.Uniformnum)){
					console.log(this.isValidGUI(this.Uniformnum))
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請輸入正確的統一編號',
						duration:2000
					});
				}else if(this.Storeaddress == '點擊選擇商店地址'){
					uni.showToast({
					    icon: 'none', 
						position: 'center',
					    title: '請選擇商家地址',
						duration:2000
					});
				}else if(_this.showAgree == false){
					uni.showToast({
					    icon: 'none',  
						position: 'center',
					    title: '請先同意《協議》',
						duration:2000
					});
				}else{
					_this.isRotate = true
					this.loading = true
					this.loadingtext = '加載中...'
					console.log(this.Storeaddress,this.passData,this.verCode,this.Email,this.longitude_and_latitude,this.Shopname,this.phoneData,this.Uniformnum,)
					uni.request({
					    url: this.$store.state.api+'business_register',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
						method:'POST',
					    data: {
							address:this.Storeaddress,
							password:this.passData,
							phone_code:this.verCode,
							email:this.Email,
							longitude_and_latitude:this.longitude_and_latitude,
							name:this.Shopname,
							phone:this.phoneData,
							unified_taxation_code:this.Uniformnum,
					    },
					    success: (res) => {
					        console.log(res.data);
							if(res.data.success==1){
								this.loading = false
								_this.isRotate=false
								uni.reLaunch({
									url:'./SendEmail'
								})	
							}else if(res.data.success==2){
								this.loading = false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼已過期',
									duration:2000
								});
								_this.isRotate=false
								_this.verCode=''
							}else if(res.data.success==3){
								this.loading = false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '驗證碼錯誤',
									duration:2000
								});
								_this.isRotate=false
								_this.verCode=''
							}else if(res.data.success==6){
								this.loading = false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '此手機號已註冊',
									duration:2000
								});
								_this.isRotate=false
								_this.phoneData=''
							}else if(res.data.success==7){
								this.loading = false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '此郵箱已註冊',
									duration:2000
								});
								_this.isRotate=false
								_this.Email=''
							}else{
								this.loading = false
								_this.isRotate=false
								uni.showToast({
								    icon: 'none', 
									position: 'center',
								    title: '网络错误',
									duration:5000
								});
							}
					    }
					});
				}
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.selectadd{
		margin-top: 20rpx ;
		color:#333333;
		font-size: 30rpx;
		border-radius:65rpx;
		width: 100%;
		border: 1px solid #000000;
	}
	.addpopup{
		 width: 600rpx;
		 height:800rpx;
		 background: #fff;
		 border-radius: 20rpx;
		 box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
	}
	.oneData{
		display: flex;
		justify-content: space-between;
		border: 1rpx solid #fff;
		font-size: 30rpx;
	}
	.oneData .title{
		width: 50%;
		background:rgba(0,0,0,0.6);
		color: #fff;
		border-radius:10rpx ;
		padding: 15rpx;
	}
	.oneData .cont{
		width: 50%;
		padding: 15rpx;
		border-bottom:2rpx solid #000000;
		text-align: center;
	}
</style>