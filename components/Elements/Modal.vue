<template>
  <div class="modal-container relative">
    <!-- Modal window -->
    <div
      class="modal-window flex flex-col items-center justify-center fixed inset-0"
    >
      <!-- Modal backdrop -->
      <div
        class="modal-backdrop absolute inset-0 bg-gray-900"
        :class="getModalOpacity()"
        role="button"
        @click="closeModal"
      ></div>
      <!-- Modal content -->
      <div
        class="relative w-full overflow-y-auto"
        :class="[getModalSize(), getModalPosition()]"
      >
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
    opacity: {
      type: Number,
      default: 50,
    },
    // eslint-disable-next-line vue/require-default-prop
    position: {
      type: String,
    },
  },
  mounted() {
    // Close modal on escape key
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.closeModal()
      }
    })
    // Disable main body scroll - To avoid double scrollbar in modal
    document.body.style.overflowY = 'hidden'
  },
  methods: {
    closeModal() {
      // Enable main body scroll before closing the modal
      document.body.style.overflowY = 'auto'
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
    getModalPosition() {
      switch (this.position) {
        case 'centered':
          return 'flex flex-col items-center'
      }
    },
    getModalOpacity() {
      return [`bg-opacity-${this.opacity}`]
      // bg-opacity-50 bg-opacity-60 bg-opacity-70 bg-opacity-80 bg-opacity-90
    },
  },
}
</script>

<style lang="css" scoped>
.modal-window {
  z-index: var(--zindex-modal);
}
</style>
