<template lang="pug">
    .wechat
        .input  
            uni-easyinput(type="text" v-model="phone" placeholder="请输入微信号")
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
            wechat:''
        };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{
        userInfo:{
            handler(newVal){
                this.wechat = newVal.wechat
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
                wechat:this.wechat
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
                    wechat:this.wechat
                }))
            }
        },
        quit(){
            this.wechat = ''
        }
    }
};
</script>
<style lang="scss" scoped>
.wechat{
    height: 100%;
    .input{
        padding: 46rpx 24rpx 0 24rpx;
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