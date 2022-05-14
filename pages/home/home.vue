<template>
	<view>
		<!-- search页面 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
			
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000 " :circular="true">
			<swiper-item v-for="(item,idx) in swiperList" :key='id'>
				<navigator class="swiper-item" :url="`/sbupkg/goods_detail/goods_detail?goods_id = ${item.goods_id}`">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		

		<!-- nav分类导航区域 -->
		<view class="nav-list">
			<!-- 每个分类导航的item项 -->
			<view src="nav-item" v-for="(item,idx) in navList" :key="idx" 
			@click="navClickHandler(item)">
		
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
				<!-- 每个楼层的item 项 -->
				<view class="floor-item" v-for="(item,idx) in floorList" :key="idx">
					<!-- 每个楼层的标题 -->
					<image :src="item.floor_title.image_src" class="floor-title"></image>
					<!-- 楼层的图片区域 -->
				<view class="floor-box">
			
					<!-- 左侧楼层的图片 -->
					<navigator class="floor-left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width +'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧楼层的图片 -->
					<view class="floor-right-box">
						<navigator class="floor-item-box" v-for="(item2, idx2) in item.product_list" :key="idx2"
						v-if="idx2!==0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" class="floor-item-img"
							:style="{width:item2.image_width +'rpx'}"></image>
						</navigator>
					</view>
				</view>
			 </view>
						
		</view>
							
	</view>
	
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				//轮播图的数据列表,默认是一个空数组
				swiperList: [],
				// 分类导航数据列表
				navList: [],
				//楼层数据列表
				floorList:[],

			}
		},
		onLoad() {
			//获取轮播图数据
			this.getSwiperList(),
				//获取分类导航数据
				this.getNavList(),
				//获取楼层数据
				this.getFloorList()
		},
		methods: {
			//定义请求轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res)

				//请求失败
			 if (res.meta.status !== 200) return uni.$showMsg()

				//请求成功
				this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},
			//定义分类列表数据
			async getNavList() {

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				// console.log(res)
				if(res.meta.status!==200) return uni.$showMsg()
				
				this.navList = res.message
				
			},
			navClickHandler(item){
				// console.log(item)
				if(item.name==='分类') {
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//定义楼层获取数据方法
			async getFloorList(){
			const{data:res} = await uni.$http.get('/api/public/v1/home/floordata')
			    if(res.meta.status!==200) return uni.$showMsg()
				//通过双层forEach循环,处理url地址
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/sbupkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.message
			},
			gotoSearch(){
				console.log('333')
				uni.navigateTo({
					url:'/sbupkg/search/search'
				})
			}
			
			
		}
	}

</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item image {
			width: 100%;
			
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin:30rpx 0;
		
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-box{
		display: flex;
		padding-left: 10rpx;
		.floor-right-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	
	}
	.search-box{
		position:sticky;
		top:0px;
		z-index: 999;
		
		
	}
</style>
