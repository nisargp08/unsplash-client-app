<template>
  <section
    class="no-image-state-container flex flex-col items-center justify-center flex-1 px-4"
  >
    <div class="w-56 sm:w-72">
      <img src="/images/no_image_state.svg" alt="No image found" />
    </div>
    <div class="mt-4 text-center">
      <template v-if="isErrorState">
        <slot></slot>
      </template>
      <template v-else>
        <slot></slot>
        <div v-if="showPhotoButton" class="mt-4">
          <elements-button color="green" @buttonClick="toggleModal"
            >Add a photo</elements-button
          >
        </div>
      </template>
    </div>
    <!-- Add a photo modal -->
    <template v-if="modalIsOpen"
      ><forms-add-photo
        class="text-gray-900"
        @closeModal="toggleModal"
      ></forms-add-photo
    ></template>
  </section>
</template>

<script>
export default {
  props: {
    isErrorState: {
      type: Boolean,
      default: false,
    },
    showPhotoButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalIsOpen: false,
    }
  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
  },
}
</script>
