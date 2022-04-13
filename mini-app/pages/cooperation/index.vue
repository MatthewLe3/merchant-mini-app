<!-- 首页 -->
<template lang='pug'>
	.cooperation
		.cooperation-content 
			liuyunoTabs(
				:tabData="tabs" 
				:defaultIndex="defaultIndex" 
				@tabClick='tabClick'
			)
			.cards(
				v-for='(item,index) in cardData'
				:key="index"
			)
				uni-card(
						class='my-card'
						:title="item.num | handleNum" 
						:extra="item.status | handleStatus"
					)
						.card-content
							image(:src="item.imgSrc")
							.info {{item.info}}
		my-tabbar
</template>

<script>
	import MyTabbar from '../../components/MyTabbar/index.vue'
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import uniCard from '../../uni_modules/uni-card/components/uni-card/uni-card.vue'
	export default {
		components:{
			MyTabbar,
			liuyunoTabs,
			uniCard
		},
		data() {
			return {
				tabs:['全部','待发送','合作中','完成'],
				defaultIndex:0,
				cardData:[
					{
						num:2234432,
						status:1,
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF',
						info:'商品信息'
					},
					{
						num:2234432,
						status:1,
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF',
						info:'商品信息'
					},
					{
						num:2234432,
						status:1,
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF',
						info:'商品信息'
					},
					{
						num:2234432,
						status:1,
						imgSrc:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF',
						info:'商品信息'
					}
				]
			}
		},
		filters:{
			handleNum(info){
				return `合作编号：${info}`
			},
			handleStatus(status){
				return `已完成`
			}
		},
		methods:{
			tabClick(index){
				console.log('v',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cooperation{
		height: 100%;
		display: flex;
		flex-direction: column;
		.cooperation-content{
			overflow-y: scroll;
			flex: 1;
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
			}

		}
	}
</style>
