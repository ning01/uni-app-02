<template>
	<view>
		<view class="goods-list">
			
			<view v-for="(goods,idx) in goodsList" :key="idx" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>

			</view>
		</view>
	</view>
</template>





<script>
	export default {
		data() {
			return {
				// 定义请求参数对象
				queryObj: {

					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10

				},
				goodsList: [],
				total: 0,
				// 节流阀,是否请求数据
				isloading: false

			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj)
			this.getGoodsList()
		},
		methods: {

				// 获取商品列表数据
				async getGoodsList(cb) {
					// 开启节流阀
					this.isloading = true
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
					// console.log(res)
					// 关闭节流阀
					this.isloading = false
					cb && cb()

					if (res.meta.status !== 200) return uni.$showMsg()

					this.goodsList = [...this.goodsList, ...res.message.goods]
					this.total = res.message.total
				},
				//点击跳转到商品详情页
				gotoDetail(goods){
					uni.navigateTo({
						url:'/sbupkg/goods_detail/goods_detail?goods_id='+goods.goods_id
					})
				}
			},
			// 触底事件
			onReachBottom() {
				// 判断数据是否加载完毕
				if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完成!')

				// 判断节流阀
				if (this.isloading) return
				//页面自增加1
				this.queryObj.pagenum += 1
				this.getGoodsList()
			},
			// 下拉刷新功能实现
			onPullDownRefresh() {
				this.queryObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.goodsList = []
				this.getGoodsList(() => uni.stopPullDownRefresh())
			},
		}

		

</script>

<style lang="scss">

</style>
