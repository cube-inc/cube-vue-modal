import Vue from 'vue'
import CubeModal from './components/CubeModal.vue'
import PicsumPhotos from './components/PicsumPhotos.vue'
import App from './App.vue'

import { name, version, description } from '../package.json'
const packageInfo = { name, version, description }

Vue.config.productionTip = false

Vue.component('CubeModal', CubeModal)
Vue.component('PicsumPhotos', PicsumPhotos)

new Vue({
  packageInfo,
  render: (h) => h(App)
}).$mount('#app')
