<template>
  <hip-input-group :label=label>
    <!-- Prepend container. -->
    <div
      v-if="$slots.prepend"
      class="flex"
    >
      <!-- Prepend contents. -->
      <slot name="prepend"></slot>
    </div>
    <!-- Input container. -->
    <div class="flex h-full rounded-xl w-full">
      <!-- Prefix icon. -->
      <div
        v-if="iconPrefix"
        class="bg-theme-100 dark:bg-theme-800 flex pl-3 w-max"
        :class="$slots.prepend ? '' : 'rounded-l-xl'"
      >
        <div
          class="my-auto text-xl text-theme-600 dark:text-theme-400"
          :class="iconPrefix"
        />
      </div>
      <!-- Remote input element. -->
      <input
        v-if="remote"
        v-model="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateValueD"
        class="bg-theme-100 dark:bg-theme-800 px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="[
          iconPrefix || $slots.prepend ? '' : 'rounded-l-xl',
          iconSuffix || $slots.append || (remote && modelValue) ? '' : 'rounded-r-xl',
          required ? 'input-error' : ''
        ]"
      />
      <!-- Normal input element. -->
      <input
        v-else
        v-model="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateValue()"
        class="bg-theme-100 dark:bg-theme-800 px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="[
          iconPrefix || $slots.prepend ? '' : 'rounded-l-xl',
          iconSuffix || $slots.append || (remote && modelValue) ? '' : 'rounded-r-xl',
          required ? 'input-error' : ''
        ]"
      />
      <!-- Clear input icon. -->
      <div
        v-if="remote && modelValue"
        class="bg-theme-100 dark:bg-theme-800 flex w-max"
        :class="iconSuffix || $slots.append ? '' : 'rounded-r-xl'"
      >
        <div
          @click="clearValue()"
          class="cursor-pointer el-icon-circle-close mr-4 my-auto text-lg text-theme-700 dark:text-theme-300"
        />
      </div>
      <!-- Sufix icon. -->
      <div
        v-if="iconSuffix"
        class="bg-theme-100 dark:bg-theme-800 flex pr-3 w-max"
        :class="$slots.append ? '' : 'rounded-r-xl'"
      >
        <div
          class="my-auto text-xl text-theme-600 dark:text-theme-400"
          :class="iconSuffix"
        />
      </div>
    </div>
    <!-- Append container. -->
    <div
      v-if="$slots.append"
      class="flex"
    >
      <!-- Append contents. -->
      <slot name="append"></slot>
    </div>
  </hip-input-group>
</template>

<script>
import { debounce } from '../../utils/debounce'
import HipInputGroup from './HipInputGroup.vue'

export default {
  name: 'HipInput',
  components: {
    HipInputGroup
  },
  data() {
    return {
      updateValueD: debounce(() => this.updateValue(), 1000)
    }
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    iconPrefix: { type: String },
    iconSuffix: { type: String },
    label: { type: String },
    placeholder: { type: String },
    remote: { type: Boolean, default: false },
    remoteMethod: { type: Function },
    required: { type: Boolean, default: false }
  },
  methods: {
    // Input value functions.
    clearValue() {
      // Clear parent component model value.
      this.$emit('update:modelValue', '')
      if (this.remote) {
        // Clear results.
        this.remoteMethod('')
      }
    },
    updateValue() {
      // Update parent component model value.
      this.$emit('update:modelValue', this.modelValue)
      if (this.remote) {
        // Update results with new query.
        this.remoteMethod(this.modelValue)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
::placeholder {
  @apply text-theme-500 !important;
}
.input-error::placeholder {
  @apply text-red-500 !important;
}
</style>