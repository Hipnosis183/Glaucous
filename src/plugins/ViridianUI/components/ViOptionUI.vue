<template>
  <!-- Option item. -->
  <li
    @click="setOption()"
    class="hover:bg-color-500 dark:hover:bg-color-600 duration-500 relative"
    :class="{ 'bg-color-600 dark:bg-color-700' : selectedItem }"
  >
    <!-- Option overlay. -->
    <div class="absolute cursor-pointer h-full w-full" />
    <!-- Option container. -->
    <div class="px-4 py-2 text-color-100 text-shadow text-lg">
      <slot>
        <!-- Default option content. -->
        <h6>{{ optionLabel }}</h6>
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
    optionCreated: { type: Boolean, default: false },
    optionLabel: { type: String },
    optionValue: { type: [String, Number, Object] }
  },
  setup(props) {
    // Instantiate Mitt.
    const emitter = getCurrentInstance().appContext.config.globalProperties.emitter

    // Manage value communication with select component.
    const item = {
      label: props.optionLabel,
      value: props.optionValue
    }
    const setOption = () => {
      // Emit option data to select component.
      emitter.emit('setOption' + selectID.value, item)
    }

    // Manage label communication with select component.
    const listenEmitter = inject('listenEmitter')
    const selectID = inject('selectID')
    const selectValue = inject('selectValue', '')
    const selectLabel = inject('selectLabel', '')
    const selectedItem = computed(() => {
      return selectValue.value == item.value ? true : false
    })
    const hideOption = computed(() => {
      // Hide created option if it matches an existing option.
      if (!props.optionCreated) {
        return selectLabel.value == item.label ? true : false
      }
    })
    watch(() => hideOption.value, (res) => {
      if (res) { emitter.emit('hideOption' + selectID.value, true) }
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