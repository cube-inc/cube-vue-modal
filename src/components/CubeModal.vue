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
    target: { type: [String, HTMLElement], default: () => document.body },
    closeButton: { type: Boolean, default: true },
    closeRatio: { type: Number, default: 1 / 5 }
  },
  data() {
    return {
      $lastFocus: null,
      $touchstartY: 0,
      $touchmoveY: 0,
      $isScrollAtTop: false,
      $isScrollAtBottom: false,
      $closeThreshold: 0,
      $bodyOverflow: '',
      opened: this.value,
      willClose: false
    }
  },
  computed: {
    targetElement() {
      return this.target instanceof HTMLElement ? this.target : document.querySelector(this.target) || document.body
    },
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
      const { pageY } = event.touches[0]
      const container = this.$refs.container
      const modal = this.$refs.modal
      if (container && modal) {
        this.willClose = false
        this.$touchstartY = pageY
        this.$touchmoveY = pageY
        this.$isScrollAtTop = container.scrollTop === 0
        this.$isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
        this.$closeThreshold = window.innerHeight * this.closeRatio
        modal.classList.remove(this.transitionEnterActiveClassName)
      }
    },
    onTouchMove(event) {
      const { pageY } = event.touches[0]
      const container = this.$refs.container
      const dialog = this.$refs.dialog
      if (container && dialog) {
        this.$isScrollAtBottom = container ? container.scrollHeight - container.scrollTop === container.clientHeight : false
        if (this.$isScrollAtTop || this.$isScrollAtBottom) {
          const offset = pageY - this.$touchstartY
          this.willClose = false
          // Handles progressive close
          if (this.$isScrollAtTop && offset >= 0) {
            event.preventDefault()
            dialog.style.transform = `translateY(${offset}px)`
            this.willClose = pageY >= this.$touchmoveY && offset >= this.$closeThreshold
          }
          // Handles bounce overscroll from bottom with 40% reduction
          if (this.$isScrollAtBottom && offset < 0) {
            event.preventDefault()
            dialog.style.transform = ''
            container.style.transform = `translateY(${offset * this.closeRatio}px)`
          }
          this.$touchmoveY = pageY
        } else {
          this.$isScrollAtTop = container ? container.scrollTop === 0 : false
          if (this.$isScrollAtTop || this.$isScrollAtBottom) {
            this.$touchstartY = pageY
            this.$touchmoveY = pageY
          }
        }
      }
    },
    onTouchEnd(_event) {
      const modal = this.$refs.modal
      const dialog = this.$refs.dialog
      const container = this.$refs.container
      if (modal && dialog && container) {
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
      }
    },
    lockScroll() {
      this.$bodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    },
    unlockScroll() {
      document.body.style.overflow = this.$bodyOverflow
    },
    open() {
      this.$lastFocus = document.activeElement
      return new Promise((resolve) => {
        this.$once('after-enter', () => {
          this.$emit('opened', this)
          resolve()
        })
        this.lockScroll()
        this.opened = true
        this.$nextTick(() => {
          if (this.value !== true) this.$emit('input', true)
          this.$emit('open', this)
        })
      })
    },
    close() {
      return new Promise((resolve) => {
        this.$once('after-leave', () => {
          if (this.$lastFocus instanceof HTMLElement) this.$lastFocus.focus()
          this.$emit('closed', this)
          resolve()
        })
        this.opened = false
        const dialog = this.$refs.dialog
        const container = this.$refs.container
        if (dialog) dialog.style.transform = ''
        if (container) container.style.transform = ''
        this.unlockScroll()
        if (this.value !== false) this.$emit('input', false)
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
    if (this.opened) this.unlockScroll()
  }
}
</script>
