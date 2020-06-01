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
          <button class="button" type="button" :disabled="modals.default" @click="modals.default = true">Open modal form prop</button>
          <button class="button" type="button" :disabled="modals.small" @click="modals.small = true">Small modal</button>
          <button class="button" type="button" :disabled="modals.top" @click="modals.top = true">Top modal</button>
          <button class="button" type="button" :disabled="modals.fullscreen" @click="modals.fullscreen = true">Fullscreen modal</button>
        </div>
      </section>
      <section class="section">
        <img class="image" v-lazy :src="pictureUrl" alt="Picsum photos" />
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
        <button class="button" type="button" :disabled="modals.default" @click="openModal">Open modal from open()</button>
      </section>
      <CubeModal ref="modal" v-model="modals.default" @after-enter="$log('Modal opened')" @after-leave="$log('Modal closed')">
        <header>
          <h1>Modal Title</h1>
        </header>
        <aside>
          <img class="image" v-lazy :src="pictureUrl" alt="Picsum photos" />
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
          <button class="button" type="button" @click="modals.default = false">Close</button>
        </footer>
      </CubeModal>
      <CubeModal v-model="modals.small">
        <header>
          <h1>Small Modal Title</h1>
        </header>
        <main>
          <p>
            Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae
            magna ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel
            volutpat. Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu,
            luctus et felis.
          </p>
        </main>
      </CubeModal>
      <CubeModal v-model="modals.top" class="modal-top">
        <aside>
          <img class="image" v-lazy :src="pictureUrl" alt="Picsum photos" />
        </aside>
        <header>
          <h1>Top Modal Title</h1>
        </header>
        <main>
          <p>You juste have to add the <code>.modal-top</code> class to the component.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam at cumque neque tempore corrupti vero. Ipsum, blanditiis
            sequi! Porro earum velit tenetur animi nisi delectus fuga aspernatur. Ipsum, esse? Itaque, autem eos. Obcaecati consectetur in
            voluptate doloribus perspiciatis saepe magnam, odit illo non numquam assumenda? Sint adipisci molestiae repellat libero sunt aut
            beatae facere voluptatem nihil inventore. Ratione quibusdam nobis reiciendis alias fugit adipisci, ut facere, laboriosam iusto
            placeat saepe expedita corrupti nisi amet esse id? Illo sapiente libero excepturi cumque reprehenderit itaque architecto
            laboriosam, officiis iste facilis ipsa officia suscipit nihil. Ullam voluptate nihil eaque a earum qui? Nostrum!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quae, nobis dolorem quia, beatae a quos inventore
            voluptatem quibusdam perspiciatis aliquam. Excepturi laboriosam ullam error nam dolorum consequatur consectetur quas iste,
            nesciunt, suscipit alias sequi qui id. Nihil aspernatur, ducimus porro sunt repellat est nesciunt accusamus, tempore pariatur
            laudantium nam.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae ducimus eaque itaque sit recusandae magnam. Aliquam velit totam
            quae expedita odio id repellat cupiditate illo voluptates in voluptatem consequatur earum porro nulla blanditiis incidunt nihil
            excepturi qui vero, sunt repudiandae dolorum. Autem odio quasi necessitatibus nesciunt repudiandae harum ea, rerum numquam dicta
            soluta sed. Harum corrupti ab non at error numquam veritatis animi nulla voluptate. Accusantium repudiandae autem, dolorum
            expedita atque animi dignissimos placeat nesciunt quisquam fugiat ab libero ipsam quaerat hic consequuntur voluptatibus
            inventore, iste magnam quibusdam voluptatum id provident, omnis voluptates. Similique nesciunt vel fugit saepe sequi dolorum
            distinctio, doloremque labore quia libero provident optio a eos velit ducimus ea assumenda sit totam! Enim ducimus deleniti
            nihil placeat molestias neque quas porro maiores nisi, cumque expedita sunt aliquid sit consequuntur illum iure repellendus?
            Nisi autem iusto tempora veritatis quaerat ut sequi culpa, natus sint, nobis tempore magnam eveniet!
          </p>
        </main>
        <footer>
          <button class="button" type="button" @click="modals.top = false">Close</button>
        </footer>
      </CubeModal>
      <CubeModal v-model="modals.fullscreen" class="modal-fullscreen">
        <aside>
          <img class="image" v-lazy :src="pictureUrl" alt="Picsum photos" />
        </aside>
        <header>
          <h1>Fullscreen Title</h1>
        </header>
        <main>
          <p>You juste have to add the <code>.modal-fullscreen</code> class to the component.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam at cumque neque tempore corrupti vero. Ipsum, blanditiis
            sequi! Porro earum velit tenetur animi nisi delectus fuga aspernatur. Ipsum, esse? Itaque, autem eos. Obcaecati consectetur in
            voluptate doloribus perspiciatis saepe magnam, odit illo non numquam assumenda? Sint adipisci molestiae repellat libero sunt aut
            beatae facere voluptatem nihil inventore. Ratione quibusdam nobis reiciendis alias fugit adipisci, ut facere, laboriosam iusto
            placeat saepe expedita corrupti nisi amet esse id? Illo sapiente libero excepturi cumque reprehenderit itaque architecto
            laboriosam, officiis iste facilis ipsa officia suscipit nihil. Ullam voluptate nihil eaque a earum qui? Nostrum!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quae, nobis dolorem quia, beatae a quos inventore
            voluptatem quibusdam perspiciatis aliquam. Excepturi laboriosam ullam error nam dolorum consequatur consectetur quas iste,
            nesciunt, suscipit alias sequi qui id. Nihil aspernatur, ducimus porro sunt repellat est nesciunt accusamus, tempore pariatur
            laudantium nam.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae ducimus eaque itaque sit recusandae magnam. Aliquam velit totam
            quae expedita odio id repellat cupiditate illo voluptates in voluptatem consequatur earum porro nulla blanditiis incidunt nihil
            excepturi qui vero, sunt repudiandae dolorum. Autem odio quasi necessitatibus nesciunt repudiandae harum ea, rerum numquam dicta
            soluta sed. Harum corrupti ab non at error numquam veritatis animi nulla voluptate. Accusantium repudiandae autem, dolorum
            expedita atque animi dignissimos placeat nesciunt quisquam fugiat ab libero ipsam quaerat hic consequuntur voluptatibus
            inventore, iste magnam quibusdam voluptatum id provident, omnis voluptates. Similique nesciunt vel fugit saepe sequi dolorum
            distinctio, doloremque labore quia libero provident optio a eos velit ducimus ea assumenda sit totam! Enim ducimus deleniti
            nihil placeat molestias neque quas porro maiores nisi, cumque expedita sunt aliquid sit consequuntur illum iure repellendus?
            Nisi autem iusto tempora veritatis quaerat ut sequi culpa, natus sint, nobis tempore magnam eveniet!
          </p>
        </main>
        <footer>
          <button class="button" type="button" @click="modals.fullscreen = false">Close</button>
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
  directives: {
    lazy: {
      inserted: function (el) {
        el.classList.add('lazy')
        el.onload = () => {
          el.classList.add('loaded')
        }
      }
    }
  },
  data() {
    const { name, version, description } = this.$root.$options.packageInfo
    return {
      name,
      version,
      description,
      modals: {
        default: false,
        small: false,
        top: false,
        fullscreen: false
      }
    }
  },
  computed: {
    pictureUrl: () => `https://picsum.photos/1920/1080/`
  },
  methods: {
    $log(message) {
      console.info(message)
    },
    $alert(message) {
      alert(message)
    },
    onImageLoad(event) {
      event.target.classList.add('loaded')
    },
    async openModal() {
      await this.$refs.modal.open()
      console.info('Modal opened from open()')
    }
  }
}
</script>
