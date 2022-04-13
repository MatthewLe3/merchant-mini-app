<!-- 首页 -->
<template lang='pug'>
	.user
		.user-content 
			image(:src='user.avatar')
			.detail
				.name {{user.name}}
				.phone {{user.phone | handlePhone}}
			uni-icons(
				class='icon'
				type="forward" 
				size="30"
			)
		.user-cooperation 
			uni-card(
				class='my-card'
				:title="'我的合作'" 
			)
				uni-icons(
					class='icon'
					type="forward" 
					size="30"
				)
				.content
					.cooperation-info(
						v-for='(item,index) in cooperationData'
						:key='index'
					)
						.info
							uni-badge(
								size="small" 
								:text="100" 
								absolute="rightTop" 
								type="primary"
							)
								uni-icons(
									:type="item.icon" 
									size="30"
									class='my-icon'
								)
							text {{item.title}}
		my-tabbar
</template>

<script>
	import uniCard from '../../uni_modules/uni-card/components/uni-card/uni-card.vue'
	import MyTabbar from '../../components/MyTabbar/index.vue'
	import uniBadge from '../../uni_modules/uni-badge/components/uni-badge/uni-badge.vue'
	export default {
		components:{
			MyTabbar,
			uniCard,
			uniBadge
		},
		data() {
			return {
				user:{
					avatar:'https://t7.baidu.com/it/u=3655946603,4193416998&fm=193&f=GIF',
					name:'XXX',
					phone:'15211111111'
				},
				cooperationData:[
					{
						title:'待合作',
						icon:'medal'
					},
					{
						title:'合作中',
						icon:'medal'
					},
					{
						title:'已完成',
						icon:'medal'
					}
				]
				
			}
		},
		filters:{
			handlePhone(phone){
				return phone.substr(0,3)+"****"+phone.substr(7);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user{
		height: 100%;
		display: flex;
		flex-direction: column;
		.user-content{
			display: flex;
			padding: 10rpx 20rpx 0 20rpx;
			height: 100rpx;
			position: relative;
			image{
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.detail{
				padding-left: 20rpx;
			}
			.icon{
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 10rpx;
				top: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.user-cooperation{
			flex: 1;
			.my-card{
				.icon{
					position: absolute;
					top: 20rpx;
					right: 10rpx;

				}
				.content{
					display: flex;
					justify-content: space-between;
					.cooperation-info{
						.info{
							display: flex;
							flex-direction: column;
							.my-icon{
								text-align: center;
							}
						}
						
					}
				}
				
			}
		}
	}
</style>
