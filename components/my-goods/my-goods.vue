<template>
	<!-- 封装goods组件 -->
	<view class="goods-item">
		
		<view class="goods-item-left">
			<!-- 商品左侧的图片区域 -->
			<image  :src="goods.goods_small_logo||defaultPic "   class="goods-pic"></image>
		</view>	
		<!-- 商品右侧的信息区域 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			
			<!-- 商品的信息 -->
			<view class="goods-info-box">
				<!-- 商品的价格 -->
				<!-- 调用过滤器 -->
				<view class="goods-price">&yen;{{goods.goods_price | tofixed}}</view>
			</view>
				
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				//默认图片
			defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				
			}
		},
		props:{
			
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			//定义过滤器将数值转为带两位小数的数字
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding:10px 5px;
	border-bottom: 1px solid #efefef;
	.goods-item-left{
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			margin-right:8px;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{}
			font-size: 13px;
		.goods-info-box{
			.goods-price{
				font-size: 16px;
				color:#c00000;
			}
		}
	}
}
</style>