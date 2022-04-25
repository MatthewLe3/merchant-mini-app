<template lang="pug">
scroll-view.my-form
    u--form.form(
        labelPosition="left" 
        :model="goodsInfo" 
        :rules="rules" 
        ref="form"
        labelWidth="73"
    )
        u-form-item(
            label="名称" 
            prop="goods_name" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.goods_name" 
                disabledColor="#f6f6f6" 
                placeholder="填写商品名称"
                border="none"
            )
            u-icon(
                slot="right" 
                name="arrow-right" 
                @click='selectGoods'
            )

        u-form-item(
            label="品牌" 
            prop="brand" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.brand" 
                border="none"
                placeholder="填写商品品牌"
            )
        u-form-item(
            label="规格" 
            prop="specification" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.specification" 
                border="none"
                placeholder="填写商品规格"
            )
        u-form-item(
            label="存储条件" 
            prop="storage_condition" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.storage_condition" 
                border="none"
                placeholder="填写存储条件"
            )
        u-form-item(
            label="保质期" 
            prop="shelf_life" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.shelf_life" 
                border="none"
                type="number"
                placeholder="填写保质期（天）"
            )
        u-form-item(
            label="不适用" 
            prop="unsuitable_people" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.unsuitable_people" 
                border="none"
                placeholder="填写不适用人群"
            )
        u-form-item(
            label="好评率" 
            prop="favorable_rate" 
            borderBottom 
            type="number"
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.favorable_rate" 
                border="none"
                placeholder="0-100（新品填0）"
            )
        u-form-item(
            label="商品链接" 
            prop="goods_url" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.goods_url" 
                border="none"
                placeholder="填写商品链接"
            )
        u-form-item(
            label="商品卖点" 
            prop="selling_point" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="goodsInfo.selling_point" 
                border="none"
                placeholder="精炼三条填写"
            )
        u-form-item.my-upload(
            label="商品图片" 
            prop="pic_path" 
            borderBottom 
            ref="item1"
        )   
            u-upload(
                :fileList="goodsInfo.pic_path" 
                @afterRead="afterRead" 
                @delete="deletePic" 
                :maxCount="1"  
            )
        u-form-item.my-upload(
            label="其他主播视频" 
            prop="live_recording_screen_path" 
            borderBottom 
            ref="item1"
        )
            u-upload(
                :fileList="goodsInfo.live_recording_screen_path" 
                @afterRead="afterReadVideo" 
                @delete="deleteVideo" 
                :previewFullImage="true"
                :maxCount="1"  
                accept="video"
            )
            .text(
                style='color:#7f7f7f'
            ) 上传其他主播直播视频，更容易被主播挑选哦
    u-picker(
        :show="showCol" 
        :columns="columns"
        keyName="goods_name"
        @close="handleClose"
        @confirm="handleConfirm"
        @cancel="handleClose"
    )
</template>

<script>

export default {
    props:{
        goodsList:{
            type:Array,
            default:()=>[]
        }
    },
    components:{},
    data() {
        return {
            goodsInfo: {
                goods_name: '',
                brand: '',
                specification: '',
                storage_condition: '',
                shelf_life: '',
                unsuitable_people: '',
                favorable_rate: '',
                goods_url: '',
                selling_point: '',
                pic_path: [],
                live_recording_screen_path: [],
            },
            showCol: false,
            rules: {
                'goods_name': {
                    type: 'string',
                    required: true,
                    message: '请填写商品名称',
                    trigger: ['blur', 'change']
                },
                'brand': {
                    type: 'string',
                    required: true,
                    message: '请填写商品品牌',
                    trigger: ['blur', 'change']
                },
                'specification': {
                    type: 'string',
                    required: true,
                    message: '请填写商品规格',
                    trigger: ['blur', 'change']
                },
                'storage_condition': {
                    type: 'string',
                    required: true,
                    message: '请填写存储条件',
                    trigger: ['blur', 'change']
                },
                'shelf_life': {
                    type: 'number',
                    required: true,
                    message: '请填写保质期',
                    trigger: ['blur', 'change']
                },
                'unsuitable_people': {
                    type: 'string',
                    required: true,
                    message: '请填写不适用人群',
                    trigger: ['blur', 'change']
                },
                'favorable_rate': {
                    type: 'number',
                    required: true,
                    message: '请填写好评率',
                    trigger: ['blur', 'change']
                },
                'goods_url': {
                    type: 'string',
                    required: true,
                    message: '请填写商品链接',
                    trigger: ['blur', 'change']
                },
                'selling_point': {
                    type: 'string',
                    required: true,
                    message: '请填写商品卖点',
                    trigger: ['blur', 'change']
                },
                'pic_path': {
                    type: 'array',
                    required: true,
                    message: '请上传商品图片',
                    trigger: ['blur', 'change']
                },
                'live_recording_screen_path': {
                    type: 'array',
                    required: true,
                    message: '请上传其他主播视频',
                    trigger: ['blur', 'change']
                },
            },
        };
    },
    computed:{
        columns:function(){
            return [this.goodsList]
        }
    },
    watch:{
        goodsList:{
            handler:function(newV){
                console.log('newww',newV)
            }
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
                    return _this.goodsInfo
                }
                return
            } catch (error) {
                return
            }
        },
        selectGoods(){
            this.showCol = true
        },
        handleClose(){
            this.showCol = false
        },
        handleConfirm(e){
            const {value} = e
            console.log('vvvvvvv',value)
            const {
                pic_path='',
                live_recording_screen_path=''} = value[0]

            this.goodsInfo = Object.assign(this.goodsInfo,value[0],{
            
                pic_path:pic_path ? [{
                    status: 'success',
                    message: '',
                    url: pic_path
                }] : [],
                live_recording_screen_path:live_recording_screen_path ? [{
                    status: 'success',
                    message: '',
                    url: live_recording_screen_path
                }] : []
            })

            this.$emit('updateGoodsInfo',this.goodsInfo)
            this.showCol = false
        },
        deletePic(e){
            this.goodsInfo.pic_path = []
        },
        async afterRead(event) {
            const result = await this.uploadFilePromise(event.file)
            if(result){
                this.goodsInfo.pic_path = [{
                    status: 'success',
                    message: '',
                    url: result
                }]
            }
            
        },
        async uploadFilePromise(file) {
            uni.showLoading({
                title: '上传中',
            });
            try {
                let res = await wx.cloud.uploadFile({
                    cloudPath: `image/${new Date().getTime()}`,
                    filePath: file.url, // 文件路径
                })

                let result = await wx.cloud.getTempFileURL({
                    fileList:[res.fileID],
                })
                uni.hideLoading()
                uni.showToast({
                    title: '上传成功',
                    icon:'none',
                    duration: 1500
                });
                return result.fileList[0].tempFileURL
                
            } catch (error) {
                uni.showToast({
                    title: '上传失败',
                    icon:'none',
                    duration: 1500
                });
                return
            }        
        },

        deleteVideo(){
            this.goodsInfo.live_recording_screen_path = []
        },
        async afterReadVideo(event){
            const result = await this.uploadVideoFilePromise(event.file)
            if(result){
                this.goodsInfo.live_recording_screen_path = [{
                    status: 'success',
                    message: '',
                    url: result
                }]
            }

            console.log('vvideo',result)
        },
        async uploadVideoFilePromise(file){
            uni.showLoading({
                title: '上传中',
            });
            try {
                let res = await wx.cloud.uploadFile({
                    cloudPath: `video/${new Date().getTime()}`,
                    filePath: file.url, // 文件路径
                })

                let result = await wx.cloud.getTempFileURL({
                    fileList:[res.fileID],
                })
                uni.hideLoading()
                uni.showToast({
                    title: '上传成功',
                    icon:'none',
                    duration: 1500
                });
                console.log('vvv',result)
                return result.fileList[0].tempFileURL
                
            } catch (error) {
                uni.showToast({
                    title: '上传失败',
                    icon:'none',
                    duration: 1500
                });
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