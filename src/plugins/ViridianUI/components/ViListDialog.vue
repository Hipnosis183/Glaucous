<template>
  <ul
    class="grid"
    :style="listDisplay == 1 && listLength < 4 ? 'grid-template-columns: repeat(' + listLength + ', minmax(0, 1fr));' : ''"
    :class="[
      { 'grid-cols-4' : listDisplay == 1 && listLength >= 4 },
      $store.getters.getSettingsListsContentSpacing ? 'gap-4' : 'gap-1'
    ]"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'ViListDialog',
  props: {
    listDisplay: { type: Number, default: 0 },
    listLength: { type: Number, default: 4 }
  }
}
</script>

<style>
</style>