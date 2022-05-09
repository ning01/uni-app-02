<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" cancelButton="none" :radius="100" clearButton="always"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<!-- v-if 按需展示搜索列表 -->
		<view class="sugg-search" v-if="searchResults.length !== 0">
			<view class="sugg-search-item" v-for="(item,idx) in searchResults" :key="idx" @click="gotoDetail(item)">
				<view class="sugg-text">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>

		</view>
		<!-- 搜索历史记录 -->
		<view class="history-box" v-else>
			<view class="history-title">
				搜索历史
				<uni-icons type="trash" size="19" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">

				<uni-tag :text="item " v-for="(item,idx) in histories" :key="idx" @click="gotoGoodsList(item)">

				</uni-tag>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的timerId
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜搜关键词列表
				searchResults: [],
				//搜索历史列表
				historyList: [],
			}

		},
		onLoad() {
			//页面获取时加载本地存储的历史搜索记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},

		methods: {
			input(e) {
				// console.log(e)
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// console.log(e)
					this.kw = e
					this.getSearchList()

				}, 500)
			},


			// 定义获取搜索关键词列表
			async getSearchList() {
				if (this.kw === '') {
					this.searchResults = []
					return

				}

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				// console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()

				this.searchResults = res.message
				this.saveSearchHistory()
			},
			gotoDetail(item) {
				// console.log(item.goods_id)
				uni.navigateTo({
					url: '/sbupkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 保存搜索历史记录关键词
			saveSearchHistory() {
				//用这个方法搜索的历史关键词会有重复
				// this.historyList.push(this.kw)

				// 解决搜索历史关键词重复问题
				const set = new Set(this.historyList)

				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				// 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clearHistory() {
				uni.clearStorageSync('kw', '[]')
				this.historyList = []
			},
			// 点击搜索关键字跳转到商品列表页
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/sbupkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed: {
				// 对原数组进行翻转操作
				histories() {

					return [...this.historyList].reverse()
				},
			},

	}
</script>

<style lang="scss">
	.sugg-search {
		padding: 0 5px;
	
	.sugg-search-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15px 0;
			border-bottom: 1px solid #efefef;

			.sugg-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 12px;
			}

		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			height: 50px;
			align-items: center;
			border-bottom: 1px solid #efefef;
			margin-bottom: 10px;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				font-size: 14px;
				margin-left: 5px;
				color: #000;

			}
		}
	}
</style>
