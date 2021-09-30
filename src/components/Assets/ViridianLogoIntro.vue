<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 476.03 97.4"
    :width="size"
  >
    <!-- Icon contents. -->
    <defs>
      <linearGradient
        id="logo-intro-a"
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
        id="logo-intro-b"
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
      style="fill:url(#logo-intro-a)"
    />
    <path
      d="M65.26 0h27.27L61.09 97.41H31.45L46.2 67.07 65.26 0z"
      style="fill:url(#logo-intro-b)"
    />
    <path
      d="M114.21 11.19a6.59 6.59 0 0 1-9.28 0A6.34 6.34 0 0 1 103 6.55a6.32 6.32 0 0 1 1.91-4.64 6.59 6.59 0 0 1 9.28 0 6.32 6.32 0 0 1 1.91 4.64 6.34 6.34 0 0 1-1.89 4.64Zm-9.14 84.58V27.56h9v68.21Zm37.1-56.89q6.29-12.41 21.56-12.41v8.73q-9.28 0-15.42 5.45t-6.14 17.19v37.93h-9V27.56h9Zm43-27.69a6.59 6.59 0 0 1-9.28 0A6.34 6.34 0 0 1 174 6.55a6.32 6.32 0 0 1 1.91-4.64 6.59 6.59 0 0 1 9.28 0 6.32 6.32 0 0 1 1.91 4.64 6.34 6.34 0 0 1-1.95 4.64ZM176 95.77V27.56h9v68.21ZM262.77.27h9v95.5h-9V82.4q-9.42 15-27.56 15A33.78 33.78 0 0 1 210.32 87 34.61 34.61 0 0 1 200 61.66a34.61 34.61 0 0 1 10.3-25.37 33.79 33.79 0 0 1 24.89-10.37q18.15 0 27.56 15Zm-46 80.56a27.17 27.17 0 0 0 38.19 0 26.18 26.18 0 0 0 7.78-19.17A26.21 26.21 0 0 0 255 42.49a27.17 27.17 0 0 0-38.19 0A26.21 26.21 0 0 0 209 61.66a26.18 26.18 0 0 0 7.8 19.17ZM300 11.19a6.59 6.59 0 0 1-9.28 0 6.33 6.33 0 0 1-1.9-4.64 6.32 6.32 0 0 1 1.9-4.64 6.59 6.59 0 0 1 9.28 0 6.32 6.32 0 0 1 1.91 4.64 6.34 6.34 0 0 1-1.91 4.64Zm-9.14 84.58V27.56h9v68.21Zm86.76-68.21h9v68.21h-9V82.4q-9.4 15-27.55 15A33.81 33.81 0 0 1 325.18 87a34.61 34.61 0 0 1-10.3-25.38 34.61 34.61 0 0 1 10.3-25.37 33.81 33.81 0 0 1 24.9-10.37q18.14 0 27.55 15Zm-46 53.27a27.19 27.19 0 0 0 38.2 0 26.21 26.21 0 0 0 7.77-19.17 26.24 26.24 0 0 0-7.77-19.17 27.19 27.19 0 0 0-38.2 0 26.25 26.25 0 0 0-7.78 19.17 26.22 26.22 0 0 0 7.82 19.17Zm106-54.91q12.4 0 19.57 7.57t7.17 20.4v41.88h-9V53.89q0-9.15-4.84-14.19t-13.71-5.05q-9.82 0-16 6.21T414.74 60v35.77h-9V27.56h9V38.2q7.64-12.28 22.92-12.28Z"
      :style="dark ? 'fill:#202020' : 'fill:#e6e6e6'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoIntro',
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