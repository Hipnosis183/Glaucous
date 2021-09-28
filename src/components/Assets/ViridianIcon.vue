<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 168.25 177.1"
    :width="size"
  >
    <!-- Icon contents. -->
    <defs>
      <linearGradient
        id="icon-a"
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
        id="icon-b"
        x1="112.71"
        y1="177.1"
        x2="112.71"
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
      style="fill:url(#icon-a)"
      d="M0 0h49.59L84 121.94l27.07 55.16H57.18L0 0z"
    />
    <path
      style="fill:url(#icon-b)"
      d="M118.66 0h49.59l-57.18 177.1H57.18L84 121.94 118.66 0z"
    />
  </svg>
</template>

<script>
export default {
  name: 'ViridianIcon',
  props: {
    size: { type: String, default: '100%' }
  }
}
</script>

<style>
</style>