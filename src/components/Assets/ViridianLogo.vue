<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 699.77 177.1"
    :width="size"
  >
    <!-- Icon contents. -->
    <defs>
      <linearGradient
        id="logo-a"
        x1="55.53"
        y1="177.1"
        x2="55.53"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0"
          stop-color="#0afa50"
        />
        <stop
          offset=".21"
          stop-color="#0ae550"
        />
        <stop
          offset=".35"
          stop-color="#0adc50"
        />
        <stop
          offset=".38"
          stop-color="#09d851"
        />
        <stop
          offset=".79"
          stop-color="#03a857"
        />
        <stop
          offset="1"
          stop-color="#00965a"
        />
      </linearGradient>
      <linearGradient
        id="logo-b"
        x1="378.48"
        y1="177.1"
        x2="378.48"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0"
          stop-color="#00965a"
        />
        <stop
          offset=".21"
          stop-color="#03a857"
        />
        <stop
          offset=".62"
          stop-color="#09d851"
        />
        <stop
          offset=".65"
          stop-color="#0adc50"
        />
        <stop
          offset=".79"
          stop-color="#0ae550"
        />
        <stop
          offset="1"
          stop-color="#0afa50"
        />
      </linearGradient>
    </defs>
    <path
      style="fill:url(#logo-a)"
      d="M0 0h49.59L84 121.94l27.07 55.16H57.18L0 0z"
    />
    <path
      d="M118.66 0h49.59l-57.18 177.1H57.18L84 121.94 118.66 0z"
      style="fill:url(#logo-b)"
    />
    <path
      d="M191.52 52a9.51 9.51 0 0 1-16.24-6.73A9.51 9.51 0 1 1 191.52 52Zm-13.27 122.72v-99h13.07v99Zm53.86-82.56q9.1-18 31.28-18v12.65q-13.47 0-22.37 7.92t-8.91 25v55H219v-99h13.07ZM294.47 52a9.5 9.5 0 0 1-16.23-6.73A9.51 9.51 0 1 1 294.47 52Zm-13.26 122.72v-99h13.07v99Zm125.93-138.6h13.06v138.6h-13.06v-19.4q-13.67 21.78-40 21.78a49 49 0 0 1-36.13-15q-15-15-14.95-36.83T331 88.4a49.06 49.06 0 0 1 36.13-15.05q26.34 0 40 21.78ZM340.41 153a39.43 39.43 0 0 0 55.44 0 38 38 0 0 0 11.29-27.82 38.06 38.06 0 0 0-11.29-27.78 39.45 39.45 0 0 0-55.44 0 38.06 38.06 0 0 0-11.29 27.82A38 38 0 0 0 340.41 153ZM461.19 52A9.51 9.51 0 0 1 445 45.23 9.51 9.51 0 1 1 461.19 52Zm-13.27 122.72v-99H461v99Zm125.93-99h13.07v99h-13.07v-19.4q-13.67 21.78-40 21.78a49 49 0 0 1-36.13-15q-15-15-15-36.83t15-36.82a49.06 49.06 0 0 1 36.13-15.05q26.32 0 40 21.78ZM507.12 153a39.43 39.43 0 0 0 55.44 0 38 38 0 0 0 11.29-27.82 38 38 0 0 0-11.29-27.78 39.45 39.45 0 0 0-55.44 0 38.05 38.05 0 0 0-11.28 27.82A38 38 0 0 0 507.12 153ZM661 73.35q18 0 28.42 11t10.39 29.6v60.78h-13.1v-60.79q0-13.26-7-20.59T659.78 86q-14.26 0-23.17 9t-8.91 27.82v51.87h-13.07v-99h13.07v15.48q11.09-17.82 33.3-17.82Z"
      :style="dark ? 'fill:#202020' : 'fill:#d6d6d6'"
    />
  </svg>
</template>

<script>
export default {
  name: 'ViridianLogo',
  props: {
    dark: { type: Boolean, default: false },
    size: { type: String, default: '100%' }
  }
}
</script>

<style>
</style>