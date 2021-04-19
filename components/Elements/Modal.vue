<template>
  <div class="modal-container relative">
    <!-- Modal window -->
    <div
      class="modal-window flex flex-col items-center justify-center fixed inset-0"
    >
      <!-- Modal backdrop -->
      <div
        class="modal-backdrop absolute inset-0 bg-gray-900 bg-opacity-50"
        role="button"
        @click="closeModal"
      ></div>
      <!-- Modal content -->
      <div class="relative max-w-screen-sm w-full">
        <div class="relative bg-white rounded-xl shadow-xl py-6 px-8 mx-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Close modal on escape key
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.closeModal()
      }
    })
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style lang="css" scoped>
.modal-window {
  z-index: var(--zindex-modal);
}
</style>
