<template>
  <vi-input-group :input-label=inputLabel>
    <!-- Prepend container. -->
    <div
      v-if="$slots.prepend"
      class="flex"
    >
      <!-- Prepend contents. -->
      <slot name="prepend" />
    </div>
    <!-- Input container. -->
    <div
      class="bg-theme-100 dark:bg-theme-800 hover:bg-theme-200 dark:hover:bg-theme-900 flex h-full rounded-xl w-full"
      :class="[
        { 'rounded-r-none' : $slots.append },
        { 'rounded-l-none' : $slots.prepend }
      ]"
    >
      <!-- Prefix icon. -->
      <div
        v-if="inputIconPrefix"
        class="flex pl-3 w-max"
      >
        <div class="my-auto text-theme-600 dark:text-theme-400">
          <vi-icon class="w-5">
            <component :is="inputIconPrefix" />
          </vi-icon>
        </div>
      </div>
      <!-- Remote input element. -->
      <input
        v-if="inputRemote"
        v-model="modelValue"
        :disabled="inputDisabled"
        :placeholder="inputPlaceholder"
        @input="updateValueDebounced"
        class="bg-transparent px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="inputRequired ? 'input-error' : ''"
      />
      <!-- Normal input element. -->
      <input
        v-else
        v-model="modelValue"
        :disabled="inputDisabled"
        :placeholder="inputPlaceholder"
        @input="updateValue()"
        class="bg-transparent px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="inputRequired ? 'input-error' : ''"
      />
      <!-- Clear input icon. -->
      <div
        v-if="inputRemote && modelValue"
        class="flex w-max"
      >
        <div
          @click="clearValue()"
          class="cursor-pointer mr-4 my-auto text-theme-700 dark:text-theme-300"
        >
          <vi-icon class="w-5">
            <icon-close />
          </vi-icon>
        </div>
      </div>
      <!-- Sufix icon. -->
      <div
        v-if="inputIconSuffix"
        class="flex pr-3 w-max"
      >
        <div class="my-auto text-theme-600 dark:text-theme-400">
          <vi-icon class="w-5">
            <component :is="inputIconSuffix" />
          </vi-icon>
        </div>
      </div>
    </div>
    <!-- Append container. -->
    <div
      v-if="$slots.append"
      class="flex"
    >
      <!-- Append contents. -->
      <slot name="append" />
    </div>
  </vi-input-group>
</template>

<script>
// Import UI components.
import ViInputGroup from './ViInputGroup.vue'
// Import utility functions.
import { debounce } from '@/utils/debounce'

export default {
  name: 'ViInput',
  components: {
    ViInputGroup
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    inputDisabled: { type: Boolean, default: false },
    inputIconPrefix: { type: String },
    inputIconSuffix: { type: String },
    inputLabel: { type: String },
    inputPlaceholder: { type: String },
    inputRemote: { type: Boolean, default: false },
    inputRemoteMethod: { type: Function },
    inputRequired: { type: Boolean, default: false },
    modelValue: { type: [String, Number] }
  },
  setup(props, { emit }) {
    // Manage input value.
    const updateValue = () => {
      // Update parent component model value.
      emit('update:modelValue', props.modelValue)
      if (props.inputRemote) {
        // Update results with new query.
        props.inputRemoteMethod(props.modelValue)
      }
    }
    const updateValueDebounced = debounce(() => updateValue(), 1000)
    const clearValue = () => {
      // Clear parent component model value.
      emit('update:modelValue', '')
      if (props.inputRemote) {
        // Clear results.
        props.inputRemoteMethod('')
      }
    }

    return {
      clearValue,
      updateValue,
      updateValueDebounced,
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
/* Transitions. */
div {
  transition: background-color 0.5s;
}
</style>