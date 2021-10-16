<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 473.31 97.4"
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
      d="M104.46 11.28a6.44 6.44 0 0 1-1.92-4.74 6.24 6.24 0 0 1 1.92-4.68 6.66 6.66 0 0 1 9.23 0 6.24 6.24 0 0 1 1.92 4.68 6.44 6.44 0 0 1-1.92 4.74 6.51 6.51 0 0 1-9.23 0Zm9.1 15.12v70h-9v-70Zm38.38 2.31q6.09-3.59 14.93-3.59v9.36h-2.43q-9.75 0-15.64 5.25t-5.89 17.56v39.09h-9v-70h9v12.45a21.89 21.89 0 0 1 9.03-10.12Zm28.26-17.43a6.44 6.44 0 0 1-1.92-4.74 6.24 6.24 0 0 1 1.92-4.68 6.66 6.66 0 0 1 9.23 0 6.24 6.24 0 0 1 1.92 4.68 6.44 6.44 0 0 1-1.92 4.74 6.51 6.51 0 0 1-9.23 0Zm9.1 15.12v70h-9v-70Zm20.63 16a31.17 31.17 0 0 1 12-12.56 33.7 33.7 0 0 1 17.24-4.42 31.63 31.63 0 0 1 16.66 4.48 27.5 27.5 0 0 1 10.89 11.66v-40h9v94.82h-9V80.74a27 27 0 0 1-10.51 12A31.12 31.12 0 0 1 239 97.4a33.35 33.35 0 0 1-17.24-4.48 31 31 0 0 1-11.92-12.69 40.35 40.35 0 0 1-4.29-19 39.52 39.52 0 0 1 4.38-18.87Zm53.32 4.16a24.68 24.68 0 0 0-9.42-9.86 25.66 25.66 0 0 0-13.14-3.47 26.65 26.65 0 0 0-13.33 3.34 23.56 23.56 0 0 0-9.29 9.67 31.53 31.53 0 0 0-3.39 15.06 32 32 0 0 0 3.39 15.06 23.79 23.79 0 0 0 9.29 9.87 26.18 26.18 0 0 0 13.33 3.4 25.75 25.75 0 0 0 13.14-3.46 24.77 24.77 0 0 0 9.42-9.87 30.78 30.78 0 0 0 3.46-14.87 30.81 30.81 0 0 0-3.46-14.91Zm32.81-35.24a6.44 6.44 0 0 1-1.92-4.74 6.24 6.24 0 0 1 1.92-4.68 6.66 6.66 0 0 1 9.23 0 6.24 6.24 0 0 1 1.92 4.68 6.44 6.44 0 0 1-1.92 4.74 6.51 6.51 0 0 1-9.23 0Zm9.1 15.12v70h-9v-70Zm20.57 16a30.68 30.68 0 0 1 11.92-12.64 33.69 33.69 0 0 1 17.23-4.42A31.36 31.36 0 0 1 372.12 30a26.92 26.92 0 0 1 10.45 11.79V26.4h9v70h-9V80.87A28.08 28.08 0 0 1 372 92.73a31 31 0 0 1-17.23 4.67 33.08 33.08 0 0 1-17.11-4.48 31 31 0 0 1-11.92-12.69 40.23 40.23 0 0 1-4.3-19 39.86 39.86 0 0 1 4.29-18.87Zm53.38 4.16a24.68 24.68 0 0 0-9.42-9.86 25.68 25.68 0 0 0-13.14-3.47 26.62 26.62 0 0 0-13.33 3.34 23.56 23.56 0 0 0-9.29 9.67 31.41 31.41 0 0 0-3.4 15.06 31.86 31.86 0 0 0 3.4 15.06 23.79 23.79 0 0 0 9.29 9.87 26.15 26.15 0 0 0 13.33 3.4 25.77 25.77 0 0 0 13.14-3.46 24.77 24.77 0 0 0 9.42-9.87 30.89 30.89 0 0 0 3.46-14.87 30.92 30.92 0 0 0-3.46-14.95Zm86.25-13.65q8 7.77 7.95 22.5v41h-8.85v-40q0-11.4-5.7-17.43t-15.57-6q-10.12 0-16.15 6.41t-6 18.84v38.11h-9v-70h9v11.94a22.84 22.84 0 0 1 9.61-9.8 29.34 29.34 0 0 1 14.22-3.4q12.55 0 20.49 7.75Z"
      :class="dark ? 'fill-current text-color-900' : 'fill-current text-color-200'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoLight',
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