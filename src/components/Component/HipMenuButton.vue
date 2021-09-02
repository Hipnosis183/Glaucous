<template>
  <div>
    <!-- Button container. -->
    <div
      :ref="`select-${selectID}`"
      @click="openDropMenu()"
    >
      <hip-button-nb :class="icon" />
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
          <!-- Options list. -->
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { generateID } from '../../database/datastore'
import HipButtonNb from './HipButtonNb.vue'

export default {
  name: 'HipMenuButton',
  components: {
    HipButtonNb
  },
  data() {
    return {
      selectID: generateID(),
      openMenu: false,
      popperInstance: '',
      popperPlacement: ''
    }
  },
  props: {
    icon: { type: String },
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
          if (that.$refs[`menu-${this.selectID}`] == event.target) {
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
          // Open menu.
          this.openMenu = true
          this.updateDropMenu()
          // Add click listener.
          window.addEventListener('click', closeListener)
        }
      }, 10)
    },
    closeDropMenu(listener) {
      // Close menu.
      this.openMenu = false
      this.updateDropMenu()
      // Remove click listener.
      window.removeEventListener('click', listener)
      this.$nextTick(() => {
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
    setMenuPlacement() {
      this.$nextTick(() => {
        // Create a new PopperJS instance.
        this.popperInstance = createPopper(this.$refs[`select-${this.selectID}`], this.$refs[`tooltip-${this.selectID}`], {
          strategy: 'fixed',
          placement: 'bottom-start',
          modifiers: [
            // Set distance between the select and the menu.
            { name: 'offset', options: { offset: [0, 10] } }
          ]
        })
      })
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