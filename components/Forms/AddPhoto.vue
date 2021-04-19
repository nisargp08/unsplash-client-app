<template>
  <elements-modal @closeModal="closeModal">
    <!-- Default state -->
    <div class="form-wrapper">
      <!-- Sleeping notice -->
      <div
        class="py-2 px-4 text-sm font-medium bg-green-200 text-green-700 rounded-md"
      >
        <p>
          First photo upload might take 15-30 seconds as heroku servers go to
          sleep when idle.😴
        </p>
      </div>
      <!-- Form Heading -->
      <div
        class="flex items-center justify-between mt-4 border-t border-gray-200 pt-4"
      >
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
          type="submit"
          class="text-sm"
          color="green"
          :disabled="disableCheck"
          @buttonClick="uploadPhoto"
          >Submit</elements-button
        >
      </div>
    </div>
    <!-- Loading state -->
    <template v-if="apiIsLoading">
      <icons-loading-spinner :height="8" :width="8"></icons-loading-spinner>
    </template>
  </elements-modal>
</template>

<script>
export default {
  data() {
    return {
      inputFile: {
        label: '',
        url: '',
      },
      errMessages: [],
      apiIsLoading: false,
    }
  },
  computed: {
    // Disabled button when no input
    disableCheck() {
      if (
        this.inputFile.label.trim().length === 0 ||
        this.inputFile.url.trim().length === 0
      ) {
        // One of the form field is empty, so disabled the button
        return true
      } else {
        // Both form fields have value, so enable the button
        return false
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    async uploadPhoto() {
      // Check if form fields have values
      if (this.disableCheck) {
        this.errMessages.push('Label/URL is required')
        return
      }
      // Start api loading
      this.apiIsLoading = true
      // Clear error array buffer
      this.clearErrors()
      try {
        // Send the label and link to the api in plugins
        const response = await this.$photoApi.insertPhotoFromUrl(this.inputFile)
        // If successfull
        if (response) {
          // Update photo list
          await this.$store.dispatch('getAllPhotos')
          // close the modal
          this.closeModal()
        }
      } catch (error) {
        // Push error message to array
        this.errMessages.push(
          'Invalid file link. Please try a different link...'
        )
      } finally {
        // Stop loading state
        this.apiIsLoading = false
      }
    },
    clearErrors() {
      this.errMessages = []
    },
  },
}
</script>
