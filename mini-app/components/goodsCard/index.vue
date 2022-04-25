<template lang="pug">
scroll-view(:scroll-y='true').content
    .cards
        .card(
            v-for="(item,index) in goodsData"
            :key="index"
        )
            video(:src='item.live_recording_screen_path')
            .footer(@click="jumpDetail(item)")
                .image
                    img(:src="item.pic_path")
                .info
                    text.name {{item.goods_name}}
                    .price
                        .sale {{`价格：${item.live_price}`}}
                        .sale {{`佣金：${item.commission_rate}%`}}
</template>

<script>
export default {
    props:{
        goodsData:{
            type:Array,
            default:()=>[]
        }
    },
    components:{},
    data() {
        return {};
    },
    computed:{},
    watch:{
        goodsData:{
            handler:function(newVal){
                console.log('goodsData',newVal)
            },
            immediate:true
        }
    },
    created(){},
    mounted(){
    },
    methods:{
        jumpDetail(item){
            console.log('jumpDetail',item)
            uni.navigateTo({
                url:`/subconstract/detail/index?cooperation_id=${item.id}&hiddenButton=true`
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    max-height: 1020rpx;
    .cards{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .card{
            width: 45%;
            display: flex;
            flex-direction: column;
            video{
                height: 330rpx;
                width: 100%;
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
</style>