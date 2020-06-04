<template>
  <transition :name="name" :enter-class="`${name}-enter-from`" :leave-class="`${name}-leave-from`" v-on="$listeners">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    name: { type: String, default: 'animation' }
  }
}
</script>
