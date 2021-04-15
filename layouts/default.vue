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
  --zindex-modal: 1060;
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
</style>
