<template>
  <button
    class="border text-white rounded-md px-4 py-2 font-medium transition focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
    :class="[buttonColorClass, { 'opacity-50 cursor-not-allowed ': disabled }]"
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
  },
  computed: {
    // This function will return the classes based on the color passed as a prop
    buttonColorClass() {
      return [
        `bg-${this.color}-700`,
        `border-${this.color}-600`,
        `hover:bg-${this.color}-800`,
        `focus:ring-${this.color}-500`,
      ]
    },
  },
  methods: {
    // This function is used to emit the click back to the parent
    buttonClicked() {
      this.$emit('buttonClick')
    },
  },
}
</script>
