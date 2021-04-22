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
      <div class="relative w-full overflow-y-auto" :class="getModalSize()">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '',
    },
  },
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
    getModalSize() {
      switch (this.size) {
        case 'sm':
          return 'max-w-screen-sm'
        case 'md':
          return 'max-w-screen-md'
        case 'lg':
          return 'max-w-screen-lg'
        case 'xl':
          return 'max-w-screen-xl'
        case '2xl':
          return 'max-w-screen-2xl'
      }
    },
  },
}
</script>

<style lang="css" scoped>
.modal-window {
  z-index: var(--zindex-modal);
}
</style>
