import CubeModal from './components/CubeModal.vue'

export function install (Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  Vue.component('CubeModal', CubeModal)
}

export default CubeModal
