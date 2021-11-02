<template>
  <!-- Platform settings dialog. -->
  <vi-dialog
    v-if="$store.state.selectedPlatform"
    :key="$store.state.selectedPlatform"
    @close="$emit('close')"
    width="w-3/5"
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
            <vi-button
              button-icon="icon-check"
              @click="storeSettings()"
            />
            <!-- Close dialog. -->
            <vi-button
              button-icon="icon-close"
              @click="$emit('close')"
            />
          </div>
        </div>
        <!-- Settings. -->
        <div class="mb-6">
          <!-- Emulator. -->
          <view-settings-emulator settingsType="Platform" />
        </div>
        <!-- Relative games path. -->
        <vi-section-content>
          <p class="text-xl whitespace-nowrap">Relative Games Path</p>
          <vi-input
            v-model="relativePath"
            placeholder="Select a directory path..."
          />
        </vi-section-content>
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

    // Manage settings in the store.
    const relativePath = computed({
      get() { return store.state.settingsPlatform.relativePath },
      set(value) { store.state.settingsPlatform.relativePath = value }
    })
    const storeSettings = () => {
      // Store updated settings.
      store.commit('setSettingsPlatformEmulator')
      store.commit('setSettingsPlatformRelativePath')
      emit('close')
    }

    return {
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