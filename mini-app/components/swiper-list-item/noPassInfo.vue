<template lang="pug">
.get-goods
    .title {{`未通过原因`}}
    .content
        .info.textarea
            .label 测试结果说明
            u--textarea(
                v-model="reason" 
                placeholder="请输入内容"
            )
    .operator
        .my-button(
            @click='apply'
        ) 提交
</template>

<script>
	import {testSample} from "../../service/apis/merchant";
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
				reason: "",
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {

		},
		methods: {
			async apply() {
				if (!this.reason) {
					uni.showToast({
						title: "请输入未通过原因",
						icon: "none",
					});
					return;
				}
                console.log('id',this.info)
				let res = await testSample({
					cooperation_id: this.info.id,
					test_result: 2,
                    test_comment:this.reason
				});

				if (res.code == 200) {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
                    setTimeout(()=>{
                        this.$emit('refresh')
                    },1500)
				}
                // this.$emit('refresh')
			},
		},
	};
</script>
<style lang="scss" scoped>
.get-goods {
    width: 100%;
    padding: 20rpx 20rpx 30rpx;
    box-sizing: border-box;
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
        text-align: right;
        margin-top: 20rpx;
        .my-button {
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
