<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 456.55 97.4"
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
      d="M103.51 7.11a3.46 3.46 0 0 1-1-2.55 3.44 3.44 0 0 1 1-2.54 3.47 3.47 0 0 1 4.83 0 3.44 3.44 0 0 1 1 2.54 3.47 3.47 0 0 1-1 2.55 3.47 3.47 0 0 1-4.83 0Zm3.72 19v70.38h-2.61V26.08Zm52.55-1.57v2.87h-1.18a28.45 28.45 0 0 0-18.84 6.46Q132 40.29 132 54.64v41.85h-2.61V26.08H132v17.08q4.17-18.64 27.78-18.65Zm12.58-17.4a3.47 3.47 0 0 1-1-2.55 3.44 3.44 0 0 1 1-2.54 3.45 3.45 0 0 1 4.82 0 3.41 3.41 0 0 1 1 2.54 3.43 3.43 0 0 1-1 2.55 3.45 3.45 0 0 1-4.82 0Zm3.72 19v70.35h-2.61V26.08Zm23.2 16a30.14 30.14 0 0 1 12.13-12.52 36 36 0 0 1 17.86-4.36q12.14 0 20.54 6.32a30.43 30.43 0 0 1 11.28 16.1V0h2.48v96.49h-2.48V74.85a30.4 30.4 0 0 1-11.28 16.23q-8.42 6.33-20.54 6.32a36 36 0 0 1-17.86-4.4 30.08 30.08 0 0 1-12.13-12.52A40.72 40.72 0 0 1 195 61.29a40.79 40.79 0 0 1 4.28-19.24ZM257 43.62a29.88 29.88 0 0 0-11.34-11.87 31.85 31.85 0 0 0-16.37-4.24 33.27 33.27 0 0 0-16.75 4 27.46 27.46 0 0 0-11 11.67 39 39 0 0 0-3.91 18.06 39.11 39.11 0 0 0 3.91 18.06 27.58 27.58 0 0 0 11 11.67 33.37 33.37 0 0 0 16.75 4 31.75 31.75 0 0 0 16.37-4.24A29.81 29.81 0 0 0 257 79a36.64 36.64 0 0 0 4.11-17.66A36.65 36.65 0 0 0 257 43.62Zm27.63-36.51a3.43 3.43 0 0 1-1-2.55 3.41 3.41 0 0 1 1-2.54 3.45 3.45 0 0 1 4.82 0 3.44 3.44 0 0 1 1 2.54 3.47 3.47 0 0 1-1 2.55 3.45 3.45 0 0 1-4.82 0Zm3.71 19v70.38h-2.61V26.08Zm23.21 16a30.14 30.14 0 0 1 12.13-12.52 36 36 0 0 1 17.86-4.36q12.13 0 20.54 6.32a30.54 30.54 0 0 1 11.28 16.1V26.08h2.47v70.41h-2.47V75a30.5 30.5 0 0 1-11.28 16.1q-8.41 6.33-20.54 6.32A36 36 0 0 1 323.68 93a30.08 30.08 0 0 1-12.13-12.52q-4.31-8.14-4.3-19.23a40.67 40.67 0 0 1 4.3-19.2Zm57.7 1.57a29.88 29.88 0 0 0-11.34-11.87 31.88 31.88 0 0 0-16.37-4.24 33.24 33.24 0 0 0-16.75 4 27.4 27.4 0 0 0-11 11.67 39 39 0 0 0-3.91 18.06 39.11 39.11 0 0 0 3.91 18.06 27.52 27.52 0 0 0 11 11.67 33.34 33.34 0 0 0 16.75 4 31.78 31.78 0 0 0 16.37-4.24A29.81 29.81 0 0 0 369.25 79a36.64 36.64 0 0 0 4.11-17.66 36.65 36.65 0 0 0-4.11-17.72Zm79.34-11.41q8 7.7 8 23.21v41.01h-2.48V55.16q0-13.83-6.91-21.06t-18.91-7.24q-12.51 0-20.08 8.15t-7.56 24.06v37.42H398V26.08h2.61V44.6q2.47-9.78 9.91-14.93a30.29 30.29 0 0 1 17.73-5.16q12.39 0 20.34 7.7Z"
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

<style scoped>
/* Transitions. */
stop {
  transition: all 0.5s;
}
</style>