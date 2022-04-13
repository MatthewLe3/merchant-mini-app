<template lang="pug">
scroll-view.my-form
    u--form(
        labelPosition="left" 
        :model="otherInfo" 
        ref="form"
        :rules="rules"
        labelWidth="73"
    )
        u-form-item(
            label="备注信息" 
            prop="comment" 
            borderBottom 
            ref="item1"
        )
            u--textarea(
                v-model="otherInfo.comment" 
                border="none"
                placeholder="其他备注信息"
            )
</template>

<script>
export default {
    props:{},
    components:{},
    data() {
        return {
            otherInfo: {
                comment: ''
            },
            rules:{
                'comment': {
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
                    return _this.otherInfo
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