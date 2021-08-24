<template>
  <div class="w-full">
    <!-- Label. -->
    <hip-label v-if="label">{{ label }}</hip-label>
    <!-- Container. -->
    <div class="flex flex-col h-10 rounded-xl shadow">
      <!-- Select container. -->
      <div
        :ref="`select-${selectID}`"
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
            :disabled="!remote"
            :placeholder="labelHide || !labelPlaceholder ? placeholder : ''"
            @blur="labelSelected = labelPlaceholder"
            @input="updateValue()"
            class="absolute bg-transparent cursor-pointer h-full px-4 w-full"
            :class="{ 'input-error' : required }"
          />
        </div>
        <!-- Normal input element. -->
        <input
          v-else
          v-model="labelSelected"
          :disabled="!remote"
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
          v-if="modelValue && remote && !required"
          class="bg-theme-100 dark:bg-theme-800 flex w-max z-0"
          :class="{ 'rounded-r-xl' : !iconSuffix }"
        >
          <div
            @click.stop="clearValue()"
            class="cursor-pointer el-icon-circle-close ml-2 mr-4 my-auto text-lg text-theme-700 dark:text-theme-300"
          />
        </div>
        <!-- Open select menu icon. -->
        <div
          v-if="!remote"
          class="bg-theme-100 dark:bg-theme-800 cursor-pointer flex pr-3 rounded-r-xl w-max"
        >
          <div class="el-icon-arrow-down my-auto text-xl text-theme-600 dark:text-theme-400" />
        </div>
      </div>
      <!-- Dropdown menu. -->
      <div
        :ref="`tooltip-${selectID}`"
        role="tooltip"
        class="z-100"
      >
        <transition name="slide-pop">
          <!-- Menu card. -->
          <div
            v-show="openMenu"
            :ref="`menu-${selectID}`"
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
import { computed } from 'vue'
import { createPopper } from '@popperjs/core'
import { generateID } from '../../database/datastore'
import HipLabel from './HipLabel.vue'
import HipOption from './HipOption.vue'

export default {
  name: 'HipSelect',
  components: {
    HipLabel,
    HipOption
  },
  data() {
    return {
      selectID: generateID(),
      labelCached: '',
      labelHide: false,
      labelSelected: '',
      labelPlaceholder: '',
      listenEmitter: false,
      openMenu: false,
      optionsClear: false,
      optionsCache: {
        labels: [],
        values: []
      },
      popperInstance: '',
      popperPlacement: '',
      popperIntersect: false,
      intersectionObserver: null
    }
  },
  provide() {
    return {
      listenEmitter: computed(() => this.listenEmitter),
      selectID: computed(() => this.selectID),
      selectValue: computed(() => this.modelValue)
    }
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: { type: [Array, String, Number, Boolean, Object], default: '' },
    allowCreate: { type: Boolean, default: false },
    iconPrefix: { type: String },
    iconSuffix: { type: String },
    label: { type: [String, Number] },
    placeholder: { type: String },
    remote: { type: Boolean, default: false },
    remoteMethod: { type: Function },
    required: { type: Boolean, default: false },
  },
  methods: {
    // Menu functions.
    openDropMenu() {
      // Close menu if it's already open.
      if (this.openMenu === true) {
        this.closeDropMenu(closeListener)
        return
      }
      // Passthrough context.
      let that = this
      // Menu close listener.
      const closeListener = (event) => {
        // Ensure the menu is rendered.
        if (that.$refs[`menu-${this.selectID}`] && that.openMenu) {
          // Return if menu is clicked.
          if (that.$refs[`menu-${this.selectID}`] == event.target || that.$refs[`menu-${this.selectID}`].contains(event.target)) {
            return
          }
          // Close menu if anything outside is clicked.
          if (that.openMenu && (that.$refs[`menu-${this.selectID}`] != event.target || !that.$refs[`menu-${this.selectID}`].contains(event.target))) {
            that.closeDropMenu(closeListener)
          }
        } else {
          that.closeDropMenu(closeListener)
        }
      }
      // Avoid menu re-triggering while maintaining the event propagation.
      setTimeout(() => {
        if (!this.openMenu) {
          // Manage menu placement.
          this.setMenuPlacement()
          // Manage menu interception.
          this.setMenuObserver()
          // Open menu.
          this.openMenu = true
          this.updateDropMenu()
          // Add click listener.
          window.addEventListener('click', closeListener)
        }
      }, 10)
      // Open option click event listener.
      this.emitter.on('setOption', (item) => {
        // Set option label as select label.
        this.labelSelected = this.remote ? '' : item.label
        this.labelPlaceholder = item.label
        // Show label placeholder.
        this.labelHide = false
        // Update parent component model value.
        this.$emit('update:modelValue', item.value)
        this.selectDropMenu(closeListener)
      })
      // Set menu width to match parent input select.
      this.$refs[`menu-${this.selectID}`].style.minWidth = this.$refs[`select-${this.selectID}`].clientWidth + 'px'
    },
    closeDropMenu(listener) {
      if (this.remote) {
        // Clear input value.
        this.labelSelected = ''
        // Show label placeholder.
        this.labelHide = false
        // If there's an option cached.
        if (this.optionsCache.labels.includes(this.labelPlaceholder) && !this.optionsClear) {
          let index = this.optionsCache.labels.indexOf(this.labelPlaceholder)
          // Update parent component model value.
          this.$emit('update:modelValue', this.optionsCache.values[index])
          // Check if the option selected was created or not.
          if (this.optionsCache.values[index] == this.optionsCache.labels[index]) {
            // Cache input label.
            this.labelCached = this.labelPlaceholder
            // Clear options.
            this.remoteMethod('')
          } else {
            // Clear cache input label.
            this.labelCached = ''
            // Update options with new query.
            this.remoteMethod(this.labelPlaceholder)
          }
        } else {
          // Clear cache input label.
          this.labelCached = ''
          // Clear parent component model value.
          this.$emit('update:modelValue', '')
          // Clear options.
          this.remoteMethod('')
        }
      }
      this.selectDropMenu(listener)
    },
    selectDropMenu(listener) {
      // Close menu.
      this.openMenu = false
      this.updateDropMenu()
      // Clear all emit listeners.
      this.emitter.all.clear()
      // Remove click listener.
      window.removeEventListener('click', listener)
      this.$nextTick(() => {
        // Disconnect the observer watcher.
        this.intersectionObserver.disconnect()
        // Delay to wait for the animation to finish.
        setTimeout(() => {
          // Destroy Popper instance.
          this.popperInstance.destroy()
        }, 300)
      })
    },
    updateDropMenu() {
      this.$nextTick(() => {
        // Update popper instance.
        this.popperInstance.update()
        // Set current popper placement.
        this.popperPlacement = this.popperInstance.state.placement
      })
    },
    // Input value functions.
    clearValue() {
      // Clear input value.
      this.labelSelected = ''
      // Clear parent component model value.
      this.$emit('update:modelValue', '')
      if (this.remote) {
        // Clear label placeholder.
        this.labelPlaceholder = ''
        // Toggle options clear.
        this.optionsClear = true
      }
    },
    updateValue() {
      // Update parent component model value.
      this.$emit('update:modelValue', this.modelValue)
      if (this.allowCreate) {
        // Cache input label.
        this.labelCached = this.labelSelected
      }
      if (this.remote) {
        // Hide label placeholder.
        this.labelHide = true
        // Update options with new query.
        this.remoteMethod(this.labelSelected)
      }
    },
    // Set current label when the select value changes.
    setOptionLabel() {
      // Avoid triggering during normal operation.
      if (!this.openMenu) {
        // Continue if there's a value.
        if (this.modelValue != null) {
          if (this.modelValue.toString().length > 0) {
            // Open option click event listener for the select.
            this.emitter.on(this.selectID, (item) => {
              if (item.length > 0) {
                // Set option label as select label.
                if (this.remote) {
                  this.labelPlaceholder = item
                  this.labelHide = false
                  // Toggle options clear.
                  this.optionsClear = false
                  // Store results in options cache.
                  if (!this.optionsCache.values.includes(this.modelValue)) {
                    this.optionsCache.values.push(this.modelValue)
                    this.optionsCache.labels.push(this.labelPlaceholder)
                  }
                } else {
                  this.labelSelected = item
                }
                // Remove select option listener.
                this.emitter.off(this.selectID)
              }
            })
            // Trigger emitter listener.
            this.listenEmitter = !this.listenEmitter
          }
        } else {
          this.labelSelected = ''
        }
      }
    },
    setMenuPlacement() {
      this.$nextTick(() => {
        // Create a new PopperJS instance.
        this.popperInstance = createPopper(this.$refs[`select-${this.selectID}`], this.$refs[`tooltip-${this.selectID}`], {
          strategy: 'fixed',
          modifiers: [
            // Set the padding for vertical boundary.
            { name: 'flip', options: { padding: { top: 60, bottom: 30 } } },
            // Set distance between the select and the menu.
            { name: 'offset', options: { offset: [0, 10] } }
          ]
        })
      })
    },
    // Observe the select, closing the menu when it goes off-screen.
    setMenuObserver() {
      // Define and instantiate observer.
      this.intersectionObserver = new window.IntersectionObserver((entries) => {
        // Middleware to ensure only one intersection triggering.
        this.popperIntersect = entries[0].isIntersecting ? false : true
      })
      // Initiate the observer watcher.
      this.intersectionObserver.observe(this.$refs[`select-${this.selectID}`])
    }
  },
  mounted() {
    // Reset model value to correctly trigger the label setting.
    if (this.remote) {
      this.$emit('update:modelValue', null)
    }
    // Load option label.
    this.setOptionLabel()
  },
  unmounted() {
    // Clear all emit listeners.
    this.emitter.all.clear()
  },
  updated() {
    // Load option label.
    this.setOptionLabel()
  },
  computed: {
    selectValue() {
      return this.modelValue
    }
  },
  watch: {
    popperIntersect(value) {
      // Close menu if the select ended intersecting the viewport.
      if (value) {
        this.closeDropMenu()
      }
    },
    selectValue(value) {
      // Avoid carrying a previous label when there's no value.
      if (value == null) {
        this.labelPlaceholder = ''
      }
      // Apply only for remote searches.
      if (this.remote) {
        // Set label if the option has been cached before.
        if (this.optionsCache.values.includes(value)) {
          this.labelPlaceholder = this.optionsCache.labels[this.optionsCache.values.indexOf(value)]
          // Toggle options clear.
          this.optionsClear = false
        }
        if (value == '') {
          // Empty options results.
          this.remoteMethod('')
          // Hide label placeholder.
          this.labelHide = true
        } else if (this.labelPlaceholder) {
          // Show label placeholder.
          this.labelHide = false
          // Check if the option selected was created or not.
          if (this.labelCached == this.labelPlaceholder) {
            // Clear options.
            this.remoteMethod('')
          } else {
            // Clear cache input label.
            this.labelCached = ''
            // Get label option.
            this.remoteMethod(this.labelPlaceholder)
          }
        }
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
/* Transitions. */
div,
input {
  transition: background-color 1s;
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