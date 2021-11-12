<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 487.85 97.4"
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
      d="M105.54 17.26a9.58 9.58 0 0 1-3-7.19 9.56 9.56 0 0 1 3-7.18 11.32 11.32 0 0 1 15.11 0 9.53 9.53 0 0 1 3 7.18 9.55 9.55 0 0 1-3 7.19 11.35 11.35 0 0 1-15.11 0Zm16 11V96.3h-17.16v-68Zm42.81 2.09a24.06 24.06 0 0 1 12.22-3.07v18.04h-4.54q-8.12 0-12.22 3.81t-4.09 13.27v33.9h-17.2v-68h17.2v10.51a24.22 24.22 0 0 1 8.66-8.47Zm24.93-13.08a9.59 9.59 0 0 1-3-7.19 9.56 9.56 0 0 1 3-7.18 11.32 11.32 0 0 1 15.11 0 9.53 9.53 0 0 1 3 7.18 9.55 9.55 0 0 1-3 7.19 11.35 11.35 0 0 1-15.11 0Zm16 11V96.3h-17.13v-68ZM222 43.73a29.63 29.63 0 0 1 27.08-16.58A29 29 0 0 1 261.72 30a25.37 25.37 0 0 1 9.58 7.68V5.4h17.44v90.9H271.3V86.23a23.26 23.26 0 0 1-9 8.1A28.09 28.09 0 0 1 249 97.4a29.18 29.18 0 0 1-15.77-4.4A30.72 30.72 0 0 1 222 80.52 40 40 0 0 1 217.87 62 39.28 39.28 0 0 1 222 43.73Zm47 7.8a17.37 17.37 0 0 0-6.63-6.88 17.74 17.74 0 0 0-9-2.4 17.37 17.37 0 0 0-8.84 2.34A17.55 17.55 0 0 0 238 51.4a21.51 21.51 0 0 0-2.56 10.6A22.14 22.14 0 0 0 238 72.78a18.12 18.12 0 0 0 6.64 7.06 16.82 16.82 0 0 0 8.78 2.46 17.74 17.74 0 0 0 9-2.4A17.37 17.37 0 0 0 269 73a22 22 0 0 0 2.46-10.74A22 22 0 0 0 269 51.53Zm37.77-34.27a9.55 9.55 0 0 1-3-7.19 9.53 9.53 0 0 1 3-7.18 11.32 11.32 0 0 1 15.11 0 9.56 9.56 0 0 1 3 7.18 9.59 9.59 0 0 1-3 7.19 11.35 11.35 0 0 1-15.11 0Zm16 11V96.3h-17.2v-68Zm16.64 15.48a30.19 30.19 0 0 1 11.18-12.29 29.81 29.81 0 0 1 15.78-4.29 27.7 27.7 0 0 1 13.33 3.07 26.91 26.91 0 0 1 9.15 7.77v-9.7h17.32v68h-17.32v-10a25.61 25.61 0 0 1-9.15 7.92 28 28 0 0 1-13.45 3.13A28.9 28.9 0 0 1 350.59 93a30.87 30.87 0 0 1-11.18-12.46A40.11 40.11 0 0 1 335.3 62a39.4 39.4 0 0 1 4.11-18.27Zm47 7.8a17.37 17.37 0 0 0-6.63-6.88 17.68 17.68 0 0 0-9-2.4 17.37 17.37 0 0 0-8.78 2.33 17.6 17.6 0 0 0-6.57 6.81 21.4 21.4 0 0 0-2.57 10.6 22 22 0 0 0 2.52 10.75 18.17 18.17 0 0 0 6.62 7.09 16.82 16.82 0 0 0 8.78 2.46 17.68 17.68 0 0 0 9-2.4 17.37 17.37 0 0 0 6.61-6.9 22 22 0 0 0 2.46-10.74 22 22 0 0 0-2.46-10.73Zm94-16.58q7.49 7.66 7.49 21.43V96.3h-17.24V58.71q0-8.1-4.06-12.46t-11.05-4.37q-7.12 0-11.24 4.37t-4.12 12.46V96.3H423v-68h17.19v8.48a23.69 23.69 0 0 1 8.81-6.99 27.14 27.14 0 0 1 11.73-2.52q12.13 0 19.63 7.73Z"
      :class="dark ? 'fill-current text-color-900' : 'fill-current text-color-200'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoSemiBold',
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