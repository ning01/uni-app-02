
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'

//请求拦截器
$http.beforeRequest = function(potions){
	uni.showLoading({
		
		title:'数据加载中...'
		
	})
}

//响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

//封装单框消息
uni.$showMsg = function(title="消息加载失败!",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
	
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif