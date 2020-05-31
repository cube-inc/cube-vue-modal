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
        <button class="button" type="button" :disabled="modalOpen" @click="modalOpen = true">Open modal form prop</button>
      </section>
      <section class="section">
        <img class="image" src="https://picsum.photos/1920/1080/" alt="Picsum photos" />
      </section>
      <section class="section content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum quam ac justo suscipit commodo. Mauris dignissim iaculis
          egestas. Fusce eleifend finibus dignissim. Phasellus pharetra tincidunt tellus vel posuere. Praesent feugiat luctus dui, eget
          mollis purus accumsan eget. Etiam iaculis dui felis, ut finibus tortor sollicitudin sit amet. Pellentesque nisi velit, posuere eu
          pharetra at, vestibulum in ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>
      <section class="section">
        <img class="image" src="https://picsum.photos/1920/1080/" alt="Picsum photos" />
      </section>
      <section class="section content">
        <button class="button" type="button" :disabled="modalOpen" @click="openModal">Open modal from open()</button>
      </section>
      <section class="section content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum quam ac justo suscipit commodo. Mauris dignissim iaculis
          egestas. Fusce eleifend finibus dignissim. Phasellus pharetra tincidunt tellus vel posuere. Praesent feugiat luctus dui, eget
          mollis purus accumsan eget. Etiam iaculis dui felis, ut finibus tortor sollicitudin sit amet. Pellentesque nisi velit, posuere eu
          pharetra at, vestibulum in ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>
      <CubeModal ref="modal" v-model="modalOpen" @after-enter="$log('Modal opened')" @after-leave="$log('Modal closed')">
        <header>
          <h1>Modal Title</h1>
        </header>
        <aside>
          <img class="image" src="https://picsum.photos/1920/1080/" alt="Picsum photos" />
        </aside>
        <main>
          <p>
            Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae
            magna ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel
            volutpat. Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu,
            luctus et felis.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsam impedit ducimus sapiente quam explicabo, enim sint facere
            sunt earum excepturi libero totam. Quidem nemo, nobis veritatis quos quia iusto? Minus consequatur ducimus, magnam sequi, cumque
            nesciunt laboriosam fugit possimus blanditiis quibusdam officia necessitatibus inventore, amet eligendi doloremque molestiae.
            Amet facere tempore a voluptatibus saepe ullam quaerat est, aspernatur at in et, consequatur sed? Sequi quasi praesentium
            suscipit explicabo eaque? Recusandae, illum facere quae suscipit cupiditate temporibus voluptas nemo. Odio, quia. Rem, quaerat
            natus ipsa id delectus repudiandae. Nesciunt quod reprehenderit praesentium sunt itaque, iste explicabo magni enim vero aliquid?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, repellendus. Nam dolorum excepturi molestias. Obcaecati, numquam
            ut nihil minima nobis libero alias excepturi dignissimos, aliquam quia reprehenderit facere esse? Accusantium quam optio unde ea
            eius, eos alias doloribus quisquam nulla saepe tenetur aspernatur ipsam quidem excepturi reiciendis autem sequi? Quo alias
            dolores eum in ad necessitatibus ratione iusto nemo deserunt ipsa sequi enim eos obcaecati sapiente nisi quas blanditiis
            consectetur at aliquam, dolor magni, odit, maiores id. Laboriosam, voluptas itaque. Reprehenderit ab eos facere maxime
            voluptates, eveniet, hic eum reiciendis, illo eligendi perferendis voluptatem enim eaque ipsum corporis voluptate ipsam.
          </p>
        </main>
        <footer>
          <button class="button" type="button" @click="modalOpen = false">Close</button>
        </footer>
      </CubeModal>
    </div>
  </div>
</template>

<script>
import CubeModal from './components/CubeModal'
import './scss/index.scss'

export default {
  name: 'app',
  components: {
    CubeModal
  },
  data() {
    const { name, version, description } = this.$root.$options.packageInfo
    return {
      name,
      version,
      description,
      modalOpen: false
    }
  },
  methods: {
    $log(message) {
      console.info(message)
    },
    $alert(message) {
      alert(message)
    },
    async openModal() {
      await this.$refs.modal.open()
      console.info('Modal opened from open()')
    }
  }
}
</script>
