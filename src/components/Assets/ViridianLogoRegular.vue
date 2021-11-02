<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 478.11 97.4"
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
      d="M104.81 13.41a7.56 7.56 0 0 1-2.27-5.57 7.55 7.55 0 0 1 2.27-5.56A7.57 7.57 0 0 1 110.38 0a7.2 7.2 0 0 1 5.37 2.28A7.67 7.67 0 0 1 118 7.84a7.67 7.67 0 0 1-2.22 5.57 7.2 7.2 0 0 1-5.37 2.28 7.57 7.57 0 0 1-5.6-2.28Zm11.13 13.53v69.33h-11.51V26.94Zm39.79 2a26.78 26.78 0 0 1 13.72-3.29v11.92h-3q-19.36 0-19.36 21v37.7h-11.54V26.94h11.51V38.2a22.08 22.08 0 0 1 8.67-9.2Zm27.38-15.56a7.56 7.56 0 0 1-2.27-5.57 7.55 7.55 0 0 1 2.27-5.56A7.57 7.57 0 0 1 188.68 0a7.2 7.2 0 0 1 5.37 2.28 7.67 7.67 0 0 1 2.22 5.56 7.67 7.67 0 0 1-2.22 5.57 7.2 7.2 0 0 1-5.37 2.28 7.57 7.57 0 0 1-5.57-2.28Zm11.13 13.53v69.36h-11.51V26.94Zm19.61 15.75a31.3 31.3 0 0 1 11.83-12.46 32.66 32.66 0 0 1 16.89-4.42 31.34 31.34 0 0 1 15.05 3.73 27 27 0 0 1 10.63 9.8V2.66h11.63v93.61h-11.63v-13a27 27 0 0 1-10.13 10.18 30.06 30.06 0 0 1-15.68 4 31.53 31.53 0 0 1-28.59-17.33 39.74 39.74 0 0 1-4.3-18.72 38.94 38.94 0 0 1 4.3-18.71Zm51.23 5.13a22.33 22.33 0 0 0-8.54-8.92 24.19 24.19 0 0 0-23.54-.03 21.93 21.93 0 0 0-8.47 8.85 28.16 28.16 0 0 0-3.17 13.66 28.79 28.79 0 0 0 3.17 13.85 22.31 22.31 0 0 0 8.47 9 23 23 0 0 0 11.77 3.09 23.28 23.28 0 0 0 11.82-3.09 22.2 22.2 0 0 0 8.54-9 28.51 28.51 0 0 0 3.17-13.72 28.16 28.16 0 0 0-3.22-13.66Zm34.66-34.41a7.56 7.56 0 0 1-2.27-5.57 7.55 7.55 0 0 1 2.27-5.56A7.58 7.58 0 0 1 305.31 0a7.19 7.19 0 0 1 5.37 2.28 7.67 7.67 0 0 1 2.22 5.56 7.67 7.67 0 0 1-2.22 5.57 7.19 7.19 0 0 1-5.37 2.28 7.58 7.58 0 0 1-5.57-2.28Zm11.14 13.53v69.36h-11.52V26.94Zm19.6 15.75a31.3 31.3 0 0 1 11.83-12.46 32.44 32.44 0 0 1 16.76-4.42 30.7 30.7 0 0 1 15.81 3.92 26.18 26.18 0 0 1 10 9.86V26.94h11.63v69.33h-11.63V83.36a27.19 27.19 0 0 1-10.19 10.06 30.42 30.42 0 0 1-15.75 4 31.36 31.36 0 0 1-16.69-4.55 31.86 31.86 0 0 1-11.77-12.78 39.74 39.74 0 0 1-4.3-18.72 38.94 38.94 0 0 1 4.3-18.68Zm51.23 5.13a22.33 22.33 0 0 0-8.54-8.92 24.19 24.19 0 0 0-23.59-.06 21.93 21.93 0 0 0-8.47 8.85 28.16 28.16 0 0 0-3.17 13.66 28.79 28.79 0 0 0 3.17 13.85 22.31 22.31 0 0 0 8.47 9 23 23 0 0 0 11.77 3.09 23.28 23.28 0 0 0 11.82-3.09 22.2 22.2 0 0 0 8.54-9 28.51 28.51 0 0 0 3.17-13.72 28.16 28.16 0 0 0-3.17-13.63Zm88.55-14.49q7.85 7.66 7.85 22.08v40.89h-11.39V57.05q0-10.36-5.19-15.87t-14.16-5.51q-9.12 0-14.49 5.7t-5.37 16.57v38.33H416V26.94h11.52v9.87a22.81 22.81 0 0 1 9.29-8.22 28.86 28.86 0 0 1 13-2.91q12.61 0 20.45 7.65Z"
      :style="dark ? 'fill:#202020' : 'fill:#e6e6e6'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoRegular',
  props: {
    dark: { type: Boolean, default: false },
    size: { type: String, default: '100%' }
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Use original icon colors when theme 'Viridian' is selected.
    const originalColors = computed(() => {
      return store.getters.getSettingsGameOverColorThemeOver
        ? store.getters.getSettingsGameOverColorThemeOver == 'default'
          ? store.getters.getSettingsThemesSelectedColor == 0 ? false : true : true
        : store.getters.getSettingsThemesSelectedColor == 0 ? false : true
    })

    return {
      originalColors
    }
  }
}
</script>

<style>
</style>