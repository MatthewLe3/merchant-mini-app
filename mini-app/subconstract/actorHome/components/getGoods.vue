<template lang="pug">
.get-goods
    .title {{`${nickName}主播的领样申请`}}
    .content
        .info
            .label 商品名称：
            .text {{info.goods_name || '-'}}
        .info
            .label 佣金：
            .text {{info.commission_rate || '-'}}%
        .info
            .label 价格：
            .text {{info.live_price || '-'}}%
        .info.textarea
            .label 备注留言：（一些数量，要求等）
            u--textarea(
                v-model="remark" 
                placeholder="请输入内容"
            )
        .info.textarea
            .label 快递收货地址
            u--textarea(
                v-model="address" 
                placeholder="请输入内容"
            )
    .operator
        u-button.my-button(
            :plain="true" 
            text="发送申请给商家"
            @click='apply'
        )
</template>

<script>
import { getUserInfo } from '../../../service/apis';
import {sendSample,applyForSample} from '../../../service/apis/merchant'
export default {
    props:{
        info:{
            type:Object,
            default:()=>{}
        },
        nickName:{
            type:String,
            default:()=>''
        }
    },
    components:{},
    data() {
        return {
            remark:'',
            address:''
        };
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{
        async apply(){
            

            let userInfo = await getUserInfo()
            console.log('vvv',userInfo,this.info)
            const {real_name,phone_number} = userInfo.data

            if(!this.remark || !this.address){
                uni.showToast({
                    title: '请将申请信息填写完整',
                    icon:'none',
                    duration: 1500
                });
                return
            }

            if(!real_name || !phone_number){
                uni.showToast({
                    title: '请在个人中心完善个人信息',
                    icon:'none',
                    duration: 1500
                });
                return
            }

            let res = await applyForSample({
                cooperation_id:this.info.id,
                anchor_name:real_name,
                anchor_phone_number:phone_number,
                anchor_shipping_address:this.address,
                sample_count:1
            })

            if(res.code == 200){
                this.$emit('refresh')
                uni.showToast({
                    title:res.msg,
                    icon:'none'
                })
            }

            console.log('applyForSample',res)

        }
    }
};
</script>
<style lang="scss" scoped>
.get-goods{
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 20rpx 30rpx;
    .content{
        .info{
            display: flex;
            margin-top: 20rpx;
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
        .textarea{
            flex-direction: column;
            .label{
                width: fit-content;
                margin-bottom: 20rpx;
            }
        }
    }
    .operator{
        text-align: right;
        margin-top: 20rpx;
        .my-button{
            padding-left: 20rpx;
            padding-right: 20rpx;
        }
    }
}
</style>