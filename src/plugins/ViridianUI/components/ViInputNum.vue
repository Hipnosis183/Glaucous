<template>
  <!-- Container. -->
  <div class="flex h-10 rounded-xl shadow-color">
    <!-- Decrease button. -->
    <vi-input-button
      v-if="!positionSide"
      first-element
      @click="decreaseValue()"
    >
      <vi-icon class="w-4">
        <icon-minus />
      </vi-icon>
    </vi-input-button>
    <!-- Input element. -->
    <input
      v-model="modelValue"
      :disabled="true"
      class="bg-theme-100 dark:bg-theme-800 px-4 text-base text-center text-theme-800 dark:text-theme-200 w-24"
      :class="{ 'rounded-l-xl' : positionSide }"
    />
    <!-- Increase button. -->
    <vi-input-button
      v-if="!positionSide"
      last-element
      @click="increaseValue()"
    >
      <vi-icon class="w-4">
        <icon-plus />
      </vi-icon>
    </vi-input-button>
    <!-- Side position buttons. -->
    <div
      v-else
      class="flex flex-col"
    >
      <!-- Decrease button -->
      <vi-input-button
        top-element
        @click="increaseValue()"
      >
        <vi-icon class="w-4">
          <icon-arrow-up />
        </vi-icon>
      </vi-input-button>
      <!-- Increase button -->
      <vi-input-button
        bottom-element
        @click="decreaseValue()"
      >
        <vi-icon class="w-4">
          <icon-arrow-down />
        </vi-icon>
      </vi-input-button>
    </div>
  </div>
</template>

<script>
// Import UI components.
import ViInputButton from './ViInputButton.vue'

export default {
  name: 'ViInputNum',
  components: {
    ViInputButton
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: { type: Number, required: true },
    max: { type: Number, default: Infinity },
    min: { type: Number, default: -Infinity },
    positionSide: { type: Boolean, default: false },
    step: { type: Number, default: 1 }
  },
  setup(props, { emit }) {
    // Manage input value.
    const increaseValue = () => {
      if (props.modelValue < props.max) {
        // Increase component model value.
        emit('update:modelValue', props.modelValue + props.step)
      }
    }
    const decreaseValue = () => {
      if (props.modelValue > props.min) {
        // Decrease component model value.
        emit('update:modelValue', props.modelValue - props.step)
      }
    }

    return {
      decreaseValue,
      increaseValue
    }
  }
}
</script>

<style>
</style>