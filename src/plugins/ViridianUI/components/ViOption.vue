<template>
  <!-- Option item. -->
  <li
    @click="setOption()"
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
// Import Vue functions.
import { computed, getCurrentInstance, inject, watch } from 'vue'

export default {
  name: 'ViOption',
  props: {
    label: { type: String },
    value: { type: [String, Number, Object] }
  },
  setup(props) {
    // Instantiate Mitt.
    const emitter = getCurrentInstance().appContext.config.globalProperties.emitter

    // Manage value communication with select component.
    const item = {
      label: props.label,
      value: props.value
    }
    const setOption = () => {
      // Emit option data to select component.
      emitter.emit('setOption', item)
    }

    // Manage label communication with select component.
    const listenEmitter = inject('listenEmitter')
    const selectID = inject('selectID')
    const selectValue = inject('selectValue', '')
    const selectedItem = computed(() => {
      return selectValue.value == item.value ? true : false
    })
    const catchEmitter = computed(() => {
      return listenEmitter.value
    })
    watch(() => catchEmitter.value, () => {
      // Intercept the selected value.
      if (selectedItem.value) {
        // Emit response with the selected option label.
        emitter.emit(selectID.value, item.label)
      }
    })

    return {
      selectedItem,
      setOption
    }
  }
}
</script>

<style>
</style>