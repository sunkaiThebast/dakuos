(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/addidentity"],{"13df":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"148e":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{topimg:"",bottonimg:"",imgpath:[],upimgpath:[]}},methods:{uploadimgfront:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){console.log(n(t," at pages\\personal\\addidentity.vue:50")),e.topimg=t.tempFilePaths[0],e.imgpath[0]=t.tempFiles[0],console.log(n(e.imgpath," at pages\\personal\\addidentity.vue:53"))}})},uploadimgreverse:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){console.log(n(t," at pages\\personal\\addidentity.vue:63")),e.bottonimg=t.tempFilePaths[0],e.imgpath[1]=t.tempFiles[0],console.log(n(e.imgpath," at pages\\personal\\addidentity.vue:66"))}})},sub:function(){t.showLoading({title:"正在上傳",mask:"true"});var e=this,n=new Object;n.name="identity_front",n.uri=this.imgpath[0].path,this.upimgpath.push(n);var i=new Object;i.name="identity_reverse",i.uri=this.imgpath[1].path,this.upimgpath.push(i),t.uploadFile({url:e.$store.state.api+"identity",header:{"content-type":"application/x-www-form-urlencoded"},fileType:"image",files:e.upimgpath,formData:{user_id:"3",token:"8b3c89f8c2d0cc9e3f8ed2f41a7638b3d7313d0d",user_type:"1"},success:function(e){e.data=JSON.parse(e.data),t.hideLoading(),1==e.data.success?t.showToast({icon:"none",position:"bottom",title:"上傳成功"}):t.showToast({icon:"none",position:"bottom",title:"網絡錯誤"})}})}}};e.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},"25a5":function(t,e,n){"use strict";(function(t){n("adc1"),n("921b");i(n("66fd"));var e=i(n("2e16"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"2e16":function(t,e,n){"use strict";n.r(e);var i=n("13df"),a=n("4eb6");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);var s,u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=c.exports},"4eb6":function(t,e,n){"use strict";n.r(e);var i=n("148e"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a}},[["25a5","common/runtime","common/vendor"]]]);