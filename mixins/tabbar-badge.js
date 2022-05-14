import { mapGetters } from 'vuex'
export default{
	
	computed: {
		...mapGetters('m_cart', ['total'])
	
	},
	watch:{
		total(){
			this.getBadge()
		}
	},
	onShow() {
		this.getBadge()
	},
	methods: {
		getBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}