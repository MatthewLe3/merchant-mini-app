<template lang="pug">
    .address
        .info
            .item
                .label 收件人姓名
                .input  
                    uni-easyinput(
                        type="text" 
                        v-model="form.name" 
                        placeholder="请输入收件人姓名"
                    )
            .item
                .label 收件地址
                .input  
                    uni-easyinput(
                        type="text" 
                        v-model="form.address" 
                        placeholder="请输入收件人地址"
                    )
        .operator
            button(@click="finish") 完成
            button(@click="quit") 取消
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { updateUserInfo } from '../../service/apis';
export default {
    props:{},
    components:{},
    data() {
        return {
            form:{
                name:'',
                address:''
            }
        };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{
        userInfo:{
            handler(newVal){
                this.form.name = newVal.real_name
                this.form.address = newVal.shipping_address
            },
            immediate:true
        }
    },
    created(){},
    mounted(){},
    methods:{
        ...mapMutations({
            setUserInfo:"setUserInfo"
        }),
        async finish(){
            let res = await updateUserInfo({
                shipping_address:this.form.address,
                real_name:this.form.name
            })
            const {code,msg} = res;
            uni.showToast({
                title: msg,
                icon:code === 200 ? 'success' : 'error',
                duration: 1500
            });

            if(code == 200){
                this.setUserInfo(Object.assign(this.userInfo,{
                    shipping_address:this.form.address,
                    real_name:this.form.name
                }))
            }
        },
        quit(){
            this.form = Object.assign(this.form,{
                name:'',
                address:''
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.address{
    height: 100%;
    .info{
        display: flex;
        flex-direction: column;
        padding: 0 26rpx;
        .item{
            display: flex;
            align-items: center;
            margin-top: 34rpx;
            .label{
                width: 170rpx;
            }
            .input{
                flex: 1;
                uni-easyinput{
                    width: 100%;
                }
            }
        }
    }
    .operator{
        display: flex;
        justify-content: flex-end;
        padding: 20rpx 24rpx 0 24rpx;
        button{
            margin: 0;
            margin-right: 16rpx;
            height: 68rpx;
            width: 126rpx;
            background: #ffffff;
            border-radius: 8rpx;
            font-size: 28rpx;
            font-family: Microsoft YaHei, Microsoft YaHei-Normal;
            font-weight: Normal;
            text-align: CENTER;
            color: #333333;
        }
        :last-child{
            margin-right: 0;
        }
    }
}
</style>