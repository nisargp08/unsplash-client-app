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
        <div class="bg-white rounded-xl shadow-xl py-6 px-8 mx-4">
          <!-- Form Heading -->
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-medium">Add a new photo</h3>
            <button class="text-gray-500" @click="closeModal">
              <icons-cancel :height="5" :width="5"></icons-cancel>
            </button>
          </div>
          <!-- Form Fields-->
          <div class="mt-6 space-y-5">
            <div class="space-y-2">
              <label class="block w-full font-medium text-sm" for="photoLabel"
                >Label</label
              >
              <input
                id="photoLabel"
                v-model="inputFile.label"
                class="block w-full text-sm border border-gray-300 rounded-lg py-2 px-4 shadow-sm transition focus:outline-none focus:border-gray-500"
                type="text"
                name="photoLabel"
                placeholder="Photo Label"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="block w-full font-medium text-sm" for="photoUrl"
                >Photo URL</label
              >
              <input
                id="photoUrl"
                v-model="inputFile.url"
                class="block w-full text-sm border border-gray-300 rounded-lg py-2 px-4 shadow-sm transition focus:outline-none focus:border-gray-500"
                type="text"
                name="photoUrl"
                placeholder="https://www.example.com"
                required
              />
            </div>
          </div>
          <!-- Error panel -->
          <div class="mt-4 text-sm text-red-500 font-medium">
            <ul>
              <li v-for="(error, index) in errMessages" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <!-- Form Submission -->
          <div class="flex items-center space-x-2 justify-end">
            <elements-button class="text-sm" @buttonClick="closeModal"
              >Cancel</elements-button
            >
            <elements-button
              class="text-sm"
              color="green"
              @buttonClick="uploadPhoto"
              >Submit</elements-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      inputFile: {
        label: '',
        url: '',
      },
      errMessages: [],
    }
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
    async uploadPhoto() {
      // Clear error array buffer
      this.clearErrors()
      try {
        // Send the label and link to the api in plugins
        const response = await this.$photoApi.insertPhotoFromUrl(this.inputFile)
        // If successfull close the modal
        if (response) {
          this.closeModal()
        }
      } catch (error) {
        // Push error message to array
        this.errMessages.push(error)
      }
    },
    clearErrors() {
      this.errMessages = []
    },
  },
}
</script>

<style lang="css" scoped>
.modal-window {
  z-index: var(--zindex-modal);
}
</style>
