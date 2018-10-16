<template>
  <div
    class="modal"
    v-if="open">
    <div
      class="modal-backdrop"
      @click.self.stop="close">
    </div>
    <div
      class="modal-dialog">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false }
  },
  data () {
    return {
      open: this.value
    }
  },
  watch: {
    value (newVal) {
      this.open = newVal
    }
  },
  methods: {
    close () {
      this.open = false
      this.$emit('input', this.open)
    }
  }
}
</script>

<style lang="scss" scoped>
$modal-backdrop-z-index: 20;
$modal-dialog-z-index: 40;
$modal-backdrop-color: rgba(black, .6);
$modal-backdrop-color-no-filter: rgba(black, .6);
$modal-backdrop-filter: saturate(300%) blur(20px);
$modal-bg-color: #eeeeee;
$modal-box-shadow: 0 6px 16px rgba(black,.3);
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100vh; // To make sure to not trigger an address bar change from Safari iOS
  display: flex;
  justify-content: center;
}
.modal-backdrop {
  z-index: $modal-backdrop-z-index;
  position: fixed;
  // Extends the backdrop out of the viewport against overscroll visual glitch on Chrome
  top: -100%;
  width: 300%;
  height: 300%;
  left: -100%;
  background-color: $modal-backdrop-color-no-filter;
  @supports (backdrop-filter: $modal-backdrop-filter) {
    background-color: $modal-backdrop-color;
    backdrop-filter: $modal-backdrop-filter;
  }
}
.modal-dialog {
  z-index: $modal-dialog-z-index;
  position: absolute;
  box-sizing: border-box;
  margin: 40px auto;
  padding: 20px;
  background-color: $modal-bg-color;
}
</style>
