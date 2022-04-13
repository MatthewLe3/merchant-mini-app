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
				v-show='swiperCurrent == 1'
				:current="swiperCurrent" 
				@transition="transition" 
				@animationfinish="animationfinish"
			)
				swiper-item.swiper-item(
					
					v-for="(item, index) in tabList" 
					:key="index"
				)
					swiper-list-item(
						:tabIndex="index" 
						:currentIndex="swiperCurrent"
					)
			swiper.swiper(
				v-if="swiperCurrent == 0"
				vertical 
				duration="200"
				@change="changed"
				@transition="transition" 
				@animationfinish="animationfinish"
			)
				block.swiper-item(
					v-for="(item, index) in videoData" 
					:key="index"
				)
					swiper-item.swiper-item
						video(
							@click="setStatus(index)"
							ref='video'
							:id="`videoWrap${index}`"
							:src="item.url" 
							:initial-time='0'
							:autoplay="false"
							:controls="isControl"
							custom-cache="false" 
							loop="true" 
							object-fit="cover"
							:enable-play-gesture="true" 
							:enable-progress-gesture="true"
							:show-center-play-btn="false"
						)
						.right-bar
						image.user(
							:src="userIcon"
							@click="handleClick('user')"
						)
						image.check(
							:src="checkIcon"
							@click="handleClick('check')"
						)
						image.get(
							:src="getIcon"
							@click="handleClick('get')"
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
					name: '等你领样品'
				}, {
					name: '等你反馈'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				videoData: [], //视频数据 
				changeIndex: 0, //控制video是否渲染
				hasMore: true, //是否有更多数据
				pageIndex: 1, //第几页
				currentVideo:0,
				videoContext:null,
				isPlaying:true,
				userIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/WechatIMG348.png?sign=0decf7bbb11d18dd81efe05b7dd4d060&t=1649689228',
				collectIcon:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%94%B6%E8%97%8F.png?sign=ca2388899205a170de43f81559cd4d03&t=1649685580",
				collectedIcon:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%94%B6%E8%97%8F-%E6%94%B6%E8%97%8F.png?sign=cdf2cafd6bf6d425f68c7543461a1b09&t=1649685598",
				checkIcon:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%9F%A5%E7%9C%8B.png?sign=6f1cf0648bfcfc8015bc63ffdf2fffba&t=1649685473",
				getIcon:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E9%A2%86%E7%94%A8%E6%A0%B7%E5%93%81.png?sign=92d9f4b7fef4789fbf6c61d32bb537d9&t=1649689011"
			};
		},
		mounted(){
			this.getData()
		},
		methods: {
			getData() {
				this.videoData.push(...[
					{
						url:'http://imagetest.dejiplaza.com/mall/images/-20220411-00c9d380a2c549e581b7a009ee6645e5.mp4'					},
					{
						url:'http://imagetest.dejiplaza.com/mall/images/-20220411-f6edf2dbc1ef4c29a8821f3be4e75868.mp4',					},
					{
						url:'http://imagetest.dejiplaza.com/mall/images/-20220411-00c9d380a2c549e581b7a009ee6645e5.mp4',					},
				])

				this.setPlayIndex()	
			},
			changed(e) {
				let current = e.detail.current //当前滑块的索引	
				this.changeIndex = current
				this.currentVideo = current

				if (this.videoData.length == current + 1) {
					//当还有1个视频没有看的时候开始加载数据
					if (this.hasMore) {
						//后台还有更多数据的时候
						this.getData() //调用函数加载数据			
					} else {
						uni.showToast({
							title: '没有更多数据了！',
							icon: 'none'
						})
					}
				}

				this.setPlayIndex()	
			},
			setPlayIndex(){
				setTimeout(()=>{
					this.videoData.map((val,index)=>{
						this.videoContext = uni.createVideoContext(`videoWrap${index}`, this);
						if(index == this.currentVideo){
							this.videoContext.play()
							this.isPlaying = true
						}else{
							this.videoContext.stop()
						}
					})
				},500)	
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index

				if(index === 1){
					this.videoData = []
					this.currentVideo = 0
				}else{
					this.getData()
				}
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				if(this.swiperCurrent == 1){
					let dx = e.detail.dx;
					this.$refs.uTabs.setDx(dx);
				}
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				if(this.current == 1){
					let current = e.detail.current;
					this.$refs.uTabs.setFinishCurrent(current);
					this.swiperCurrent = current;
					this.current = current;

					this.videoData = []
					this.currentVideo = 0
				}
				if(e.detail.current == 0){
					this.getData()
				}
				
			},
			setStatus(clickIndex){
				this.videoData.map((val,index)=>{
					this.videoContext = uni.createVideoContext(`videoWrap${index}`, this);
					if(index == clickIndex){
						if(this.isPlaying){
							this.videoContext.stop()
						}else{
							this.videoContext.play()
						}
						
						this.isPlaying = !this.isPlaying
					}
				})
				console.log()
			},
			handleClick(type){
				console.log('type',type)
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
			.swiper-item{
				position: relative;
				video{
					height: 100%;
					width: 100%
				}
				.right-bar{
					position: absolute;
					border-radius: 50rpx 0 0 50rpx;
					top: 0;
					right: 0;
					height: 100%;
					width: 122rpx;
					opacity: 0.25;
					background: #000000;
					text-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0,0,0,0.15); 
				}
				image{
					width: 76rpx;
					height: 76rpx;
					position: absolute;
					right: 16rpx;
				}
				.user{
					top: 452rpx;
				}
				.collect{
					width: 76rpx;
					height: 76rpx;
					top: 584rpx;
				}
				.check{
					width: 76rpx;
					height: 76rpx;
					top: 584rpx;
				}
				.get{
					width: 76rpx;
					height: 76rpx;
					top: 706rpx;
				}
			}
		}
	}
}
	
</style>

