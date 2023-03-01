<template>
  <CubeModal class="modal-xs" v-bind="$attrs" v-on="$listeners">
    <header>
      <h1 class="modal-title">XS modal</h1>
    </header>
    <main>
      <p>
        Nullam euismod odio id convallis tincidunt. Morbi non porta dolor, eget sagittis nulla. Integer sapien mi, pellentesque vitae magna
        ut, laoreet convallis purus. Aliquam enim leo, accumsan eu gravida sit amet, cursus nec dolor. Donec dapibus et massa vel volutpat.
        Sed et mauris at orci ultricies viverra. Nam sit amet venenatis ligula. Nulla erat dolor, consequat a elementum eu, luctus et felis.
      </p>
      <div class="button-list">
        <button class="button" type="button" :disabled="modal" @click="modal = true">Modal level 2</button>
      </div>
    </main>
    <CubeModal class="modal-xs" v-model="modal">
      <header>
        <h1 class="modal-title">Modal level 2</h1>
      </header>
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius animi cumque amet assumenda consequuntur beatae dolore quidem ipsam
          sapiente. Numquam in neque adipisci sequi expedita perspiciatis. Deleniti voluptatem repellat iusto?
        </p>
        <div class="button-list">
          <button class="button" type="button" :disabled="modal2" @click="modal2 = true">Modal level 3</button>
        </div>
      </main>
      <CubeModal class="modal-xs" v-model="modal2">
        <header>
          <h1 class="modal-title">Modal level 3</h1>
        </header>
        <main>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro vitae magnam minima voluptatem pariatur explicabo ipsum,
            sint voluptatibus ratione earum accusantium id doloribus corrupti quibusdam, eligendi illum unde quam?
          </p>
        </main>
      </CubeModal>
    </CubeModal>
  </CubeModal>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      modal2: false
    }
  }
}
</script>
