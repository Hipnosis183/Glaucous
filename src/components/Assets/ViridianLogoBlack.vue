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
      d="M119.38 21.22a12.29 12.29 0 0 1-17.62 0A12.05 12.05 0 0 1 98 12.4a11.81 11.81 0 0 1 3.72-8.74 12.43 12.43 0 0 1 17.62 0 11.81 11.81 0 0 1 3.72 8.74 12.05 12.05 0 0 1-3.68 8.82ZM99.73 95.58V30.29h21.68v65.29Zm55.89-53.14a16.87 16.87 0 0 1 7.31-9.93A22.18 22.18 0 0 1 175.2 29v24a18.73 18.73 0 0 0-13.51 2.74q-6.08 3.91-6.07 12.8v27h-21.68V30.29h21.68Zm47.46-21.22a12.3 12.3 0 0 1-17.63 0 12.05 12.05 0 0 1-3.72-8.82 11.81 11.81 0 0 1 3.72-8.74 12.45 12.45 0 0 1 17.63 0 11.81 11.81 0 0 1 3.72 8.74 12.05 12.05 0 0 1-3.72 8.82Zm-19.65 74.36V30.29h21.67v65.29Zm80.17-91.4h21.67v91.4H263.6v-6q-6.66 7.83-18.54 7.83a28.14 28.14 0 0 1-21.87-9.85q-8.82-9.85-8.82-24.62t8.82-24.61a28.15 28.15 0 0 1 21.87-9.86q11.88 0 18.54 7.84ZM240 73.25a14.52 14.52 0 0 0 19.85 0 14.24 14.24 0 0 0 3.79-10.32 14.23 14.23 0 0 0-3.79-10.31 14.52 14.52 0 0 0-19.85 0 14.22 14.22 0 0 0-3.78 10.31A14.23 14.23 0 0 0 240 73.25Zm77.5-52a12.3 12.3 0 0 1-17.63 0 12.05 12.05 0 0 1-3.72-8.82 11.81 11.81 0 0 1 3.72-8.74 12.45 12.45 0 0 1 17.63 0 11.81 11.81 0 0 1 3.72 8.74 12.05 12.05 0 0 1-3.76 8.79Zm-19.7 74.33V30.29h21.68v65.29ZM378 30.29h21.68v65.29H378v-6q-6.64 7.83-18.54 7.83a28.17 28.17 0 0 1-21.87-9.85q-8.81-9.85-8.81-24.62t8.81-24.61a28.18 28.18 0 0 1 21.87-9.86q11.88 0 18.54 7.84Zm-23.63 43a14.52 14.52 0 0 0 19.85 0A14.23 14.23 0 0 0 378 62.93a14.22 14.22 0 0 0-3.78-10.31 14.52 14.52 0 0 0-19.85 0 14.23 14.23 0 0 0-3.79 10.31 14.24 14.24 0 0 0 3.76 10.32ZM452 28.46q10.58 0 17.3 7.25t6.7 20.83v39h-21.64V59.28c0-3.4-.9-6-2.68-7.71a9.77 9.77 0 0 0-7.12-2.57c-3.39 0-6 1-7.9 3.07s-2.8 5-2.8 8.82v34.69h-21.68V30.29h21.68v6.53q5.87-8.35 18.14-8.36Z"
      :style="dark ? 'fill:#202020' : 'fill:#e6e6e6'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoBlack',
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