(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QRcode/QRcode"],{"3b92":function(e,t,a){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{title:"我的條碼",user_type:this.$store.state.userdata.user_type,qrcode:""}},onLoad:function(){console.log(e(this.$store.state.qr_code," at pages\\QRcode\\QRcode.vue:38")),1==this.user_type?this.title="掃一掃":(this.title="我的條碼",this.getmerber())},components:{},methods:{getqrcode:function(){console.log(e(111," at pages\\QRcode\\QRcode.vue:49")),a.scanCode({success:function(e){var t=e.result.substr(23);a.navigateTo({url:"../Pay/Pay?"+t})}})},getmerber:function(){var t=this;a.request({url:this.$store.state.api+"merber",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{user_id:this.$store.state.userdata.merber_id,token:this.$store.state.userdata.token,user_type:this.$store.state.userdata.user_type},success:function(a){console.log(e(a," at pages\\QRcode\\QRcode.vue:72")),t.loading=!1,1==a.data.success&&(t.qrcode=a.data.data.qr_code)}})}}};t.default=n}).call(this,a("0de9")["default"],a("6e42")["default"])},"3dba":function(e,t,a){},5288:function(e,t,a){"use strict";var n,o=function(){var e=this,t=e.$createElement;e._self._c},r=[];a.d(t,"b",function(){return o}),a.d(t,"c",function(){return r}),a.d(t,"a",function(){return n})},"6c65":function(e,t,a){"use strict";var n=a("3dba"),o=a.n(n);o.a},e2a8:function(e,t,a){"use strict";a.r(t);var n=a("5288"),o=a("ff40");for(var r in o)"default"!==r&&function(e){a.d(t,e,function(){return o[e]})}(r);a("6c65");var s,u=a("f0c5"),c=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},e5f0:function(e,t,a){"use strict";(function(e){a("adc1"),a("921b");n(a("66fd"));var t=n(a("e2a8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},ff40:function(e,t,a){"use strict";a.r(t);var n=a("3b92"),o=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=o.a}},[["e5f0","common/runtime","common/vendor"]]]);