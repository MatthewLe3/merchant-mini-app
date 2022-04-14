<template lang="pug">
scroll-view.my-form
    u--form(
        labelPosition="left" 
        :model="commissionInfo" 
        ref="form"
        :rules="rules"
        labelWidth="73"
    )
        u-form-item(
            label="佣金比例" 
            prop="commission_rate" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="commissionInfo.commission_rate" 
                border="none"
                type="number"
                placeholder="0-100（%）"
            )
        u-form-item(
            label="坑位费" 
            prop="pos_price" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="commissionInfo.pos_price" 
                border="none"
                type="number"
                placeholder="填写坑位费"
            )
</template>

<script>
export default {
    props:{
        info:{
            type:Object,
            default:()=>{}
        }
    },
    components:{},
    data() {
        return {
            commissionInfo: {
                commission_rate: '',
                pos_price: ''
            },
            rules:{
                'commission_rate': {
                    type: 'number',
                    required: false
                },
                'pos_price': {
                    type: 'number',
                    required: false
                }
            }
        };
    },
    computed:{},
    watch:{
        info:{
            handler:function(newVal){
                console.log('diwubu',newVal)
                this.commissionInfo = Object.assign(this.commissionInfo,newVal)
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
                    return _this.commissionInfo
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