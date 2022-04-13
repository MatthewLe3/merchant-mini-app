<template lang="pug">
scroll-view.my-form
    u--form(
        labelPosition="left" 
        :model="expressInfo" 
        ref="form"
        :rules="rules"
        labelWidth="73"
    )
        u-form-item(
            label="快递公司" 
            prop="delivery_company" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="expressInfo.delivery_company" 
                border="none"
                placeholder="填写快递公司"
            )
        u-form-item(
            label="发货地址" 
            prop="shipping_addresses" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="expressInfo.shipping_addresses" 
                border="none"
                placeholder="填写发货地址"
            )
        u-form-item(
            label="发货周期" 
            prop="shipping_cycle" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="expressInfo.shipping_cycle" 
                border="none"
                placeholder="填写发货周期"
            )
        u-form-item(
            label="包邮地区" 
            prop="free_shipping" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="expressInfo.free_shipping" 
                border="none"
                placeholder="填写包邮地区"
            )
        u-form-item(
            label="不发货区" 
            prop="not_shipping" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="expressInfo.not_shipping" 
                border="none"
                placeholder="填写不发货区"
            )
</template>

<script>
export default {
    props:{},
    components:{},
    data() {
        return {
            expressInfo: {
                delivery_company: '',
                shipping_addresses: '',
                shipping_cycle: '',
                free_shipping:'',
                not_shipping:""
            },
            rules:{
                'delivery_company': {
                    type: 'string',
                    required: false
                },
                'shipping_addresses': {
                    type: 'string',
                    required: false
                },
                'shipping_cycle': {
                    type: 'string',
                    required: false
                },
                'free_shipping': {
                    type: 'string',
                    required: false
                },
                'not_shipping': {
                    type: 'string',
                    required: false
                }
            }
        };
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{
        async submit(){
            let _this = this
            try {
                let res  = await this.$refs.form.validate()
                if(res){
                    return _this.expressInfo
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