<template>
  <!-- Container. -->
  <div class="flex h-10 rounded-xl shadow">
    <!-- Decrease button. -->
    <hip-input-button
      v-if="!positionSide"
      first-element
      @click="decreaseValue()"
    >
      <hip-icon class="w-4">
        <icon-minus />
      </hip-icon>
    </hip-input-button>
    <!-- Input element. -->
    <input
      v-model="modelValue"
      :disabled="true"
      class="bg-theme-100 dark:bg-theme-800 px-4 text-base text-center text-theme-800 dark:text-theme-200 w-24"
      :class="{ 'rounded-l-xl' : positionSide }"
    />
    <!-- Increase button. -->
    <hip-input-button
      v-if="!positionSide"
      last-element
      @click="increaseValue()"
    >
      <hip-icon class="w-4">
        <icon-plus />
      </hip-icon>
    </hip-input-button>
    <!-- Side position buttons. -->
    <div
      v-else
      class="flex flex-col"
    >
      <!-- Decrease button -->
      <hip-input-button
        top-element
        @click="increaseValue()"
      >
        <hip-icon class="w-4">
          <icon-arrow-up />
        </hip-icon>
      </hip-input-button>
      <!-- Increase button -->
      <hip-input-button
        bottom-element
        @click="decreaseValue()"
      >
        <hip-icon class="w-4">
          <icon-arrow-down />
        </hip-icon>
      </hip-input-button>
    </div>
  </div>
</template>

<script>
// Import UI components.
import HipInputButton from './HipInputButton.vue'

export default {
  name: 'HipInputNum',
  components: {
    HipInputButton
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: { type: Number, required: true },
    max: { type: Number, default: Infinity },
    min: { type: Number, default: -Infinity },
    positionSide: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    // Manage input value.
    const increaseValue = () => {
      if (props.modelValue < props.max) {
        // Increase component model value.
        emit('update:modelValue', props.modelValue + 1)
      }
    }
    const decreaseValue = () => {
      if (props.modelValue > props.min) {
        // Decrease component model value.
        emit('update:modelValue', props.modelValue - 1)
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