<template>
	<view>
	    <!-- 选择收货地址盒子-->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btn-choose-address" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人: {{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话: {{address.telNumber}}</view>
					<uni-icons type="arrowright" sizi="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址: </view>
				<view class="row2-right">{{addrStr}}</view>
				
			</view>
				
		</view>
		<image src="/static/cart_border@2x.png" class="address-border"></image>
		
	</view>
</template>

<script>
	import { mapState,mapMutations ,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
			 const [err,succ] = await uni.chooseAddress().catch(err=>err)
			    if(err=== null&& succ.errMsg==='chooseAddress:ok'){
					// console.log(succ)
					// this.address = succ
					this.updateAddress(succ)
					
				}
					console.log(err)
				
			},
			    
			
		},
		computed:{
			...mapState('m_user' ,['address']),
			...mapGetters('m_user',['addrStr'])
		},
		
	}
</script>

<style lang="scss">
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
	.btn-choose-address{
		
	}
}
.address-info-box{
	height: 90px;
	font-size: 12px;
	padding: 0 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.row1{
		display: flex;
		justify-content: space-between;
		align-content: center;
		
	
		.row1-right{
			display: flex;
			justify-content: space-between;
		}
	}
	.row2{
		display: flex;
		margin-top: 10px;
		align-content: center;
		.row2-left{
		 white-space: nowrap;
		 padding-right: 5px;	
		}
		
	}
}
</style>