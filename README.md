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
        <a class="modal-dialog-close"@click.prevent="open = true"></a>
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
/* Import your own variables */
@import 'assets/_variables.scss';

/* Import style and animations, defaults are overrided by your own assets/_variables.scss */
@import 'cube-vue-modal/dist/assets/modal.scss';
@import 'cube-vue-modal/dist/assets/animations.scss';

/* This is required in order to make the over-scroll workaround work */
html, body {
  margin: 0;
  padding: 0;
}

.modal-dialog {
    align-self: center;
}
</style>
```

```scss
/* You can override all theses variables to style the modal components */
$z-index-modal-backdrop: 20;
$z-index-modal-dialog: 30;

$modal-backdrop-color: rgba(black, .4);
$modal-backdrop-color-no-filter: rgba($modal-backdrop-color, .65);
$modal-backdrop-filter: saturate(200%) blur(4px);

$modal-dialog-margin: 2em 1em;
$modal-dialog-padding: 1em 2em;
$modal-dialog-bg-color: darken(white, 2%);
$modal-dialog-border-radius: 1px;
$modal-dialog-box-shadow: 0 .4rem 1rem rgba(black, .3);

$modal-close-color: #777777;
$modal-close-font-size: 16px;
$modal-close-button-size: 30px;
$modal-close-margin: 4px;
$modal-close-border-radius: 50%;
$modal-close-bg-color: transparent;
$modal-close-bg-color-hover: darken($modal-dialog-bg-color, 5%);
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

## TODO

- Writing more tests
- Writing documentation and provide exemples related to animations
- Defining a prop in order to switch off the iOS over-scroll workaround
