<template>
  <div id="app">
    <h1>Cube Modal Demo</h1>
    <p class="lead">Click the button below to open the modal.</p>
    <button
      type="button"
      @click="modalOpened = true">
      Open
    </button>
    <CubeModal v-model="modalOpened">
      This is a modal content
    </CubeModal>
  </div>
</template>

<script>
import CubeModal from './components/CubeModal.vue'

export default {
  name: 'app',
  components: {
    CubeModal
  },
  data () {
    return {
      modalOpened: false
    }
  }
}
</script>

<style lang="scss">
body, html {
  color: #444;
}
</style>
