<template>
	<view class="jPicker">
		<view @click="showPicker" class="showLine">
			<view v-if="listData.length>0&&nSel!=-1">
				{{listData[nSel][showKey]||listData[nSel]}}
			</view>
			<view style="color:#7d7d7d;" v-else>
				未选择
			</view>
		</view>

		<view class="pickerMask" v-if="pickerVisable" @click="pickerVisable=false">
			<view class="alertArea" @click.stop="doNothing">
				<view class="searchInput " v-if="searchPosition=='top'">
					<view class="clickArea">
						<input class="jInput"  @input="filterOp" placeholder="搜索" />
						<image class="searchLogo" src="../../static/search.png"></image>
					</view>
				</view>
				<view class="pickerTop">
					<view class="lefBtn" @click="cancelSel">取消</view>
					<view class="midInput">
						<template v-if="searchPosition=='middle'">
							<input class="searchArea" @input="filterOp" />
							<image class="searchIcon" src="../../static/search.png"></image>
						</template>
					</view>
					<view class="rigBtn" :style="{color:sureColor}" @click="sureSelect">确定</view>
				</view>
				<picker-view :value="[nSel]" :mask-style="'background-color:'+bgColor" :indicator-style="selStyle" @change="selChange">
					<picker-view-column>
						<view class="opItem" v-for="(item,index) in listData" :key="index">{{item[showKey]||item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'jPicker',
		data() {
			return {
				listData: this.options,
				nSel: -1,
				pickerVisable: false,
				searchPosition: "middle",
				//picker样式
				// unSelStyle:'',
				//'background-color:rgba(0, 74, 255, 0.44);',//'background-color:rgba(220, 250, 9, 0.44);',rgba(250, 9, 9, 0.44)
				selStyle: 'height:50px;',
			}
		},
		props: ["options", "showKey", "valKey", "val", "position", "disabled", "bgColor", "sureColor"],
		//选项数组，列表显示的对象键名，取值的对象键名,默认选中值,搜索框位置,是否禁用,整体背景色,确认键颜色
		watch: {
			options(n) {
				this.listData = n;
			},
			val(n) {
				this.selByValKey();
			},
		},
		mounted() {
			this.selByValKey();
			if (this.position) {
				this.searchPosition = this.position;
			}
		},
		methods: {
			showPicker() {
				if (this.disabled) {
					return;
				}
				this.pickerVisable = true;
				this.listData = this.options;
			},
			cancelSel() {
				this.pickerVisable = false;
				if (this.val) {
					if (this.valKey) {
						let n = this.listData;
						for (let j = 0, len = n.length; j < len; j++) {
							if (n[j][this.valKey] == this.val) {
								this.nSel = j;
								break;
							}
						}
					} else {
						this.nSel = this.val;
					}
				} else {
					this.nSel = -1;
				}
			},
			sureSelect() {
				this.pickerVisable = false;
				if (this.listData.length == 0) {
					// uni.showToast({
					// 	title:"未选中"
					// })
					this.$emit("sure", {});
				} else {
					let obj = {
						pickerVal: this.nSel,
						pickerName: this.nSel == -1 ? this.listData[0] : this.listData[this.nSel],
					};
					if (this.valKey) {						
						obj=this.nSel == -1?this.listData[0]:this.listData[this.nSel];
						obj.pickerVal = obj[this.valKey];
					}

					this.$emit("sure", obj);
				}


				//console.log(this.listData,this.nSel);

			},
			selChange(e) {
				this.nSel = e.detail.value[0];
			},
			filterOp(e) {
				console.log(e.detail.value);
				let keyWord = e.detail.value;
				if (keyWord != "") {
					keyWord = keyWord.toLowerCase();
					let oldArr = this.options;
					this.listData = [];
					this.nSel = 0;
					for (let i = 0; i < oldArr.length; i++) {
						let theVal = oldArr[i];
						if (this.showKey) {
							theVal = oldArr[i][this.showKey];
						}
						if (theVal.toString().toLowerCase().indexOf(keyWord) > -1) {
							this.listData.push(oldArr[i]);
						}
					}
				} else {
					this.listData = this.options;
					this.nSel = this.val ? this.val : -1;
					this.selByValKey();
				}
			},
			selByValKey() {
				let n = this.options;
				this.listData = n;
				if (this.valKey) { //看看指定了选中值的键名否，没有则默认为数据源index		

					for (let j = 0, len = n.length; j < len; j++) {
						if (n[j][this.valKey] == this.val) {
							this.nSel = j;
							break;
						}
					}
				} else {
					this.nSel = this.val;
				}
			},
			doNothing() {
				//nothing
			},
		}
	}
</script>

<style lang="scss" scoped>
	.jPicker {
		width: 100%;

		.showLine {
			// border-left:1px solid #000000;
			width: 100%;
			display: inline-block;
		}
	}

	.pickerMask {
		background-color: rgba(0, 0, 0, 0.5);
		height: 100vh;
		width: 100vw;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.alertArea {
		position: fixed;
		background-color: #FFFFFF;
		bottom: 0;
		left: 0;
		width: 100vw;
		border-radius: 10px 10px 0 0;

		.searchInput {
			width: 100%;

			.clickArea {
				width: 100%;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				height: 2.4rem;

				.jInput {
					text-align: left;
					width: 90%;
					border: none;
					height: 1.8rem;
					border-radius: 6px;
					padding: 3px 8px;
					box-sizing: border-box;
					background-color: #efefef;
				}

				.searchLogo {
					position: absolute;
					top: 1.1rem;
					right: 8%;
					z-index: 1;
					width: 16px;
					height: 16px;
				}
			}
		}

		.pickerTop {
			height: 2.6rem;
			padding: 0.6rem 0 0.1rem;
			border-bottom: 1px solid #000000;
			font-size: 18px;
			box-sizing: border-box;

			.lefBtn,
			.rigBtn {
				display: inline-block;
				vertical-align: top;
				font-size: 18px;
				width: 18%;
				line-height: 1rem;
				text-align: center;
				padding: 5px 0;
				// height: 1.4em;
			}

			.rigBtn {
				color: #31C231;
			}

			.midInput {
				width: 64%;
				display: inline-block;
				height: 1.6rem;
				position: relative;
				text-align: left;

				.searchArea {
					background-color: #efefef;
					border-radius: 5px;
					padding: 4px 10px;
				}

				.searchIcon {
					position: absolute;
					right: 10px;
					top: 7px;
					width: 20px;
					height: 20px;
				}



				// input{
				// 	width: 60%;
				// 	margin: 0 auto;
				// 	border-bottom: 1px solid #DDDDDD;
				// 	// border-right: 1px solid #DDDDDD;
				// 	border-radius: 5px;
				// 	line-height: 1rem;
				// 	text-align: left;
				// 	padding:2px 5px;
				// 	position: relative;
				// }	
				// input:after{
				// 		content: "\e609";
				// 		position: absolute;
				// 		right:5px;
				// 		top: 5px;
				// 		font-family: "gs-gesmart";
				// }
			}
		}


		picker-view {
			width: 100%;
			height: 300px;
			// margin-top:20upx;
			left: 0;

			.opItem {
				line-height: 50px;
				text-align: center;
				background-color: #f3f3f3;
				color: #000000;
			}
		}
	}
</style>
