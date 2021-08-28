<template>
  <div class="flex max-h-content overflow-hidden">
    <div class="flex-1 no-scrollbar overflow-y-scroll items-center">
      <!-- Header. -->
      <div class="flex justify-between mb-6 mx-2">
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
      <div class="flex items-center justify-between space-x-10">
        <p class="text-xl">Path</p>
        <hip-input v-model="executablePath" />
      </div>
      <div class="flex items-center justify-between space-x-10">
        <p class="text-xl">Image Filtering</p>
        <hip-switch v-model="imageFiltering" />
      </div>
    </div>
  </div>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipInput,
  HipSwitch
} from '../../Component'

export default {
  name: 'ViewPlatformSettings',
  components: {
    // UI components.
    HipButton,
    HipInput,
    HipSwitch
  },
  methods: {
    storeSettings() {
      // Store updated settings.
      this.$store.commit('setSettingsPlatformExecutablePath')
      this.$store.commit('setSettingsPlatformImageFiltering')
      this.$emit('close')
    }
  },
  mounted() {
    // Change platform store if the selected isn't the one instantiated.
    if (this.$store.state.selectedPlatform != this.$route.params.id) {
      this.$store.state.selectedPlatform = this.$route.params.id
      this.$store.commit('setPlatformStore', 'data/' + this.$route.params.id)
    }
  },
  computed: {
    executablePath: {
      get() { return this.$store.state.settingsPlatform.executablePath },
      set(value) { this.$store.state.settingsPlatform.executablePath = value }
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