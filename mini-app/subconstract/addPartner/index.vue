<template lang="pug">
.add-partner
    uni-nav-bar.my-bar(
        :fixed="true"
        title="填写合作信息" 
        @clickLeft="back"
        :height="navHeight + 'px'"
        color="#000"
        backgroundColor="#f6f6f6"
    )
        block.left-block(slot="left")
            button 取消
    .content
        uni-steps(
            :options="list" 
            :active="active"
            activeColor="#58be69"
        )

        .form-content
            FirstForm(
                v-show='active === 0'
                ref="firstForm"
            )
            SecondForm(
                v-show='active === 1'
                ref="secondForm"
            )
            ThirdForm(
                v-show='active === 2'
                ref="thirdForm"
            )
            FourthForm(
                v-show='active === 3'
                ref="fourthForm"
            )
            FifthForm(
                v-show='active === 4'
                ref="fifthForm"
            )
            OtherForm(
                v-show='active === 5'
                ref="otherForm"
            )
            //- MyForm(
            //-     v-if='active === 0'
            //-     :data="firstArr"
            //- )

            //- MyForm.second-form(
            //-     v-if='active === 1'
            //-     :data="secondArr"
            //- )
        
        button.first-btn(
            v-if='active == 0'
            @click="nextStep(0)"
        ) 下一步

        .operator(
            v-if='active != 0'
        )
            button(@click="active-=1") 上一步
            button(@click="nextStep(active)") {{active == 5 ? '提交合作单' : '下一步'}}
        

</template>

<script>
// import MyForm from '../../components/myForm/index.vue'
import FirstForm from '@/components/firstForm/index.vue'
import SecondForm from '@/components/secondForm/index.vue'
import ThirdForm from '@/components/thirdForm/index.vue'
import FourthForm from '@/components/fourthForm/index.vue'
import FifthForm from '@/components/fifthForm/index.vue'
import OtherForm from '@/components/otherForm/index.vue'

export default {
    props:{},
    components:{
        // MyForm
        FirstForm,
        SecondForm,
        ThirdForm,
        FourthForm,
        FifthForm,
        OtherForm
    },
    data() {
        return {
            navHeight:0,
            list:[
                {title:'商铺信息'},
                {title:'商品信息'},
                {title:'价格信息'},
                {title:'快递信息'},
                {title:'佣金信息'},
                {title:'其他'}
            ],
            active:0
        };
    },
    computed:{
    },
    watch:{},
    created(){
        let _this = this
        uni.getSystemInfo({
                success:function(e){
                    let custom = uni.getMenuButtonBoundingClientRect();
                    console.log('vvvvv',custom.bottom + custom.top - e.statusBarHeight + 4)
                    _this.navHeight =  custom.bottom + custom.top - e.statusBarHeight + 4
                }
            })
    },
    mounted(){
    },
    methods:{
        back(){
            uni.navigateBack({})
        },
        async nextStep(current){
            switch (current) {
                case 0:
                    console.log(this.$refs)
                    let shopInfo = await this.$refs.firstForm.submit()
                    console.log('shopInfo',shopInfo)
                    if(shopInfo){
                        this.active = current +1
                    }
                    break;
                case 1:
                    let goodsInfo = await this.$refs.secondForm.submit()
                    console.log('goodsInfo',goodsInfo)
                    if(goodsInfo){
                        this.active = current +1
                    }
                    break;
                case 2:
                    let priceInfo = await this.$refs.thirdForm.submit()
                    console.log('priceInfo',priceInfo)
                    if(priceInfo){
                        this.active = current +1
                    }
                    break;
                case 3:
                    let expressInfo = await this.$refs.fourthForm.submit()
                    console.log('expressInfo',expressInfo)
                    if(expressInfo){
                        this.active = current +1
                    }
                    break;
                case 4:
                    let commissionInfo = await this.$refs.fifthForm.submit()
                    console.log('commissionInfo',commissionInfo)
                    if(commissionInfo){
                        this.active = current +1
                    }
                    break;
                case 5:
                    let otherInfo = await this.$refs.otherForm.submit()
                    console.log('otherInfo',otherInfo)
                    if(otherInfo){
                        // this.active = current +1
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.add-partner{
    height: 100%;
    display: flex;
    flex-direction: column;
    .my-bar{
        ::v-deep .uni-navbar__header-container-inner{
            position: relative;
            .uni-nav-bar-text {
                    position: absolute;
                    bottom: 25rpx;
            }
        }
        .left-block{
            button{
                font-size: 28rpx;
                font-family: SimHei, SimHei-Normal;
                font-weight: Normal;
                text-align: CENTER;
                color: #58be69;
                border: 1px solid #58be69;
                position: absolute;
                padding: 0 24rpx;
                line-height: 2;
                bottom: 20rpx;
            }
        }
    }
    .content{
        flex: 1;
        margin-top: 44rpx;
        padding-bottom: 152rpx;
        .second-form{
            
        }
        .first-btn{
            width: 394rpx;
            height: 96rpx;
            background: #58be69;
            font-size: 28rpx;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: Bold;
            text-align: CENTER;
            color: #ffffff;
            line-height: 96rpx;
            position: fixed;
            bottom: 400rpx;
            left: 50%;
            transform: translateX(-50%);
        }
        .operator{
            width: 100%;
            height: 102rpx;
            position: fixed;
            display: flex;
            justify-content: space-between;
            padding: 0 32rpx 0 32rpx;
            box-sizing: border-box;
            bottom: 50rpx;
            button{
                width: 292rpx;
                height: 96rpx;
                background: #58be69;
                font-size: 28rpx;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: Bold;
                text-align: CENTER;
                color: #ffffff;
                line-height: 96rpx;
            }
        }
    }
}
</style>