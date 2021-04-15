<template>
  <div class="navbar-container px-4 py-6 text-sm">
    <div
      class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="sm:flex sm:items-center">
        <!-- Logo -->
        <logo />
        <!-- Search bar -->
        <div
          class="flex items-center border rounded-xl transition py-2 px-4 mt-6 sm:mt-0 sm:ml-4"
          :class="[searchIsFocused ? 'border-gray-400' : 'border-gray-600']"
        >
          <div
            class="transition"
            :class="[searchIsFocused ? 'text-gray-400' : 'text-gray-600']"
          >
            <icons-search :width="4" :height="4"></icons-search>
          </div>
          <div class="text-gray-200 flex-1 pl-2 sm:pl-4">
            <input
              type="search"
              name="imageSearch"
              placeholder="Search by name"
              class="w-full bg-transparent focus:outline-none"
              @focus="toggleFocus"
              @blur="toggleFocus"
            />
          </div>
        </div>
      </div>
      <!-- Action button -->
      <div class="absolute right-0 sm:relative">
        <elements-button color="green" @buttonClick="toggleModal"
          >Add a photo</elements-button
        >
      </div>
    </div>
    <!-- Add a photo modal -->
    <template v-if="modalIsOpen"
      ><forms-add-photo
        class="text-gray-900"
        @closeModal="toggleModal"
      ></forms-add-photo
    ></template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchIsFocused: false,
      modalIsOpen: false,
    }
  },
  methods: {
    toggleFocus() {
      this.searchIsFocused = !this.searchIsFocused
    },
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
  },
}
</script>
