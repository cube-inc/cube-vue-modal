<template>
  <div id="app" class="container content">
    <h1>Modal demo</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi possimus, enim at esse pariatur consectetur facere repellat corrupti
      debitis inventore perspiciatis rem totam error officiis deleniti et consequatur, quidem assumenda?
    </p>
    <pre>Model: {{ modal }}</pre>
    <pre>Visibility: {{ visible }}</pre>
    <div class="button-list">
      <button class="button" @click="modal = true">Open modal</button>
      <button class="button" @click="visible = !visible">Visibility</button>
    </div>
    <Modal v-model="modal" class="modal-xs" v-if="visible">
      <div class="container content">
        <h2>Modal content</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit obcaecati voluptate atque doloribus, sequi omnis quam, natus
          corporis totam placeat enim adipisci officia repudiandae provident esse nihil qui, ab exercitationem!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi sunt perspiciatis nulla recusandae sapiente pariatur repudiandae
          consectetur maiores. Ipsam rem optio aliquid sequi assumenda blanditiis eum saepe deleniti a itaque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptas eligendi, reiciendis illum quod temporibus error ullam
          corporis commodi ut, similique est sapiente repellat sed incidunt exercitationem excepturi porro et!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas quo esse provident doloribus iure at assumenda eius consequatur,
          soluta repellat ut quisquam ratione sed nihil ab autem nam laborum debitis.
        </p>
        <button class="button" @click="modal = false">Close</button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Modal } from '@/entry.esm'
import '@/css/animations.css'
import '@/css/modal.css'
export default Vue.extend({
  name: 'ServeDev',
  components: { Modal },
  data() {
    return {
      modal: false,
      visible: true
    }
  }
})
</script>

<style>
:root {
  --primary-h: 253;
  --primary-s: 68%;
  --primary-l: 50%;
  --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));

  /* Text */
  --text-color-h: 0;
  --text-color-s: 0%;
  --text-color-l: 0%;
  --text-color-a: 0.9;
  --text-color: hsla(var(--text-color-h), var(--text-color-s), var(--text-color-l), var(--text-color-a));

  /* Types */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-weight-base: normal;
  --line-height-base: 1.5;
  --font-size-base: 1em;

  /* Buttons */
  --button-color: var(--primary);
  --button-background-color-h: var(--primary-h);
  --button-background-color-s: var(--primary-s);
  --button-background-color-l: var(--primary-l);
  --button-background-color-a: 0.2;
  --button-background-color: hsla(
    var(--button-background-color-h),
    var(--button-background-color-s),
    var(--button-background-color-l),
    var(--button-background-color-a)
  );
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
  color: var(--text-color);
  background-color: white;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

/* Layout */
.container {
  margin: 0 auto;
  max-width: var(--modal-breakpoint-md);
}
.content {
  padding: 1rem;
}
.section {
  margin: 3em 0;
}

/* Types */
.lead {
  font-size: 1.4em;
}
h1 {
  margin: 1em 0 1rem 0;
  font-size: 3em;
}
h1 > small {
  display: block;
  font-size: 60%;
  font-weight: normal;
}

/* Images */
.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-lazy {
  opacity: 0;
  transition: opacity 450ms ease;
}
.image-lazy.loaded {
  opacity: 1;
}

/* Buttons */
.button {
  cursor: pointer;
  margin: 0;
  padding: 0.75rem 1.5rem;
  border: 0 none;
  border-radius: 0.25rem;
  color: var(--button-color);
  background-color: var(--button-background-color);
  font-size: inherit;
  text-transform: uppercase;
  transition: all 100ms ease;
}
@media (hover: hover) {
  .button:hover {
    --button-background-color: hsla(
      var(--button-background-color-h),
      var(--button-background-color-s),
      var(--button-background-color-l),
      0.4
    );
  }
}
.button:active {
  --button-background-color: hsla(
    var(--button-background-color-h),
    var(--button-background-color-s),
    var(--button-background-color-l),
    0.3
  );
}
.button:disabled {
  opacity: 0.4;
}
.button-list {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
}
</style>
