// Imports
import axios from 'axios'
export default function (context, inject) {
  // Variables
  const apiServerUrl = 'http://localhost:5000/api/fileUpload'
  // Inject the function you want to use in nuxt components
  inject('photoApi', {
    insertPhotoFromUrl,
  })

  // Functions
  async function insertPhotoFromUrl(input) {
    try {
      // Fetch the blob file from the url
      const response = await axios.get(input.url, {
        responseType: 'blob',
      })
      const blobFile = response.data
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
          const fileUpload = await axios.post(apiServerUrl, formData)
          return fileUpload
        } catch (error) {
          getErrorMessage(error)
        }
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
