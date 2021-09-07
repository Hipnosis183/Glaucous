<template>
  <!-- Show game platform images dialog. -->
  <form-game-images-view
    v-show="dialog.viewImagesPlatform"
    :show="dialog.viewImagesPlatform"
    :editForm="editForm"
    gameType="gamePlatform"
    @close="viewImagesPlatformOpen()"
  />
  <!-- Show game region images dialog. -->
  <form-game-images-view
    v-show="dialog.viewImagesRegion"
    :show="dialog.viewImagesRegion"
    :editForm="editForm"
    gameType="gameRegion"
    @close="viewImagesRegionOpen()"
  />
  <!-- Show game version images dialog. -->
  <form-game-images-view
    v-show="dialog.viewImagesVersion"
    :show="dialog.viewImagesVersion"
    :editForm="editForm"
    gameType="gameVersion"
    @close="viewImagesVersionOpen()"
  />
  <!-- Images form. -->
  <div class="flex rounded-xl shadow">
    <hip-input-button
      firstElement
      class="cursor-default el-icon-picture text-2xl"
    ></hip-input-button>
    <hip-input-button
      v-if="showPlatform"
      @click="viewImagesPlatformOpen()"
    >Platform</hip-input-button>
    <hip-input-button
      v-if="showRegion"
      @click="viewImagesRegionOpen()"
    >Region</hip-input-button>
    <hip-input-button
      v-if="showVersion"
      lastElement
      @click="viewImagesVersionOpen()"
    >Version</hip-input-button>
  </div>
</template>

<script>
// Import form components.
import FormGameImagesView from './FormGameImagesView.vue'
// Import UI components.
import { HipInputButton } from '../../Component'

export default {
  name: 'FormGameImages',
  components: {
    // Form components.
    FormGameImagesView,
    // UI components.
    HipInputButton
  },
  data() {
    return {
      dialog: {
        viewImagesPlatform: false,
        viewImagesRegion: false,
        viewImagesVersion: false
      }
    }
  },
  props: {
    editForm: { type: Boolean, default: false },
    showPlatform: { type: Boolean, default: false },
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  methods: {
    // View images.
    viewImagesPlatformOpen() {
      // Open game platform images dialog.
      this.dialog.viewImagesPlatform = !this.dialog.viewImagesPlatform
    },
    viewImagesRegionOpen() {
      // Open game region images dialog.
      this.dialog.viewImagesRegion = !this.dialog.viewImagesRegion
    },
    viewImagesVersionOpen() {
      // Open game version images dialog.
      this.dialog.viewImagesVersion = !this.dialog.viewImagesVersion
    }
  }
}
</script>

<style>
</style>