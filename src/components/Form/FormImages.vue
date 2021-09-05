<template>
  <!-- Show game region images dialog. -->
  <form-images-region
    v-show="dialog.viewImagesRegion"
    :show="dialog.viewImagesRegion"
    @close="viewImagesRegionOpen()"
  />
  <!-- Show game version images dialog. -->
  <form-images-version
    v-show="dialog.viewImagesVersion"
    :show="dialog.viewImagesVersion"
    @close="viewImagesVersionOpen()"
  />
  <!-- Images form. -->
  <div class="flex rounded-xl shadow">
    <hip-input-button
      firstElement
      class="cursor-default el-icon-picture text-2xl"
    ></hip-input-button>
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
import FormImagesRegion from './FormImagesRegion.vue'
import FormImagesVersion from './FormImagesVersion.vue'
// Import UI components.
import { HipInputButton } from '../Component'

export default {
  name: 'FormImages',
  components: {
    // Form components.
    FormImagesRegion,
    FormImagesVersion,
    // UI components.
    HipInputButton
  },
  data() {
    return {
      dialog: {
        viewImagesRegion: false,
        viewImagesVersion: false
      }
    }
  },
  props: {
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  methods: {
    // View images.
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