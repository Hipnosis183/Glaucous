<template>
  <vi-input-group :label=label>
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
        v-if="iconPrefix"
        class="flex pl-3 w-max"
      >
        <div class="my-auto text-theme-600 dark:text-theme-400">
          <vi-icon class="w-5">
            <component :is="iconPrefix" />
          </vi-icon>
        </div>
      </div>
      <!-- Remote input element. -->
      <input
        v-if="remote"
        v-model="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateValueDebounced"
        class="bg-transparent px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="required ? 'input-error' : ''"
      />
      <!-- Normal input element. -->
      <input
        v-else
        v-model="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateValue()"
        class="bg-transparent px-4 text-base text-theme-800 dark:text-theme-200 w-full"
        :class="required ? 'input-error' : ''"
      />
      <!-- Clear input icon. -->
      <div
        v-if="remote && modelValue"
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
        v-if="iconSuffix"
        class="flex pr-3 w-max"
      >
        <div class="my-auto text-theme-600 dark:text-theme-400">
          <vi-icon class="w-5">
            <component :is="iconSuffix" />
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
    disabled: { type: Boolean, default: false },
    iconPrefix: { type: String },
    iconSuffix: { type: String },
    label: { type: String },
    modelValue: { type: [String, Number] },
    placeholder: { type: String },
    remote: { type: Boolean, default: false },
    remoteMethod: { type: Function },
    required: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    // Manage input value.
    const updateValue = () => {
      // Update parent component model value.
      emit('update:modelValue', props.modelValue)
      if (props.remote) {
        // Update results with new query.
        props.remoteMethod(props.modelValue)
      }
    }
    const updateValueDebounced = debounce(() => updateValue(), 1000)
    const clearValue = () => {
      // Clear parent component model value.
      emit('update:modelValue', '')
      if (props.remote) {
        // Clear results.
        props.remoteMethod('')
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