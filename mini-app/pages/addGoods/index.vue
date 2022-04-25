<template lang='pug'>
.wrapper
	.title
		h1 {{title}}
	.tips {{tips}}
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
						picker.picker(
							v-if='item.type === "select"'
							mode='selector'
							:value="selectedStoreIndex" 
							:range="item.range"
							@change="change"
							range-key='store_name'
						)
							.uni-input {{item.range[selectedStoreIndex].store_name}}
	.submit
		button(@click="submitForm") 提交
</template>	
				
<script>
	import {mapState} from 'vuex'
	import {addGoods} from '../../service/apis/index'
	export default {
		data() {
			return {
				title: '抖音直播间商品申报表',
				tips:'尊敬的商家伙伴，您好！请您按照如下要求填写相关信息进行直播带货需求提报，为避免无效沟通，请致以最优惠的价格及最诚挚的合作意愿，感谢支持！',
				formData:{},
				selectedStoreIndex:0,
                formArray:[
					{
                        label:'商铺',
                        key:'store_id',
						required:true,
						type:'select',
						range:[]
                    },
                    {
                        label:'商品链接',
                        key:'goods_url',
						required:true
                    },
                    {
                        label:'图片路径',
                        key:'pic_path',
						required:true
                    },
					{
                        label:'商品品牌',
                        key:'brand',
						required:true
                    },
					{
                        label:'商品名称',
                        key:'goods_name',
						required:true
                    },
					{
                        label:'规格',
                        key:'specification',
						required:true
                    },
					{
                        label:'存储条件',
                        key:'storage_condition',
						required:true
                    },
					{
                        label:'保质期',
                        key:'shelf_life',
						required:true,
						format:'number'
                    },
					{
                        label:'不适用人群',
                        key:'unsuitable_people',
						required:true
                    },
					{
                        label:'好评率',
                        key:'favorable_rate',
						format:'number',
						required:true
                    },
					{
                        label:'卖点',
                        key:'selling_point'
                    },
					{
                        label:'其他主播直播录屏',
                        key:'live_recording_screen_path'
                    },
					{
                        label:'日常价格',
                        key:'daily_price'
                    },
					{
                        label:'历史最低价',
                        key:'lowest_price'
                    },
					{
                        label:'天猫价格',
                        key:'tmall_price'
                    },
					{
                        label:'淘宝价格',
                        key:'taotao_price'
                    },
					{
                        label:'其他平台价格',
                        key:'other_price'
                    },
					{
                        label:'直播价格',
                        key:'live_price'
                    },
					{
                        label:'直播优惠方式',
                        key:'preferential_way'
                    },
					{
                        label:'快递公司',
                        key:'delivery_company'
                    },
					{
                        label:'发货地址',
                        key:'shipping_addresses'
                    },
					{
                        label:'发货周期',
                        key:'shipping_cycle'
                    },
					{
                        label:'包邮地区',
                        key:'free_shipping'
                    },
					{
                        label:'不发货区域',
                        key:'not_shipping'
                    },
					{
                        label:'备注信息',
                        key:'comment'
                    },
                ],
				rules: {
					goods_url: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入商品链接',
							}
						],
						validateTrigger:'submit'
					},
					pic_path: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入图片路径',
							}
						],
						validateTrigger:'submit'
					},
					brand: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入商品品牌',
							}
						],
						validateTrigger:'submit'
					},
					goods_name: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入商品名称',
							}
						],
						validateTrigger:'submit'
					},
					specification: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入规格',
							}
						],
						validateTrigger:'submit'
					},
					storage_condition: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入存储条件',
							}
						],
						validateTrigger:'submit'
					},
					shelf_life: {
						rules: [
							{
								required: true,
								format:'number',
								errorMessage: '请输入保质期',
							}
						],
						validateTrigger:'submit'
					},
					unsuitable_people: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入不适用人群',
							}
						],
						validateTrigger:'submit'
					},
					favorable_rate: {
						rules: [
							{
								required: true,
								format:'string',
								errorMessage: '请输入好评率',
							}
						],
						validateTrigger:'submit'
					}
				}
			}
		},
		computed:{
			...mapState(['storeArr'])
		},
		watch:{
			storeArr:{
				handler(newVal){
					this.$set(this.formArray,0,Object.assign(this.formArray[0],{
						range:newVal
					}))
				},
				immediate:true
			}
		},
		mounted(){
			
		},
		methods: {
			async submitForm(){
				this.$refs.form.validate().then(async res=>{
					let info = Object.assign(res,{
						store_id:this.formArray[0].range[this.selectedStoreIndex].store_id
					});
					console.log('表单数据信息：', info)
					let result = await addGoods(info)
					console.log('res',result)
					const {code,msg} = result
					uni.showToast({
						title: msg,
						icon:code === 200 ? 'success' : 'error',
						duration: 1500
					});
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			// onShareAppMessage(res) {
			//     if (res.from === 'button') {// 来自页面内分享按钮
			// 		console.log(res.target)
			//     }
			//     return {
			// 		title: '自定义分享标题',
			// 		path: '/pages/form/index'
			//     }
			//   },
			change(e){
				console.log('ee',e)
				// let store = this.formArray[0].range[Number(e.detail.value)]
				this.selectedStoreIndex = Number(e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		width: 100%;
		height: 100%;
		// background-color: #FFF;
		display: flex;
		flex-direction: column;
		.title {
			padding: 26rpx 10rpx 12rpx;
			h1 {
				font-size: 40rpx;
				line-height: 32rpx;
				font-weight: bold;
				margin: 0;
				padding: 0;
				text-align: center;
				color: #0095ff;
			}
		}
		.tips{
			padding: 10rpx 0 26rpx;
			margin: 0 10rpx 16rpx;
			border-bottom: 1rpx dashed #ccc;
			color: #e95d00;
			text-align: center;
			font-size: 20rpx;
		}
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
