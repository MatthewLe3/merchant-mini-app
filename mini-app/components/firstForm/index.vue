<template lang="pug">
scroll-view.my-form
    u--form(
        labelPosition="left" 
        :model="shopInfo" 
        :rules="rules" 
        ref="form"
        labelWidth="73"
    )
        u-form-item(
            label="商铺名称" 
            prop="store_name" 
            borderBottom 
            ref="item1"
            @click="showCol = true; hideKeyboard()"
        )
            u--input(
                v-model="shopInfo.store_name" 
                disabled 
                disabledColor="#f6f6f6" 
                placeholder="填写商铺名称"
                border="none"
            )
            u-icon(
                slot="right" 
                name="arrow-right" 
            )

        u-form-item(
            label="商铺ID" 
            prop="store_id" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="shopInfo.store_id" 
                border="none"
                placeholder="填写抖音商铺ID"
            )
        
        u-form-item(
            label="DRS评分" 
            prop="store_drs" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="shopInfo.store_drs" 
                border="none"
                placeholder="填写DRS评分"
            )
    u-picker(
        :show="showCol" 
        :columns="columns"
        keyName="name"
        @close="handleClose"
        @confirm="handleConfirm"
        @cancel="handleClose"
    )
</template>

<script>
export default {
    props:{},
    components:{},
    data() {
        return {
            shopInfo: {
                store_name: '',
                store_id: '',
                store_drs: '',
            },
            showCol: false,
            columns: [
                [
                    {
                        name:'a',
                        id:1
                    },
                    {
                        name:'b',
                        id:2
                    },
                    {
                        name:'c',
                        id:3
                    },
                ]
            ],
            rules: {
                'store_name': {
                    type: 'string',
                    required: true,
                    message: '请选择商铺名称',
                    trigger: ['blur', 'change']
                },
                'store_drs': {
                    type: 'string',
                    required: true,
                    message: '请填写商铺ID',
                    trigger: ['blur', 'change']
                },
                'store_id': {
                    type: 'string',
                    required: true,
                    message: '请填写DRS评分',
                    trigger: ['blur', 'change']
                },
            },
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
                    return _this.shopInfo
                }
                return
            } catch (error) {
                return
            }
        },
        handleClose(){
            this.showCol = false
        },
        handleConfirm(e){
            const {value} = e
            this.shopInfo.store_name = value[0].name
            this.showCol = false
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