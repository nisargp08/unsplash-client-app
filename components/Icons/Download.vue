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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
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
    },
  },
}
</script>
