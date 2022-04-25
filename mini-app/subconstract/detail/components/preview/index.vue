<template lang="pug">
.preview-content
    video(
        v-if='info.live_recording_screen_path'
        :src="info.live_recording_screen_path"
    )
    .text-info
        .title 商铺信息
        u-line
        .shop
            .info
                .label 名称：
                .text {{info.store_name || '-'}}
            .info
                .label 店铺长ID：
                .text {{info.store_id || '-'}}
            .info
                .label DRS评分：
                .text {{info.drs || '-'}}
        .title 商品信息
        u-line
        .top
            .image(
            )
                image(
                    :src='info.pic_path'
                )
            .merchant-info
                .info
                    .label 商品名称：
                    .text {{info.goods_name || '-'}}
                .info
                    .label 商品品牌：
                    .text {{info.brand || '-'}}
                .info
                    .label 商品规格：
                    .text {{info.specification || '-'}}
                .info
                    .label 好评率：
                    .text {{info.favorable_rate || '-'}}
                .info
                    .label 存储条件：
                    .text {{info.storage_condition || '-'}}
                .info
                    .label 保质期：
                    .text {{info.shelf_life || '-'}}
                .info
                    .label 不适人群：
                    .text {{info.unsuitable_people || '-'}}
        .content
            .info(style='flex-direction:column;')
                .label 商品链接：
                .text(
                    style='word-break: break-all;'
                ) {{info.goods_url || 'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/APP%E5%9B%BE%E6%A0%87png%EF%BC%88%E4%B8%B4%E6%97%B6%EF%BC%89.png?sign=245d8c31477ead964b3b5d2044a2d724&t=1649943343'}}
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
        .title 快递信息
        u-line
        .col
            .info
                .label 快递公司：
                .text {{info.delivery_company || '-'}}
            .info
                .label 发货地址：
                .text {{info.shipping_addresses || '-'}}
            .info
                .label 发货周期：
                .text {{info.shipping_cycle || '-'}}
            .info
                .label 包邮地区：
                .text {{info.free_shipping || '-'}}
            .info
                .label 不发货区：
                .text {{info.not_shipping || '-'}}
        .title 佣金信息
        u-line
        .col
            .info
                .label 佣金比例：
                .text {{info.commission_rate || '-'}}
            .info
                .label 坑位费：
                .text {{info.pos_price || '-'}}
        .title 其他
        u-line
        .col
            .info
                .label 备注：
                .text {{info.comment || '-'}}
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
    watch:{
        info:{
            handler:function(newVal){
                console.log('tianxie hezu',newVal)
            },
            immediate:true
        }
    },
    created(){},
    mounted(){},
    methods:{}
};
</script>
<style lang="scss" scoped>
.preview-content{
    video{
        width: 100%;
    }
    .text-info{
        padding: 0 20rpx;
        .title{
            margin-top: 20rpx;
            padding-bottom: 20rpx;
        }
        .shop{
            margin-top: 20rpx;
            display: flex;
            flex-wrap: wrap;
            .info{
                margin-left: 20rpx;
            }
        }
        .top{
            margin-top: 20rpx;
            display: flex;
            .image{
                image{
                    width: 284rpx;
                    height: 298rpx;
                }
            }
            .merchant-info{
                padding-left: 20rpx;
            }
        }
        .content{
            margin-top: 20rpx;
            .info{
                margin-left: 20rpx;
                display: flex;
                .label{
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    width: 160rpx;
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
        .col{
            margin-top: 20rpx;
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
        width: 160rpx;
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
</style>