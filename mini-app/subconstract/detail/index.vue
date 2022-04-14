<template lang="pug">
.content
    scroll-view(:scroll-y="true")
        Preview
</template>

<script>
import Preview from './components/preview/index.vue'
export default {
    props:{},
    components:{
        Preview
    },
    data() {
        return {};
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{}
};
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    scroll-view{
        height: 100%;
    }
}
</style>