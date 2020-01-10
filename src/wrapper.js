import component from '@/components/CubeModal.vue'

component.install = (Vue, options = {}) => {
  const { name = component.name } = options
  Vue.component(name, component)
}

export default component
