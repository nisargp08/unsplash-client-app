<template>
  <div class="index-container flex flex-col flex-1">
    <!-- Error message -->
    <template v-if="errorMessage">
      <no-image-state :is-error-state="true">
        <p class="text-red-400 font-lg font-semibold">
          {{ errorMessage }}
        </p>
      </no-image-state>
    </template>
    <!-- Show loading state when getting image data -->
    <template v-else-if="isLoading">
      <icons-loading-spinner :height="8" :width="8"></icons-loading-spinner>
    </template>
    <!--When no photos are present  -->
    <template v-else-if="files.length === 0">
      <no-image-state :show-photo-button="true">
        <h1 class="text-base sm:text-xl sm:leading-10 font-medium">
          Looks like no photos are available for display!
        </h1>
        <h3 class="text-sm sm:text-base font-medium text-gray-400 mt-2 sm:mt-0">
          Upload your first photo!
        </h3>
      </no-image-state>
    </template>
    <!-- When photos are present -->
    <template v-else>
      <transition-fade>
        <template v-if="filteredFiles.length > 0">
          <div class="max-w-screen-2xl mx-auto w-full my-12">
            <div class="masonary mx-4">
              <div
                v-for="(file, index) in filteredFiles"
                :key="index"
                class="mb-4 relative grid-item"
                @click.stop="openPhoto(file)"
              >
                <div class="grid-images">
                  <img :src="getFileUrl(file.id)" :alt="file.label" />
                </div>
                <div
                  class="image-overlay cursor-pointer absolute inset-0 hidden flex-col p-4 justify-between bg-gray-900 bg-opacity-50"
                >
                  <!-- Delete Button -->
                  <div class="self-end">
                    <elements-button
                      class="flex items-center px-3 py-1"
                      color="red"
                      title="Delete this photo"
                      size="sm"
                      @click.native.prevent.stop="deletePhoto(file.id)"
                    >
                      <icons-trash :height="4" :width="4"></icons-trash>
                      <span class="ml-1">Delete</span>
                    </elements-button>
                  </div>
                  <p class="text-xs sm:text-base font-medium">
                    {{ file.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <no-image-state>
            <h1 class="text-base sm:text-xl sm:leading-10 font-medium">
              No photos founds for your match!
            </h1>
          </no-image-state>
        </template>
      </transition-fade>
      <transition-fade>
        <elements-modal v-if="isModalOpen" @closeModal="isModalOpen = false">
          <div class="flex flex-col items-center justify-center">
            <img :src="getFileUrl(selectedFile.id)" :alt="selectedFile.alt" />
          </div>
          <!-- Close button -->
          <div class="fixed right-0 top-0 mt-4 mr-8">
            <elements-button
              color="red"
              class="flex items-center"
              @click.native="isModalOpen = false"
            >
              <icons-circle-cancel></icons-circle-cancel>
              <p class="ml-2">Close</p>
            </elements-button>
          </div>
          <!-- Download button -->
          <!-- <div class="fixed left-0 top-0 mt-4 ml-4">
            <elements-button color="green" class="flex items-center">
              <icons-download></icons-download>
              <p class="ml-2">Download</p>
            </elements-button>
          </div> -->
        </elements-modal>
      </transition-fade>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      isModalOpen: false,
      selectedFile: '',
    }
  },
  computed: {
    ...mapState(['files', 'filteredFiles']),
  },
  async created() {
    // Start loading
    this.isLoading = true
    try {
      // Dispatch an action to get all photos from store
      await this.$store.dispatch('getAllPhotos')
    } catch (error) {
      this.errorMessage = 'Error getting photos. Please try again later...'
    }
    // Stop loading
    this.isLoading = false
  },
  methods: {
    getFileUrl(id) {
      return `${this.$photoApi.apiServerUrl}/${id}`
    },
    openPhoto(file) {
      // Set the selected file to clicked file
      this.selectedFile = file
      // Open modal
      this.isModalOpen = true
    },
    async deletePhoto(id) {
      if (confirm('Are you sure ?')) {
        try {
          await this.$photoApi.deletePhotoById(id)
          // Update photo list
          await this.$store.dispatch('getAllPhotos')
        } catch (error) {
          this.errorMessage = 'Error deleting photo. Please try again later...'
        }
      }
    },
  },
}
</script>

<style>
.grid-item:hover .image-overlay {
  display: flex;
}
.masonary {
  columns: 2;
  column-gap: 1rem;
}
.masonary .grid-images {
  display: inline-block;
  position: relative;
  width: 100%;
}
.masonary .grid-images img {
  width: 100%;
  border-radius: 0.375rem;
}
@media (min-width: 768px) {
  .masonary {
    columns: 3;
  }
}
@media (min-width: 1024px) {
  .masonary {
    columns: 4;
  }
}
</style>
