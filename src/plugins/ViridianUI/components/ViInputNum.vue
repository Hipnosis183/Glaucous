<template>
  <!-- Container. -->
  <div class="flex h-10 rounded-xl shadow-color">
    <!-- Decrease button. -->
    <vi-input-button
      v-if="!inputSide"
      input-first
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
      class="bg-theme-100 dark:bg-theme-800 px-4 text-base text-center text-theme-800 dark:text-theme-200 w-full"
      :class="{ 'rounded-l-xl' : inputSide }"
    />
    <!-- Increase button. -->
    <vi-input-button
      v-if="!inputSide"
      input-last
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
        input-top
        @click="increaseValue()"
      >
        <vi-icon class="w-4">
          <icon-arrow-up />
        </vi-icon>
      </vi-input-button>
      <!-- Increase button -->
      <vi-input-button
        input-bottom
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
    inputMax: { type: Number, default: Infinity },
    inputMin: { type: Number, default: -Infinity },
    inputSide: { type: Boolean, default: false },
    inputStep: { type: Number, default: 1 },
    modelValue: { type: Number, required: true }
  },
  setup(props, { emit }) {
    // Manage input value.
    const increaseValue = () => {
      if (props.modelValue < props.inputMax) {
        // Increase component model value.
        emit('update:modelValue', props.modelValue + props.inputStep)
      }
    }
    const decreaseValue = () => {
      if (props.modelValue > props.inputMin) {
        // Decrease component model value.
        emit('update:modelValue', props.modelValue - props.inputStep)
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