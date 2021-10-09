<template>
  <!-- Platform settings dialog. -->
  <vi-dialog
    v-if="$store.state.selectedPlatform"
    :key="$store.state.selectedPlatform"
    @close="$emit('close')"
    width="w-2/3"
    class="z-10"
  >
    <div class="flex max-h-content overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <!-- Header. -->
        <div class="flex justify-between mb-10 mx-2">
          <!-- Title. -->
          <p class="mr-10 pt-1 text-2xl">Platform Settings</p>
          <!-- Buttons. -->
          <div class="h-10 space-x-4">
            <!-- Store settings. -->
            <vi-button-icon @click="storeSettings()">
              <vi-icon class="w-6">
                <icon-check />
              </vi-icon>
            </vi-button-icon>
            <!-- Close dialog. -->
            <vi-button-icon @click="$emit('close')">
              <vi-icon class="w-6">
                <icon-close />
              </vi-icon>
            </vi-button-icon>
          </div>
        </div>
        <!-- Settings. -->
        <div class="mb-6">
          <!-- Emulator. -->
          <view-settings-emulator settingsType="Platform" />
        </div>
        <div class="space-y-6">
          <!-- Relative games path. -->
          <vi-section-content>
            <p class="text-xl whitespace-nowrap">Relative Games Path</p>
            <vi-input v-model="relativePath" />
          </vi-section-content>
          <!-- Image Filtering. -->
          <vi-section-content>
            <p class="text-xl">Image Filtering</p>
            <vi-switch v-model="imageFiltering" />
          </vi-section-content>
        </div>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// Import form components.
import ViewSettingsEmulator from '../ViewSettings/ViewSettingsEmulator.vue'

export default {
  name: 'ViewPlatformSettings',
  components: {
    ViewSettingsEmulator
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Initialize the current platform settings on the store.
    onMounted(() => { store.commit('setPlatformStore') })

    // Manage settings in the store.
    const relativePath = computed({
      get() { return store.state.settingsPlatform.relativePath },
      set(value) { store.state.settingsPlatform.relativePath = value }
    })
    const imageFiltering = computed({
      get() { return store.state.settingsPlatform.imageFiltering },
      set(value) { store.state.settingsPlatform.imageFiltering = value }
    })
    const storeSettings = () => {
      // Store updated settings.
      store.commit('setSettingsPlatformEmulator')
      store.commit('setSettingsPlatformRelativePath')
      store.commit('setSettingsPlatformImageFiltering')
      emit('close')
    }

    return {
      imageFiltering,
      relativePath,
      storeSettings
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>