import App from './App'
import store from './store/index'

import uView from '@/uni_modules/uview-ui/'
Vue.use(uView)

import shareToFriend from './mixins/share'
Vue.mixin(shareToFriend)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif