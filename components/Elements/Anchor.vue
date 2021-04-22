<template>
  <a
    class="border text-white rounded-md font-medium transition focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
    :class="[colorClasses(), sizeClasses()]"
    @click="buttonClicked"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  methods: {
    // This function is used to emit the click back to the parent
    buttonClicked() {
      this.$emit('buttonClick')
    },
    // This function will return the classes based on the color passed as a prop
    colorClasses() {
      return [
        `bg-${this.color}-700`,
        `border-${this.color}-600`,
        `hover:bg-${this.color}-800`,
        `focus:ring-${this.color}-500`,
      ]
    },
    // THis function will return the classes based on the size passed as a prop
    sizeClasses() {
      if (this.size === 'sm') {
        return 'text-xs px-2 py-1'
      } else if (this.size === 'md') {
        return 'text-sm px-4 py-2'
      } else if (this.size === 'lg') {
        return 'text-base px-5 py-3'
      } else if (this.size === 'custom') {
        return ''
      }
    },
  },
}
</script>
