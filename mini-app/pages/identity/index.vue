<template lang="pug">
    .identity
        .title 我是
        .id
            .pic(
                v-for='(item,index) in info'
                :key="index"
                @click="checkIdentity(index)"
            )
                image(:src='item.pic')
                .des {{item.des}}
</template>
<script>
	import {mapState} from "vuex";
	import {register} from "../../service/apis/index";
	import {TMPIDS} from "../../config/index";
	export default {
		data() {
			return {
				info: [
					{
						pic: "https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E8%BA%AB%E4%BB%BD%E9%80%89%E6%8B%A9-%E5%95%86%E5%AE%B6.png?sign=5f787f7acb144220dfad045b89df6111&t=1649487614",
						des: "我要向XX主播申报商品信息",
					},
					{
						pic: "https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E8%BA%AB%E4%BB%BD%E9%80%89%E6%8B%A9-%E4%B8%BB%E6%92%AD.png?sign=5f00c088c3a4f7960b4b901430119a7a&t=1649487689",
						des: "我要邀请商家申报商品信息",
					},
				],
				cooperation_id: 0,
			};
		},
		mounted() {
			let pages = getCurrentPages();
			let curPage = pages[pages.length - 1];
			const {cooperation_id} = curPage.options;
			this.cooperation_id = cooperation_id;
			console.log("cooperation_id", this.cooperation_id);
		},
		computed: {
			...mapState(["nickName", "avatarUrl"]),
		},
		methods: {
			async checkIdentity(index) {
				wx.requestSubscribeMessage({
					tmplIds: TMPIDS,
					success:async () => {
						console.log("success:" + res)
						let res = await register({
							pet_name: this.nickName,
							icon: this.avatarUrl,
							identity_type: index == 0 ? 2 : 1,
						});
						const {code, msg} = res;
						const time = 1500;
						uni.showToast({
							title: code === 200 ? msg : "注册失败",
							icon: code === 200 ? "success" : "error",
							duration: time,
						});

						if (code == 200) {
							setTimeout(() => {
								uni.redirectTo({
									url: `${
										index === 0
											? "/subconstract/merchantHome/index"
											: `/subconstract/actorHome/index?cooperation_id=${this.cooperation_id}`
									}`,
								});
							}, time);
						}
					},
					fail(res) {
						console.log("fail:" + res);
					},
					complete(res) {
						console.log("complete:" + res);
					},
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.identity {
		height: 100%;
		.title {
			font-size: 60rpx;
			font-family: Microsoft YaHei, Microsoft YaHei-Bold;
			font-weight: Bold;
			text-align: LEFT;
			color: #333333;
			margin-top: 308rpx;
			text-align: center;
		}
		.id {
			display: flex;
			padding: 0 66rpx;
			justify-content: space-between;
			margin-top: 66rpx;
			.pic {
				width: 262rpx;
				height: 296rpx;
				// background: rgba(254,64,102,0.10);
				// border: 2rpx solid rgba(254,64,102,0.60);
				image {
					height: 100%;
					width: 100%;
				}
				.des {
					margin-top: 26rpx;
					padding: 0 30rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: Microsoft YaHei, Microsoft YaHei-Normal;
					font-weight: Normal;
					color: #333333;
				}
			}
		}
	}
</style>
