<template lang="pug">
.merchant-info
    .merchant 
        image.img(
            v-if='merchantInfo.icon'
            :src="merchantInfo.icon"
        )
        text {{merchantInfo.real_name || '-'}}
    .goods
        .title {{`TA的商品（${goods.length}）`}}
        u-line.line
        scroll-view.goods-view(:scroll-y='true')
            .goods-list
                .good(
                    v-for='(item,index) in goods'
                    :key="index"
                )
                    .video
                        video(:src="item.live_recording_screen_path")
                    .footer
                        .image
                            img(:src="item.pic_path")
                        .info
                            text.name {{item.goods_name}}
                            .price
                                .sale {{`价格：${item.live_price}`}}
                                .sale {{`佣金：${item.commission_rate}%`}}
</template>

<script>
import {getUserInfo} from '../../../service/apis/index'
import {getGoodsInfo} from '../../../service/apis/index'
export default {
    props:{
        info:{
            type:Object,
            default:()=>{}
        }
    },
    components:{},
    data() {
        return {
            goods:[],
            merchantInfo:{},
            avatar:"https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/1650025671862"
        };
    },
    computed:{},
    watch:{
        info:{
            handler:function(newVal){
                const {merchant_openid} = newVal
                this.getData(merchant_openid)
            },
            immediate:true
        }
    },
    created(){},
    mounted(){},
    methods:{
        async getData(openid){
            let res = await getGoodsInfo({
                openid
            })
            console.log('获取商家信息',res)
            this.goods = res.data || []

            let result = await getUserInfo({
                openid
            })
            this.merchantInfo = result.data
            console.log('openid',result)
        }
    }
};
</script>
<style lang="scss" scoped>
.merchant-info{
    height: 100%;
    padding: 30rpx 20rpx 30rpx;
    display: flex;
    flex-direction: column;
    .merchant{
        display: flex;
        .img{
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }
        text{
            display: flex;
            align-items: center;
            
        }
    }
    .goods{
        .title{
            flex-shrink: 0;
            margin-bottom: 20rpx;
        }
        .line{
            // margin: 20rpx 0;
        }
        .goods-view{
            margin-top: 20rpx;
            flex: 1;
            // height: 1px;
            max-height: 800rpx;
            display: flex;
            flex-direction: column;
            .goods-list{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .good{
                    width: 45%;
                    .video{
                        width: 100%;
                        height: 330rpx;
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .footer{
                        display: flex;
                        width: 100%;
                        img{
                            height: 94rpx;
                            width: 94rpx;
                        }
                        .info{
                            padding-left: 5rpx;
                            width: calc(100% - 94rpx);
                            font-size: 20rpx;
                            .name{
                                display: block;
                                overflow:hidden; //超出的文本隐藏
                                text-overflow:ellipsis; //溢出用省略号显示
                                white-space:nowrap; //溢出不换行
                                font-weight: bold;
                            }
                            .price{
                                display: flex;
                                .sale{

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>