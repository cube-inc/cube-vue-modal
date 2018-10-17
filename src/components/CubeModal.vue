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
        this.open()
      } else {
        this.close()
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
    saveScroll () {
      return new Promise(resolve => {
        this.windowScroll = this.getScroll()
        resolve(this.windowScroll)
      })
    },
    restoreScroll (options) {
      return new Promise(resolve => {
        const { windowScroll } = Object.assign({}, this, options)
        this.windowScroll = null
        const { top, left } = windowScroll
        this.scrollTo({ top, left, behavior: 'instant' })
          .then(() => resolve(windowScroll))
      })
    },
    lockRoot () {
      const { top, left } = this.windowScroll
      Object.assign(this.$root.$el.style, {
        position: 'fixed',
        zIndex: '0',
        top: `-${top}px`,
        right: '0',
        bottom: '0',
        left: `-${left}px`,
        overflow: 'hidden'
      })
      return Promise.resolve(this)
    },
    unlockRoot () {
      Object.assign(this.$root.$el.style, {
        overflow: '',
        height: '',
        width: '',
        left: '',
        bottom: '',
        right: '',
        top: '',
        zIndex: '',
        position: ''
      })
      return Promise.resolve(this)
    },
    open () {
      return new Promise(resolve => {
        if (!this.animate) {
          this.animate = true
          this.saveScroll()
          this.opened = true
          this.$nextTick()
            .then(() => this.lockRoot())
            .then(() => new Promise(resolve => setTimeout(resolve, 10))) // nextTick would be not enough
            .then(() => this.scrollTo({ top: 0, behavior: 'instant' }))
            .then(() => (this.showBackdrop = true))
            .then(() => this.$nextTick())
            .then(() => (this.showModal = true))
            .then(() => (this.animate = false))
            .then(() => this.$emit('open', this))
            .then(() => resolve(this))
        } else {
          resolve(this)
        }
      })
    },
    close (options) {
      return new Promise(resolve => {
        if (!this.animate && this.opened) {
          const transitions = []
          if (this.showModal) {
            transitions.push(new Promise(resolve => this.$once('modal-after-leave', resolve)))
          }
          if (this.showBackdrop) {
            transitions.push(new Promise(resolve => this.$once('backdrop-after-leave', resolve)))
          }

          this.animate = true
          this.scrollTo({ top: 0, behavior: 'smooth' })
            .then(() => {
              this.showModal = false
              this.showBackdrop = false
              return Promise.all(transitions)
            })
            .then(() => this.unlockRoot())
            .then(() => this.restoreScroll())
            .then(() => (this.opened = false))
            .then(() => (this.animate = false))
            .then(() => this.$emit('input', false))
            .then(() => this.$emit('close', this))
            .then(() => resolve(this))
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
    this.unlockRoot()
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
  top: -100%;
  width: 300%;
  height: 300%;
  left: -100%;
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
