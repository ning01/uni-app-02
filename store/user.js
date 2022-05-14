export default{
	
	namespaced:true,
	
	
	state:()=>({
		
		address:JSON.parse(uni.getStorageSync('address')||'{}')
	}),
	
	mutations:{
		//更新收货地址
		updateAddress(state, address){
			state.address = address
			
			// 通过this.$commit()方法,调用user模块下的saveAddressToStorage把address存储到本地 
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储address到本地
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
		
	},
	
	getters:{
		addrStr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName+state.address.countyName+state.address.detailInfo
		}
		
		
	}
}