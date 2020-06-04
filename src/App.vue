<template>
  <div id="App">
    <div class="container">
      <header class="content">
        <h1>
          {{ name }}
          <small>v{{ version }}</small>
        </h1>
        <p class="lead">{{ description }}</p>
      </header>
      <section class="section content">
        <div class="button-list">
          <button class="button" type="button" :disabled="modals.xs" @click="modals.xs = true">xs</button>
          <button class="button" type="button" :disabled="modals.sm" @click="modals.sm = true">sm</button>
          <button class="button" type="button" :disabled="modals.fullscreen" @click="modals.fullscreen = true">Fullscreen</button>
        </div>
      </section>
      <section class="section">
        <PicsumPhotos />
      </section>
      <section class="section content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum quam ac justo suscipit commodo. Mauris dignissim iaculis
          egestas. Fusce eleifend finibus dignissim. Phasellus pharetra tincidunt tellus vel posuere. Praesent feugiat luctus dui, eget
          mollis purus accumsan eget. Etiam iaculis dui felis, ut finibus tortor sollicitudin sit amet. Pellentesque nisi velit, posuere eu
          pharetra at, vestibulum in ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>
      <section class="section content">
        <div class="button-list">
          <button class="button" type="button" :disabled="modals.xs" @click="modals.xs = true">xs</button>
          <button class="button" type="button" :disabled="modals.sm" @click="modals.sm = true">sm</button>
          <button class="button" type="button" :disabled="modals.fullscreen" @click="modals.fullscreen = true">Fullscreen</button>
        </div>
      </section>
      <ModalXS v-model="modals.xs" />
      <ModalSM v-model="modals.sm" />
      <ModalFullscreen v-model="modals.fullscreen" />
    </div>
  </div>
</template>

<script>
import ModalXS from './modals/xs.vue'
import ModalSM from './modals/sm.vue'
import ModalFullscreen from './modals/fullscreen.vue'
import './scss/main.scss'

export default {
  name: 'app',
  components: {
    ModalXS,
    ModalSM,
    ModalFullscreen
  },
  data() {
    const { name, version, description } = this.$root.$options.packageInfo
    return {
      name,
      version,
      description,
      modals: {
        xs: false,
        sm: false,
        fullscreen: false
      }
    }
  }
}
</script>
