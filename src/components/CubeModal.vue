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
      <div class="modal-dialog">
        <button class="modal-dialog-close" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="77.429" height="77.417" viewBox="0 0 77.429 77.417" class="icon">
            <path
              d="M13.721-3.906a4.377,4.377,0,0,0,0,6.152,4.483,4.483,0,0,0,6.2,0L51.172-29l31.25,31.25a4.436,4.436,0,0,0,6.2,0,4.422,4.422,0,0,0,0-6.152l-31.25-31.3,31.25-31.25a4.377,4.377,0,0,0,0-6.152,4.391,4.391,0,0,0-6.2,0l-31.25,31.25-31.25-31.25a4.347,4.347,0,0,0-6.2,0,4.422,4.422,0,0,0,0,6.152l31.25,31.25Z"
              transform="translate(-12.457 73.908)"
            />
          </svg>
        </button>
        <div class="modal-dialog-container">
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
    return {
      opened: false
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
    lockScroll() {
      window.requestAnimationFrame(() => {
        const { scrollX, scrollY } = window
        this.scrollX = scrollX
        this.scrollY = scrollY
        document.body.classList.add('modal-scroll-lock')
        Object.assign(this.$root.$el.style, {
          pointerEvent: 'none',
          transform: `translateY(-${scrollY}px)`
        })
        window.scrollTo(0, 0)
      })
    },
    unlockScroll() {
      window.requestAnimationFrame(() => {
        Object.assign(this.$root.$el.style, {
          pointerEvent: '',
          transform: ''
        })
        document.body.classList.remove('modal-scroll-lock')
        window.scrollTo(this.scrollX, this.scrollY)
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
