<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 466.82 97.4"
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
      d="M104 8.77a4.89 4.89 0 0 1-1.42-3.7A4.92 4.92 0 0 1 104 1.43a5 5 0 0 1 7 0 4.93 4.93 0 0 1 1.43 3.64 4.9 4.9 0 0 1-1.43 3.7 5.21 5.21 0 0 1-7 0Zm6.37 17.08v70.52h-5.85V25.85Zm36.49 2.66q6.63-4.1 16.88-4.09v6.1h-1.94q-10.39 0-17.28 5.91t-6.92 19.29v40.65h-5.84V25.85h5.84v14.54a21.39 21.39 0 0 1 9.22-11.88Zm29.83-19.74a4.9 4.9 0 0 1-1.43-3.7 4.93 4.93 0 0 1 1.43-3.64 5 5 0 0 1 7 0 4.89 4.89 0 0 1 1.43 3.64 4.86 4.86 0 0 1-1.43 3.7 5.2 5.2 0 0 1-7 0Zm6.36 17.08v70.52h-5.84V25.85ZM205.2 42a30.88 30.88 0 0 1 12.07-12.6 34.87 34.87 0 0 1 17.6-4.41 32.37 32.37 0 0 1 18.7 5.39 29 29 0 0 1 11.17 14V.26h5.85v96.11h-5.85V77.66a29.12 29.12 0 0 1-10.91 14.23q-7.79 5.52-19 5.51a34.41 34.41 0 0 1-17.6-4.48A31.07 31.07 0 0 1 205.2 80.2a40.38 40.38 0 0 1-4.35-19.2 40 40 0 0 1 4.35-19Zm55.71 2.79a27.34 27.34 0 0 0-10.45-10.91A29.08 29.08 0 0 0 235.65 30a29.83 29.83 0 0 0-15.06 3.7 25.49 25.49 0 0 0-10.13 10.72A35.56 35.56 0 0 0 206.82 61a35.56 35.56 0 0 0 3.64 16.62 25.77 25.77 0 0 0 10.19 10.78 31.25 31.25 0 0 0 29.87-.06A26.78 26.78 0 0 0 261 77.47 34.49 34.49 0 0 0 264.74 61a33.75 33.75 0 0 0-3.83-16.26Zm30.46-36a4.86 4.86 0 0 1-1.43-3.7 4.89 4.89 0 0 1 1.43-3.64 5 5 0 0 1 7 0 4.93 4.93 0 0 1 1.43 3.64 4.9 4.9 0 0 1-1.43 3.7 5.2 5.2 0 0 1-7 0Zm6.36 17.08v70.5h-5.84V25.85ZM319.87 42A30.9 30.9 0 0 1 332 29.35a34.87 34.87 0 0 1 17.6-4.41q11.16 0 19 5.45a29 29 0 0 1 10.91 13.9V25.85h5.84v70.52h-5.84V77.79a29.11 29.11 0 0 1-11 14.1q-7.86 5.52-18.89 5.51A34.41 34.41 0 0 1 332 92.92a31.09 31.09 0 0 1-12.13-12.72 40.5 40.5 0 0 1-4.35-19.2 40.07 40.07 0 0 1 4.35-19Zm55.72 2.79a27.36 27.36 0 0 0-10.46-10.91 29 29 0 0 0-14.8-3.88 29.87 29.87 0 0 0-15.07 3.7 25.49 25.49 0 0 0-10.13 10.72A35.68 35.68 0 0 0 321.49 61a35.68 35.68 0 0 0 3.64 16.62 25.73 25.73 0 0 0 10.2 10.78 31.25 31.25 0 0 0 29.87-.06 26.69 26.69 0 0 0 10.45-10.91A34.49 34.49 0 0 0 379.42 61a33.75 33.75 0 0 0-3.83-16.26Zm83.31-12.6q7.92 7.74 7.92 22.93v41.3h-5.71V55.46q0-12.6-6.37-19.29t-17.27-6.69q-11.43 0-18.25 7.27t-6.82 21.56v38.06h-5.84V25.85h5.84v14.93a23.42 23.42 0 0 1 9.94-12.14 30.22 30.22 0 0 1 16-4.22q12.66 0 20.56 7.72Z"
      :class="dark ? 'fill-current text-color-900' : 'fill-current text-color-200'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoExtraLight',
  props: {
    dark: { type: Boolean, default: false },
    size: { type: String, default: '100%' }
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Use original icon colors when theme 'Viridian' is selected.
    const originalColors = computed(() => {
      return store.getters.getSettingsGameOverColorTheme
        ? store.getters.getSettingsGameOverColorTheme == 'default'
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