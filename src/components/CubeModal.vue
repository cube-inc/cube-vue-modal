<template>
  <transition :name="transitionName" @after-enter="$emit('after-enter')" @after-leave="$emit('after-leave')">
    <div v-if="opened" ref="modal" tabindex="-1" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" ref="backdrop" @click.self.stop="close"></div>
      <div
        ref="dialog"
        class="modal-dialog"
        role="dialog"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="$emit('dialog-transitionend')"
      >
        <ButtonClose v-if="closeButton" :class="{ active: willClose }" @click="close" />
        <div ref="container" class="modal-dialog-container">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonClose from './CubeModalButtonClose.vue'

export default {
  name: 'CubeModal',
  components: {
    ButtonClose
  },
  props: {
    value: { type: Boolean, default: false },
    transitionName: { type: String, default: 'animate' },
    target: { type: [String, Element], default: () => document.body },
    closeButton: { type: Boolean, default: true }
  },
  data() {
    this.lastFocus = null
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
    targetElement() {
      return this.target instanceof Element ? this.target : document.querySelector(this.target)
    },
    transitionEnterActiveClassName() {
      return `${this.transitionName}-enter-active`
    },
    $container() {
      return this.$refs.container
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
      const { pageY } = event.touches[0]
      const { modal, container } = this.$refs
      this.willClose = false
      this.touchstartY = this.touchmoveY = pageY
      this.isScrollAtTop = container.scrollTop === 0
      this.isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
      this.closeThreshold = window.innerHeight / 3
      modal.classList.remove(this.transitionEnterActiveClassName)
    },
    onTouchMove(event) {
      const { pageY } = event.touches[0]
      const { dialog, container } = this.$refs
      this.isScrollAtTop = container.scrollTop === 0
      this.isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
      if (this.isScrollAtTop || this.isScrollAtBottom) {
        const offset = pageY - this.touchstartY
        this.willClose = false
        // Handles progressive close
        if (this.isScrollAtTop && offset >= 0) {
          event.preventDefault()
          dialog.style.transform = `translateY(${offset}px)`
          this.willClose = pageY >= this.touchmoveY && offset >= this.closeThreshold
        }
        // Handles bounce overscroll from bottom with 40% reduction
        if (this.isScrollAtBottom && offset < 0) {
          event.preventDefault()
          dialog.style.transform = ''
          container.style.transform = `translateY(${offset * 0.4}px)`
        }
        this.touchmoveY = pageY
      }
    },
    onTouchEnd(event) {
      const { modal, dialog, container } = this.$refs
      if (this.willClose) {
        this.willClose = false
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
      // document.body.classList.add('modal-scroll-lock')
      this.bodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    },
    unlockScroll() {
      // document.body.classList.remove('modal-scroll-lock')
      document.body.style.overflow = this.bodyOverflow
      this.bodyOverflow = undefined
    },
    open() {
      this.lastFocus = document.activeElement
      return new Promise((resolve) => {
        this.$once('after-enter', () => {
          this.$refs.modal.focus()
          this.$emit('opened', this)
          resolve()
        })
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
        const { dialog, container } = this.$refs
        this.$once('after-leave', () => {
          this.lastFocus.focus()
          this.$emit('closed', this)
          resolve()
        })
        this.opened = false
        dialog.style.transform = ''
        container.style.transform = ''
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
    this.targetElement.appendChild(this.$el)
  },
  beforeDestroy() {
    if (this.opened) {
      this.unlockScroll()
    }
  }
}
</script>
