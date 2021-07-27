<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="dialog.validationError"
    @close="validationError()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Enter a valid URL.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <hip-button
        :icon="true"
        @click="validationError()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Show links dialog. -->
  <hip-dialog
    v-show="dialog.viewLinks"
    @close="viewLinks()"
    class="pos-initial z-10"
  >
    <!-- Links list. -->
    <div class="flex mb-6">
      <h1 class="font-bold text-xl">Links</h1>
    </div>
    <div class="mt-1 text-lg">
      <ul class="list-disc list-inside">
        <div
          v-if="$store.state.gameForm.gamePlatform.links.length > 0"
          class="space-y-4"
        >
          <div
            v-for="(link, index) in $store.state.gameForm.gamePlatform.links"
            :key="index"
            :value="link"
            class="flex items-center space-x-6"
          >
            <li class="text-justify">{{ link }}</li>
            <!-- Remove related link from the list. -->
            <hip-button
              :icon="true"
              @click="removeLink(index)"
              class="el-icon-remove-outline text-2xl"
            ></hip-button>
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </hip-dialog>
  <!-- Link form. -->
  <div class="flex space-x-2">
    <el-form-item
      label="Links"
      prop="link"
      class="w-full"
    >
      <el-input v-model="link">
        <template #append>
          <!-- View links list dialog. -->
          <el-button
            icon="el-icon-notebook-2"
            @click="viewLinks()"
          ></el-button>
          <!-- Add input link to the list. -->
          <el-button
            icon="el-icon-circle-plus-outline"
            @click="addLink()"
          ></el-button>
        </template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../Component'

export default {
  name: 'FormLinks',
  components: {
    // UI components.
    HipButton,
    HipDialog
  },
  data() {
    return {
      link: null,
      dialog: {
        validationError: false,
        viewLinks: false
      }
    }
  },
  methods: {
    // Links operations.
    addLink() {
      try {
        // Check for a valid URL.
        new URL(this.link)
        // Save link into the store.
        this.$store.commit('setGamePlatformLinksAdd', this.link)
        // Reset link input.
        this.link = null
      }
      catch {
        // Invalid URL.
        this.validationError()
      }
    },
    removeLink(link) {
      // Remove link from the store.
      this.$store.commit('setGamePlatformLinksRemove', link)
    },
    viewLinks() {
      // Open links dialog.
      this.dialog.viewLinks = !this.dialog.viewLinks
    },
    validationError() {
      // Open error dialog.
      this.dialog.validationError = !this.dialog.validationError
    }
  }
}
</script>

<style>
</style>