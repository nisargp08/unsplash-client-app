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
    <template v-else-if="!files">
      <no-image-state></no-image-state>
    </template>
    <!-- When photos are present -->
    <template v-else>
      <div class="grid grid-cols-4">
        <div v-for="(file, index) in files" :key="index">
          <img :src="getFileUrl(file.id)" :alt="file.label" />
        </div>
      </div>
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
    ...mapState(['files']),
  },
  methods: {
    getFileUrl(id) {
      return `${this.$photoApi.apiServerUrl}/${id}`
    },
  },
}
</script>
