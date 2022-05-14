<template>
	<view class="settle-box">
		<label class="radio" @click="changeAllState">
			<radio  color="#c00000" :checked="isFullChecked"/><text>全选</text>
		</label>
			
			<view class="amount-box">合计:  <text class="amount">&yen;{{	checkedGoodsAmount}}</text> </view>
			<view class="btn-settel">结算({{checkedCount}})</view>
		
	</view>
</template>
				

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			
			isFullChecked(){
				
				return this.total ===this.checkedCount
				
			},
		
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				// console.log(!this.isFullChecked)
				this.updateAllGoodsState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
.settle-box{
	position: fixed;
	bottom:0;
	left:0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 5px;
	box-sizing: border-box;

	.radio{
		display: flex;
		align-items: center;
		
	}
		.amount-box{
			.amount{
				color:#c00000;
				font-weight: bold;
			}
		}
		.btn-settel{
			background-color: #c00000;
			height: 50px;
			line-height: 50px;
			padding:0 10px;
			color:#fff;
			min-width: 100px;
			
			
		}
	
}

</style>