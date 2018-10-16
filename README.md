# cube-vue-modal

## Key features

- CSS customizable
- Safari iOS over-scroll issue bulletproof

This project may not be the best modal for every situation.
It will work well only if you manage to remove padding and margings from html and body.
This is due to the way this modal is working by "css lock" `vm.$root.$el`.

```css
html, body {
  margin: 0;
  padding: 0;
}
```

## Run the demo

```sh
yarn install
yarn run serve --open
```

## Install the dependency

```sh
yarn add ssh://git@bitbucket.org:cube-inc/cube-vue-modal.git
```

With a specific version

```sh
yarn add ssh://git@bitbucket.org:cube-inc/cube-vue-modal.git#v0.1.1
```

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn run serve
```

### Compiles and minifies for production

```sh
yarn run build
```

### Lints and fixes files

```sh
yarn run lint
```

### Run your unit tests

```sh
yarn run test:unit
```
