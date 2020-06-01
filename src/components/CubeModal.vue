<template>
  <transition
    :name="transitionName"
    :enter-class="`${transitionName}-enter-from`"
    :leave-class="`${transitionName}-leave-from`"
    @after-enter="$emit('after-enter')"
    @after-leave="$emit('after-leave')"
  >
    <div v-if="opened" ref="modal" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" @click.self.stop="close"></div>
      <!-- <div v-if="willClose" class="modal-will-close">×</div> -->
      <div
        ref="dialog"
        class="modal-dialog"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="$emit('dialog-transitionend')"
      >
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
    this.touchstartY = null
    this.touchmoveY = null
    this.isScrollAtTop = false
    this.closeThreshold = null
    return {
      opened: false,
      willClose: false
    }
  },
  computed: {
    transitionEnterActiveClassName() {
      return `${this.transitionName}-enter-active`
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
      const { modal, container } = this.$refs
      this.willClose = false
      this.touchstartY = this.touchmoveY = event.layerY
      this.isScrollAtTop = container.scrollTop === 0
      this.isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
      this.closeThreshold = window.innerHeight / 2
      modal.classList.remove(this.transitionEnterActiveClassName)
    },
    onTouchMove(event) {
      if (this.isScrollAtTop || this.isScrollAtBottom) {
        this.willClose = false
        const offset = event.layerY - this.touchstartY
        if (this.isScrollAtTop && offset >= 0) {
          event.preventDefault()
          this.$refs.dialog.style.transform = `translateY(${offset}px)`
          this.willClose = offset >= this.closeThreshold && event.layerY >= this.touchmoveY
        }
        if (this.isScrollAtBottom && offset < 0) {
          event.preventDefault()
          this.$refs.container.style.transform = `translateY(${offset * 0.25}px)`
        }
        this.touchmoveY = event.layerY
      }
    },
    onTouchEnd(event) {
      const { modal, dialog, container } = this.$refs
      if (this.willClose) {
        this.willClose = false
        dialog.style.transform = ''
        this.close()
      } else {
        this.$once('dialog-transitionend', () => {
          modal.classList.remove(this.transitionEnterActiveClassName)
        })
        modal.classList.add(this.transitionEnterActiveClassName)
        dialog.style.transform = ''
        container.style.transform = ''
      }
    },
    lockScroll() {
      document.body.classList.add('modal-scroll-lock')
    },
    unlockScroll() {
      document.body.classList.remove('modal-scroll-lock')
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
  beforeDestroy() {
    if (this.opened) {
      this.unlockScroll()
    }
  }
}
</script>
