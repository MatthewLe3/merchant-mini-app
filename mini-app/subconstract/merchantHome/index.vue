<template lang='pug'>
	.merchant
		z-paging-swiper.z-pagging
			template(slot="top")
				u-tabs-swiper(
					ref="uTabs" 
					:list="tabList" 
					:current="current" 
					@change="tabsChange" 
					:is-scroll="false"
					swiperWidth="750"
				)
			swiper.swiper(
				:current="swiperCurrent" 
				@transition="transition" 
				@animationfinish="animationfinish"
			)
				swiper-item.swiper-item(
					v-for="(item, index) in tabList" 
					:key="index"
				)
					swiper-merchant-list(
						:tabIndex="index" 
						:currentIndex="swiperCurrent"
					)
		tabbar
</template>

<script>
	import {tabbar} from '../../components/tabbar/index.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				tabList: [{
					name: '等你发样品'
				}, {
					name: '试样结果'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style lang='scss' scoped>
.merchant{
	height: 100%;
	display: flex;
	flex-direction: column;
	.z-pagging{
		flex: 1;
		.swiper {
			height: calc(100% - 150rpx);
		}
	}
}
	
</style>

