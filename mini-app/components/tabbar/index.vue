<template lang='pug'>
	.tabbar
		.tab(@click="jumpHome")
			.tab-content
				.my-icon
					image(
						:src="selectedPage ? selectedHomeIcon : homeIcon"
					)
				.text 商品展示
		.tab.specital(@click="operator")
			.tab-content
				.my-icon
					.icon-content
						image.specital(
							:src="userInfo.identity_type === 1 ? editIcon : friendIcon"
						)
				.text.des {{userInfo.identity_type === 1 ? '点击新增申报商品' : '点击邀请商家申报'}}
		.tab(@click="jumpUser")
			.tab-content
				.my-icon
					image(
						:src="selectedPage ? userIcon : selectedUserIcon"
					)
				.text 我的
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {getStoreInfo} from '../../service/apis/index'
	export default {
		data() {
			return {
				homeIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E9%A6%96%E9%A1%B5-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=ec872b5217e53d42da564fa8824a97ed&t=1649689370',
				selectedHomeIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E9%A6%96%E9%A1%B5-%E9%80%89%E4%B8%AD.png?sign=0cfbdaa578b736b73d49b20ecf4cb99e&t=1649689381',

				editIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E5%95%86%E5%AE%B6%E6%9D%BF%E5%9D%97-%E5%A1%AB%E5%86%99%20(1).png?sign=a93d2c10de5314470062b47aeaa20b6e&t=1649689427',
				friendIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E4%B8%BB%E6%92%AD%E6%9D%BF%E5%9D%97-%E5%90%88%E4%BD%9C%20(1).png?sign=018c0cba9a31c5a5a1e0bb34a5a8b131&t=1649689415',
				
				userIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9%20(1).png?sign=6410d886ae141c2c3dc234633d8bb4d9&t=1649689392',
				selectedUserIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E9%80%89%E4%B8%AD%20(1).png?sign=80624b2617358c482807c413e00c40da&t=1649689405',
				
				currentRoute:''
			}
		},
		computed:{
			...mapState(['userInfo']),
			selectedPage:function(){
				let selected = this.currentRoute.includes('Home/index')
				return selected
			}
		},
		created(){
			let routes = getCurrentPages()
			this.currentRoute = routes[routes.length -1].route
			console.log('gg',this.currentRoute)
		},
		methods:{
			...mapMutations({
				setStoreArr:'setStoreArr'
			}),
			jumpHome(){
				// 跳转首页
				uni.redirectTo({
					url: `${this.userInfo.identity_type === 1 ? '/subconstract/merchantHome/index' : '/subconstract/actorHome/index'}`
				})
			},
			jumpUser(){
				// 跳转个人中心
				uni.redirectTo({
					url: '/subconstract/userCenter/index'
				})
			},
			async operator(){
				// 操作按钮
				if(this.userInfo.identity_type === 1){
					// 新增商品
					let res = await getStoreInfo({})
					const {code,data} = res
					if(code === 200){
						if(data.length){
							this.setStoreArr(data)
							uni.navigateTo({
								url: '/pages/addGoods/index'
							})
						}else{
							uni.navigateTo({
								url: '/pages/addStore/index'
							})
						}
						
						
					}else{
						uni.showToast({
							title: '获取商铺信息失败',
							icon:code === 200 ? 'success' : 'error',
							duration: 1500
						});
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		background-color: #FFF;
		display: flex;
		padding-top: 12rpx;
		padding-bottom: 42rpx;
		height: 98rpx;
		.tab{
			flex: 1;
			position: relative;
			.tab-content{
				text-align: center;
				.my-icon{
					image{
						width: 48rpx;
						height: 48rpx;
						display: block;
						margin: 0 auto;
					}
					.icon-content{
						width: 120rpx;
						height: 120rpx;
						background-color: #FFF;
						position: absolute;
						top:0;
						left: 50%;
						transform: translate(-50%,-50%);
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						.specital{
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}
					}
					
					
				}
				.text{
					font-size: 16rpx;
					font-family: PingFang SC, PingFang SC-Normal;
					font-weight: Normal;
					text-align: CENTER;
					color: #333333;
				}
				.des{
					font-size: 28rpx;
					position: relative;
					padding-top: 48rpx;
				}
			}
		}
		.specital{
			width: 200rpx;
		}
	}
</style>
