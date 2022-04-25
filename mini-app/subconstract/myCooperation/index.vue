<template lang="pug">
.cooperation
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
				swiper-cooperation-list(
					:tabIndex="index" 
					:currentIndex="swiperCurrent"
				)
		tabbar
</template>

<script>
	import {tabbar} from '../../components/tabbar/index.vue'
	import {mapState} from 'vuex'

    export default {
        props:{},
        components:{
			tabbar
		},
        data() {
            return {
				current: 0, 
				swiperCurrent: 0, 
            };
        },
        computed:{
			...mapState(['userInfo']),
			tabList:function(){
				return this.userInfo.identity_type == 2 ? [
				{
					name: '全部'
				}, {
					name: '待发送'
				}, {
					name: '合作中'
				}, {
					name: '已完成'
				}
				] : [
				{
					name: '全部'
				}, {
					name: '合作中'
				}, {
					name: '已完成'
				}
				]
			}
		},
        watch:{},
        created(){
            
        },
        mounted(){
            let pages = getCurrentPages();
            let curPage = pages[pages.length-1];
            const {index = 0} = curPage.options
            this.current = index
        },
        methods:{
            tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
        }
    };
</script>
<style lang="scss" scoped>
.cooperation{
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