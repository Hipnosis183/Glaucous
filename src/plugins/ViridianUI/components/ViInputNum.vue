<template>
  <!-- Container. -->
  <div class="flex h-10 rounded-xl shadow-color">
    <!-- Decrease button. -->
    <vi-input-button
      v-if="!inputSide"
      input-first
      @click="decreaseValue()"
      class="z-5"
    >
      <vi-icon class="w-4">
        <icon-minus />
      </vi-icon>
    </vi-input-button>
    <!-- Input element. -->
    <input
      v-model="inputValue"
      :disabled="true"
      class="bg-theme-100 dark:bg-theme-800 text-base text-center text-theme-800 dark:text-theme-200 w-full"
      :class="inputSide ? 'px-3 rounded-l-xl' : '-mx-2'"
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
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import utility functions.
import { debounce } from '@/utils/debounce'
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
    let inputValue = ref(null)
    const increaseValue = () => {
      if (inputValue.value < props.inputMax) {
        // Icrease input value.
        inputValue.value = inputValue.value + props.inputStep
        // Increase component model value.
        updateValue()
      }
    }
    const decreaseValue = () => {
      if (inputValue.value > props.inputMin) {
        // Decrease component model value.
        inputValue.value = inputValue.value - props.inputStep
        // Decrease component model value.
        updateValue()
      }
    }
    onMounted(() => { inputValue.value = props.modelValue })
    const updateValue = debounce(() => emit('update:modelValue', inputValue.value), 500)

    return {
      inputValue,
      decreaseValue,
      increaseValue
    }
  }
}
</script>

<style>
</style>