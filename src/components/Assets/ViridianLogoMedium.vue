<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 484.02 97.4"
    :width="size"
  >
    <!-- Icon contents. -->
    <defs>
      <linearGradient
        id="logo-a"
        x1="30.54"
        y1="97.4"
        x2="30.54"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0afa50'"
        />
        <stop
          offset=".21"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0ae550'"
        />
        <stop
          offset=".35"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0adc50'"
        />
        <stop
          offset=".38"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#09d851'"
        />
        <stop
          offset=".79"
          :stop-color="originalColors ? 'rgb(var(--color-color-600))' : '#03a857'"
        />
        <stop
          offset="1"
          :stop-color="originalColors ? 'rgb(var(--color-color-700))' : '#00965a'"
        />
      </linearGradient>
      <linearGradient
        id="logo-b"
        x1="61.99"
        y1="97.4"
        x2="61.99"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0"
          :stop-color="originalColors ? 'rgb(var(--color-color-700))' : '#00965a'"
        />
        <stop
          offset=".21"
          :stop-color="originalColors ? 'rgb(var(--color-color-600))' : '#03a857'"
        />
        <stop
          offset=".62"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#09d851'"
        />
        <stop
          offset=".65"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0adc50'"
        />
        <stop
          offset=".79"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0ae550'"
        />
        <stop
          offset="1"
          :stop-color="originalColors ? 'rgb(var(--color-color-500))' : '#0afa50'"
        />
      </linearGradient>
    </defs>
    <path
      d="M0 0h27.27L46.2 67.07l14.89 30.34H31.45L0 0z"
      style="fill:url(#logo-a)"
    />
    <path
      d="M65.26 0h27.27L61.09 97.41H31.45L46.2 67.07 65.26 0z"
      style="fill:url(#logo-b)"
    />
    <path
      d="M105.16 15.63a8.83 8.83 0 0 1-2.62-6.5A9 9 0 0 1 111.66 0 8.7 8.7 0 0 1 118 2.63a8.84 8.84 0 0 1 2.63 6.5 8.84 8.84 0 0 1-2.63 6.5 8.7 8.7 0 0 1-6.38 2.63 8.84 8.84 0 0 1-6.46-2.63Zm13.5 11.75v68.9h-14.25v-68.9ZM160 29.2a24.58 24.58 0 0 1 12.32-2.94V41h-3.63q-8.39 0-12.69 4.26T151.67 60v36.28h-14.25v-68.9h14.25v10A22.46 22.46 0 0 1 160 29.2Zm26.19-13.57a8.83 8.83 0 0 1-2.62-6.5A9 9 0 0 1 192.69 0a8.67 8.67 0 0 1 6.37 2.63 8.84 8.84 0 0 1 2.63 6.5 8.84 8.84 0 0 1-2.63 6.5 8.67 8.67 0 0 1-6.37 2.63 8.84 8.84 0 0 1-6.51-2.63Zm13.51 11.75v68.9h-14.27v-68.9ZM218 43.14a31.46 31.46 0 0 1 28.33-16.88 32.25 32.25 0 0 1 13.31 2.94 27.2 27.2 0 0 1 10.44 7.8V3.75h14.38v92.53h-14.38V85.9a26.49 26.49 0 0 1-9.69 8.25 30 30 0 0 1-14.19 3.25 30.76 30.76 0 0 1-16.44-4.56A32.23 32.23 0 0 1 218 80.09a39.31 39.31 0 0 1-4.31-18.57A38.17 38.17 0 0 1 218 43.14Zm49.15 6.25a20.66 20.66 0 0 0-7.69-8 20.08 20.08 0 0 0-10.26-2.75 20.23 20.23 0 0 0-17.94 10.56 24.6 24.6 0 0 0-2.94 12.32A25.63 25.63 0 0 0 231.26 74a20.65 20.65 0 0 0 7.74 8.21A19.86 19.86 0 0 0 249.2 85a20.09 20.09 0 0 0 10.26-2.76 20.56 20.56 0 0 0 7.69-8.06 25.39 25.39 0 0 0 2.93-12.44 25 25 0 0 0-2.93-12.35ZM304 15.63a8.84 8.84 0 0 1-2.63-6.5 9 9 0 0 1 9.1-9.13 8.7 8.7 0 0 1 6.38 2.63 8.83 8.83 0 0 1 2.62 6.5 8.83 8.83 0 0 1-2.62 6.5 8.7 8.7 0 0 1-6.38 2.63 8.84 8.84 0 0 1-6.47-2.63Zm13.5 11.75v68.9h-14.28v-68.9Zm18.32 15.76A31.42 31.42 0 0 1 364 26.26a30.06 30.06 0 0 1 14.19 3.19 28.76 28.76 0 0 1 9.69 7.94v-10h14.38v68.9h-14.39V86a28.24 28.24 0 0 1-9.87 8.15 32 32 0 0 1-30.51-1.31 32.35 32.35 0 0 1-11.69-12.75 39.19 39.19 0 0 1-4.31-18.57 38.06 38.06 0 0 1 4.3-18.38Zm49.14 6.25a20.59 20.59 0 0 0-7.69-8A20.07 20.07 0 0 0 367 38.64a20.23 20.23 0 0 0-18 10.56 24.6 24.6 0 0 0-2.93 12.32A25.63 25.63 0 0 0 349 74a20.68 20.68 0 0 0 7.76 8.19A19.81 19.81 0 0 0 367 85a20.08 20.08 0 0 0 10.25-2.76 20.49 20.49 0 0 0 7.69-8.06 25.28 25.28 0 0 0 2.94-12.44 24.94 24.94 0 0 0-2.95-12.35Zm85.4-19.76a24.05 24.05 0 0 1 10.07 10 33 33 0 0 1 3.62 16v40.65h-14.16V57.77q0-9.26-4.62-14.19t-12.63-4.94q-8 0-12.69 4.94t-4.69 14.19v38.51H421v-68.9h14.26v7.88a23.65 23.65 0 0 1 8.94-6.63 28.61 28.61 0 0 1 11.56-2.37 30.9 30.9 0 0 1 14.57 3.37Z"
      :class="dark ? 'fill-current text-color-900' : 'fill-current text-color-200'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoMedium',
  props: {
    dark: { type: Boolean, default: false },
    size: { type: String, default: '100%' }
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Use original icon colors when theme 'Viridian' is selected.
    const originalColors = computed(() => {
      return store.getters.getSettingsThemesSelectedColor === 0 ? false : true
    })

    return {
      originalColors
    }
  }
}
</script>

<style>
</style>