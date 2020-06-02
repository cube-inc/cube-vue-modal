<template>
  <ModalTransition :name="transitionName" @after-enter="$emit('after-enter')" @after-leave="$emit('after-leave')">
    <div v-if="opened" ref="modal" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" ref="backdrop" tabindex="0" @click.self.stop="close"></div>
      <!-- <div v-if="willClose" class="modal-will-close">×</div> -->
      <div
        ref="dialog"
        class="modal-dialog"
        role="dialog"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="$emit('dialog-transitionend')"
      >
        <ButtonClose v-if="closeButton" @click="close" />
        <div ref="container" class="modal-dialog-container">
          <slot />
        </div>
      </div>
    </div>
  </ModalTransition>
</template>

<script>
import ModalTransition from './CubeModalTransition.vue'
import ButtonClose from './CubeModalButtonClose.vue'

export default {
  name: 'CubeModal',
  components: {
    ModalTransition,
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
          this.$refs.container.style.transform = `translateY(${offset * 0.4}px)`
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
      this.lastFocus = document.activeElement
      return new Promise((resolve) => {
        this.$once('after-enter', () => {
          this.$refs.backdrop.focus()
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
        this.$once('after-leave', () => {
          this.lastFocus.focus()
          resolve()
        })
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
    this.targetElement.appendChild(this.$el)
  },
  beforeDestroy() {
    if (this.opened) {
      this.unlockScroll()
    }
    // this.targetElement.removeChild(this.$el)
  }
}
</script>
