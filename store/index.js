
//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
		api:'https://www.dakuos.com/1.0/',
		haslogin:false,
		userdata:{},
		merberdata:{}
    },
	  mutations: {
		  //登入改变状态
		  login(state,res){
			  console.log(res)
			  state.haslogin = true;
			  state.userdata = res.data;
			  if(res.data.user_type == '2'){
				   state.userdata.merber_id = res.data.business_id
			  }
			  uni.setStorage({
			  	key:"userdata",
				data:res.data
			  })
			  console.log(state.userdata) 
		  },
		  //登出
		  logout(state){
			  console.log(11)
			  state.haslogin = false;
			  state.userdata = {};
			  uni.removeStorage({
			  	key:"userdata",
			  })

		  },
		  getmerberdata(state,res){
			 state.merberdata = res
			 console.log(res)
		  }
	  }
})
export default store