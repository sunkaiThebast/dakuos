(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/Changepaypwd"],{"11b8":function(e,t,n){"use strict";(function(e,o){var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return n.e("components/watch-login/watch-input").then(n.bind(null,"ed99"))},i=function(){return n.e("components/watch-login/watch-button").then(n.bind(null,"a3e8"))},u=function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"cf97"))},r={data:function(){return{payment_code:"",phone:"",verCode:"",isRotate:!1,Toastshow:!1}},components:{wInput:s,wButton:i,uniIcons:u},onLoad:function(e){this.getmerber()},mounted:function(){a=this},methods:{outToast:function(){this.Toastshow=!1,e.navigateBack(1)},getmerber:function(){var t=this;e.request({url:this.$store.state.api+"merber",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{user_id:this.$store.state.userdata.merber_id,token:this.$store.state.userdata.token,user_type:this.$store.state.userdata.user_type},success:function(e){console.log(o(e," at pages\\login\\Changepaypwd.vue:91")),1==e.data.success&&(t.phone=e.data.data.phone,console.log(o(t.phone," at pages\\login\\Changepaypwd.vue:94")))}})},getVerCode:function(){var t=this;console.log(o(this.phone," at pages\\login\\Changepaypwd.vue:100")),e.request({url:this.$store.state.api+"getCode",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{moblie:this.phone},success:function(n){console.log(o(n," at pages\\login\\Changepaypwd.vue:111")),t.$refs.runCode.$emit("runCode"),e.showToast({icon:"none",position:"bottom",title:"驗證碼已發送"})}})},submit:function(){var t=this;6!=this.payment_code.length?e.showToast({icon:"none",position:"center",title:"支付密碼必須是6位數字",duration:2e3}):6!=this.verCode.length?e.showToast({icon:"none",position:"center",title:"驗證碼不正確",duration:2e3}):(a.isRotate=!0,e.request({url:this.$store.state.api+"up_payment",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{user_id:this.$store.state.userdata.merber_id,token:this.$store.state.userdata.token,user_type:this.$store.state.userdata.user_type,payment_code:this.payment_code,phone:this.phone,phone_code:this.verCode},success:function(n){a.isRotate=!1,console.log(o(n," at pages\\login\\Changepaypwd.vue:156")),1==n.data.success?t.Toastshow=!0:2==n.data.success?(e.showToast({icon:"none",position:"center",title:"驗證碼已過期",duration:2e3}),t.verCode):3==n.data.success?(e.showToast({icon:"none",position:"center",title:"驗證碼錯誤",duration:2e3}),t.verCode):e.showToast({icon:"none",position:"center",title:"网络错误,请检查网络",duration:2e3})}}))}}};t.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"12dd":function(e,t,n){},"1fad":function(e,t,n){"use strict";n.r(t);var o=n("86ec"),a=n("6a1f");for(var s in a)"default"!==s&&function(e){n.d(t,e,function(){return a[e]})}(s);n("c455");var i,u=n("f0c5"),r=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=r.exports},"6a1f":function(e,t,n){"use strict";n.r(t);var o=n("11b8"),a=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);t["default"]=a.a},"86ec":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return s}),n.d(t,"a",function(){return o})},b23a:function(e,t,n){"use strict";(function(e){n("9e2f"),n("921b");o(n("66fd"));var t=o(n("1fad"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c455:function(e,t,n){"use strict";var o=n("12dd"),a=n.n(o);a.a}},[["b23a","common/runtime","common/vendor"]]]);