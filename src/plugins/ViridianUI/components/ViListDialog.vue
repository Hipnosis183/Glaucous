<template>
  <div
    class="flex-1 no-scrollbar overflow-y-scroll"
    :class="$store.getters.getSettingsListsContentSpacing ? 'p-4' : 'p-1'"
  >
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
  </div>
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