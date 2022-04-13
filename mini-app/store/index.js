import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        nickName:'',
        avatarUrl:'',
        userInfo:{},
        storeArr:[]
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
        }
    },
    actions: {}
})
export default store