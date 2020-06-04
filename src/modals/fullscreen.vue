<template>
  <CubeModal ref="modal" class="modal-fullscreen" v-bind="$attrs" v-on="$listeners">
    <aside>
      <PicsumPhotos />
    </aside>
    <header>
      <h1 class="modal-title">Fullscreen modal</h1>
    </header>
    <main>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam at cumque neque tempore corrupti vero. Ipsum, blanditiis sequi!
        Porro earum velit tenetur animi nisi delectus fuga aspernatur. Ipsum, esse? Itaque, autem eos. Obcaecati consectetur in voluptate
        doloribus perspiciatis saepe magnam, odit illo non numquam assumenda? Sint adipisci molestiae repellat libero sunt aut beatae facere
        voluptatem nihil inventore. Ratione quibusdam nobis reiciendis alias fugit adipisci, ut facere, laboriosam iusto placeat saepe
        expedita corrupti nisi amet esse id? Illo sapiente libero excepturi cumque reprehenderit itaque architecto laboriosam, officiis iste
        facilis ipsa officia suscipit nihil. Ullam voluptate nihil eaque a earum qui? Nostrum!
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quae, nobis dolorem quia, beatae a quos inventore voluptatem
        quibusdam perspiciatis aliquam. Excepturi laboriosam ullam error nam dolorum consequatur consectetur quas iste, nesciunt, suscipit
        alias sequi qui id. Nihil aspernatur, ducimus porro sunt repellat est nesciunt accusamus, tempore pariatur laudantium nam.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae ducimus eaque itaque sit recusandae magnam. Aliquam velit totam quae
        expedita odio id repellat cupiditate illo voluptates in voluptatem consequatur earum porro nulla blanditiis incidunt nihil excepturi
        qui vero, sunt repudiandae dolorum. Autem odio quasi necessitatibus nesciunt repudiandae harum ea, rerum numquam dicta soluta sed.
        Harum corrupti ab non at error numquam veritatis animi nulla voluptate. Accusantium repudiandae autem, dolorum expedita atque animi
        dignissimos placeat nesciunt quisquam fugiat ab libero ipsam quaerat hic consequuntur voluptatibus inventore, iste magnam quibusdam
        voluptatum id provident, omnis voluptates. Similique nesciunt vel fugit saepe sequi dolorum distinctio, doloremque labore quia
        libero provident optio a eos velit ducimus ea assumenda sit totam! Enim ducimus deleniti nihil placeat molestias neque quas porro
        maiores nisi, cumque expedita sunt aliquid sit consequuntur illum iure repellendus? Nisi autem iusto tempora veritatis quaerat ut
        sequi culpa, natus sint, nobis tempore magnam eveniet!
      </p>
    </main>
    <footer>
      <button class="button" type="button" @click="$refs.modal.close()">Close</button>
    </footer>
  </CubeModal>
</template>
