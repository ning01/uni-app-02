<template>
	<view>
		<my-search @click="gotoSearch" class="search-top"></my-search>
		<view class="scroll-view-container">
			
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,idx) in cateList" :key="idx">
					<view :class="['left-scroll-view-item', idx === active ? 'active':''  ]" @click="onClick(idx)">
						{{item.cat_name}}
					</view>

				</block>
			</scroll-view>

			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll-right" scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2 ,idx2) in cateLevel2" :key="idx2">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">
						/ {{item2.cat_name}} /
					</view>
					<!-- 当前二级分类下的三级分类 -->
					<view class="cate-lv3">
						<view class="cate-lv3-item" v-for="(item3,idx3) in item2.children" :key="idx3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon" class="cate-lv3-icon"></image>
							<text class="cate-lv3-text">{{item3.cat_name}}</text>

						</view>

					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				wh: 0,
				//分类信息数据列表
				cateList: [],

				active: 0,
				cateLevel2: [],
				//滚动条距离顶部的距离
				scrollTop: 0,

			}
		},


		onLoad() {
			// 获取系统信息屏幕可用宽度
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight-50
			// 调取分类信息数据方法
			this.getCateList()


		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()

				this.cateList = res.message
				//给二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			onClick(idx) {
				this.active = idx
				// 重新给二级分类赋值
				this.cateLevel2 = this.cateList[idx].children
				// 让scrollTop的值在0和1之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0

			},
			// 跳转到商品列表页面,item是参数
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/sbupkg/goods_list/goods_list?cid =' + item.cat_pid
				})
			},
			gotoSearch(){
				console.log('ok')
				uni.navigateTo({
					url:'/sbupkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 150px;
		}
	}

	.left-scroll-view-item {
		height: 60px;
		background-color: #f7f7f7f7;
		font-size: 12px;
		text-align: center;
		line-height: 60px;
		position: relative;

		&.active {
			background-color: #fff;

			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #882200;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}

	}

	.right-scroll-right {
		background-color: #fff;

		.cate-lv2-title {
			text-align: center;
			font-size: 14px;
			font-weight: bold;
			padding: 15px 0;
		}

		.cate-lv3 {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 15px;

			.cate-lv3-item {
				display: flex;
				width: 33%;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;

				.cate-lv3-icon {
					width: 60px;
					height: 50px;
					margin-bottom: 3px;
				}

				.cate-lv3-text {
					font-size: 12px;

				}
			}
		}
	}
	
	
</style>
