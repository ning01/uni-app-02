<template>
	<view v-if="goods_info.goods_name" class="goods_detail_container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,idx) in goods_info.pics" :key="idx">
				<image :src="item.pics_big " mode="" @click="preview(idx)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品的信息区域 -->
		<view class="goods-info-box">
			<!-- 商品的价格 -->
			<view class="goods-price">
				&yen;{{goods_info.goods_price}}
			</view>
			<!-- 商品信息主体内容 -->
			<view class="goods-info-body">

				<!-- 商品的名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="goods-icon">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>

				</view>
			</view>
			<!--运费 -->
			<view class="yf">运费: 免费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
			
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				// doods:[],
				//商品详情信息对象
				goods_info: {},
				   options: [{
							// icon: 'headphones',
							icon: 'chat',
							text: '客服'
						}, {
							icon: 'shop',
							text: '店铺',
							info: 2,
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]

			}
		},

		onLoad(options) {

			console.log(options)
			const goods_id = options.goods_id
			console.log(goods_id)

			// 预调用获取商品详情方法
			this.getGoodsDetail(goods_id)

		},
		methods: {
			//声明一个获取商品详情对象的方法
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail?', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 处理图片底部空白间隙
			   res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g ,"<img style= 'display:block;'").replace(/webp/g,'jpg')
				
				this.goods_info = res.message

			},
			preview(idx) {

				uni.previewImage({
					current: idx,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},


			// 点击跳转购车
			onClick(e){
				// console.log(e)
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
						
					})
					
					
				}
			}

		},
	}
</script>

<style lang="scss">
swiper {
	height: 750rpx;

	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 10px;
	padding-right: 0;
	.goods-price{
		color:#c00000;
		font-size: 22px;
		
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 12px;
			margn-right:10px;
		}
		.goods-icon{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width:120px;
		    color: gray;
			font-size: 13px;
		}
	}
	.yf{
		color:gray;
		font-size: 12px;
		margin: 10px 0;
	}
}
.goods-nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	
}
.goods_detail_container{
	padding-bottom: 50px;
}
</style>
