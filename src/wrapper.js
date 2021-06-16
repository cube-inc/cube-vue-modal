import CubeModal from './components/CubeModal.vue'
import CubeModalButtonClose from './components/CubeModalButtonClose.vue'

CubeModal.install = (Vue, options = {}) => {
  const { name = CubeModal.name } = options
  Vue.component(name, CubeModal)
}

export default CubeModal
export { CubeModalButtonClose }
