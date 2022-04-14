<template lang="pug">
scroll-view.my-form
    u--form(
        labelPosition="left" 
        :model="priceInfo" 
        ref="form"
        :rules="rules"
        labelWidth="73"
    )
        u-form-item(
            label="日常价格" 
            prop="daily_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.daily_price" 
                border="none"
                placeholder="填写日常价格"
            )
        u-form-item(
            label="历史最低" 
            prop="lowest_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.lowest_price" 
                border="none"
                placeholder="填写历史最低价"
            )
        u-form-item(
            label="直播价格" 
            prop="live_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.live_price" 
                border="none"
                placeholder="填写直播价格"
            )
        u-form-item(
            label="直播优惠方式" 
            prop="preferential_way" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="priceInfo.preferential_way" 
                border="none"
                placeholder="填写优惠方式"
            )
        u-form-item(
            label="天猫价格" 
            prop="tmall_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.tmall_price" 
                border="none"
                placeholder="填写天猫价格"
            )
        u-form-item(
            label="淘宝价格" 
            prop="taobao_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.taobao_price" 
                border="none"
                placeholder="填写淘宝价格"
            )
        
        u-form-item(
            label="其他平台价格" 
            prop="other_price" 
            borderBottom 
            ref="item1"
            type='number'
        )
            u--input(
                v-model="priceInfo.other_price" 
                border="none"
                placeholder="填写其他平台价格"
            )
</template>

<script>
export default {
    props:{
        goodsInfo:{
            type:Object,
            default:()=>{}
        }
    },
    components:{},
    data() {
        return {
            priceInfo: {
                daily_price: '',
                lowest_price: '',
                live_price: '',
                preferential_way:'',
                tmall_price:"",
                taobao_price:"",
                other_price:""
            },
            rules:{
                'daily_price': {
                    type: 'number',
                    required: false
                },
                'lowest_price': {
                    type: 'number',
                    required: false
                },
                'live_price': {
                    type: 'number',
                    required: false
                },
                'preferential_way': {
                    type: 'string',
                    required: false
                },
                'tmall_price': {
                    type: 'number',
                    required: false
                },
                'taobao_price': {
                    type: 'number',
                    required: false
                },
                'other_price': {
                    type: 'number',
                    required: false
                },
            }
        };
    },
    computed:{},
    watch:{
        goodsInfo:{
            handler:function(newVal){
                this.priceInfo = Object.assign(this.priceInfo,newVal)
            },
            immediate:true
        }
        
    },
    created(){},
    mounted(){},
    methods:{
        async submit(){
            let _this = this
            try {
                let res  = await this.$refs.form.validate()
                if(res){
                    return _this.priceInfo
                }
                return
            } catch (error) {
                return
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.my-form{
    padding: 20rpx 32rpx 0 32rpx;
    max-height: 1110rpx;
    box-sizing: border-box;
}
</style>