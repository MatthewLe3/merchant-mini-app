<template lang="pug">
.wrapper
    .form
        uni-forms.my-form(
            ref="form"
            :modelValue="formData"
            :rules="rules"
            label-position="top"
        )
            .form-content
                uni-forms-item(
                    v-for='(item,index) in formArray'
                    :key='index'
                    :label="`${item.label}:`"
                    :name="item.key"
                    :required="item.required || false"
                )
                    uni-easyinput(
                        v-if='!item.type'
                        :type="item.format || 'text'" 
                        v-model="formData[item.key]" 
                        :placeholder="`请输入${item.label}`"
                    )
    .submit
            button(@click="submitForm") 提交
</template>

<script>
import {newStore,updateStoreInfo} from '../../service/apis/index'
export default {
    props:{},
    components:{},
    data() {
        return {
            formData:{
                store_id:'',
                store_name:'',
                drs:''
            },
            rules:{
                store_id: {
                    rules: [
                        {
                            required: true,
                            format:'string',
                            errorMessage: '请输入店铺长id',
                        }
                    ],
                    validateTrigger:'submit'
                },
                store_name: {
                    rules: [
                        {
                            required: true,
                            format:'string',
                            errorMessage: '请输入店铺名',
                        }
                    ],
                    validateTrigger:'submit'
                },
                drs: {
                    rules: [
                        {
                            required: true,
                            format:'string',
                            errorMessage: '请输入店铺DRS评分',
                        }
                    ],
                    validateTrigger:'submit'
                },
            },
            formArray:[
                {
                    label:'店铺长id',
                    key:'store_id',
                    required:true,
                },
                {
                    label:'店铺名',
                    key:'store_name',
                    required:true
                },
                {
                    label:'店铺DRS评分',
                    key:'drs',
                    required:true
                },
            ],
            isEdit:false
        };
    },
    computed:{},
    watch:{},
    created(){
        
    },
    mounted(){
        this.handleParams()
    },
    methods:{
        handleParams(){
            let pages = getCurrentPages();
            let curPage = pages[pages.length-1];
            const {store_id,store_name,drs} = curPage.options
            
            if(store_id){
                this.isEdit = true
                this.formData = Object.assign(this.formData,{
                    store_id,
                    store_name,
                    drs
                })
                uni.setNavigationBarTitle({
                    title:'编辑店铺'
                });
            }
        },
        submitForm(){
            this.$refs.form.validate().then(async res=>{
                console.log('表单数据信息：', res)
                let result =  this.isEdit ? await updateStoreInfo(res) : await newStore(res)
                console.log('res',result)
                const {code,msg} = result
                uni.showToast({
                    title: msg,
                    icon:code === 200 ? 'success' : 'error',
                    duration: 1500
                });
                if(code === 200){
                    setTimeout(()=>{
                        uni.navigateBack({});
                    },1500)
                }
            }).catch(err =>{
                console.log('表单错误信息：', err);
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    // background-color: #FFF;
    display: flex;
    flex-direction: column;
    .form{
        flex: 1;
        padding: 20rpx 20rpx;
        overflow-y: scroll;
        .my-form{
            .form-content{
                padding: 0rpx 26rpx;
                height: 100%;
                uni-forms-item{
                    .picker{
                        .uni-input{
                                color: #666666;
                                padding: 14rpx 0 14rpx 10px;
                                box-sizing: border-box;
                                flex-direction: row;
                                align-items: center;
                                border: 1px solid #DCDFE6;
                                border-radius: 4px;
                        }
                    }
                    ::v-deep .uni-forms-item__label{
                        width: fit-content!important;
                    }
                }
            }
            
        }
    }
    .submit{
        padding: 20rpx 20rpx 40rpx 20rpx;
        button{
                font-size: 16px;
                height: 44px;
                line-height: 44px;
                font-weight: 500;
                border-radius: 2px;
                color: #fff;
                background: #0095ff;
        }
    }
}
</style>