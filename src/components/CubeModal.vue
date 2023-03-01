<template>
  <transition :name="transitionName" @after-enter="onModalAfterEnter" @after-leave="onModalAfterLeave">
    <div v-if="opened" ref="modal" tabindex="-1" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" ref="backdrop" @click.self.stop="close"></div>
      <div
        ref="dialog"
        class="modal-dialog"
        role="dialog"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="onDialogTransitionEnd"
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
  components: { ButtonClose },
  props: {
    value: { type: Boolean, default: false },
    transitionName: { type: String, default: 'modal' },
    target: { type: [String, HTMLElement], default: () => document.body },
    closeButton: { type: Boolean, default: true },
    closeRatio: { type: Number, default: 1 / 5 }
  },
  data() {
    return {
      $resolve: null,
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
          modal.classList.add(this.transitionEnterActiveClassName)
          dialog.style.transform = ''
          container.style.transform = ''
        }
      }
    },
    onDialogTransitionEnd() {
      const modal = this.$refs.modal
      modal && modal.classList.remove(this.transitionEnterActiveClassName)
    },
    onModalAfterEnter() {
      this.$emit('opened', this)
      this.$resolve && this.$resolve()
    },
    onModalAfterLeave() {
      this.$emit('closed', this)
      this.$resolve && this.$resolve()
      if (this.$lastFocus instanceof HTMLElement) this.$lastFocus.focus()
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
        this.$resolve = resolve
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
        this.$resolve = resolve
        this.opened = false
        this.unlockScroll()
        if (this.value !== false) this.$emit('input', false)
        this.$emit('close', this)
      })
    },
    toggle() {
      return this.opened ? this.close() : this.open()
    },
    scrollTo(options) {
      const container = this.$refs.container
      if (container instanceof HTMLDivElement) container.scrollTo(options)
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
