export default {
	namespaced:true,
	
	state:()=>({
		// car里包含6个数据
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	
	
	mutations:{
		addToCart(state,goods){
			const cartResult= state.cart.find((x)=>x.goods_id===goods.goods_id)
					
			   if(!cartResult){
				   state.cart.push(goods)
			   }else{
				   
				   cartResult.goods_count++
				   
				  
			   }
			   // 读取本地存储的购物车数据
			   this.commit('m_cart/saveToStorage')
			
		},
		//购物车信息持久化本地存储
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		// 更新购物车里的选中状态
		updateGoodsState(state,goods){
			 const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
			   
			   if(findResult){
				   findResult.goods_state = goods.goods_state
				   // 持久化存储到本地
				 this.commit('m_cart/saveToStorage')
			         
			   }
		},
		// 更新购物车里商品的数量
		updateGoodsCount(state,goods){
			  const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
				if(findResult){
					findResult.goods_count= goods.goods_count
					// 持久化存储到本地
					this.commit('m_cart/saveToStorage')
					    				  
			}
		},
		// 删除购物车里的信息
		removeGoodsById(state,goods_id){
			state.cart = state.cart.filter(x=>x.goods_id!==goods_id)
					this.commit('m_cart/saveToStorage')
			 
		},	
		// 更新购物车里的选中状态
		updateAllGoodsState(state,newState){
			return state.cart.forEach(x=>x.goods_state=newState)
			// 持久化存储本地
			this.commit('m_cart/saveToStorage')
			
		}
		
	},
	
	getters:{
		//购物车里所有商品的总数量
		total(state){
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			
		// 用数组的reduce()方法
		 return state.cart.reduce((total,item)=>total+=item.goods_count,0)
			
		},
		//已勾选的购物车里的总数量
		checkedCount(state){
		return state.cart.filter(x=>x.goods_state).reduce((total,item)=> total+=item.goods_count,0)
	},
		//已勾选商品的总价格
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state)
							 .reduce((amount,item)=>amount+= item.goods_count*item.goods_price,0)
							 .toFixed(2)
		}
  }
}