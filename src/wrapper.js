import component from './components/CubeModal.vue'

function install (Vue, options = {}) {
  registerComponent(Vue, options)
}

function registerComponent (Vue, options) {
  const { name = component.name } = options
  Vue.component(name, component)
}

component.install = install

export default component
