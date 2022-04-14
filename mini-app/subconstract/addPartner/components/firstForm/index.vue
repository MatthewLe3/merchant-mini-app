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
        )
            u--input(
                v-model="shopInfo.store_name" 
                disabledColor="#f6f6f6" 
                placeholder="填写商铺名称"
                border="none"
            )
            u-icon(
                slot="right"
                name="arrow-right" 
                @click='selectShop'
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
                type="number"
                placeholder="填写抖音商铺ID"
            )
        
        u-form-item(
            label="DRS评分" 
            prop="drs" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="shopInfo.drs" 
                border="none"
                placeholder="填写DRS评分"
            )
    u-picker(
        :show="showCol" 
        :columns="columns"
        keyName="store_name"
        @close="handleClose"
        @confirm="handleConfirm"
        @cancel="handleClose"
    )
</template>

<script>
import {mapState} from 'vuex'
import {newStore} from '../../../../service/apis/index'
export default {
    props:{},
    components:{},
    data() {
        return {
            shopInfo: {
                store_name: '',
                store_id: '',
                drs: '',
            },
            showCol: false,
            columns: [[]],
            rules: {
                'store_name': {
                    type: 'string',
                    required: true,
                    message: '请选择商铺名称',
                    trigger: ['blur', 'change']
                },
                'store_id': {
                    type: 'string',
                    required: true,
                    message: '请填写商铺ID',
                    trigger: ['blur', 'change']
                },
                'drs': {
                    type: 'number',
                    required: true,
                    message: '请填写DRS评分',
                    trigger: ['blur', 'change']
                },
            },
        };
    },
    computed:{
        ...mapState(['storeArr'])
    },
    watch:{
        storeArr:{
            handler:function(newVal){
                this.$set(this.columns,0,newVal)
                // this.columns[0] = newVal
            },
            immediate:true
        }
    },
    created(){},
    mounted(){},
    methods:{
        async submit(){
            // 判断店铺是否为新增，新增调用新增接口
            let _this = this
            try {
                let res  = await this.$refs.form.validate()
                if(res){
                    let hasShop = false
                    this.columns[0].forEach(item => {
                        if(item.store_id == _this.shopInfo.store_id) hasShop = true
                    });
                    if(!hasShop){
                        let result = await newStore(_this.shopInfo)
                        uni.showToast({
                            title: result.code == 200 ? '店铺添加成功' : '店铺添加失败',
                            icon:'none',
                            duration: 1500
                        });
                        
                        return result.code == 200 ? _this.shopInfo : false
                    }else{
                        return _this.shopInfo
                    }
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
            console.log('vvv',value[0])
            // this.shopInfo.store_name = value[0].name
            this.shopInfo = Object.assign(this.shopInfo,value[0])
            this.showCol = false
        },
        selectShop(){
            console.log('click')
            this.showCol = true
        },
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