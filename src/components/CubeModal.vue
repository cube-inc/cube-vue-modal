<template>
  <transition
    :name="transitionName"
    :enter-class="`${transitionName}-enter-from`"
    :leave-class="`${transitionName}-leave-from`"
    @after-enter="$emit('after-enter')"
    @after-leave="$emit('after-leave')"
  >
    <div v-if="opened" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" @click.self.stop="close"></div>
      <!-- <div v-if="willClose" class="modal-will-close">×</div> -->
      <div ref="dialog" class="modal-dialog" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
        <button class="modal-dialog-close" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="77.429" height="77.417" viewBox="0 0 77.429 77.417" class="icon">
            <path
              d="M13.721-3.906a4.377,4.377,0,0,0,0,6.152,4.483,4.483,0,0,0,6.2,0L51.172-29l31.25,31.25a4.436,4.436,0,0,0,6.2,0,4.422,4.422,0,0,0,0-6.152l-31.25-31.3,31.25-31.25a4.377,4.377,0,0,0,0-6.152,4.391,4.391,0,0,0-6.2,0l-31.25,31.25-31.25-31.25a4.347,4.347,0,0,0-6.2,0,4.422,4.422,0,0,0,0,6.152l31.25,31.25Z"
              transform="translate(-12.457 73.908)"
            />
          </svg>
        </button>
        <div ref="container" class="modal-dialog-container">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CubeModal',
  props: {
    value: { type: Boolean, default: false },
    transitionName: { type: String, default: 'animate' }
  },
  data() {
    this.scrollX = null
    this.scrollY = null
    this.touchstartY = null
    this.touchmoveY = null
    this.isScrollToTop = false
    return {
      opened: false,
      willClose: false
    }
  },
  watch: {
    value(value) {
      if (this.opened !== value) {
        value ? this.open() : this.close()
      }
    }
  },
  methods: {
    onTouchStart(event) {
      const { layerY } = event
      this.willClose = false
      this.touchstartY = this.touchmoveY = layerY
      this.isScrollToTop = this.$refs.container.scrollTop === 0
    },
    onTouchMove(event) {
      if (this.isScrollToTop) {
        const { layerY } = event
        const offset = layerY - this.touchstartY
        this.touchmoveY = layerY
        if (offset >= 0) {
          event.preventDefault()
          const moveDown = this.touchmoveY <= layerY
          if (moveDown && offset > 192) {
            this.willClose = true
          } else {
            this.willClose = false
          }
          window.requestAnimationFrame(() => {
            Object.assign(this.$refs.dialog.style, {
              transition: '',
              transform: `translateY(${offset}px)`
            })
          })
        } else {
          this.willClose = false
        }
      } else {
        this.willClose = false
      }
    },
    onTouchEnd(event) {
      const { dialog } = this.$refs
      if (this.willClose) {
        this.willClose = false
        window.requestAnimationFrame(() => {
          Object.assign(dialog.style, {
            transition: '',
            transform: ''
          })
        })
        this.close()
      } else {
        window.requestAnimationFrame(() => {
          Object.assign(dialog.style, {
            transition: 'all 100ms ease',
            transform: ''
          })
        })
      }
    },
    lockScroll() {
      window.requestAnimationFrame(() => {
        // const { scrollX, scrollY } = window
        // this.scrollX = scrollX
        // this.scrollY = scrollY
        document.body.classList.add('modal-scroll-lock')
        // Object.assign(this.$root.$el.style, {
        //   pointerEvent: 'none',
        //   transform: `translateY(-${scrollY}px)`
        // })
        // window.scrollTo(0, 0)
      })
    },
    unlockScroll() {
      window.requestAnimationFrame(() => {
        // Object.assign(this.$root.$el.style, {
        //   pointerEvent: '',
        //   transform: ''
        // })
        document.body.classList.remove('modal-scroll-lock')
        // window.scrollTo(this.scrollX, this.scrollY)
      })
    },
    open() {
      return new Promise((resolve) => {
        this.$once('after-enter', resolve)
        this.lockScroll()
        this.opened = true
        if (this.value !== true) {
          this.$emit('input', true)
        }
        this.$emit('open', this)
      })
    },
    close() {
      return new Promise((resolve) => {
        this.$once('after-leave', resolve)
        this.opened = false
        this.unlockScroll()
        if (this.value !== false) {
          this.$emit('input', false)
        }
        this.$emit('close', this)
      })
    },
    toggle() {
      return this.opened ? this.close() : this.open()
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    if (this.opened) {
      this.unlockScroll()
    }
    document.body.removeChild(this.$el)
  }
}
</script>
