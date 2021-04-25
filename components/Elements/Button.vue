<template>
  <button
    class="text-white rounded-md font-medium transition focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
    :class="[colorClasses(), disabledClasess(), sizeClasses(), borderClasses()]"
    :disabled="disabled"
    @click="buttonClicked"
  >
    <slot></slot>
  </button>
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
    border: {
      type: Number,
      default: 1,
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
      // bg-green-700 border-green-600 hover:bg-green-800 focus:ring-green-500
      // bg-gray-700 border-gray-600 hover:bg-gray-800 focus:ring-gray-500
      // bg-red-700 border-red-600 hover:bg-red-800 focus:ring-red-500
    },
    // Following classes will be applied when the button is disabled
    disabledClasess() {
      if (this.disabled) {
        return ['opacity-50 cursor-not-allowed']
      }
    },
    // Border classes
    borderClasses() {
      return [`border-${this.border}`]
      // border-0 border-1 border-2 border-3
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
<style>
.border-1 {
  border-width: 1px;
}
</style>
