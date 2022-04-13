<template lang="pug">
.my-form
    u--form(
        labelPosition="left" 
        :model="userInfo" 
        :rules="rules" 
        ref="form1"
    )
        u-form-item(
            label="姓名" 
            prop="name" 
            borderBottom 
            ref="item1"
        )
            u--input(
                v-model="userInfo.name" 
                border="none"
            )
        u-form-item(
            label="性别" 
            prop="sex" 
            borderBottom 
            ref="item1"
            @click="showCol = true; hideKeyboard()"
        )
            u--input(
                v-model="userInfo.sex" 
                disabled 
                disabledColor="#ffffff" 
                placeholder="请选择性别"
                border="none"
            )
            u-icon(
            slot="right" 
            name="arrow-right" 
            )
        u-form-item(
            label="图片" 
            prop="pic" 
            borderBottom
            ref="item1"
        )
            u-upload(
            :fileList="userInfo.pic" 
            @afterRead="afterRead" 
            @delete="deletePic" 
            name="1" 
            :maxCount="1"  
            )
    u-picker(
        :show="showCol" 
        :columns="columns"
    )
</template>

<script>
export default {
    props:{},
    components:{},
    data() {
        return {
            model1: {
                userInfo: {
                    name: 'uView UI',
                    sex: '男',
                    pic: [],
                },
            },
            showCol: false,
            columns: [
                ['中国', '美国', '日本']
            ],
            rules: {
                'userInfo.name': {
                    type: 'string',
                    required: true,
                    message: '请填写姓名',
                    trigger: ['blur', 'change']
                },
                'userInfo.sex': {
                    type: 'string',
                    max: 1,
                    required: true,
                    message: '请选择男或女',
                    trigger: ['blur', 'change']
                },
            },
        };
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{
        submit(){
            this.$refs.form1.validate().then(res => {
                console.log('res',res)
                uni.$u.toast('校验通过')
                return form1
            }).catch(errors => {
                console.log('err',errors)
                uni.$u.toast('校验失败')
                return 
            }) 
        },
        // 删除图片
        deletePic(event) {
            // this[`fileList${event.name}`].splice(event.index, 1)
        },
        // 新增图片
        async afterRead(event) {
            console.log('vev', event)
            const result = await this.uploadFilePromise(event.file.url)
            console.log('result', result)
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            // let lists = [].concat(event.file)
            // let fileListLen = this[`fileList${event.name}`].length
            // lists.map((item) => {
            // 	this[`fileList${event.name}`].push({
            // 		...item,
            // 		status: 'uploading',
            // 		message: '上传中'
            // 	})
            // })
            // for (let i = 0; i < lists.length; i++) {
            // 	const result = await this.uploadFilePromise(lists[i].url)
            // 	let item = this[`fileList${event.name}`][fileListLen]
            // 	this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            // 		status: 'success',
            // 		message: '',
            // 		url: result
            // 	}))
            // 	fileListLen++
            // }
        },
        uploadFilePromise(url) {
            console.log('url', url)
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
                    filePath: url,
                    name: 'file',
                    formData: {
                        user: 'test'
                    },
                    success: (res) => {
                        setTimeout(() => {
                            resolve(res.data.data)
                        }, 1000)
                    }
                });
            })
        },
    }
};
</script>
<style lang="scss" scoped></style>