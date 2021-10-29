<template>
  <div>
    <!-- Button container. -->
    <div
      ref="refSelect"
      @click="openDropMenu()"
    >
      <vi-button-small>
        <vi-icon class="w-4">
          <component :is="icon" />
        </vi-icon>
      </vi-button-small>
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
            class="bg-theme-0 dark:bg-theme-700 list-none max-h-96 overflow-y-auto px-2 py-6 rounded-3xl shadow-color transition-menu"
          >
            <!-- Options list. -->
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { nextTick, ref } from 'vue'
// Import PopperJS functions.
import { createPopper } from '@popperjs/core'

export default {
  name: 'ViMenuButton',
  props: {
    icon: { type: String },
    offset: { type: Array, default: [0, 20] },
    placement: { type: String, default: 'bottom' }
  },
  setup(props) {
    // Declare template refs.
    const refMenu = ref(null)
    const refSelect = ref(null)
    const refTooltip = ref(null)

    // Manage drop menu functions.
    let openMenu = ref(false)
    let popperInstance = ref('')
    let popperPlacement = ref('')
    const openDropMenu = () => {
      // Close menu if it's already open.
      if (openMenu.value === true) {
        return
      }
      // Menu close listener.
      const closeListener = (event) => {
        // Ensure the menu is rendered.
        if (refMenu.value && openMenu.value) {
          // Return if menu is clicked.
          if (refMenu.value == event.target || (refMenu.value.contains(event.target) && !event.target.classList.contains('vi-menu-close'))) {
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
          // Open menu.
          openMenu.value = true
          updateDropMenu()
          // Add click listener.
          window.addEventListener('click', closeListener)
        }
      }, 10)
    }
    const closeDropMenu = (listener) => {
      // Close menu.
      openMenu.value = false
      updateDropMenu()
      // Remove click listener.
      window.removeEventListener('click', listener)
      nextTick(() => {
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
        popperPlacement.value = !props.placement.includes('bottom') ? 'top' : popperInstance.value.state.placement
      })
    }
    const setMenuPlacement = () => {
      nextTick(() => {
        // Create a new PopperJS instance.
        popperInstance.value = createPopper(refSelect.value, refTooltip.value, {
          strategy: 'fixed',
          placement: props.placement,
          modifiers: [
            // Set distance between the select and the menu.
            { name: 'offset', options: { offset: props.offset } }
          ]
        })
      })
    }

    return {
      openDropMenu,
      openMenu,
      popperPlacement,
      refMenu,
      refSelect,
      refTooltip
    }
  }
}
</script>

<style scoped>
/* Transitions. */
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