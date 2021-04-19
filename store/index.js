// State
export const state = () => ({
  files: [],
  filteredFiles: [],
})

// Mutations
export const mutations = {
  // Set passed files as state files
  setFiles(state, files) {
    state.files = files
  },
  setFilteredFiles(state, filteredFiles) {
    state.filteredFiles = filteredFiles
  },
}

// Actions
export const actions = {
  // Action to get all files
  async getAllPhotos({ commit }) {
    // Fetch all files : { data } = response.data
    const { data } = await this.$photoApi.getAllPhotos()
    // Reversing the array so returns latest image is on top
    const latestData = data.reverse()
    // Commit mutation
    commit('setFiles', latestData)
    commit('setFilteredFiles', latestData)
  },
  // Action to get filtered files based on user searchFiles
  getFilteredFiles({ state, commit }, search) {
    if (search && search.trim().length !== 0) {
      const files = state.files.filter((file) => {
        return search
          .toLowerCase()
          .split(' ')
          .every((char) => file.label.toLowerCase().includes(char))
      })
      commit('setFilteredFiles', files)
    } else {
      commit('setFilteredFiles', state.files)
    }
  },
}
