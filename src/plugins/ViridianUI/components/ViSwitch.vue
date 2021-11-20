<template>
  <div>
    <!-- Label. -->
    <vi-label
      v-if="switchLabel"
      class="mb-2"
    >{{ switchLabel }}</vi-label>
    <!-- Switch container. -->
    <div
      @click="switchValue()"
      class="cursor-pointer"
    >
      <input
        v-model="modelValue"
        type="checkbox"
        class="hidden"
      />
      <!-- Switch slider. -->
      <div
        class="flex rounded-full shadow-color switch-slider"
        :class="modelValue ? 'bg-color-500 hover:bg-color-600' : 'bg-theme-200 dark:bg-theme-800 hover:bg-theme-300 dark:hover:bg-theme-900'"
      >
        <!-- Switch button. -->
        <div
          :style="{ marginLeft: modelValue ? '34px' : '6px'}"
          class="bg-theme-0 h-5 my-auto rounded-full shadow-color switch-button w-5"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import UI components.
import ViLabel from './ViLabel.vue'

export default {
  name: 'ViSwitch',
  components: {
    ViLabel
  },
  props: {
    modelValue: { type: Boolean, default: false },
    switchLabel: { type: String }
  },
  setup(props, { emit }) {
    // Switch model value.
    const switchValue = () => {
      emit('update:modelValue', !props.modelValue)
    }

    return {
      switchValue
    }
  }
}
</script>

<style scoped>
/* Styling. */
.switch-button {
  transition: all 0.2s ease-in-out;
}
.switch-slider {
  height: 30px;
  transition: background-color 0.2s ease-in-out;
  width: 60px;
}
</style>