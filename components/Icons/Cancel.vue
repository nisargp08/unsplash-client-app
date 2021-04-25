<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="iconSize"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 6,
    },
    width: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    iconSize() {
      // Return icon size equal to passed props
      return [`h-${this.height}`, `w-${this.width}`]
      // h-4 w-4
      // h-5 w-5
      // h-6 w-6
      // h-7 w-7
      // h-8 w-8
      // h-9 w-9
      // h-10 w-10
    },
  },
}
</script>
