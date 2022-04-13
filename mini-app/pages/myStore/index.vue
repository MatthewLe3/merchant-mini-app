<template lang="pug">
.my-store
    .empty(v-if='!shopList.length')
        XwEmpty(
            :isShow="true" 
            text="暂无相关数据" 
            textColor="#777777"
        )
    .store-list(
        v-else
    )
        uni-card(
            v-for='(item,index) in shopList'
            :key="index"
            :title="item.store_name" 
        )
            .card-content
                .id {{`id:${item.store_id}`}}
                .drs {{`drs:${item.drs}`}}
            .operator
                button(@click='edit(item)') 修改
                button(@click='del(item.store_id)') 删除 
</template>

<script>
import {getStoreInfo,deleteStore} from '../../service/apis/index'
import XwEmpty from '../../components/xw-empty/xw-empty.vue' 
export default {
    props:{},
    components:{
        XwEmpty
    },
    data() {
        return {
            shopList:[]
        };
    },
    computed:{},
    watch:{},
    created(){
        this.getData()    
    },
    mounted(){},
    methods:{
        async getData(){
            let res = await getStoreInfo()
            const {code,data,msg} = res
            if(code === 200){
                this.shopList = data
            }else{
                uni.showToast({
                    title: msg,
                    icon:'error',
                    duration: 1500
                })
            }
        },
        async del(id){
            let _this = this
            uni.showModal({
                title: '提示',
                content: '确认删除？',
                success: async function (res) {
                    if (res.confirm) {
                        let res = await deleteStore({
                            store_id:id
                        })
                        const {code,msg} = res
                        uni.showToast({
                            title: msg,
                            icon:code === 200 ? 'success' : 'error',
                            duration: 1500
                        });
                        if(code === 200){
                            _this.getData()
                        }
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            
        },
        edit(item){
            uni.navigateTo({
                url: `/pages/addStore/index?store_id=${item.store_id}&store_name=${item.store_name}&drs=${item.drs}`
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.my-store{
    height: 100%;
    .store-list{
        uni-card{
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
    }
}
</style>