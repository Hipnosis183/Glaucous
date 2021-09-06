<template>
  <div class="flex max-h-content overflow-hidden">
    <div class="flex-1 no-scrollbar overflow-y-scroll">
      <!-- Header. -->
      <div class="flex justify-between mb-10 mx-2">
        <!-- Title. -->
        <p class="mr-10 pt-1 text-2xl">Platform Settings</p>
        <!-- Buttons. -->
        <div class="h-10 space-x-4">
          <!-- Store settings. -->
          <hip-button
            :icon="true"
            @click="storeSettings()"
            class="el-icon-circle-check text-2xl"
          ></hip-button>
          <!-- Close dialog. -->
          <hip-button
            :icon="true"
            @click="$emit('close')"
            class="el-icon-circle-close text-2xl"
          ></hip-button>
        </div>
      </div>
      <!-- Settings. -->
      <div class="mb-6">
        <!-- Emulator. -->
        <view-settings-emulator settingsType="Platform" />
      </div>
      <div class="space-y-6">
        <!-- Relative games path. -->
        <hip-section-content>
          <p class="text-xl whitespace-nowrap">Relative Games Path</p>
          <hip-input v-model="relativePath" />
        </hip-section-content>
        <!-- Image Filtering. -->
        <hip-section-content>
          <p class="text-xl">Image Filtering</p>
          <hip-switch v-model="imageFiltering" />
        </hip-section-content>
      </div>
    </div>
  </div>
</template>

<script>
// Import form components.
import ViewSettingsEmulator from '../ViewSettings/ViewSettingsEmulator.vue'
// Import UI components.
import {
  HipButton,
  HipInput,
  HipSectionContent,
  HipSectionHeader,
  HipSwitch
} from '../../Component'

export default {
  name: 'ViewPlatformSettings',
  components: {
    // Form components.
    ViewSettingsEmulator,
    // UI components.
    HipButton,
    HipInput,
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  emits: [
    'close'
  ],
  methods: {
    storeSettings() {
      // Store updated settings.
      this.$store.commit('setSettingsPlatformEmulator')
      this.$store.commit('setSettingsPlatformRelativePath')
      this.$store.commit('setSettingsPlatformImageFiltering')
      this.$emit('close')
    }
  },
  mounted() {
    // Initialize the current platform settings on the store.
    this.$store.commit('setPlatformStore')
  },
  computed: {
    relativePath: {
      get() { return this.$store.state.settingsPlatform.relativePath },
      set(value) { this.$store.state.settingsPlatform.relativePath = value }
    },
    imageFiltering: {
      get() { return this.$store.state.settingsPlatform.imageFiltering },
      set(value) { this.$store.state.settingsPlatform.imageFiltering = value }
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