<template lang="pug">
.get-goods
    .title {{`${info.anchor_name}主播的领样申请`}}
    .content
        .info
            .label 商品名称：
            .text {{info.goods_name || '-'}}
        .info
            .label 佣金：
            .text {{info.commission_rate || '-'}}%
        .info
            .label 价格：
            .text {{info.live_price || '-'}}%
        .info.textarea
            .label 备注留言：（一些数量，要求等）
            .text {{info.mark || '缺少字段'}}
        .info.textarea
            .label 快递收货地址
            .text {{info.anchor_shipping_address || '-'}}
    .operator
        u--input.my-input(
            placeholder="请输入"
            border="surround"
            v-model="trackingNumber"
        )
        .my-button(
            @click='apply'
        ) 发送主播单号
</template>

<script>
    import {sendSample} from '../../service/apis/merchant'
	export default {
		props: {
			info: {
				type: Object,
				default: () => {},
			},
		},
		components: {},
		data() {
			return {
                trackingNumber:''
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {
			console.log("vsavaaarre23342");
		},
		methods: {
            async apply(){
                if(!this.trackingNumber){
                    uni.showToast({
                        title:'请输入快递单号',
                        icon:'none'
                    })
                    return
                }
                let res = await sendSample({
                    cooperation_id:this.info.id,
                    sample_courier_number:this.trackingNumber
                })

                if(res.code == 200){
                    uni.showToast({
                        title:res.msg,
                        icon:'none'
                    })
                    this.$emit('refresh')
                }
            }
        },
	};
</script>
<style lang="scss" scoped>
	.get-goods {
		width: 100%;
		padding: 20rpx 20rpx 30rpx;
		.content {
			.info {
				display: flex;
				margin-top: 20rpx;
				.label {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					width: 180rpx;
					text-align: left;
				}
				.text {
					display: flex;
					align-items: center;
					color: #8f9ca2;
					flex: 1;
					font-size: 26rpx;
					word-break: break-all;
				}
			}
			.textarea {
				flex-direction: column;
				.label {
					width: fit-content;
					margin-bottom: 20rpx;
				}
			}
		}
		.operator {
			display: inline-flex;
			margin-top: 20rpx;
            .my-input{
                flex: 1;
                margin-right: 20rpx;
            }
			.my-button {
                // height: 56rpx;
                // line-height: 56rpx;
                background: #ffffff;
                border: 2rpx solid #797979;
                border-radius: 8rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: Bold;
                color: #333333;
                display: inline-flex;
                align-items: center;
                padding: 0 20rpx;
                
			}
		}
	}
</style>
