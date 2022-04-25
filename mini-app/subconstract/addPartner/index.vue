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
            v-show='active != 6'
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
                :goodsList="goodsList"
                @updateGoodsInfo="updateGoodsInfo"
                ref="secondForm"
            )
            ThirdForm(
                v-show='active === 2'
                :goodsInfo="info"
                ref="thirdForm"
            )
            FourthForm(
                v-show='active === 3'
                :info="info"
                ref="fourthForm"
            )
            FifthForm(
                v-show='active === 4'
                :info="info"
                ref="fifthForm"
            )
            OtherForm(
                v-show='active === 5'
                :info="info"
                ref="otherForm"
            )
        scroll-view.preview(
            :scroll-y="true"
            v-show='active === 6'
        )
            Preview(
                :info="info"
            )
        
        button.first-btn(
            v-if='active == 0'
            @click="nextStep(0)"
        ) 下一步

        .operator(
            v-if='active != 0 && active != 6'
        )
            button(@click="active-=1") 上一步
            button(@click="nextStep(active)") {{active == 5 ? '提交合作单' : '下一步'}}

        .operator(
            v-if='active == 6'
        )
            button(@click="active=0") 修改
            button(@click="showShare = true") 发送给主播

        u-modal(
            :show="showShare" 
            :title="'申请合作'" 
            :showConfirmButton="true"
            :showCancelButton="true"
            @cancel="showShare=false"
            @confirm="confirm"
        )
            .modal-content(slot="default")
                //- u-icon(
                //-     @click="shareFriend"
                //-     label="点击此处转发给主播" 
                //-     size="40"
                //-     name="server-man"
                //- )
                u-checkbox-group(
                    v-model="selectedAnchor"
                    iconPlacement="right" 
                    placement="column"
                )
                    u-checkbox(
                        :customStyle="{marginBottom: '8px'}"
                        v-for="(item, index) in anchorList"
                        :key="index"
                        :label="item.name"
                        :name="item.id"
                    )
                u-button(
                    open-type="share"
                    icon="server-man" 
                    text="点击此处转发给主播"
                )
        u-modal(
            :show="showContinue" 
            content="是否继续上传商品？"
            :showConfirmButton="true"
            :showCancelButton="true"
            @confirm="handleConfirm"
            @cancel="showContinue=false"
        )
        

</template>

<script>
// import MyForm from '../../components/myForm/index.vue'
import {addGoods,updateGoods} from '../../service/apis/index'
import {getStoreGoodsInfo,newCooperation,sendApply,updateCooperationInfo} from '../../service/apis/merchant'
import FirstForm from './components/firstForm/index.vue'
import SecondForm from './components/secondForm/index.vue'
import ThirdForm from './components/thirdForm/index.vue'
import FourthForm from './components/fourthForm/index.vue'
import FifthForm from './components/fifthForm/index.vue'
import OtherForm from './components/otherForm/index.vue'
import Preview from './components/preview/index.vue'
import {mapState,mapMutations} from 'vuex'
export default {
    props:{},
    components:{
        // MyForm
        FirstForm,
        SecondForm,
        ThirdForm,
        FourthForm,
        FifthForm,
        OtherForm,
        Preview
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
            active:0,
            goodsList:[],
            info:{},
            goodsInfo:{},
            showShare:false,
            showContinue:false,
            
            goods_id:0,
            anchorList:[
                // {
                //     id:'oJ92T5V3wWVuP55sPZytRYjGulf8',
                //     name:'测试账号'
                // }
            ],
            selectedAnchor:[]
        };
    },
    computed:{
        ...mapState(['shareStatus']),
        // share:function(){
        //     return {
        //         title:'商品详情',
        //         path:`/pages/login/index?cooperation_id=${this.info.cooperation_id}`,
        //         imageUrl:'',
        //         desc:'我上架了一款商品，快来合作吧。',
        //         content:'我上架了一款商品，快来合作吧。'
        //     }
        // }
    },
    watch:{
        shareStatus:function(newVal){
            if(newVal){
                this.continue()
                this.setShareStatus(false)
            }
        }
    },
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
        setTimeout(()=>{
            if(this.shareStatus){
                this.continue()
            }
        },100)

        let routes = getCurrentPages()
		let curPage = routes[routes.length -1]
        const {openid,name,nickName} = curPage.options
        if(openid){
            this.anchorList.push({
                id:openid,
                name,
                nickName
            })
        }

    },
    methods:{
        ...mapMutations({
            setShareStatus:"setShareStatus"
        }),
        back(){
            // uni.navigateBack({})
            uni.redirectTo({
                url: `/subconstract/merchantHome/index`
            })
        },
        async nextStep(current){
            switch (current) {
                case 0:
                    let shopInfo = await this.$refs.firstForm.submit()
                    if(shopInfo){
                        this.info = Object.assign(this.info,shopInfo)
                        const {store_id} = shopInfo
                        let res = await getStoreGoodsInfo({
                            store_id
                        })
                        this.goodsList = res.data || []
                        this.active = current +1
                    }
                    break;
                case 1:
                    let goodsInfo = await this.$refs.secondForm.submit()
                    if(goodsInfo){
                        console.log('goodsInfo',goodsInfo)
                        this.info = Object.assign(this.info,this.goodsInfo,goodsInfo,{
                            pic_path:goodsInfo.pic_path.length ? goodsInfo.pic_path[0].url : '',
                            live_recording_screen_path:goodsInfo.live_recording_screen_path.length ? goodsInfo.live_recording_screen_path[0].url : '',
                        })
                        this.active = current +1
                        console.log('info',this.info)
                    }
                    break;
                case 2:
                    let priceInfo = await this.$refs.thirdForm.submit()
                    console.log('priceInfo',priceInfo)
                    if(priceInfo){
                        this.info = Object.assign(this.info,priceInfo)
                        this.active = current +1
                        console.log('info',this.info)
                    }
                    break;
                case 3:
                    let expressInfo = await this.$refs.fourthForm.submit()
                    console.log('expressInfo',expressInfo)
                    if(expressInfo){
                        this.info = Object.assign(this.info,expressInfo)
                        this.active = current +1
                        console.log('info',this.info)
                    }
                    break;
                case 4:
                    let commissionInfo = await this.$refs.fifthForm.submit()
                    console.log('commissionInfo',commissionInfo)
                    if(commissionInfo){
                        this.info = Object.assign(this.info,commissionInfo)
                        this.active = current +1
                        console.log('info',this.info)
                    }
                    break;
                case 5:
                    let otherInfo = await this.$refs.otherForm.submit()
                    console.log('otherInfo',otherInfo)
                    if(otherInfo){
                        this.info = Object.assign(this.info,otherInfo)
                        console.log('info',this.info)
                        // this.active = current +1
                    }
                    let obj = {}
                    if(this.info.id){
                        obj = Object.assign(this.info,{
                            goods_id:this.info.id
                        })
                        
                        delete obj.id

                    }else{
                        obj = this.info
                    }

                    let res = obj.goods_id ? await updateGoods(obj) : await addGoods(obj)
                    this.goods_id = obj.goods_id || res.data.goods_id
                    this.info = Object.assign({},obj,{
                        goods_id:this.goods_id
                    })
                    delete this.info.id

                    // 提交合作单
                    let result
                    if(this.info.cooperation_id){
                        result = await updateCooperationInfo(this.info)
                        console.log('修改',result)
                    }else{
                        result = await newCooperation(this.info)
                        console.log('新建',result)
                    }
                    


                    if(result.code  == 200){
                        this.active += 1
                        this.info = Object.assign({},obj,{
                            cooperation_id:result.data.cooperation_id
                        })


                        this.share = Object.assign({},{
                            title:'商品详情',
                            path:`/pages/login/index?cooperation_id=${this.info.cooperation_id}`,
                            imageUrl:'',
                            desc:'我上架了一款商品，快来合作吧。',
                            content:'我上架了一款商品，快来合作吧。'
                        })
                    }
                    uni.showToast({
                        title: result.msg,
                        icon:'none',
                        duration: 1500
                    });

                    break;
            
                default:
                    break;
            }
        },
        updateGoodsInfo(value){
            this.goodsInfo = value
        },
        handleConfirm(){
            this.showContinue = false
            this.active = 0
            this.info = {}
        },
        continue(){
            console.log('vvvv')
            this.showShare = false
            this.showContinue = true
        },
        // onShareAppMessage(res) {
        //     this.setShareStatus(true)
        //     return {
        //         title:this.share.title,
        //         path:this.share.path,
        //         imageUrl:this.share.imageUrl,
        //         desc:this.share.desc,
        //         content:this.share.content,
        //         success(res){
        //             uni.showToast({
        //                 title:'分享成功'
        //             })
        //         },
        //         fail(res){
        //             uni.showToast({
        //                 title:'分享失败',
        //                 icon:'none'
        //             })
        //         }
        //     }
        // },
        async confirm(){
            console.log('config',this.selectedAnchor)
            if(this.selectedAnchor.length){
                let res = await sendApply({
                    anchor_openid:this.selectedAnchor[0],
                    cooperation_id:this.info.cooperation_id
                })
                console.log('sendApply',res)
                uni.showToast({
                    title:res.msg,
                    icon:'none'
                })
            }else{
                uni.showToast({
                    title:'请选择主播',
                    icon:'none'
                })
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
        .preview{
            margin-top: -44rpx;
            max-height: 1290rpx;
        }
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
.modal-content{
    // margin:0 auto;
}
</style>