import {mapState} from 'vuex'

export default{
    data(){
        return {
            //设置默认的分享参数
            share:{
                title:'申报',
                path:'/pages/login/index',
                imageUrl:'',
                desc:'',
                content:''
            },
            // cooperation_id:null
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    onShareAppMessage(res) {
        console.log('mixins',this.share,this.userInfo)
        const {identity_type,openid,real_name,pet_name} = this.userInfo

        if(identity_type == 1){
            console.log('主播的分享')
            return {
                title:'快来和我合作吧～',
                path:`/pages/login/index?openid=${openid}&name=${real_name}&nickName=${pet_name}`,
                imageUrl:this.share.imageUrl,
            }
        }else{
            return {
                title:'我新建了一个合作单，快来合作吧～',
                path:`/pages/login/index?cooperation_id=${this.info.cooperation_id}`,
                imageUrl:this.share.imageUrl,
            }
        }
    }
}