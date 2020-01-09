# cube-vue-modal

A simple, basic, highly customizable and mobile friendly modal component for Vue.

## Key features

- Easy to use
- CSS customizable
- No structure overhead
- Large content support – addresses the well-known Safari iOS over-scroll issue

## Install

```sh
yarn add cube-vue-modal
```

## Exemple

```html
<template>
  <div id="App">
    <p>Click the button below to open the modal.</p>
    <button :disabled="open" @click="open = true">Open</button>
    <Modal v-model="open">
      <header>
        <h1>Title</h1>
      </header>
      <main>
        This is a content.
      </main>
      <footer>
        <button @click="open = false">Close</button>
      </footer>
    </Modal>
  </div>
</template>

<script>
import Modal from 'cube-vue-modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss">
/* This is required in order to make the over-scroll workaround work */
html, body {
  margin: 0;
  padding: 0;
}

/* Overrides default style of the modal */
.modal-backdrop {
  background-color: rgba(white, .98);
}
.modal-dialog {
    margin: 2em 1em;
    padding: 3em 2em;
    border-radius: 4px;
    background-color: #fefefe;
    box-shadow: 0 0.6px 16px rgba(black,.3);
    align-self: center;
}
</style>
```

## Props

| Name       | Required | Type    | Default   | Description |
| ---        | ---      | ---     | ---       | ---         |
| value      | false    | Boolean | false     | The open state of the modal. |
| transition | false    | String  | 'animate' | The name of the [transition](https://vuejs.org/v2/guide/transitions.html) to use for opening and closing. |

## Events

| Name  | Description |
| ---   | ---         |
| input | The open state of the modal has changed. |
| open  | The modal is opened. |
| close | The modal is closed. |

## Development Setup

```sh
# Project setup
yarn install

# Compiles and hot-reloads for development – Run the demo
yarn run serve

# Compiles and minifies for production
yarn run build

# Lints and fixes files
yarn run lint

# Run the unit tests
yarn run test:unit
```
