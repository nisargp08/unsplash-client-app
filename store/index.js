// State
export const state = () => ({
  files: [],
})

// Mutations
export const mutations = {
  // Set passed files as state files
  setFiles(state, files) {
    state.files = files
  },
}

// Actions
export const actions = {
  // Action to get all files
  async getAllPhotos({ commit }) {
    // Fetch all files : { data } = response.data
    const { data } = await this.$photoApi.getAllPhotos()
    // Commit mutation
    commit('setFiles', data)
  },
}
