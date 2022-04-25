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
					v-if="videoData.length"
					v-for="(item, index) in videoData" 
					:key="index"
				)
					swiper-item.swiper-item
						.my-video
							video(
								@click="setStatus(index)"
								ref='video'
								:id="`videoWrap${index}`"
								:src="item.live_recording_screen_path" 
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
							//- cover-view.my-view {{index}}
						.right-bar
						.user
							image(
								:src="userIcon"
								@click="handleClick('user',item)"
							)
							.text 商家主页
						.check
							image(
								:src="checkIcon"
								@click="handleClick('check',item)"
							)
							.text 商品详情
						.get
							image(
								:src="getIcon"
								@click="handleClick('get',item)"
							)
							.text 样品申领
				block.swiper-item(v-if='!videoData.length')
					swiper-item
						XwEmpty(
							:isShow="true" 
							text="啊欧，还没有商家向你申报供品信息喔，赶紧点击底部按钮邀请商家供品！" 
							textColor="#777777"
						)
		u-popup(
			:show="showDetail"
			@close="close" 
			@open="open"
			mode="bottom"
			:round="10"
			:closeable='true'
			:closeOnClickOverlay="true"
			:customStyle="{position:'fixed',width:'100%',height:'70%',bottom:0}"
		)
			Detail(
				:info="info"
			)

		u-popup(
			:show="merchantPop"
			@close="merchantPop = false" 
			@open="open"
			mode="bottom"
			:round="10"
			:closeable='true'
			:closeOnClickOverlay="true"
			:customStyle="{position:'fixed',width:'100%',height:'70%',bottom:0}"
		)
			MerchantPop(
				:info="info"
			)

		u-popup(
			:show="showModal"
			:round="10"
			@close="closeGoods" 
			@open="open"
			mode="center"
			:closeable='true'
			:closeOnClickOverlay="true"
			:customStyle="{width:'70%'}"
		)
			GetGoods(
				@refresh="refresh"
				:info="info"
				:nickName="nickName"
			)
		tabbar
</template>

<script>
	import XwEmpty from '../../components/xw-empty/xw-empty.vue'
	import Detail from './components/detail.vue'
	import GetGoods from './components/getGoods.vue'
	import MerchantPop from './components/merchantInfo.vue'
	import {tabbar} from '../../components/tabbar/index.vue'
	import {getData,getCooperatioInfoById} from '../../service/apis/merchant'
	import {mapState} from 'vuex'
	export default {
		components:{
			tabbar,
			Detail,
			GetGoods,
			MerchantPop,
			XwEmpty
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
				getIcon:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E9%A2%86%E7%94%A8%E6%A0%B7%E5%93%81.png?sign=92d9f4b7fef4789fbf6c61d32bb537d9&t=1649689011",
				cooperation_id:0,
				showDetail:false,
				info:{},
				showModal:false,
				merchantPop:false
			};
		},
		computed:{
			...mapState(['nickName'])
		},
		mounted(){
			let pages = getCurrentPages();
            let curPage = pages[pages.length-1];
            const {cooperation_id} = curPage.options
			this.cooperation_id = cooperation_id
			this.getPageData()
		},
		methods: {
			refresh(){
				this.getPageData()
			},
			async getPageData() {

				let res = await getData({
					status:1,
					page_number:1,
					count:1000
				})
				// console.log('vvvvaa',aa)
				// let res = await getCooperatioInfoById({
				// 	// status:1,
				// 	// page_number:1,
				// 	// count:10
				// 	cooperation_id:this.cooperation_id
				// })
				// console.log('getCooperatioInfoById',res.data)

				// res.data.map((val,index)=>{
				// 	if(!val.cooperation_id){
				// 		val.cooperation_id = this.cooperation_id
				// 	}
				// 	return
				// })
				this.videoData = res.data || []
// console.log('this.videoData',this.videoData)
				this.setPlayIndex()	
			},
			changed(e) {
				let current = e.detail.current //当前滑块的索引	
				this.changeIndex = current
				this.currentVideo = current

				// if (this.videoData.length == current + 1) {
				// 	//当还有1个视频没有看的时候开始加载数据
				// 	if (this.hasMore) {
				// 		//后台还有更多数据的时候
				// 		this.getPageData() //调用函数加载数据			
				// 	} else {
				// 		uni.showToast({
				// 			title: '没有更多数据了！',
				// 			icon: 'none'
				// 		})
				// 	}
				// }

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
					this.getPageData()
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
					this.getPageData()
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
			handleClick(type,item){
				console.log('type',type)
				this.info = item
				if(type == 'check'){
					this.showDetail = true
					
					console.log('item',item)
				}else if(type == 'get'){
					this.showModal  = true
					console.log('item',item)
				}else{
					this.merchantPop = true
				}
			},
			close(){
				this.showDetail = false
			},
			open(){

			},
			closeGoods(){
				this.showModal = false
			}
		}
	}
</script>

<style lang='scss' scoped>
.merchant{
	height: 100%;
	position: absolute;
	width: 100%;
	display: flex;
	flex-direction: column;
	.z-pagging{
		flex: 1;
		.swiper {
			height: calc(100% - 150rpx);
			.swiper-item{
				position: relative;
				.content{
					height: 100%;
					width: 100%
				}
				.my-video{
					height: 100%;
					width: 100%;
					video{
						height: 100%;
						width: 100%;
						position: absolute;
						top:0;
						left: 0;
						z-index: -1!important;
						.my-view{
							height: 100%;
							width: 100%;
							color: #FFF;
						}
					}
				}
				
				.right-bar{
					z-index: 100;
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
				
				.user{
					z-index: 100;
					top: 452rpx;
					position: absolute;
					right: 16rpx;
					color: #FFF;
					image{
						width: 76rpx;
						height: 76rpx;
					}
					.text{
						font-size: 20rpx;
					}
				}
				.check{
					z-index: 100;
					top: 584rpx;
					right: 16rpx;
					position: absolute;
					color: #FFF;
					image{
						width: 76rpx;
						height: 76rpx;
					}
					.text{
						font-size: 20rpx;
					}
				}
				.get{
					z-index: 100;
					top: 715rpx;
					right: 16rpx;
					position: absolute;
					color: #FFF;
					image{
						width: 76rpx;
						height: 76rpx;
					}
					.text{
						font-size: 20rpx;
					}
				}
			}
		}
	}
}
.popup-content{
	color: red;
}
	
</style>

