(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{1255:function(t,n,e){var o=e("785c");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=e("4f06").default;i("116a6f18",o,!0,{sourceMap:!1,shadowMode:!1})},1354:function(t,n,e){"use strict";e.r(n);var o=e("e88b"),i=e("2a66");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("45a9");var l=e("2877"),c=Object(l["a"])(i["default"],o["a"],o["b"],!1,null,"3b530730",null);n["default"]=c.exports},"158e":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("4917"),e("c5f6");var o={data:function(){return{scrollToTop:0,scrollTop:0,oldTop:0,sPageY:0,mPageY:0,ePageY:0,translateY:0,pullDownStatus:1,isDown:!1}},props:{pullDownDistance:{type:Number,default:50},reachBottomDistance:{type:Number,default:30},downPullToRefresh:{type:String,default:"下拉刷新"},downReleaseToRefresh:{type:String,default:"松开刷新"},downRefreshing:{type:String,default:"刷新中…"}},methods:{startFn:function(t){this.isDown=!0,this.sPageY=t.changedTouches[0].pageY,this.pointY=this.translateY},moveFn:function(t){var n=this,e=uni.createSelectorQuery().in(this).select(".you-scroll-inner");e.fields({size:!0,scrollOffset:!0},function(e){if(n.scrollTop=e.scrollTop,n.mPageY=t.changedTouches[0].pageY,n.scrollTop<=0){var o=(n.mPageY-n.sPageY)/2+n.pointY;n.translateY=o<0?0:o,3!=n.pullDownStatus&&(n.translateY<n.pullDownDistance?n.pullDownStatus=1:n.translateY>=n.pullDownDistance&&(n.pullDownStatus=2))}}).exec()},endFn:function(t){var n=this;this.isDown=!1,this.ePageY=t.changedTouches[0].pageY,setTimeout(function(){n.translateY=n.translateY>=n.pullDownDistance?n.pullDownDistance:0,2==n.pullDownStatus&&(n.pullDownStatus=3,n.$emit("onPullDown",n.endPullDown))},100)},endPullDown:function(t){var n=this;this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.translateY=0,n.pullDownStatus=1},t||0)},prevent:function(t){this.translateY>0&&t.preventDefault()},scroll:function(t){var n=this;this.$emit("onScroll",t),this.oldTop=t.detail.scrollTop,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.scrolltolower(t)},20)},scrolltolower:function(t){var n=this,e=uni.createSelectorQuery().in(this).select(".you-scroll-inner");e.fields({size:!0,scrollOffset:!0},function(e){e.scrollTop>=t.detail.scrollHeight-e.height-n.reachBottomDistance&&n.$emit("onLoadMore",t)}).exec()},isWeixinCient:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)},goTop:function(t){this.scrollToTop=this.oldTop,this.$nextTick(function(){this.scrollToTop=t||0})}},mounted:function(){this.isWeixinCient()&&document.body.addEventListener("touchmove",this.prevent)},destroyed:function(){this.isWeixinCient()&&document.body.removeEventListener("touchmove",this.prevent)}};n.default=o},1658:function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,".portrait[data-v-3b530730]{width:%?160?%;height:%?160?%;background:#007aff;border-radius:50%}.portrait uni-image[data-v-3b530730]{width:100%;height:100%}.balance[data-v-3b530730]{display:-webkit-box;display:-webkit-flex;display:flex}.balance uni-view[data-v-3b530730]{width:%?120?%;margin-right:%?30?%;text-align:center}",""])},"2a66":function(t,n,e){"use strict";e.r(n);var o=e("f751"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},"2ccf":function(t,n,e){"use strict";var o=e("1255"),i=e.n(o);i.a},"40b9":function(t,n){t.exports="data:image/jpeg;base64,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"},"45a9":function(t,n,e){"use strict";var o=e("8d52"),i=e.n(o);i.a},"694c":function(t,n,e){"use strict";e.r(n);var o=e("158e"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},"785c":function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,".you-scroll[data-v-5dfaf684]{width:100%;height:100%;overflow:hidden;position:relative\n\t/* background-color: #eee; */}.you-scroll .pullDown[data-v-5dfaf684]{width:100%;height:40px;line-height:50px;text-align:center;font-size:14px;overflow:hidden;-webkit-transform:translateY(-100%);transform:translateY(-100%);position:absolute;top:-40px;left:0}.you-scroll .pullDown .down-icon[data-v-5dfaf684]{width:40px;height:32px;display:inline-block;vertical-align:middle}.you-scroll .pullDown .animate[data-v-5dfaf684]{-webkit-animation:scaleIcon-data-v-5dfaf684 1s infinite linear;-moz-animation:scaleIcon-data-v-5dfaf684 1s infinite linear;-ms-animation:scaleIcon-data-v-5dfaf684 1s infinite linear;animation:scaleIcon-data-v-5dfaf684 1s infinite linear}.you-scroll .pullDown span[data-v-5dfaf684]{white-space:nowrap;overflow:hidden;display:inline-block;vertical-align:middle}.you-scroll .you-scroll-inner[data-v-5dfaf684]{width:100%;height:100%;overflow:hidden;position:relative}.you-scroll-content[data-v-5dfaf684]{overflow:hidden}@-webkit-keyframes scaleIcon-data-v-5dfaf684{0%{-webkit-transform:scaleY(1);transform:scaleY(1)}40%{-webkit-transform:scaleY(.8);transform:scaleY(.8)}80%{-webkit-transform:scaleY(.9);transform:scaleY(.9)}to{-webkit-transform:scaleY(1);transform:scaleY(1)}}@-moz-keyframes scaleIcon-data-v-5dfaf684{0%{transform:scaleY(1)}40%{transform:scaleY(.8)}80%{transform:scaleY(.9)}to{transform:scaleY(1)}}@-ms-keyframes scaleIcon-data-v-5dfaf684{0%{transform:scaleY(1)}40%{transform:scaleY(.8)}80%{transform:scaleY(.9)}to{transform:scaleY(1)}}@keyframes scaleIcon-data-v-5dfaf684{0%{-webkit-transform:scaleY(1);transform:scaleY(1)}40%{-webkit-transform:scaleY(.8);transform:scaleY(.8)}80%{-webkit-transform:scaleY(.9);transform:scaleY(.9)}to{-webkit-transform:scaleY(1);transform:scaleY(1)}}",""])},"8d52":function(t,n,e){var o=e("1658");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=e("4f06").default;i("69c82eee",o,!0,{sourceMap:!1,shadowMode:!1})},ba6a:function(t,n,e){"use strict";(function(t){var o=e("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=p;var i=o(e("f499")),a=o(e("cebc")),l=o(e("795b")),c=[],s=!1,r="https://tsn.baidu.com/text2audio";function u(){return new l.default(function(n,e){t.log("准备访问接口获取语音token"),uni.request({url:"https://openapi.baidu.com/oauth/2.0/token",method:"POST",data:"grant_type=client_credentials&client_id=jtwoB9xzRnv3qltcfqL0pk1t&client_secret=A16UKHBKVeAh68kuGGSPqnemCVyPDmgb",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){t.log("访问成功"),n(e)},fail:function(n){t.log("访问失败"),e(n)}})})}function p(t){var n=!1,e=!1;if("string"!==typeof t&&(t&&!0===t.lineUp&&(n=!0),t&&!0===t.returnAudio&&(e=!0)),e)return new l.default(function(n,o){d(t,e).then(function(t){n(t)}).catch(function(t){o(t)})});!s||n?(s=!0,d(t)):c.push(t)}function d(n,e){if(t.log("准备获取语音tok"),e)return new l.default(function(o,i){u().then(function(a){t.log("获取语音tok接口成功"),a.data&&a.data.access_token?(t.log("token: "+a.data.access_token),o(f(n,a.data.access_token,e))):(t.log("获取语音tok接口为空"),i("获取语音tok接口为空"))}).catch(function(n){t.log("获取语音tok接口失败"),i(n||"获取语音tok接口失败")})});u().then(function(e){t.log("获取语音tok接口成功"),e.data&&e.data.access_token?(t.log("token: "+e.data.access_token),f(n,e.data.access_token)):t.log("获取语音tok接口为空")}).catch(function(n){t.log("获取语音tok接口失败")})}function f(t,n,e){"string"==typeof t&&(t={voiceSet:{tex:t}});var o=(0,a.default)({tok:n,cuid:n,ctp:1,lan:"zh"},t.voiceSet);if(e)return h(o,t.audioSet,t.audioCallback,t.lineUp,e);h(o,t.audioSet,t.audioCallback,t.lineUp,e)}function S(t,n){t&&(n.volume=t.volume||1,n.startTime=t.startTime||0,n.loop=t.loop||!1,n.obeyMuteSwitch=!t.obeyMuteSwitch||"boolean"!=typeof t.obeyMuteSwitch||t.obeyMuteSwitch)}function h(n,e,o,a,l){var u=uni.createInnerAudioContext();S(e,u);var p=[];for(var f in n)p.push(f+"="+encodeURIComponent(encodeURIComponent(n[f])));if(u.src="".concat(r,"?").concat(p.join("&")),l)return u.onEnded(function(){t.log("音频播放结束"),t.log("销毁音频实例"),u.destroy(),u=null}),u.onError(function(n){o&&o.onError&&"function"==typeof o.onError&&o.onError(n),t.log("音频播放错误: "+(0,i.default)(n)),t.log("销毁音频实例"),u.destroy(),u=null}),u;u.onPlay(function(){t.log("音频播放开始"),o&&o.onPlay&&"function"==typeof o.onPlay&&o.onPlay()}),u.onPause(function(){o&&o.onPause&&"function"==typeof o.onPause&&o.onPause()}),u.onWaiting(function(){o&&o.onWaiting&&"function"==typeof o.onWaiting&&o.onWaiting()}),u.onStop(function(){o&&o.onStop&&"function"==typeof o.onStop&&o.onStop()}),u.onTimeUpdate(function(){o&&o.onTimeUpdate&&"function"==typeof o.onTimeUpdate&&o.onTimeUpdate()}),u.onSeeking(function(){o&&o.onSeeking&&"function"==typeof o.onSeeking&&o.onSeeking()}),u.onSeeked(function(){o&&o.onSeeked&&"function"==typeof o.onSeeked&&o.onSeeked()}),u.onEnded(function(){t.log("音频播放结束"),t.log("销毁音频实例"),u.destroy(),u=null,o&&o.onEnded&&"function"==typeof o.onEnded&&o.onEnded(),!1!==a&&(c.length>0?(t.log("队列中"),d(c[0]),c.splice(0,1)):(t.log("队列为零"),s=!1))}),u.onError(function(n){o&&o.onError&&"function"==typeof o.onError&&o.onError(n),t.log("音频播放错误: "+(0,i.default)(n)),t.log("销毁音频实例"),u.destroy(),u=null}),u.play()}}).call(this,e("5a52")["default"])},d5de:function(t,n,e){"use strict";e.r(n);var o=e("f656"),i=e("694c");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("2ccf");var l=e("2877"),c=Object(l["a"])(i["default"],o["a"],o["b"],!1,null,"5dfaf684",null);n["default"]=c.exports},e88b:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"content"},[e("hx-navbar",{attrs:{title:"Dakuos",back:!1,fixed:!0,color:"#ffffff",statusBarFontColor:"#ffffff",rightIcon:"scan",backgroundColor:[44,45,48]}}),e("v-uni-view",{staticStyle:{padding:"20rpx",display:"flex","align-items":"center"}},[e("v-uni-view",{staticClass:"portrait"},[e("v-uni-image",{attrs:{src:"../../static/tab_icon_8.png",alt:""}})],1),e("v-uni-view",{staticStyle:{color:"#Fff","font-size":"30rpx","margin-left":"50rpx"}},[e("v-uni-view",{staticStyle:{"text-align":"left",display:"flex","align-items":"center","font-size":"30rpx"}},[t._v("Hi,周*伦"),e("v-uni-image",{staticStyle:{width:"100rpx",height:"70rpx","margin-left":"20rpx"},attrs:{src:"../../static/LV1.png"}})],1),e("v-uni-view",{staticClass:"balance"},[e("v-uni-view",[t._v("儲值點數")]),e("v-uni-view",[t._v("分紅點數")]),e("v-uni-view",[t._v("Bonus")])],1),e("v-uni-view",{staticClass:"balance"},[e("v-uni-view",{staticStyle:{color:"#F98B31","font-weight":"bold"}},[t._v("222")]),e("v-uni-view",{staticStyle:{color:"#3F7CFF","font-weight":"bold"}},[t._v("4895")]),e("v-uni-view",{staticStyle:{color:"#6FFFE9","font-weight":"bold"}},[t._v("5")])],1)],1)],1),e("v-uni-view",{staticStyle:{padding:"20rpx"}},[e("you-scroll",{ref:"scroll",on:{onPullDown:function(n){arguments[0]=n=t.$handleEvent(n),t.onPullDown.apply(void 0,arguments)},"":function(n){arguments[0]=n=t.$handleEvent(n)},onLoadMore:function(n){arguments[0]=n=t.$handleEvent(n),t.onLoadMore.apply(void 0,arguments)}}},t._l(10,function(n){return e("v-uni-view",{staticStyle:{border:"1px solid #6FFFE9","margin-top":"30rpx","border-radius":"10rpx"}},[e("v-uni-view",{staticStyle:{"text-align":"left",color:"#fff","font-weight":"bold","font-size":"30rpx",padding:"15rpx 20rpx"}},[t._v("美乐福饭店")]),e("v-uni-view",{staticStyle:{height:"350rpx",width:"100%"}},[e("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574609715828&di=202c4ae485ab9d2e1b86d5264cae78be&imgtype=0&src=http%3A%2F%2Fpic18.nipic.com%2F20111228%2F8022226_153114315000_2.jpg"}})],1)],1)}),1)],1)],1)},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},f656:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("v-uni-view",{ref:"youScroll",staticClass:"you-scroll"},[o("v-uni-view",{staticClass:"pullDown",style:{transform:"translateY("+t.translateY+"px)",transition:t.isDown?"0s":"0.3s"}},[t._t("pullDown",[o("img",{class:{"down-icon":!0,animate:3==t.pullDownStatus},attrs:{src:e("40b9")}}),o("span",[1==t.pullDownStatus?[t._v(t._s(t.downPullToRefresh))]:t._e(),2==t.pullDownStatus?[t._v(t._s(t.downReleaseToRefresh))]:t._e(),3==t.pullDownStatus?[t._v(t._s(t.downRefreshing))]:t._e()],2)])],2),o("v-uni-scroll-view",{ref:"youScrollInner",staticClass:"you-scroll-inner",style:{transform:"translateY("+t.translateY+"px)",transition:t.isDown?"0s":"transform 0.3s"},attrs:{"scroll-top":t.scrollToTop,"scroll-with-animation":"","scroll-y":""},on:{touchstart:function(n){arguments[0]=n=t.$handleEvent(n),t.startFn.apply(void 0,arguments)},touchmove:function(n){arguments[0]=n=t.$handleEvent(n),t.moveFn.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.endFn.apply(void 0,arguments)},touchcancel:function(n){arguments[0]=n=t.$handleEvent(n),t.endFn.apply(void 0,arguments)},scroll:function(n){arguments[0]=n=t.$handleEvent(n),t.scroll.apply(void 0,arguments)}}},[o("v-uni-view",{staticClass:"you-scroll-content"},[t._t("default")],2)],1)],1)},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},f751:function(t,n,e){"use strict";(function(t){var o=e("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=o(e("d5de")),a=(o(e("ba6a")),null),l={data:function(){return{num:2e5}},components:{youScroll:i.default},onShow:function(){var t=plus.nativeObj.View.getViewById("icon");t&&setTimeout(function(){t.show()},100)},onLoad:function(){this.openVoice(),a=new plus.nativeObj.Bitmap("bmp1"),a.loadBase64Data("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUNDRTM0QjIwQjg0MTFFQTg5OThFOTJDNTA3RUM5QUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUNDRTM0QjEwQjg0MTFFQTg5OThFOTJDNTA3RUM5QUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCOEQ2RTQwRjkzNjExRTk4NkIzRDZGMkYyNDE2OTAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdCOEQ2RTQxRjkzNjExRTk4NkIzRDZGMkYyNDE2OTAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k5Bg1gAACNlJREFUeNrsXWlsFVUU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"),this.createtab()},onLaunch:function(){},methods:{openVoice:function(){t.log("准备播报语音")},createtab:function(){var t=Math.ceil((plus.screen.resolutionWidth-60)/2),n=new plus.nativeObj.View("icon",{bottom:"15px",left:t+"px",width:"60px",height:"60px"});n.drawBitmap(a,{tag:"font",id:"icon",src:"/static/app-tabber/qr_code.png",position:{top:"0px",left:"5px",width:"50px",height:"100%"}}),n.addEventListener("click",function(t){uni.switchTab({url:"/pages/QRcode/QRcode"})},!1),n.show()}}};n.default=l}).call(this,e("5a52")["default"])}}]);