<template lang="pug">
    .user-info 
        .tabs(
            v-for='(item,index) in tabData' 
            :key="index"
            @click="changeInfo(item.pageName)"
        )
            .label {{item.label}}
            uni-icons(
                class='icon'
                type='forward'
            )
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{},
    components:{},
    data() {
        return {
        };
    },
    computed:{
        ...mapState(['userInfo']),
        tabData:function(){
            console.log('this.userInfo.identity_type',this.userInfo.identity_type)
            if(this.userInfo.identity_type === 2){
                return [
                    {
                        label:'手机号',
                        pageName:'phone'
                    },
                    {
                        label:'收货地址',
                        pageName:'address'
                    },
                    {
                        label:'微信号',
                        pageName:'wechat'
                    },
                    {
                        label:'我的店铺',
                        pageName:'myStore'
                    }
                ]
            }else{
                return [
                    {
                        label:'手机号',
                        pageName:'phone'
                    },
                    {
                        label:'收货地址',
                        pageName:'address'
                    },
                    {
                        label:'微信号',
                        pageName:'wechat'
                    }
                ]
            }
        }
    },
    watch:{},
    created(){},
    mounted(){},
    methods:{
        changeInfo(page){
            uni.navigateTo({
                url: `/pages/${page}/index`
            })
        }
    }
    };
</script>
<style lang="scss" scoped>
.user-info{
    height: 100%;
    display: flex;
    flex-direction: column;
    .tabs{
        display: flex;
        padding: 32rpx 30rpx 30rpx 30rpx;
        border-bottom: 1px dotted #333333;
        .label{
            flex: 1;
            font-size: 28rpx;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: Bold;
            text-align: LEFT;
            color: #333333;
            line-height: 40rpx;
            display: flex;
            align-items: center;
        }
        uni-icons{
            font-size: 48rpx;
            display: flex;
            align-items: center;
        }
    }
}
</style>