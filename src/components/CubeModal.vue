<template>
  <div v-if="opened" class="modal" v-bind="$attrs">
    <transition :name="backdropTransition" @after-leave="$emit('backdrop-after-leave')">
      <div v-if="showBackdrop" class="modal-backdrop" @click.self.stop="close"></div>
    </transition>
    <transition :name="modalTransition" @after-leave="$emit('modal-after-leave')">
      <div v-if="showModal" class="modal-dialog">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
const smoothBehaviorAnimationDuration = 500
export default {
  name: 'CubeModal',
  props: {
    value: { type: Boolean, default: false },
    transition: { type: String, default: 'animate' }
  },
  data () {
    return {
      windowScroll: null,
      animate: false,
      opened: false,
      showBackdrop: false,
      showModal: false
    }
  },
  computed: {
    backdropTransition () {
      return `${this.transition}-backdrop`
    },
    modalTransition () {
      return `${this.transition}-modal`
    }
  },
  watch: {
    value (value) {
      if (value) {
        if (!this.opened) {
          this.open()
        }
      } else {
        if (this.opened) {
          this.close()
        }
      }
    }
  },
  methods: {
    getScroll () {
      return {
        top: window.pageYOffset || window.scrollY,
        left: window.pageXOffset || window.scrollX
      }
    },
    scrollTo (options) {
      return new Promise(resolve => {
        const { top, left } = this.getScroll()
        const ms = options.behavior === 'smooth' && (top > 0 || left > 0)
          ? smoothBehaviorAnimationDuration
          : 0
        window.scrollTo(options)
        setTimeout(resolve, ms)
      })
    },
    lockRoot () {
      const { top, left } = this.getScroll()
      this.windowScroll = { top, left }
      const style = this.$root.$el.style
      return new Promise(resolve => {
        window.requestAnimationFrame(() => {
          style.position = 'fixed'
          style.top = top > 0 ? '-' + top + 'px' : '0'
          style.right = '0'
          style.bottom = '0'
          style.left = left > 0 ? '-' + left + 'px' : '0'
          style.overflow = 'hidden'
          window.requestAnimationFrame(() => {
            window.scrollTo(0, 0)
            resolve(this)
          })
        })
      })
    },
    unlockRoot () {
      const { top, left } = this.windowScroll
      this.windowScroll = null
      const style = this.$root.$el.style
      return new Promise(resolve => {
        style.position = ''
        style.overflow = ''
        style.left = ''
        style.bottom = ''
        style.right = ''
        style.top = ''
        window.scrollTo(left, top)
        resolve(this)
      })
    },
    open () {
      return new Promise(resolve => {
        if (!this.animate) {
          this.animate = true
          this.opened = true
          this.$nextTick()
            .then(() => this.lockRoot())
            .then(() => {
              this.showBackdrop = true
              this.showModal = true
              this.animate = false
              this.$emit('input', true)
              this.$emit('open', this)
              resolve(this)
            })
        } else {
          resolve(this)
        }
      })
    },
    closeModal () {
      const promise = this.showModal
        ? new Promise(resolve => this.$once('modal-after-leave', resolve))
        : Promise.resolve()
      this.showModal = false
      return promise
    },
    closeBackdrop () {
      const promise = this.showBackdrop
        ? new Promise(resolve => this.$once('backdrop-after-leave', resolve))
        : Promise.resolve()
      this.showBackdrop = false
      return promise
    },
    close (options) {
      return new Promise(resolve => {
        if (!this.animate && this.opened) {
          this.animate = true
          this.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            .then(() => Promise.all([
              this.closeModal(),
              this.closeBackdrop()
            ]))
            .then(() => this.unlockRoot())
            .then(() => {
              this.opened = false
              this.animate = false
              this.$emit('input', false)
              this.$emit('close', this)
              resolve(this)
            })
        } else {
          resolve(this)
        }
      })
    },
    toggle () {
      if (this.opened) {
        return this.close()
      }
      return this.open()
    }
  },
  mounted () {
    // Moves it out of the $root
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this.opened) {
      this.unlockRoot()
    }
    document.body.removeChild(this.$el)
  }
}
</script>

<style lang="scss">

// Breakpoints
$screen-xs: 576px;
$screen-xs-max: ($screen-xs - 1px);

// Z-index
$z-index-modal-backdrop: 20;
$z-index-modal: 30;

// Modal
$modal-backdrop-color: rgba(black, .6);
$modal-bg-color: darken(white,3%);
$modal-box-shadow: 0 0.4rem 1rem rgba(black,.3);

.modal {
  position: relative;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh; // To make sure to not trigger an address bar change from Safari iOS
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.modal-backdrop {
  z-index: $z-index-modal-backdrop;
  position: fixed;
  // Extends the backdrop out of the viewport against overscroll visual glitch on Chrome
  top: -100px;
  right: -100px;
  bottom: -100px;
  left: -100px;
  background-color: $modal-backdrop-color;
}
.modal-dialog {
  position: relative;
  z-index: $z-index-modal;
  box-sizing: border-box;
  margin: 2em 1em;
  padding: 1em 2em;
  height: 100%;
  background-color: $modal-bg-color;
  box-shadow: $modal-box-shadow;
}
</style>
