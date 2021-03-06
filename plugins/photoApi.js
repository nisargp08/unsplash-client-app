// Imports
export default function ({ $axios }, inject) {
  // Variables
  const apiServerUrl = `${process.env.API_SERVER_URL}/fileUpload`
  const apiGetImageBlob = `${process.env.API_SERVER_URL}/urlFetch`
  // Inject the function you want to use in nuxt components
  inject('photoApi', {
    apiServerUrl,
    insertPhoto,
    getAllPhotos,
    deletePhotoById,
    downloadPhoto,
  })

  // Functions
  async function getImageFromUrl(url) {
    try {
      const file = await $axios.$get(apiGetImageBlob, {
        params: { url: url.trim() },
        responseType: 'blob',
      })
      return file
    } catch (error) {
      getErrorMessage(error)
    }
  }

  async function insertPhoto(input, opts = { fromUrl: false }) {
    try {
      // Check if incoming file is from URL or a system file(By default accepts from a sytem file)
      let blobFile = null
      if (opts.fromUrl) {
        // Fetch the blob file from the url
        blobFile = await getImageFromUrl(input.url)
      } else {
        // Incoming file is from a system file, Simply set that file to blobFile variable
        blobFile = input
      }
      // If received response is a blob
      if (blobFile.type.match('image/*')) {
        // Create a file from the received blob
        const file = new Blob([blobFile], { type: blobFile.type })

        // Prepare a formData object
        const formData = new FormData()
        formData.append('mediaUpload', file)
        formData.append('label', input.label)
        // Call the api server to insert a file
        try {
          const fileUpload = await $axios.post(apiServerUrl, formData)
          return fileUpload
        } catch (error) {
          getErrorMessage(error)
        }
      }
    } catch (error) {
      getErrorMessage(error)
    }
  }

  async function getAllPhotos() {
    try {
      // Get all file id's from the api server
      const fileIds = await $axios.get(apiServerUrl)
      return fileIds
    } catch (error) {
      getErrorMessage(error)
    }
  }

  async function deletePhotoById(id) {
    try {
      const response = await $axios.delete(`${apiServerUrl}/${id}`)
      return response
    } catch (error) {
      getErrorMessage(error)
    }
  }
  async function downloadPhoto(url) {
    try {
      const blobFile = await getImageFromUrl(url)
      if (blobFile.type.match('image/*')) {
        const file = new Blob([blobFile], { type: blobFile.type })
        return file
      } else {
        throw new Error('File cannot be downloaded')
      }
    } catch (error) {
      getErrorMessage(error)
    }
  }
  // Function to return error message when caught
  function getErrorMessage(error) {
    throw new Error(error.message)
    // if (error.response) {
    //   // Client received an error response from the server (5xx,4xx)
    // } else if (error.request) {
    //   // Client never received a response, or request never left
    // } else {
    //   // Anything else
    // }
  }
}
