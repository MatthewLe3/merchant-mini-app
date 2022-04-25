<template lang="pug">
scroll-view(:scroll-y='true')
    .popup-content
        .header
            .img
                image(:src='info.pic_path')
            .main-info
                .info
                    .label 商品名称:
                    .text {{info.goods_name}}
                .info
                    .label 好评率:
                    .text {{info.favorable_rate}}
                .info
                    .label 价格:
                    .text {{info.live_price}}
                .info
                    .label 佣金:
                    .text {{info.commission_rate}}%
                .info
                    .label drs评分：
                    .text {{info.drs}}
                .info
                    .label 直播活动机制:
                    .text {{info.preferential_way}}
        .body
            .title 商品信息
            u-line
            .merchant-info
                .col
                    .info
                        .label 商品规格：
                        .text {{info.specification || '-'}}
                    .info
                        .label 保质期：
                        .text {{info.shelf_life || '-'}}
                    .info
                        .label 存储条件：
                        .text {{info.storage_condition || '-'}}
                    .info
                        .label 不适人群：
                        .text {{info.unsuitable_people || '-'}}
                    
                .content
            .info(style='flex-direction:column;')
                .label 商品链接：
                .text(
                    style='word-break: break-all;'
                ) {{info.goods_url || '-'}}
            .info
                .label 商品卖点：
                .text {{info.selling_point || '-'}}
            .title 价格信息
            u-line
            .col
                .info
                    .label 日常价格：
                    .text {{info.daily_price || '-'}}
                .info
                    .label 历史最低：
                    .text {{info.lowest_price || '-'}}
                .info
                    .label 直播价格：
                    .text {{info.live_price || '-'}}
                .info
                    .label 直播优惠方式：
                    .text {{info.preferential_way || '-'}}
                .info
                    .label 天猫价格：
                    .text {{info.tmall_price || '-'}}
                .info
                    .label 淘宝价格：
                    .text {{info.taobao_price || '-'}}
                .info
                    .label 其他平台价格：
                    .text {{info.other_price || '-'}}
                
</template>

<script>
export default {
    props:{
        info:{
            type:Object,
            default:()=>{}
        }
    },
    components:{},
    data() {
        return {};
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{}
};
</script>
<style lang="scss" scoped>
scroll-view{
    box-sizing: border-box;
    height: 100%;
    // overflow-y: scroll;
    max-height: 900rpx;
    padding: 120rpx 20rpx 30rpx;
    .popup-content{
        .header{
            display: flex;
            .img{
                width: 284rpx;
                height: 298rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .main-info{
                padding-left: 20rpx;
                .info{
                    display: flex;
                    .label{
                        display: flex;
                        align-items: center;
                        font-size: 28rpx;
                        width: 180rpx;
                        text-align: left;
                    }
                    .text{
                        display: flex;
                        align-items: center;
                        color: #8f9ca2;
                        flex: 1;
                        font-size: 26rpx;
                        word-break: break-all;
                    }
                }
            }
        }
        .body{
            .title{
                margin-top: 20rpx;
                padding-bottom: 20rpx;
            }
            .merchant-info{
                // padding-left: 20rpx;
                .col{
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    justify-content:space-between;
                    .info{
                        display: flex;
                        width: 45%;
                        .label{
                            display: flex;
                            align-items: center;
                            font-size: 28rpx;
                            width: 180rpx;
                            text-align: left;
                        }
                        .text{
                            display: flex;
                            align-items: center;
                            color: #8f9ca2;
                            flex: 1;
                            font-size: 26rpx;
                            word-break: break-all;
                        }
                    }
                }
            }
            .info{
                margin-left: 20rpx;
                display: flex;
                .label{
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    width: 180rpx;
                    text-align: left;
                }
                .text{
                    display: flex;
                    align-items: center;
                    color: #8f9ca2;
                    flex: 1;
                    font-size: 26rpx;
                    word-break: break-all;
                }
            }
        }
    }
}
</style>