<template lang="pug">
.content
    scroll-view(:scroll-y="true")
        Preview(:info="info")
    .operator(v-if='!hiddenButton')
        .my-button
            u-button(
                @click="apply"
                type="primary" 
                :plain="true" 
                :text="userInfo.identity_type === 1 ? '申请合作' : 'shangjia'"
            )
</template>

<script>
import Preview from './components/preview/index.vue'
import {getCooperatioInfoById,sendApply} from '../../service/apis/merchant'
import {getUserInfo} from '../../service/apis/index'
import {mapState} from 'vuex'
export default {
    props:{},
    components:{
        Preview
    },
    data() {
        return {
            info:{},
            hiddenButton:true
        };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{},
    created(){},
    async mounted(){
        let pages = getCurrentPages();
        let curPage = pages[pages.length-1];
        const {cooperation_id,hiddenButton} = curPage.options
        console.log('cooperation_id',cooperation_id)
        if(cooperation_id){
            let res = await getCooperatioInfoById({
                cooperation_id
            })
            if(res.code == 200){
                this.info = res.data[0]
            }else{
                console.log('0909')
                uni.showToast({
                    title:res.msg,
                    icon:'none'
                })
            }
            console.log('cooperation_id',res)
        }
        console.log('hiddenButton',hiddenButton)
        if(hiddenButton){
            this.hiddenButton = true 
        }else{
            this.hiddenButton = false 
        }
    },
    methods:{
        async apply(){
            console.log('userInfo',this.userInfo.openid)
            let res = await sendApply({
                cooperation_id:this.info.id,
                anchor_openid:this.userInfo.openid
            })
            console.log('申请合作',res)
            if(res.code ==200){
                
                uni.showToast({
                    title:res.msg,
                    icon:'none'
                })
            }else{
                uni.showToast({
                    title:res.msg,
                    icon:'none'
                })
            }
            setTimeout(()=>{
                uni.redirectTo({
                    url:`/subconstract/actorHome/index`
                })
            },1500)
        }
    }
};
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    scroll-view{
        height: calc(100% - 150rpx);
        padding-bottom: 50rpx;
    }
    .operator{
        position: fixed;
        width: 100%;
        bottom: 45rpx;
        .my-button{
            width: 300rpx;
            margin: 0 auto;
        }
    }
}
</style>