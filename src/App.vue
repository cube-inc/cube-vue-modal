<template>
  <div id="App">
    <header>
      <h1>Cube Modal Demo</h1>
    </header>
    <section>
      <p class="lead">Click the button below to open the modal.</p>
      <button type="button" :disabled="modalOpened" @click="modalOpened = true">Open</button>
    </section>
    <section>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum quam ac justo suscipit commodo. Mauris dignissim iaculis egestas. Fusce eleifend finibus dignissim. Phasellus pharetra tincidunt tellus vel posuere. Praesent feugiat luctus dui, eget mollis purus accumsan eget. Etiam iaculis dui felis, ut finibus tortor sollicitudin sit amet. Pellentesque nisi velit, posuere eu pharetra at, vestibulum in ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Sed ac nulla massa. Maecenas ultrices ante sit amet mi pellentesque condimentum. Pellentesque at purus quis neque dapibus varius. Cras imperdiet congue urna, a iaculis enim. Aliquam mattis facilisis mauris, id vulputate diam semper a. Quisque suscipit sollicitudin tellus, ac finibus massa mattis quis. Integer in nisl vel nunc elementum luctus. Curabitur neque elit, ullamcorper et imperdiet in, venenatis nec ipsum. Phasellus tristique libero eu turpis vehicula fermentum. Aenean faucibus est at porta blandit. Aliquam nec leo placerat, hendrerit dolor et, finibus magna. Duis aliquam tristique feugiat. Etiam sed erat sit amet neque ornare tempus non a tortor. Aenean vel enim non augue posuere viverra id eu elit.</p>
      <p>Aliquam malesuada imperdiet turpis, ac euismod eros ornare ut. Nunc dignissim erat non velit lacinia elementum. Pellentesque elit leo, congue non mattis at, porta at nunc. Mauris consectetur vitae nisi nec placerat. Morbi dapibus lacinia leo, eu porttitor mi suscipit vitae. Curabitur a lacinia sapien. Sed nec justo congue urna dictum auctor id vitae justo. Sed vitae aliquet nibh.</p>
      <p>Nam leo justo, volutpat vitae euismod sed, rutrum eget risus. Ut velit augue, cursus ut consectetur eget, tempor a dui. Donec vel gravida felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum lacinia rutrum. Nullam id turpis libero. Sed rutrum sed massa ut pharetra. Integer volutpat volutpat justo eu porta. Donec mattis sit amet turpis venenatis interdum. Suspendisse pellentesque ultrices sem, in mattis arcu efficitur in. Cras quis ornare nibh, sit amet scelerisque eros. Phasellus ullamcorper magna quis lobortis facilisis.</p>
      <p>Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae magna ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel volutpat. Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu, luctus et felis.</p>
    </section>
    <section>
      <p class="lead">Click the button below to open the modal.</p>
      <button type="button" :disabled="modalOpened" @click="$refs.modal.open()">Open</button>
    </section>
    <section>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum quam ac justo suscipit commodo. Mauris dignissim iaculis egestas. Fusce eleifend finibus dignissim. Phasellus pharetra tincidunt tellus vel posuere. Praesent feugiat luctus dui, eget mollis purus accumsan eget. Etiam iaculis dui felis, ut finibus tortor sollicitudin sit amet. Pellentesque nisi velit, posuere eu pharetra at, vestibulum in ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Sed ac nulla massa. Maecenas ultrices ante sit amet mi pellentesque condimentum. Pellentesque at purus quis neque dapibus varius. Cras imperdiet congue urna, a iaculis enim. Aliquam mattis facilisis mauris, id vulputate diam semper a. Quisque suscipit sollicitudin tellus, ac finibus massa mattis quis. Integer in nisl vel nunc elementum luctus. Curabitur neque elit, ullamcorper et imperdiet in, venenatis nec ipsum. Phasellus tristique libero eu turpis vehicula fermentum. Aenean faucibus est at porta blandit. Aliquam nec leo placerat, hendrerit dolor et, finibus magna. Duis aliquam tristique feugiat. Etiam sed erat sit amet neque ornare tempus non a tortor. Aenean vel enim non augue posuere viverra id eu elit.</p>
      <p>Aliquam malesuada imperdiet turpis, ac euismod eros ornare ut. Nunc dignissim erat non velit lacinia elementum. Pellentesque elit leo, congue non mattis at, porta at nunc. Mauris consectetur vitae nisi nec placerat. Morbi dapibus lacinia leo, eu porttitor mi suscipit vitae. Curabitur a lacinia sapien. Sed nec justo congue urna dictum auctor id vitae justo. Sed vitae aliquet nibh.</p>
      <p>Nam leo justo, volutpat vitae euismod sed, rutrum eget risus. Ut velit augue, cursus ut consectetur eget, tempor a dui. Donec vel gravida felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum lacinia rutrum. Nullam id turpis libero. Sed rutrum sed massa ut pharetra. Integer volutpat volutpat justo eu porta. Donec mattis sit amet turpis venenatis interdum. Suspendisse pellentesque ultrices sem, in mattis arcu efficitur in. Cras quis ornare nibh, sit amet scelerisque eros. Phasellus ullamcorper magna quis lobortis facilisis.</p>
      <p>Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae magna ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel volutpat. Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu, luctus et felis.</p>
    </section>
    <CubeModal ref="modal" v-model="modalOpened">
      <header>
        <h1>Title</h1>
        <a class="modal-dialog-close" @click.prevent="modalOpened = false"></a>
      </header>
      <main>
        <p>Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae magna ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel volutpat. Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu, luctus et felis.</p>
      </main>
      <footer>
        <button type="button" @click="modalOpened = false">Close</button>
      </footer>
    </CubeModal>
  </div>
</template>

<script>
import CubeModal from './components/CubeModal'
import './assets/index.scss'

export default {
  name: 'app',
  components: {
    CubeModal
  },
  data () {
    return {
      modalOpened: false
    }
  }
}
</script>

<style lang="scss">
@import 'assets/_modal.scss';
@import 'assets/_modal_animations.scss';

#App {
  padding: 2em 3em;
  text-align: center;
  > section {
    margin: 3em 0;
    > p {
      text-align: justify;
    }
  }
  .lead {
    text-align: center;
    font-size: 1.4em;
  }
}
</style>
