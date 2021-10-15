<template>
  <ul
    class="grid"
    :style="listDisplay == 0 && listLength < 4 ? 'grid-template-columns: repeat(' + listLength + ', minmax(0, 1fr));' : ''"
    :class="[
      { 'grid-cols-4' : listDisplay == 0 && listLength >= 4 },
      $store.getters.getSettingsListsListSpacing ? 'gap-4' : 'gap-1'
    ]"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'ViList',
  props: {
    listDisplay: { type: Number, default: 0 },
    listLength: { type: Number, default: 4 }
  }
}
</script>

<style>
</style>