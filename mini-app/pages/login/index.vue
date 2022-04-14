<template lang='pug'>
	.login
		.login-content
			.icon
				image(:src='icon')
			.title 选品神器
			.des 主播选品好帮手
			.info 该小程序由XXX有限公司开发，请确认授权以下信息
			.auth · 获得你的公开信息（昵称、头像等）
			button(
				form-type="submit" 
				open-type="getUserInfo" 
				@click="getUserProfile"
				lang="zh-CN"
			) 授权登录
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import {getUserInfo} from '../../service/apis/index'
	export default {
		components: {

		},
		data() {
			return {
				icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/APP%E5%9B%BE%E6%A0%87png%EF%BC%88%E4%B8%B4%E6%97%B6%EF%BC%89.png?sign=487ba6bd8710faeaef208f2a81d0f487&t=1649528172',
				goods_id:0
			};
		},
		mounted(){
			let pages = getCurrentPages();
            let curPage = pages[pages.length-1];
            const {goods_id} = curPage.options
			this.goods_id = goods_id
		},
		computed: {
			...mapState(['nickName','avatarUrl'])   
		},
		methods: {
			...mapMutations({
				setNickName:'setNickName',
				setAvatarUrl:"setAvatarUrl",
				setUserInfo:"setUserInfo"
			}),
			async judgeRegister(){
				let res = await getUserInfo({})
				const {data,code} = res
				if(code === 200){
					// 注册过的用户
					this.setUserInfo(data)
					const {identity_type} = data
					uni.redirectTo({
						url: `${identity_type === 1 ? '/subconstract/merchantHome/index' : `/subconstract/actorHome/index?goods_id=${this.goods_id}`}`
					})
				}else{					
					uni.redirectTo({
						url: `/pages/identity/index?goods_id=${this.goods_id}`
					})
				}
			},
			getUserProfile() {
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
						const {nickName,avatarUrl} = res.userInfo
						this.setNickName(nickName)
						this.setAvatarUrl(avatarUrl)
						this.judgeRegister()
					}
				})
			},
			getPhoneNumber(e){
				console.log('e',e)
			}
		}
	}
</script>

<style lang="scss" scoped>
.login{
	height: 100%;
	.login-content{
		height: 100%;
		.icon{
			width: 262rpx;
			height: 264rpx;
			margin: 180rpx auto 0 auto;
			background: #ffffff;
			border: 2rpx solid #797979;
			border-radius: 12rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Normal;
			font-weight: Normal;
			text-align: CENTER;
			position: relative;
			image{
				width: 154rpx;
				height: 132rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.title{
			margin-top: 22rpx;
			font-size: 60rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Bold;
			font-weight: Bold;
			text-align: center;
			color: #003333;
		}
		.des{
			margin-top: 22rpx;
			font-size: 32rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Normal;
			font-weight: Normal;
			text-align: center;
			color: #777777;
		}
		.info{
			padding-left: 98rpx;
			margin-top: 272rpx;
			width: 446rpx;
			font-size: 32rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Normal;
			font-weight: Normal;
			text-align: LEFT;
			color: #003333;
		}
		.auth{
			padding-left: 98rpx;
			margin-top: 18rpx;
			width: 464rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Normal;
			font-weight: Normal;
			text-align: LEFT;
			color: #777777;
		}
		button{
			margin-top: 68rpx;
			width: 570rpx;
			height: 88rpx;
			background: #469adf;
			font-size: 40rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Normal;
			font-weight: Normal;
			text-align: CENTER;
			color: #ffffff;
			line-height: 88rpx;
		}
	}
}
</style>
