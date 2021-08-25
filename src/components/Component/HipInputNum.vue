<template>
  <!-- Container. -->
  <div class="flex h-10 rounded-xl shadow">
    <!-- Decrease button. -->
    <hip-input-button
      v-if="!positionSide"
      first-element
      @click="decreaseValue()"
      class="el-icon-minus"
    ></hip-input-button>
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
      class="el-icon-plus"
    ></hip-input-button>
    <!-- Side position buttons. -->
    <div
      v-else
      class="flex flex-col"
    >
      <!-- Decrease button -->
      <hip-input-button
        top-element
        @click="increaseValue()"
        class="el-icon-arrow-up"
      ></hip-input-button>
      <!-- Increase button -->
      <hip-input-button
        bottom-element
        @click="decreaseValue()"
        class="el-icon-arrow-down"
      ></hip-input-button>
    </div>
  </div>
</template>

<script>
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
  methods: {
    increaseValue() {
      if (this.modelValue < this.max) {
        // Increase component model value.
        this.$emit('update:modelValue', this.modelValue + 1)
      }
    },
    decreaseValue() {
      if (this.modelValue > this.min) {
        // Decrease component model value.
        this.$emit('update:modelValue', this.modelValue - 1)
      }
    }
  }
}
</script>