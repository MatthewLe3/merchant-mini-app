<template lang="pug">
    .user-center
        .content 
            .user(@click="goUserInfo")
                .avatar 
                    cover-image(
                        class='user-avatar'
                        :src='avatarUrl'
                    )
                .name {{nickName}}
                .arrow
                    image(:src='arrowIcon')
            //- uni-card(
            //-     title='我的合作'
            //-     @click.stop="jumpCooperation(0)"
            //- )
            //-     .card-content(:class='[userInfo.identity_type === 1 ? "" : "two"]')
            //-         .arrow
            //-             image(:src='arrowIcon')
            //-         .info(
            //-             v-for='(item,index) in cooperationData'
            //-             :key='index'
            //-             @click.stop="jumpCooperation(index+1)"
            //-         )
            //-             .item
            //-                 uni-badge(
            //-                     v-if="item.num"
            //-                     size="small" 
            //-                     :text="item.num" 
            //-                     absolute="rightTop" 
            //-                     type="primary"
            //-                 )
            //-                     image(:src='item.icon')
            //-                 image(
            //-                     v-else
            //-                     :src='item.icon'
            //-                 )
            //-                 .text {{item.label}}
            uni-card(
                :title='`${userInfo.identity_type == 1 ? `我的选品(${goodsCount}` : `我的商品(${goodsCount}`})`'
            )
                .card-content
                    .arrow
                        image(:src='arrowIcon')
                    GoodsCard( v-if='goodsData.length' :goodsData="goodsData" style='width:100%')
                    //- .images(
                    //-     v-for='(item,index) in goodsData'
                    //- )
                    //-     video(:src='item.live_recording_screen_path')
                    .block(v-if='!goodsData.length')
                        XwEmpty(
                            :isShow="true" 
                            text="暂无相关数据" 
                            textColor="#777777"
                        )

        tabbar
</template>

<script>
import {mapState} from 'vuex'
import GoodsCard from '../../components/goodsCard/index.vue'
import {getData} from '../../service/apis/merchant'
import tabbar from '../../components/tabbar/index.vue'
import {getGoodsInfo} from '../../service/apis/index'
import XwEmpty from '../../components/xw-empty/xw-empty.vue' 

export default {
    props:{},
    components:{
        tabbar,
        XwEmpty,
        GoodsCard
    },
    data() {
        return {
            arrowIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E7%AE%AD%E5%A4%B4.png?sign=36953f187e93e91a6b6caf07cbe47475&t=1649514634',
            goodsData:[]
        };
    },
    computed:{
        ...mapState(['nickName','avatarUrl','userInfo']),
        goodsCount:function(){
            return this.goodsData.length || 0
        },
        cooperationData:function(){
            return this.userInfo.identity_type === 2 ? [
                {
                    label:'待发送',
                    icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E5%BE%85%E5%8F%91%E9%80%81.png?sign=7cf13f25dd019277d37b27f06486afef&t=1649564756',
                    num:1
                },
                {
                    label:'合作中',
                    icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E5%90%88%E4%BD%9C%E4%B8%AD.png?sign=f8be0df5092fcb2f99d649870afc7e14&t=1649564763',
                },
                {
                    label:'已完成',
                    icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E5%B7%B2%E5%AE%8C%E6%88%90.png?sign=78ddd41050cbd6026b8ff7d652f0cb93&t=1649564771',
                    num:1
                },
            ] : [
                {
                    label:'合作中',
                    icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E5%90%88%E4%BD%9C%E4%B8%AD.png?sign=f8be0df5092fcb2f99d649870afc7e14&t=1649564763',
                },
                {
                    label:'已完成',
                    icon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/image/%E5%B7%B2%E5%AE%8C%E6%88%90.png?sign=78ddd41050cbd6026b8ff7d652f0cb93&t=1649564771',
                    num:1
                },
            ]
        }
    },
    watch:{},
    created(){
        this.handleGoods()
    },
    mounted(){},
    methods:{
        goUserInfo(){
            uni.navigateTo({
                url: '/pages/userInfo/index'
            })
        },
        async handleGoods(){
            console.log('this.userInfo.identity_type',this.userInfo.identity_type)
            if(this.userInfo.identity_type === 1){
                let res = await getData({
                    status:4,
                    test_result:1,
                    page_number:1,
                    count:10000
                })
                console.log('getData',res,res.data)
                this.goodsData = res.data || []
            }else{
                let res = await getGoodsInfo({})
                console.log('getGoodsInfo',res,res.data.length)
                this.goodsData = res.data || []
            }
            

        },
        jumpCooperation(index){
            console.log('index',index)
            uni.navigateTo({
                url: `/subconstract/myCooperation/index?index=${index}`
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.user-center{
    height: 100%;
    display: flex;
    flex-direction: column;
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        .user{
            display: flex;
            padding: 0 56rpx 0 36rpx;
            margin-top: 22rpx;
            .avatar{
                .user-avatar{
                    height: 112rpx;
                    width: 112rpx;
                    border-radius: 50%;
                }
            }
            .name{
                font-size: 32rpx;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: Bold;
                text-align: LEFT;
                color: #333333;
                margin-left: 20rpx;
                display: flex;
                align-items: center;
                flex: 1;
            }
            .arrow{
                display: flex;
                align-items: center;
                image{
                    width: 32rpx;
                    height: 32rpx;
                }
            }
            
        }
        uni-card{
            flex: 1;
            position: relative;
            .card-content{
                display: flex;
                justify-content: space-between;
                .info{
                    .item{
                        text-align: center;
                        uni-badge{
                            display: grid;
                            image{
                                height: 64rpx;
                                width: 64rpx;
                                display: block;
                            }
					    }
                        image{
                            height: 64rpx;
                            width: 64rpx;
                            display: block;
                        }
                        .text{
                            font-size: 22rpx;
                            font-family: Microsoft YaHei, Microsoft YaHei-Normal;
                            font-weight: Normal;
                            text-align: LEFT;
                            color: #333333;
                        }
                    }
                }
                .arrow{
                    position: absolute;
                    top: 12px;
                    right: 22rpx;
                    image{
                        width: 32rpx;
                        height: 32rpx;
                    }
                }
                .images{
                    image{
                        width: 128rpx;
                        height: 134rpx;
                        display: block;
                    }
                }
                .block{
                    text-align: center;
                    margin: 0 auto;
                }
            }
            .two{
                justify-content: space-around;
            }

        }
    }
}
</style>