<template>
  <div
    @click="switchValue()"
    class="cursor-pointer"
  >
    <input
      v-model="modelValue"
      type="checkbox"
      class="hidden"
    />
    <div
      class="flex rounded-full shadow switch-slider"
      :class="modelValue ? 'bg-color-500' : 'bg-theme-200 dark:bg-theme-800'"
    >
      <div
        :style="{ marginLeft: modelValue ? '34px' : '6px'}"
        class="bg-theme-0 h-5 my-auto rounded-full shadow switch-button w-5"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HipSwitch',
  props: {
    modelValue: { type: Boolean, default: false }
  },
  methods: {
    switchValue() {
      this.$emit('update:modelValue', !this.modelValue)
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