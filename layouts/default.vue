<template>
  <div class="bg-gray-900 text-gray-200">
    <div class="flex flex-col min-h-screen h-full">
      <navbar></navbar>
      <Nuxt />
      <app-footer></app-footer>
    </div>
  </div>
</template>

<style>
:root {
  /* Z-index */
  --zindex-sticky: 1020;
  --zindex-modal: 1060;
  /* Animation duration */
  --animate-duration: 150ms;
}

html {
  font-family: 'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
/* Scrollbar */
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  @apply bg-gray-900;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
