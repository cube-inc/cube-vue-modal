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
```
yarn install
yarn run serve --open
```

## Install the dependency

```
yarn add https://fredericgomez@bitbucket.org/cube-inc/cube-vue-modal.git
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```
