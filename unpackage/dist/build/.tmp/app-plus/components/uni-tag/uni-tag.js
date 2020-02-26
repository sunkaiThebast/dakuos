(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-tag/uni-tag"],{"3bd8":function(t,e,n){"use strict";var a,u=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})},"76a9":function(t,e,n){"use strict";n.r(e);var a=n("3bd8"),u=n("e771");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);n("f4e6");var r,o=n("f0c5"),f=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"8e0f3d82",null,!1,a["a"],r);e["default"]=f.exports},b198:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniTag",props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[String,Boolean],defalut:!1},inverted:{type:[String,Boolean],defalut:!1},circle:{type:[String,Boolean],defalut:!1},mark:{type:[String,Boolean],defalut:!1}},methods:{onClick:function(){!0!==this.disabled&&"true"!==this.disabled&&this.$emit("click")}}};e.default=a},bd4a:function(t,e,n){},e771:function(t,e,n){"use strict";n.r(e);var a=n("b198"),u=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=u.a},f4e6:function(t,e,n){"use strict";var a=n("bd4a"),u=n.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-tag/uni-tag-create-component',
    {
        'components/uni-tag/uni-tag-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("76a9"))
        })
    },
    [['components/uni-tag/uni-tag-create-component']]
]);
