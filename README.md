# cube-vue-modal

A simple, basic, highly customizable and mobile friendly modal component for Vue.

## Key features

- Easy to use
- Basic HTML structure
- CSS customizable
- Large content support — addresses the well-known Safari over-scroll chaining issue on iOS

## Install

```sh
yarn add cube-vue-modal
```

## Exemple

### Template

```html
<div id="App">
  <p>Click the button below to open the modal.</p>
  <button :disabled="open" @click="open = true">Open</button>
  <Modal v-model="open">
    <header>
      <h1 class="modal-title">Title</h1>
    </header>
    <main>
      <p>This is a content.</p>
    </main>
    <footer>
      <button @click="open = false">Close</button>
    </footer>
  </Modal>
</div>
```

### Script

```javascript
import Modal from 'cube-vue-modal'

export default {
  components: {
    Modal
  },
  data() {
    return {
      open: false
    }
  }
}
```

### SCSS

```scss
///
/// Import your own variables
///
@import 'assets/scss/variables';

///
/// Import modal style and animations
///
@import '~cube-vue-modal/src/scss';
/// Or ↴
@import '~cube-vue-modal/src/scss/variables';
@import '~cube-vue-modal/src/scss/modal';
@import '~cube-vue-modal/src/scss/animations';
```

## Props

| Name       | Required | Type    | Default   | Description                                                                                               |
| ---------- | -------- | ------- | --------- | --------------------------------------------------------------------------------------------------------- |
| value      | false    | Boolean | false     | The open state of the modal.                                                                              |
| transition | false    | String  | 'animate' | The name of the [transition](https://vuejs.org/v2/guide/transitions.html) to use for opening and closing. |

## Events

| Name  | Description                              |
| ----- | ---------------------------------------- |
| input | The open state of the modal has changed. |
| open  | The modal is opened.                     |
| close | The modal is closed.                     |

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
