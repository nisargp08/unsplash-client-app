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
    <!--When no photos are present  -->
    <template v-else-if="!filteredFiles">
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
              >
                <div class="grid-images">
                  <img :src="getFileUrl(file.id)" :alt="file.label" />
                </div>
                <div
                  class="image-overlay absolute inset-0 hidden flex-col p-4 justify-between bg-gray-900 bg-opacity-50"
                >
                  <!-- Delete Button -->
                  <div class="self-end">
                    <elements-button
                      class="flex items-center px-3 py-1"
                      color="red"
                      title="Delete this photo"
                      size="sm"
                      @buttonClick="deletePhoto(file.id)"
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
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async asyncData({ store }) {
    let errorMessage
    try {
      // Dispatch an action to get all photos from store
      await store.dispatch('getAllPhotos')
    } catch (error) {
      errorMessage = 'Error getting photos. Please try again later...'
    }
    return {
      errorMessage,
    }
  },
  computed: {
    ...mapState(['filteredFiles']),
  },
  methods: {
    getFileUrl(id) {
      return `${this.$photoApi.apiServerUrl}/${id}`
    },
    deletePhoto(id) {
      console.log(id)
      alert('Are you sure ?')
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
