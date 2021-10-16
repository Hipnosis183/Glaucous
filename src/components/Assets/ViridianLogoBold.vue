<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 492.87 97.4"
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
      d="M106 19.08a10.31 10.31 0 0 1-3.43-7.88 10.48 10.48 0 0 1 3.43-8 12.44 12.44 0 0 1 8.82-3.2 12.31 12.31 0 0 1 8.73 3.19 10.51 10.51 0 0 1 3.43 8 10.34 10.34 0 0 1-3.43 7.88 12.31 12.31 0 0 1-8.73 3.19 12.44 12.44 0 0 1-8.82-3.18Zm19.08 10.18v67.18h-20.62V29.26Zm44.55 2.47a23.25 23.25 0 0 1 12-3.2v21.8H176q-7.71 0-11.56 3.31t-3.85 11.62v31.18H140V29.26h20.59v11.2a27.06 27.06 0 0 1 9.01-8.73ZM193 19.08a10.32 10.32 0 0 1-3.44-7.88 10.48 10.48 0 0 1 3.44-8 12.44 12.44 0 0 1 8.87-3.2 12.27 12.27 0 0 1 8.72 3.19 10.48 10.48 0 0 1 3.44 8 10.32 10.32 0 0 1-3.44 7.88 12.27 12.27 0 0 1-8.72 3.19 12.44 12.44 0 0 1-8.87-3.18Zm19.1 10.18v67.18h-20.59V29.26Zm14.75 15.29a29.21 29.21 0 0 1 10.65-12 27.85 27.85 0 0 1 15.05-4.22 26.49 26.49 0 0 1 12.1 2.77 22 22 0 0 1 8.61 7.47V7.34h20.59v89.1h-20.59v-9.63a21 21 0 0 1-8.26 7.71 26 26 0 0 1-12.47 2.88 27.55 27.55 0 0 1-15.05-4.27A29.55 29.55 0 0 1 226.85 81a40.53 40.53 0 0 1-3.91-18.24 40.15 40.15 0 0 1 3.91-18.21ZM269 50.69a14.46 14.46 0 0 0-20.83-.06q-4.28 4.4-4.27 12.1T248.16 75A14.32 14.32 0 0 0 269 75q4.27-4.45 4.27-12.16T269 50.69Zm41.3-31.61a10.32 10.32 0 0 1-3.44-7.88 10.48 10.48 0 0 1 3.44-8 12.43 12.43 0 0 1 8.83-3.2 12.28 12.28 0 0 1 8.73 3.19 10.48 10.48 0 0 1 3.44 8 10.32 10.32 0 0 1-3.44 7.88 12.28 12.28 0 0 1-8.73 3.19 12.43 12.43 0 0 1-8.84-3.18Zm19.08 10.18v67.18h-20.6V29.26Zm14.75 15.29a29.21 29.21 0 0 1 10.65-12 27.85 27.85 0 0 1 15.05-4.22 26 26 0 0 1 12.47 2.89 21.27 21.27 0 0 1 8.24 7.59v-9.55h20.59v67.18h-20.6v-9.51a22.17 22.17 0 0 1-8.37 7.59 25.9 25.9 0 0 1-12.46 2.88 27.32 27.32 0 0 1-14.93-4.27A29.55 29.55 0 0 1 344.12 81a40.53 40.53 0 0 1-3.92-18.24 40.15 40.15 0 0 1 3.92-18.21Zm42.14 6.14a14.46 14.46 0 0 0-20.83-.06q-4.28 4.4-4.28 12.1T365.43 75a14.32 14.32 0 0 0 20.83.06q4.28-4.45 4.27-12.16t-4.27-12.21Zm99.57-14.51q7 7.65 7 21v39.26H472.4V60q0-6.74-3.49-10.48a13.68 13.68 0 0 0-18.78 0q-3.5 3.74-3.49 10.48v36.44h-20.59V29.26h20.59v8.91a21.67 21.67 0 0 1 8.43-7A26.85 26.85 0 0 1 467 28.53q11.78 0 18.83 7.65Z"
      :class="dark ? 'fill-current text-color-900' : 'fill-current text-color-200'"
    />
  </svg>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViridianLogoBold',
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