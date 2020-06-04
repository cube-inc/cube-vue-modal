<template>
  <img class="image image-lazy" :src="pictureUrl" alt="Picsum photos" @load="onLoad" />
</template>

<script>
export default {
  computed: {
    pictureUrl: () => `https://picsum.photos/1920/1080/`
  },
  methods: {
    onLoad(event) {
      event.target.classList.add('loaded')
    }
  }
}
</script>

<style></style>
