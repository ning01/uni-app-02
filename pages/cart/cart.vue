<template>
	<view class="address-box" v-if="cart.length!== 0">
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 左侧的文本 -->
			<text class="cart-text">购物车</text>
		</view>
		<!-- 渲染商品列表区域 -->
		<!-- 滑动删除 -->
		<uni-swipe-action>
			<block v-for="(goods,idx) in cart" :key="idx"  >
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)" >
					<my-goods :goods="goods" showRadio  showNum @radio-change="radioChangeHandler" @numChange="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<my-settle></my-settle>
	</view>
		<!-- 清空是的购物车时的区域-->
	<view class="empty-cart" v-else>
		
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="empty-text" >空空如也~</text>
		
	</view>
</template>
					
			
		
		
		

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
			}
		},
		methods: {

			...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById']),

			radioChangeHandler(e) {
				// console.log(e)
				this.updateGoodsState(e)

			},
			numChangeHandler(e){
				console.log(e)
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}

	}
</script>

<style lang="scss">
	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		padding-left: 5px;

		.cart-text {
			font-size: 14px;
			margin-left: 10px;

		}
	}
.address-box{
	padding-bottom:50px;
}
.empty-shopping-car{
	
}

.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 150px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.empty-text{
		font-size: 12px;
		color:gray;
		margin-top: 15px;
	}
}

</style>
