<template>
  <!-- Option item. -->
  <li
    @click="setOption(item)"
    class="hover:bg-theme-200 dark:hover:bg-theme-600 relative"
    :class="{ 'bg-color-300 dark:bg-color-700' : selectedItem }"
  >
    <!-- Option overlay. -->
    <div class="absolute cursor-pointer h-full w-full" />
    <!-- Option container. -->
    <div class="px-4 py-2">
      <slot>
        <!-- Default option content. -->
        <p :class="{ 'text-color-900 dark:text-color-200' : selectedItem }">
          {{ label }}
        </p>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'HipOption',
  data() {
    return {
      item: {
        label: this.label,
        value: this.value
      }
    }
  },
  inject: [
    'listenEmitter',
    'selectID',
    'selectValue'
  ],
  props: {
    label: { type: [String, Number] },
    value: { type: [String, Number, Boolean, Object] }
  },
  methods: {
    setOption(item) {
      // Emit option data to select component.
      this.emitter.emit('setOption', item)
    }
  },
  computed: {
    selectedItem() {
      return this.selectValue.value == this.item.value ? true : false
    },
    catchEmitter() {
      return this.listenEmitter.value
    }
  },
  watch: {
    catchEmitter() {
      // Intercept the selected value.
      if (this.selectedItem) {
        // Emit response with the selected option label.
        this.emitter.emit(this.selectID.value, this.item.label)
      }
    }
  }
}
</script>

<style>
</style>