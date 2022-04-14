import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        nickName:'',
        avatarUrl:'',
        userInfo:{},
        storeArr:[],
        shareStatus:false
    },
    mutations: {
        setNickName(state,value){
            state.nickName = value
        },
        setAvatarUrl(state,value){
            state.avatarUrl = value
        },
        setUserInfo(state,value){
            state.userInfo = value
        },
        setStoreArr(state,value){
            state.storeArr = value
        },
        setShareStatus(state,value){
            state.shareStatus = value
        }
    },
    actions: {}
})
export default store