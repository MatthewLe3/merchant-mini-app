<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载）-->
		<!--  :enable-back-to-top="currentIndex===tabIndex" 在微信小程序上可以多加这一句，因为默认是允许点击返回顶部的，但是这个页面有多个scroll-view，会全部返回顶部，所以需要控制是当前index才允许点击返回顶部 -->
		<z-paging 
			ref="paging" 
			v-model="dataList" 
			@query="queryList" 
			:fixed="false" 
			:auto="false" 
			:empty-view-text="currentIndex == 0 ? '还没有主播向你申领样品' : '暂无试样结果'"
		>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
            <template v-if="currentIndex == 0">
                <view class="item" v-for="(item,index) in dataList" :key="index">
                    <uniCard class="card" :title="`合作编号：${item.id}`">
						<view class="anchorInfo">
							<image :src="item.anchor_data.icon" v-if="item.pic_path" />
							<text>{{item.anchor_data.real_name || '-'}}</text>
						</view>
                        <view class="info">
                            <image :src="item.pic_path" />
                            <view class="goods-info">
                                <view class="title">{{item.goods_name}}</view>
								<view>
									<text style="margin-right:20rpx">价格：{{item.live_price}}</text>
									<text>佣金：{{item.commission_rate}}%</text>
								</view>
								<view>直播活动机制：{{item.preferential_way}}</view>
								<view>主播留言：{{'-'}}</view>
                            </view>
                        </view>
                        <view class="operator">
                            <button @click="itemClick(item)">给主播寄样品</button>
                        </view>
                    </uniCard>
					<u-popup
						:show="showModal"
						:round="10"
						@close="showModal = false" 
						@open="open"
						mode="center"
						:closeable='true'
						:closeOnClickOverlay="true"
						:customStyle="{width:'80%'}"
					>
						<GoodsInfo :info="currentInfo" @refresh="refresh"></GoodsInfo>
					</u-popup>
                </view>
            </template>
			<template v-else>
                <view class="item" v-for="(item,index) in dataList" :key="index" >
                    <uniCard class="card" :title="`合作编号：${item.id}`" :extra="item.test_result | handleResult" :extraType="Number(item.test_result)">
						<view class="anchorInfo">
							<image :src="item.anchor_data.icon" v-if="item.pic_path" />
							<text>{{item.anchor_data.real_name || '-'}}</text>
						</view>
                        <view class="info">
                            <image :src="item.pic_path" />
                            <view class="goods-info">
                                <view class="title">{{item.goods_name}}</view>
								<view>
									<text style="margin-right:20rpx">价格：{{item.live_price}}</text>
									<text>佣金：{{item.commission_rate}}%</text>
								</view>
								<view>直播活动机制：{{item.preferential_way}}</view>
								<view v-if="item.test_result == 2">主播反馈：{{item.test_comment || '-'}}</view>
                            </view>
                        </view>
                    </uniCard>
                </view>
            </template>
		</z-paging>
	</view>
</template>

<script>
import {getGoodsInfo} from '../../service/apis/index'
import {getData,test2} from '../../service/apis/merchant'
import GoodsInfo from './goodsInfo.vue'
import uniCard from '../../uni_modules/uni-card/components/uni-card/uni-card.vue'
import UPopup from '../../uni_modules/uview-ui/components/u-popup/u-popup.vue'
	export default {
		components:{
			uniCard,
			UPopup,
			GoodsInfo
		},
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				firstLoaded: false,

                resultList:[],
                resultFirstLoaded:false,
				showModal:false,
				currentInfo:{}
			}
		},
		props:{
			//当前组件的index，也就是当前组件是swiper中的第几个
			tabIndex: {
				type: Number,
				default: function(){
					return 0
				}
			},
			//当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function(){
					return 0
				}
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if(newVal === this.tabIndex){
						//懒加载，当滑动到当前的item时，才去加载
						if(!this.firstLoaded){
							setTimeout(() => {
								this.$refs.paging.reload();
							}, 100);
						}
					}
				},
				immediate: true
			},
		},
        filters:{
            handleResult(status){
				let text = ''
				switch (status) {
					case 0:
						text = '未试样'
						break;
					case 1:
						text = '试样通过'
						break;
					case 2:
						text = '试样未通过'
						break;
				
					default:
						break;
				}
                return text
            }
        },
		methods: {
			refresh(){
				this.queryList(1,10)
			},
			async queryList(pageNo, pageSize) {
				console.log('vvvvvvvvvvv',pageNo,pageSize)
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				const params = {
					pageNo: pageNo,
					pageSize: pageSize,
					type: this.tabIndex + 1
				}
				// 等你发样品数据
				// [
				// 	{
				// 		title:'title',
				// 		detail:'detail',
				// 		img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
				// 	},
				// ]

                // 试样结果data
				// [
				// 	{
                //         no:1231131,
                //         status:1
                //     }
				// ]


                if(this.currentIndex == 0){
					let res = await getData({
						status:2,
						page_number:pageNo,
						count:pageSize,
					})
					console.log('给主播发样品',res)
                    this.$refs.paging.complete(res.data || []);
                    this.firstLoaded = true;
                }else{
					let res = await getData({
						status:4,
						page_number:pageNo,
						count:pageSize,
					})
					console.log('试样结果',res)
                    this.$refs.paging.complete(res.data || []);
                    this.resultFirstLoaded = true;
                }
				
				// getData().then(res => {
				// 	//将请求的结果数组传递给z-paging
				// 	this.$refs.paging.complete(data);
				// 	this.firstLoaded = true;
				// }).catch(res => {
				// 	//如果请求失败写this.$refs.paging.complete(false);
				// 	//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
				// 	//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可

				// 	this.$refs.paging.complete(data);
				// 	this.firstLoaded = true;
				// 	// this.$refs.paging.complete(false);
				// })
			},
			itemClick(item) {
				console.log('点击了', item.title);
				this.showModal = true
				this.currentInfo = item
			},
			open(){

			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
	.content {
		height: 100%;
	}
	
	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		uni-card:first-child{
			margin-top: 16rpx;

		}
		.card{
			width: 100%;
			.anchorInfo{
				display: flex;
				margin-bottom: 20rpx;
				image{
					height: 50rpx;
					width: 50rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				text{
					display: flex;
					align-items: center;
				}
			}
			.info{
				display: flex;
				image{
					width: 214rpx;
					height: 214rpx;
				}
				.goods-info{
					margin-left: 16rpx;
					flex: 1;
					.title{
						display: block;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						font-weight: bold;
					}
                    .info{
                        display: flex;
                        .label{
                            
                        }
                    }
				}
			}
			.operator{
				text-align: right;
				button{
					height: 56rpx;
					line-height: 56rpx;
					background: #ffffff;
					border: 2rpx solid #797979;
					border-radius: 8rpx;
					font-size: 28rpx;
					font-family: Microsoft YaHei, Microsoft YaHei-Bold;
					font-weight: Bold;
					color: #333333;
					display: inline-block;
				}
			}
		}
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}

</style>
