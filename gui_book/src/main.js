import Vue from 'vue'
import App from './App'
// import globalchart from '@/components/Globalchart'


Vue.prototype.productionTip = false

App.mpType = 'app'

const app  = new Vue(App)


app.$mount()

Vue.prototype.globalData = getApp().globalData
// Vue.prototype.GLOBAL = globalchart
