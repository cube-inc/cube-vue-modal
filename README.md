# cube-vue-modal

A simple, basic, highly customizable and mobile friendly modal component for Vue.

## Key features

- Easy to use
- Simple HTML structure
- CSS customizable
- Large content support — addresses the well-known Safari over-scroll chaining issue on iOS

## Usage

### Install

```sh
yarn add cube-vue-modal
```

### Exemple

#### Template

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

#### Script

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

#### SCSS

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

| Name       | Required | Type           | Default       | Description                                                                                                                                                                                     |
| ---------- | -------- | -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | false    | Boolean        | false         | The open state of the modal.                                                                                                                                                                    |
| transition | false    | String         | 'animate'     | The name of the [transition](https://vuejs.org/v2/guide/transitions.html) to use for opening and closing.                                                                                       |
| target     | false    | String, Object | document.body | The [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) to append the modal to. |

## Events

| Name   | Description                                        |
| ------ | -------------------------------------------------- |
| input  | The open state of the modal has changed.           |
| open   | The modal is opened.                               |
| opened | The modal is opened and the animation is finished. |
| close  | The modal is closed.                               |
| closed | The modal is closed and the animation is finished. |

## Methods

| Name   | Async | Description                                                    |
| ------ | ----- | -------------------------------------------------------------- |
| open   | true  | Opens the modal and resolves after the animation is finished.  |
| close  | true  | Closes the modal and resolves after the animation is finished. |
| toggle | true  | Switches between the open and close methods.                   |

## HTML structure and classes

```html
<div class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-dialog" role="dialog">
    <button class="modal-dialog-close"></button>
    <div class="modal-dialog-container">
      <slot />
    </div>
  </div>
</div>
```

## Development Setup

```sh
# Project setup
yarn install

# Compiles and hot-reloads for demo web site development
yarn run serve

# Compiles and minifies for production
yarn run build

# Lints and fixes files
yarn run lint

# Run the unit tests
yarn run test:unit
```
