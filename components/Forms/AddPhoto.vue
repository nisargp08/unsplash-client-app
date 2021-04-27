<template>
  <elements-modal size="sm" @closeModal="closeModal">
    <elements-card>
      <!-- Default state -->
      <div class="form-wrapper">
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
          <!-- Drag area -->
          <div
            class="space-y-4 text-center border-dashed border rounded-xl border-blue-300 bg-blue-500 bg-opacity-5 py-9 px-8"
            :class="{ 'bg-opacity-20': isDragging }"
            @dragenter.prevent.stop="onDragEnter"
            @dragleave.prevent.stop="onDragLeave"
            @dragover.prevent
            @drop.prevent.stop="onDrop"
          >
            <div
              class="flex rounded-xl shadow-card-shadow max-w-xl min-h-lg mx-auto text-center"
            >
              <div class="flex flex-col flex-1">
                <div
                  v-if="!previewFiles.length"
                  class="flex flex-col items-center justify-center h-full"
                >
                  <div
                    class="flex items-center justify-center w-40 transition-all"
                  >
                    <img src="/images/drop.svg" alt="Drop image" />
                  </div>
                  <label
                    for="files"
                    role="button"
                    class="text-xs cursor-pointer sm:text-sm leading-5 font-medium text-gray-500 mt-6"
                  >
                    Drag & Drop your image here or<br />
                    <span class="font-bold text-blue-500">Browse</span> to
                    choose a file
                  </label>
                </div>
                <!-- After Drag state - When one or more than one image has been uploaded -->
                <div v-if="previewFiles.length" class="grid grid-cols-1 px-2">
                  <div
                    v-for="(image, index) in previewFiles"
                    :key="index"
                    class="flex relative items-center justify-center"
                  >
                    <img class="rounded-md object-cover" :src="image" />
                    <!-- Remove overlay -->
                    <div class="absolute inset-0 remove-overlay rounded-md">
                      <div class="flex items-center justify-end mt-2 mr-2">
                        <!-- Remove button -->
                        <elements-button
                          color="red"
                          size="sm"
                          class="removeIcon"
                          title="Remove image"
                          @click.native="clearFileBuffer()"
                        >
                          <span class="mr-1">Remove</span>
                          <icons-circle-cancel
                            :height="4"
                            :width="4"
                          ></icons-circle-cancel>
                        </elements-button>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  id="files"
                  class="hidden"
                  type="file"
                  name="files"
                  accept="image/*"
                  @change="inputFiles"
                />
              </div>
            </div>
            <p class="text-xs sm:text-sm leading-5 font-medium text-gray-500">
              Or
            </p>
            <input
              id="photoUrl"
              v-model="inputFile.url"
              class="block w-full text-sm border border-gray-300 rounded-lg py-2 px-4 shadow-sm transition focus:outline-none focus:border-gray-500"
              type="text"
              name="photoUrl"
              placeholder="Paste an image URL"
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
        <div class="flex items-center space-x-2 justify-end mt-4">
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
    </elements-card>
    <!-- Loading state -->
    <template v-if="apiIsLoading">
      <icons-loading-spinner :height="8" :width="8">
        <p class="text-lg font-semibold text-white mt-2 text-center">Loading</p>
      </icons-loading-spinner>
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
      // Drag/drop variables
      dragCounter: 0,
      isDragging: false,
      previewFiles: [],
      browseFile: null,
    }
  },
  computed: {
    // Disabled button when no input
    disableCheck() {
      if (
        this.inputFile.label.trim().length === 0 ||
        (this.inputFile.url.trim().length === 0 && this.browseFile === null) ||
        (this.inputFile.url.trim().length !== 0 && this.browseFile !== null)
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
        // Check if file is from url
        if (this.inputFile.url !== '') {
          await this.insertPhoto({ type: 'url' })
        }
        // Check if file was uploaded via browsing system files
        else if (this.browseFile !== null) {
          await this.insertPhoto({ type: 'browse' })
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
    // Drag/Drop methods
    // When a item enters the drag area
    onDragEnter() {
      this.dragCounter++
      this.isDragging = true
    },
    // When a itemleaves the drag area
    onDragLeave() {
      this.dragCounter--
      if (this.dragCounter <= 0) {
        this.isDragging = false
      }
    },
    // When a item are drop in the drag area
    onDrop($event) {
      this.isDragging = false
      // Clear file storage buffer
      this.clearFileBuffer()
      const file = $event.dataTransfer.files

      if (file.length) {
        this.addImage(file[0])
      }
    },
    inputFiles($event) {
      this.clearFileBuffer()
      const file = $event.target.files
      if (file.length) {
        this.addImage(file[0])
      }
    },
    addImage(file) {
      // Validate image and return if file is not valid
      if (!this.validateImage(file)) {
        return
      }
      this.browseFile = file
      // Preview image
      this.previewImage(file)
    },
    // Preview an image
    previewImage(file) {
      const reader = new FileReader()
      // Push the file base64 string to the array
      reader.onload = (e) => this.previewFiles.push(e.target.result)
      // Call the onload function by calling 'readAsDataURL'
      reader.readAsDataURL(file)
    },
    // Validate image
    validateImage(file) {
      let isValid = true
      // Validate file input type
      if (!file.type.match('image.*')) {
        this.errMessages.push(`${file.name} is not a valid image type`)
        isValid = false
      }
      // Validate file size
      const maxSize = 10240 // (1024 * 10 = 10MB)
      const fileSize = Math.round(file.size / 1024)
      if (fileSize > maxSize) {
        this.errMessages.push(
          `${file.name} is greater than ${Math.round(maxSize / 1024)} MB`
        )
        isValid = false
      }

      // Return file status
      return isValid
    },
    async insertPhoto(file) {
      let response = null
      // Clear any file selected by browsing
      if (file.type === 'browse') {
        this.inputFile.url = ''
        this.browseFile.label = this.inputFile.label
        // Send the label and link to the api in plugins
        response = await this.$photoApi.insertPhoto(this.browseFile, {
          fromUrl: false,
        })
      } else if (file.type === 'url') {
        this.browseFile = null
        // Send the label and link to the api in plugins
        response = await this.$photoApi.insertPhoto(this.inputFile, {
          fromUrl: true,
        })
      }
      // If successfull
      if (response) {
        // Update photo list
        await this.$store.dispatch('getAllPhotos')
        // close the modal
        this.closeModal()
      }
    },
    // Clear input
    clearFileBuffer() {
      this.errMessages = []
      this.browseFile = null
      this.previewFiles = []
    },
  },
}
</script>

<style>
.remove-overlay .removeIcon {
  display: none;
}
.remove-overlay:hover {
  background: linear-gradient(
    to bottom left,
    rgba(31, 41, 55, 1) 0px,
    transparent
  );
}
.remove-overlay:hover .removeIcon {
  display: flex;
  align-items: center;
}
</style>
