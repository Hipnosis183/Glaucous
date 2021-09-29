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
      d="M108.31 5.76a3.15 3.15 0 0 1-4.53 0 3.15 3.15 0 0 1 0-4.39 3.15 3.15 0 0 1 4.53 0 3.11 3.11 0 0 1 .89 2.2 3.1 3.1 0 0 1-.89 2.19ZM104.68 96V27.44h2.74V96Zm30.18-50.21q2.46-9.6 9.6-14.4a27.69 27.69 0 0 1 15.78-4.81v2.47a24 24 0 0 0-18 7.69q-7.35 7.68-7.34 21.12V96h-2.75V27.44h2.75Zm45.48-40.03a3 3 0 0 1-2.27 1 3 3 0 0 1-2.26-1 3.1 3.1 0 0 1-.89-2.19 3.11 3.11 0 0 1 .89-2.2 3 3 0 0 1 2.26-1 3 3 0 0 1 2.27 1 3.15 3.15 0 0 1 0 4.39ZM176.7 96V27.44h2.74V96Zm90.82-96h2.74v96h-2.74V74.49a33.81 33.81 0 0 1-12.69 16.6 35.66 35.66 0 0 1-56.18-29.35 34.21 34.21 0 0 1 10.43-25.38 36.27 36.27 0 0 1 45.75-4A33.81 33.81 0 0 1 267.52 49ZM211 85.33a33.06 33.06 0 0 0 56.52-23.59 33.07 33.07 0 1 0-66.13 0A32 32 0 0 0 211 85.33Zm87.59-79.57a3.15 3.15 0 0 1-4.53 0 3.15 3.15 0 0 1 0-4.39 3.15 3.15 0 0 1 4.53 0 3.11 3.11 0 0 1 .89 2.2 3.1 3.1 0 0 1-.89 2.19ZM295 96V27.44h2.74V96Zm90.82-68.59h2.74V96h-2.74V75a35.95 35.95 0 0 1-58.45 12.08 34.25 34.25 0 0 1-10.42-25.38 34.24 34.24 0 0 1 10.42-25.38 35.65 35.65 0 0 1 58.45 12.07Zm-56.57 57.92a33.44 33.44 0 0 0 46.92 0 32.09 32.09 0 0 0 9.61-23.59 33.07 33.07 0 1 0-66.13 0 32.08 32.08 0 0 0 9.6 23.59Zm114.14-59.26q11.66 0 18.87 7.27t7.2 19.07V96h-2.75V52.41q0-10.42-6.31-17.15t-17.15-6.72q-12.06 0-19.68 8.43T416 59.27V96h-2.74V27.44H416v18.79a26.18 26.18 0 0 1 10.23-14.95 29.3 29.3 0 0 1 17.16-5.21Z"
      :style="dark ? 'fill:#202020' : 'fill:#e6e6e6'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoThin',
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