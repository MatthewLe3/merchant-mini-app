<template lang="pug">
    scroll-view(:scroll-y="true").form
        .item(
            v-for='(item,index) in data'
            :key='index'
        )
            .label {{item.label}}
            .content
                input.my-input(
                    v-if='item.type == "number" || item.type == "text"'
                    :placeholder="item.placeHolder"
                    placeholder-class="placeholder"
                    :type="item.type"
                )
                picker.my-picker(
                    v-if='item.type == "select"'
                    mode='selector'
                    :range="item.range"
                    :value="0"
                )
                    .text {{item.range[0]}}
                    image(:src='arrowIcon')
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:()=>[]
        }
    },
    components:{},
    data() {
        return {
            arrowIcon:'https://7072-prod-2gzji75nedc130f1-1310542026.tcb.qcloud.la/arrow.png?sign=a97d32e9c7299adabc7b064bab420716&t=1649780820'
        };
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{}
    };
</script>
<style lang="scss" scoped>
.form{
    margin-top: 44rpx;
    max-height: 1110rpx;
    .item{
        border-bottom: 1px solid #B7BDC6;
        height: 96rpx;
        display: flex;
        .label{
            display: flex;
            align-items: center;
            width: 146rpx;
            padding-left: 32rpx;
            font-size: 28rpx;
        }
        .content{
            display: flex;
            align-items: center;
            flex: 1;
            .my-input{
                
            }
            .my-picker{
                width: 100%;
                position: relative;
                .text{
                    font-size: 28rpx;
                    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
                    // color: #B7BDC6;
                }
                image{
                    position: absolute;
                    right: 42rpx;
                    top: 50%;
                    transform: translate(0,-50%);
                    width: 28rpx;
                    height: 48rpx;
                }
            }
        }
    }
}
::v-deep .placeholder{
    font-size: 28rpx;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    color: #B7BDC6;
}
</style>