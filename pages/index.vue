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
          <div class="grid grid-cols-4">
            <div v-for="(file, index) in filteredFiles" :key="index">
              <img :src="getFileUrl(file.id)" :alt="file.label" />
              <p>{{ file.label }}</p>
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
  },
}
</script>
