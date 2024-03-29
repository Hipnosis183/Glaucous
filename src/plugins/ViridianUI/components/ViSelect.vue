<template>
  <vi-input-group :input-label=selectLabel>
    <!-- Prepend container. -->
    <div
      v-if="$slots.prepend"
      class="flex"
    >
      <!-- Prepend contents. -->
      <slot name="prepend" />
    </div>
    <!-- Container. -->
    <div class="flex flex-col h-10 w-full">
      <!-- Select container. -->
      <div
        ref="refSelect"
        @click="openDropMenu()"
        class="bg-theme-100 dark:bg-theme-800 hover:bg-theme-200 dark:hover:bg-theme-900 flex h-full rounded-xl w-full"
        :class="[
          { 'rounded-r-none' : $slots.append },
          { 'rounded-l-none' : $slots.prepend }
        ]"
      >
        <!-- Prefix icon. -->
        <div
          v-if="selectIconPrefix"
          class="flex pl-3 w-max"
        >
          <div
            class="my-auto text-xl text-theme-600 dark:text-theme-400"
            :class="selectIconPrefix"
          />
        </div>
        <!-- Remote input element. -->
        <div
          v-if="selectRemote"
          class="cursor-pointer relative text-base text-theme-800 dark:text-theme-200 w-full"
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
            :placeholder="labelHide || !labelPlaceholder ? selectPlaceholder : ''"
            @blur="labelSelected = labelPlaceholder"
            @input="updateValueDebounced"
            class="absolute bg-transparent cursor-pointer h-full px-4 w-full"
            :class="{ 'input-error' : selectRequired }"
          />
        </div>
        <!-- Normal input element. -->
        <input
          v-else
          v-model="labelSelected"
          :disabled="true"
          :placeholder="selectPlaceholder"
          @input="updateValue()"
          class="bg-transparent cursor-pointer px-4 text-base text-theme-800 dark:text-theme-200 w-full"
          :class="{ 'input-error' : selectRequired }"
        />
        <!-- Clear select icon. -->
        <div
          v-if="(modelValue && selectRemote && !selectRequired) || (!selectRemote && selectClearable)"
          class="cursor-pointer flex w-max z-0"
        >
          <div
            @click.stop="clearValue()"
            class="cursor-pointer ml-2 mr-4 my-auto text-theme-700 dark:text-theme-300"
            :class="(modelValue && (selectRemote || (!selectRemote && selectClearable)) && !selectRequired) ? 'visible' : 'invisible'"
          >
            <vi-icon class="w-5">
              <icon-close />
            </vi-icon>
          </div>
        </div>
        <!-- Open select menu icon. -->
        <div
          v-if="!selectRemote"
          class="cursor-pointer flex pr-3 w-max"
        >
          <div class="my-auto text-theme-600 dark:text-theme-400">
            <vi-icon class="w-5">
              <icon-arrow-down />
            </vi-icon>
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
            class="bg-theme-100 dark:bg-theme-900 border-2 border-solid border-theme-200 dark:border-theme-800 list-none max-h-68 overflow-y-auto py-2 rounded-xl transition-menu"
          >
            <!-- Select created option. -->
            <vi-option
              v-show="selectAllowCreate && labelCached != '' && optionCreateShow"
              :key="labelCached"
              option-created
              :option-label="labelCached"
              :option-value="labelCached"
            >
              <div class="flex justify-between text-theme-700 dark:text-theme-300">
                <p>{{ labelCached }}</p>
                <vi-icon
                  icon-manual
                  class="w-5"
                >
                  <icon-add />
                </vi-icon>
              </div>
            </vi-option>
            <!-- Select options list. -->
            <slot>
              <li
                v-if="!selectAllowCreate || labelCached == ''"
                class="cursor-none flex justify-center px-4 py-2"
              >
                <p class="cursor-none">No results</p>
              </li>
            </slot>
          </div>
        </transition>
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
import ViLabel from './ViLabel.vue'
import ViOption from './ViOption.vue'

// Import Vue functions.
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, onUpdated, provide, ref, watch } from 'vue'
// Import PopperJS functions.
import { createPopper } from '@popperjs/core'
// Import utility functions.
import { debounce } from '@/utils/debounce'
// Import database controllers functions.
import { generateID } from '@/database/datastore'

export default {
  name: 'ViSelect',
  components: {
    ViLabel,
    ViOption
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: { type: [Array, String, Number, Object] },
    selectAllowCreate: { type: Boolean, default: false },
    selectClearable: { type: Boolean, default: false },
    selectIconPrefix: { type: String },
    selectIconSuffix: { type: String },
    selectLabel: { type: String },
    selectPlaceholder: { type: String },
    selectRemote: { type: Boolean, default: false },
    selectRemoteMethod: { type: Function },
    selectRequired: { type: Boolean, default: false }
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
      if (props.selectRemote) {
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
    let labelSelectedCached = ref('')
    let labelPlaceholder = ref('')
    let optionCreateShow = ref(true)
    let optionsClear = ref(false)
    let optionsCache = ref({
      labels: [],
      values: []
    })
    let selectedFromOptions = ref(false)
    const updateValue = () => {
      // Update parent component model value.
      emit('update:modelValue', props.modelValue)
      if (props.selectAllowCreate) {
        // Cache input label.
        labelCached.value = labelSelected.value
        setTimeout(() => { labelSelectedCached.value = labelSelected.value }, 10)
        // Reset created option display.
        optionCreateShow.value = true
        emitter.off('hideOption' + selectID)
        // Open created option matching listener.
        emitter.on('hideOption' + selectID, () => {
          optionCreateShow.value = false
        })
      }
      if (props.selectRemote) {
        // Hide label placeholder.
        labelHide.value = true
        // Update options with new query.
        props.selectRemoteMethod(labelSelected.value)
      }
    }
    const updateValueDebounced = debounce(() => updateValue(), 1000)
    const clearValue = () => {
      // Clear input value.
      labelSelected.value = ''
      // Clear parent component model value.
      emit('update:modelValue', '')
      if (props.selectRemote) {
        // Clear label placeholder.
        labelPlaceholder.value = ''
        // Toggle options clear.
        optionsClear.value = true
      }
    }
    watch(() => props.modelValue, (value) => {
      // Avoid carrying a previous label when there's no value.
      if (value == null) {
        // Clear label placeholder.
        labelPlaceholder.value = ''
      }
      // Apply only for remote searches.
      if (props.selectRemote) {
        // Set label if the option has been cached before.
        if (optionsCache.value.values.includes(value)) {
          labelPlaceholder.value = optionsCache.value.labels[optionsCache.value.values.indexOf(value)]
          // Toggle options clear.
          optionsClear.value = false
          // Clear options cache if the value has been modified externally.
          if (!selectedFromOptions.value) {
            optionsCache.value = {
              labels: [labelPlaceholder.value],
              values: [value]
            }
          } else {
            // Indicate that the selected value has been set externally.
            selectedFromOptions.value = false
          }
          // For initial null values or not in the options cache.
        } else {
          // Clear options cache if the value has been modified externally.
          if (!selectedFromOptions.value) {
            // Manage null values.
            if (value == '' || value == null) {
              optionsCache.value = {
                labels: [],
                values: []
              }
              // Clear cache input label.
              labelCached.value = ''
              // Clear label placeholder.
              labelPlaceholder.value = ''
            }
            // Manage not cached values.
            else if (labelPlaceholder.value) {
              optionsCache.value = {
                labels: [labelPlaceholder.value],
                values: [value]
              }
              // Clear cache input label.
              labelCached.value = ''
            }
          } else {
            // Indicate that the selected value has been set externally.
            selectedFromOptions.value = false
          }
        }
        if (value == '' || value == null) {
          // Empty options results.
          props.selectRemoteMethod('')
          // Hide label placeholder.
          labelHide.value = true
          // Clear cache input label.
          labelCached.value = ''
          labelSelectedCached.value = ''
        } else if (labelPlaceholder.value) {
          // Show label placeholder.
          labelHide.value = false
          // Check if the option selected was created or not.
          if (labelCached.value == labelPlaceholder.value && optionCreateShow.value) {
            // Clear options.
            props.selectRemoteMethod('')
          } else {
            // Clear cache input label.
            labelCached.value = ''
            labelSelectedCached.value = ''
            // Get label option.
            props.selectRemoteMethod(labelPlaceholder.value)
          }
        }
      }
    })

    // Manage communication with options component.
    const selectID = generateID()
    provide('selectID', computed(() => selectID))
    let listenEmitter = ref(false)
    provide('listenEmitter', computed(() => listenEmitter.value))
    provide('selectLabel', computed(() => labelSelectedCached.value))
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
                if (props.selectRemote) {
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
        if (props.selectRemote) {
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
      emitter.on('setOption' + selectID, (item) => {
        // Indicate that the selected value comes from the options list.
        selectedFromOptions.value = true
        // Set option label as select label.
        labelSelected.value = props.selectRemote ? '' : item.label
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
      if (props.selectRemote) {
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
            props.selectRemoteMethod('')
          } else {
            // Clear cache input label.
            labelCached.value = ''
            labelSelectedCached.value = ''
            // Update options with new query.
            props.selectRemoteMethod(labelPlaceholder.value)
          }
        } else {
          // Clear cache input label.
          labelCached.value = ''
          labelSelectedCached.value = ''
          // Clear parent component model value.
          emit('update:modelValue', '')
          // Clear options.
          props.selectRemoteMethod('')
        }
      }
      selectDropMenu(listener)
    }
    const selectDropMenu = (listener) => {
      // Close menu.
      openMenu.value = false
      updateDropMenu()
      // Clear all emit listeners.
      emitter.off('setOption' + selectID)
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
      optionCreateShow,
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