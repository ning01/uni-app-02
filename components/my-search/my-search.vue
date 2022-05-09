<template>
	<view class="view-search-container" :style="{'background-color':bgcolor}"
	@click="clickSearch">
		<view class="search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="18"></uni-icons>
			<text class="placeholder">搜索</text>
			
		</view>
	
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			//背景颜色
			
			bgcolor: {
			  type:String,
			  default:'#379928',
			},
			//圆角边框
			radius:{
			  type:Number,
			  default:20,
			}
			
		},
		data() {
			return {
			
			}
		},
		methods:{
			clickSearch(){
				// console.log('wwwwww')
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.view-search-container{
		height: 50px;
		display: flex;
		align-items: center;
		padding:0 8px;
		// background-color: #379928;
		
		
		
		.search-box{
			// border-radius:18px;
			background-color: #fff;
			height: 36px;
			width: 100%;
			
			display: flex;
			justify-content: center;
			align-items: center;
			
			.placeholder{
				font-size: 15px;
				margin-left:5px;
				
			}
		}
	}
</style>