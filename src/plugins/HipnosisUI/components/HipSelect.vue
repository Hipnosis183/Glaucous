<template>
  <div class="w-full">
    <!-- Label. -->
    <hip-label v-if="label">{{ label }}</hip-label>
    <!-- Container. -->
    <div class="flex flex-col h-10 rounded-xl shadow">
      <!-- Select container. -->
      <div
        ref="refSelect"
        @click="openDropMenu()"
        class="flex h-full rounded-xl w-full"
      >
        <!-- Prefix icon. -->
        <div
          v-if="iconPrefix"
          class="bg-theme-100 dark:bg-theme-800 flex pl-3 rounded-l-xl w-max"
        >
          <div
            class="my-auto text-xl text-theme-600 dark:text-theme-400"
            :class="iconPrefix"
          />
        </div>
        <!-- Remote input element. -->
        <div
          v-if="remote"
          class="bg-theme-100 dark:bg-theme-800 cursor-pointer relative rounded-xl text-base text-theme-800 dark:text-theme-200 w-full"
          :class="[
            { 'rounded-l-none' : iconPrefix },
            { 'rounded-r-none' : !required && (iconSuffix || modelValue || !remote) }
          ]"
        >
          <!-- Label placeholder. -->
          <div class="absolute flex h-full overflow-x-hidden px-4 w-full whitespace-nowrap">
            <p
              v-if="!labelHide && labelPlaceholder && labelSelected == ''"
              class="my-auto"
            >{{ labelPlaceholder }}</p>
          </div>
          <!-- Label input. -->
          <input
            v-model="labelSelected"
            ref="refInput"
            :placeholder="labelHide || !labelPlaceholder ? placeholder : ''"
            @blur="labelSelected = labelPlaceholder"
            @input="updateValueDebounced"
            class="absolute bg-transparent cursor-pointer h-full px-4 w-full"
            :class="{ 'input-error' : required }"
          />
        </div>
        <!-- Normal input element. -->
        <input
          v-else
          v-model="labelSelected"
          :disabled="true"
          :placeholder="placeholder"
          @input="updateValue()"
          class="bg-theme-100 dark:bg-theme-800 cursor-pointer px-4 rounded-xl text-base text-theme-800 dark:text-theme-200 w-full"
          :class="[
            { 'input-error' : required },
            { 'rounded-l-none' : iconPrefix },
            { 'rounded-r-none' : iconSuffix || !remote }
          ]"
        />
        <!-- Clear select icon. -->
        <div
          v-if="(modelValue && (remote || (!remote && clearable)) && !required)"
          class="bg-theme-100 dark:bg-theme-800 flex w-max z-0"
          :class="{ 'rounded-r-xl' : remote && !iconSuffix }"
        >
          <div
            @click.stop="clearValue()"
            class="cursor-pointer ml-2 mr-4 my-auto text-theme-700 dark:text-theme-300"
          >
            <hip-icon class="w-5">
              <icon-close />
            </hip-icon>
          </div>
        </div>
        <!-- Open select menu icon. -->
        <div
          v-if="!remote"
          class="bg-theme-100 dark:bg-theme-800 cursor-pointer flex pr-3 rounded-r-xl w-max"
        >
          <div class="my-auto text-theme-600 dark:text-theme-400">
            <hip-icon class="w-5">
              <icon-arrow-down />
            </hip-icon>
          </div>
        </div>
      </div>
      <!-- Dropdown menu. -->
      <div
        ref="refTooltip"
        role="tooltip"
        class="z-100"
      >
        <transition name="slide-pop">
          <!-- Menu card. -->
          <div
            v-show="openMenu"
            ref="refMenu"
            :style="{ transformOrigin: popperPlacement == 'top' ? 'bottom' : 'top'}"
            class="bg-theme-100 dark:bg-theme-800 list-none max-h-64 overflow-y-auto py-2 rounded-xl shadow transition-menu"
          >
            <!-- Select created option. -->
            <hip-option
              v-show="allowCreate && labelCached != ''"
              :key="labelCached"
              :label="labelCached"
              :value="labelCached"
            >
            </hip-option>
            <!-- Select options list. -->
            <slot>
              <li
                v-if="!allowCreate || labelCached == ''"
                class="cursor-none flex justify-center px-4 py-2"
              >
                <p class="cursor-none">No results</p>
              </li>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// Import UI components.
import HipLabel from './HipLabel.vue'
import HipOption from './HipOption.vue'

// Import Vue functions.
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, onUpdated, provide, ref, watch } from 'vue'
// Import PopperJS functions.
import { createPopper } from '@popperjs/core'
// Import utility functions.
import { debounce } from '@/utils/debounce'
// Import database controllers functions.
import { generateID } from '@/database/datastore'

export default {
  name: 'HipSelect',
  components: {
    HipLabel,
    HipOption
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    allowCreate: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    iconPrefix: { type: String },
    iconSuffix: { type: String },
    label: { type: String },
    modelValue: { type: [Array, String, Number, Object] },
    placeholder: { type: String },
    remote: { type: Boolean, default: false },
    remoteMethod: { type: Function },
    required: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    // Instantiate Mitt.
    const emitter = getCurrentInstance().appContext.config.globalProperties.emitter

    // Declare template refs.
    const refInput = ref(null)
    const refMenu = ref(null)
    const refSelect = ref(null)
    const refTooltip = ref(null)

    // Setup select label on mounting.
    onMounted(() => {
      if (props.remote) {
        // Reset model value to correctly trigger the label setting.
        emit('update:modelValue', null)
      } setOptionLabel()
    })
    // Update selected label when the value changes.
    onUpdated(() => { setOptionLabel() })
    // Clear all Mitt events.
    onUnmounted(() => { emitter.all.clear() })

    // Manage input value.
    let labelCached = ref('')
    let labelHide = ref(false)
    let labelSelected = ref('')
    let labelPlaceholder = ref('')
    let optionsClear = ref(false)
    let optionsCache = ref({
      labels: [],
      values: []
    })
    const updateValue = () => {
      // Update parent component model value.
      emit('update:modelValue', props.modelValue)
      if (props.allowCreate) {
        // Cache input label.
        labelCached.value = labelSelected.value
      }
      if (props.remote) {
        // Hide label placeholder.
        labelHide.value = true
        // Update options with new query.
        props.remoteMethod(labelSelected.value)
      }
    }
    const updateValueDebounced = debounce(() => updateValue(), 1000)
    const clearValue = () => {
      // Clear input value.
      labelSelected.value = ''
      // Clear parent component model value.
      emit('update:modelValue', '')
      if (props.remote) {
        // Clear label placeholder.
        labelPlaceholder.value = ''
        // Toggle options clear.
        optionsClear.value = true
      }
    }
    watch(() => props.modelValue, (value) => {
      // Avoid carrying a previous label when there's no value.
      if (value == null) {
        labelPlaceholder.value = ''
      }
      // Apply only for remote searches.
      if (props.remote) {
        // Set label if the option has been cached before.
        if (optionsCache.value.values.includes(value)) {
          labelPlaceholder.value = optionsCache.value.labels[optionsCache.value.values.indexOf(value)]
          // Toggle options clear.
          optionsClear.value = false
        }
        if (value == '') {
          // Empty options results.
          props.remoteMethod('')
          // Hide label placeholder.
          labelHide.value = true
        } else if (labelPlaceholder.value) {
          // Show label placeholder.
          labelHide.value = false
          // Check if the option selected was created or not.
          if (labelCached.value == labelPlaceholder.value) {
            // Clear options.
            props.remoteMethod('')
          } else {
            // Clear cache input label.
            labelCached.value = ''
            // Get label option.
            props.remoteMethod(labelPlaceholder.value)
          }
        }
      }
    })

    // Manage communication with options component.
    const selectID = generateID()
    provide('selectID', computed(() => selectID))
    let listenEmitter = ref(false)
    provide('listenEmitter', computed(() => listenEmitter.value))
    provide('selectValue', computed(() => props.modelValue))
    // Set current label when the select value changes.
    const setOptionLabel = () => {
      // Avoid triggering during normal operation.
      if (!openMenu.value) {
        // Continue if there's a value.
        if (props.modelValue != null) {
          if (props.modelValue.toString().length > 0) {
            // Open option click event listener for the select.
            emitter.on(selectID, (item) => {
              if (item.length > 0) {
                // Set option label as select label.
                if (props.remote) {
                  labelPlaceholder.value = item
                  labelHide.value = false
                  // Toggle options clear.
                  optionsClear.value = false
                  // Store results in options cache.
                  if (!optionsCache.value.values.includes(props.modelValue)) {
                    optionsCache.value.values.push(props.modelValue)
                    optionsCache.value.labels.push(labelPlaceholder.value)
                  }
                } else {
                  labelSelected.value = item
                }
                // Remove select option listener.
                emitter.off(selectID)
              }
            })
            // Trigger emitter listener.
            listenEmitter.value = !listenEmitter.value
          }
        } else {
          labelSelected.value = ''
        }
      }
    }

    // Manage drop menu functions.
    let openMenu = ref(false)
    const openDropMenu = () => {
      // Close menu if it's already open.
      if (openMenu.value === true) {
        closeDropMenu(closeListener)
        if (props.remote) {
          // Remove focus from the input element.
          refInput.value.blur()
        }
        return
      }
      // Menu close listener.
      const closeListener = (event) => {
        // Ensure the menu is rendered.
        if (refMenu.value && openMenu.value) {
          // Return if menu is clicked.
          if (refMenu.value == event.target || refMenu.value.contains(event.target)) {
            return
          }
          // Close menu if anything outside is clicked.
          if (openMenu.value && (refMenu.value != event.target || !refMenu.value.contains(event.target))) {
            closeDropMenu(closeListener)
          }
        } else {
          closeDropMenu(closeListener)
        }
      }
      // Avoid menu re-triggering while maintaining the event propagation.
      setTimeout(() => {
        if (!openMenu.value) {
          // Manage menu placement.
          setMenuPlacement()
          // Manage menu interception.
          setMenuObserver()
          // Open menu.
          openMenu.value = true
          updateDropMenu()
          // Add click listener.
          window.addEventListener('click', closeListener)
        }
      }, 10)
      // Open option click event listener.
      emitter.on('setOption', (item) => {
        // Set option label as select label.
        labelSelected.value = props.remote ? '' : item.label
        labelPlaceholder.value = item.label
        // Show label placeholder.
        labelHide.value = false
        // Update parent component model value.
        emit('update:modelValue', item.value)
        selectDropMenu()
      })
      // Set menu width to match parent input select.
      refMenu.value.style.minWidth = refSelect.value.clientWidth + 'px'
    }
    const closeDropMenu = (listener) => {
      if (props.remote) {
        // Clear input value.
        labelSelected.value = ''
        // Show label placeholder.
        labelHide.value = false
        // If there's an option cached.
        if (optionsCache.value.labels.includes(labelPlaceholder.value) && !optionsClear.value) {
          let index = optionsCache.value.labels.indexOf(labelPlaceholder.value)
          // Update parent component model value.
          emit('update:modelValue', optionsCache.value.values[index])
          // Check if the option selected was created or not.
          if (optionsCache.value.values[index] == optionsCache.value.labels[index]) {
            // Cache input label.
            labelCached.value = labelPlaceholder.value
            // Clear options.
            props.remoteMethod('')
          } else {
            // Clear cache input label.
            labelCached.value = ''
            // Update options with new query.
            props.remoteMethod(labelPlaceholder.value)
          }
        } else {
          // Clear cache input label.
          labelCached.value = ''
          // Clear parent component model value.
          emit('update:modelValue', '')
          // Clear options.
          props.remoteMethod('')
        }
      }
      selectDropMenu(listener)
    }
    const selectDropMenu = (listener) => {
      // Close menu.
      openMenu.value = false
      updateDropMenu()
      // Clear all emit listeners.
      emitter.all.clear()
      // Remove click listener.
      window.removeEventListener('click', listener)
      nextTick(() => {
        // Disconnect the observer watcher.
        intersectionObserver.value.disconnect()
        // Delay to wait for the animation to finish.
        setTimeout(() => {
          // Destroy Popper instance.
          popperInstance.value.destroy()
        }, 300)
      })
    }
    const updateDropMenu = () => {
      nextTick(() => {
        // Update popper instance.
        popperInstance.value.update()
        // Set current popper placement.
        popperPlacement.value = popperInstance.value.state.placement
      })
    }

    // Manage options menu popper.
    let popperInstance = ref('')
    let popperPlacement = ref('')
    let popperIntersect = ref(false)
    watch(() => popperIntersect.value, (value) => {
      // Close menu if the select ended intersecting the viewport.
      if (value) { closeDropMenu() }
    })
    const setMenuPlacement = () => {
      nextTick(() => {
        // Create a new PopperJS instance.
        popperInstance.value = createPopper(refSelect.value, refTooltip.value, {
          strategy: 'fixed',
          modifiers: [
            // Set the padding for vertical boundary.
            { name: 'flip', options: { padding: { top: 60, bottom: 30 } } },
            // Set distance between the select and the menu.
            { name: 'offset', options: { offset: [0, 10] } }
          ]
        })
      })
    }
    // Observe the select, closing the menu when it goes off-screen.
    let intersectionObserver = ref(null)
    const setMenuObserver = () => {
      // Define and instantiate observer.
      intersectionObserver.value = new window.IntersectionObserver((entries) => {
        // Middleware to ensure only one intersection triggering.
        popperIntersect.value = entries[0].isIntersecting ? false : true
      })
      // Initiate the observer watcher.
      intersectionObserver.value.observe(refSelect.value)
    }

    return {
      clearValue,
      labelCached,
      labelHide,
      labelSelected,
      labelPlaceholder,
      openDropMenu,
      openMenu,
      popperPlacement,
      refInput,
      refMenu,
      refSelect,
      refTooltip,
      updateValue,
      updateValueDebounced
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
div,
input {
  transition: background-color 0.5s;
}
.slide-pop-leave-to,
.slide-pop-enter-active {
  transform: scaleY(0);
}
.slide-pop-enter-from,
.slide-pop-leave-to {
  opacity: 0;
}
.transition-menu {
  transition: transform 0.2s ease-in-out, opacity 0.1s ease-in-out;
}
</style>