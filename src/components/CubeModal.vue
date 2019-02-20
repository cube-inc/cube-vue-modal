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
      return `${this.transition}-dialog`
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
