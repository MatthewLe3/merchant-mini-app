<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载）-->
		<!--  :enable-back-to-top="currentIndex===tabIndex" 在微信小程序上可以多加这一句，因为默认是允许点击返回顶部的，但是这个页面有多个scroll-view，会全部返回顶部，所以需要控制是当前index才允许点击返回顶部 -->
		<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="false">
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
                <view class="item" v-for="(item,index) in dataList" :key="index" @click="itemClick(item)">
                    <uniCard class="card" :title="`合作编号：${item.no}`" :extra="item.status | handleStatus">
                        <view class="info">
                            <image :src="item.img" />
                            <view class="goods-info">
                                商品信息
                            </view>
                        </view>
                    </uniCard>
                </view>
		</z-paging>
	</view>
</template>

<script>
import {getGoodsInfo} from '../../service/apis/index'
import uniCard from '../../uni_modules/uni-card/components/uni-card/uni-card.vue'
	export default {
		components:{
			uniCard
		},
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				firstLoaded: false,

                resultList:[],
                resultFirstLoaded:false
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
            handleStatus(status){
                return status == 1 ? "试样通过" : "试样未通过"
            }
        },
		methods: {
			async queryList(pageNo, pageSize) {
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				const params = {
					pageNo: pageNo,
					pageSize: pageSize,
					type: this.tabIndex + 1
				}
				const data= [
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:1,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:2,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:3,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
						{
							title:'title',
							detail:'detail',
							no:1231131,
                        	status:0,
							img:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/%E6%88%91%E7%9A%84-%E6%9C%AA%E9%80%89%E6%8B%A9.png?sign=cd360b9170fd00036a2e86bb5bf705c6&t=1649685390'
						},
					]

				let res= await getGoodsInfo()
				
				this.$refs.paging.complete(data);
                this.firstLoaded = true;
				
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
			.info{
				display: flex;
				image{
					width: 214rpx;
					height: 214rpx;
				}
				.goods-info{
					margin-left: 16rpx;
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
