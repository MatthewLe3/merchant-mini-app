<!-- 首页 -->
<template lang='pug'>
	.product
		.product-content
			.search 
				uni-search-bar(
					@confirm="search" 
					v-model="searchValue" 
					@input="input"
					:focus='true'
					cancelButton='none'
					bgColor="#EEEEEE"
				)
			.products
				.cards(
					v-for='(item,index) in productsData'
					:key="index"
				)
					uni-card(
							class='my-card'
						)
							.card-content
								image(:src="item.imgSrc")
								.info {{item.info}}
							.my-btn
								.btn {{'达人合作'}}
		my-tabbar
</template>

<script>
	import uniCard from '../../uni_modules/uni-card/components/uni-card/uni-card.vue'
	import MyTabbar from '../../components/MyTabbar/index.vue'
	import UniSearchBar from '../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components:{
			MyTabbar,
			uniCard,
			UniSearchBar
		},
		data() {
			return {
				searchValue:'',
				productsData:[
					{
						info:'商品1',
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF'
					},
					{
						info:'商品2',
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF'
					},
					{
						info:'商品3',
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF'
					},
					{
						info:'商品4',
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF'
					},
					{
						info:'商品5',
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF'
					}
				]
			}
		},
		methods:{
			search(){
				console.log('tis',this.searchValue)
			},
			input(){
				console.log('in',this.searchValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product{
		height: 100%;
		display: flex;
		flex-direction: column;
		.product-content{
			flex: 1;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			.search{
				position: relative;
				input{
					border: 1px solid #777777;
					padding-left: 40rpx;
					border-radius: 10rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 24rpx;
				}
				image{
					height: 30rpx;
					width: 30rpx;
					position: absolute;
					top: 10rpx;
					left: 10rpx;
					transform: translate(0,0);
				}
			}
			.cards{
				.my-card{
					.card-content{
						display: flex;
						image{
							height: 200rpx;
							width: 200rpx;
						}
						.info{
							padding-left: 20rpx;
						}
					}
					.my-btn{
						text-align: right;
						.btn{
							display: inline-block;
							padding: 0 10rpx;
							border: 1px solid #777777;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
