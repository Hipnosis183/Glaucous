<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="validationErrorDialog"
    @close="validationErrorShow()"
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
        @click="validationErrorShow()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Show links dialog. -->
  <hip-dialog
    v-show="linksDialog"
    @close="linksShow()"
    class="pos-initial z-10"
  >
    <!-- Links list. -->
    <div class="flex mb-6">
      <h1 class="font-bold text-xl">Links</h1>
    </div>
    <div class="mt-1 text-lg">
      <ul class="list-disc list-inside text-theme-800 dark:text-theme-100">
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
              @click="linkRemove(index)"
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
  <!-- Links input. -->
  <hip-input
    v-model="link"
    label="Links"
  >
    <template #append>
      <!-- View links list dialog. -->
      <hip-input-button
        @click="linksShow()"
        class="el-icon-notebook-2 text-xl"
      ></hip-input-button>
      <!-- Add input link to the list. -->
      <hip-input-button
        last-element
        @click="linkAdd()"
        class="el-icon-circle-plus-outline text-xl"
      ></hip-input-button>
    </template>
  </hip-input>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipInput,
  HipInputButton
} from '@/components/Component'

// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformLinks',
  components: {
    // UI components.
    HipButton,
    HipDialog,
    HipInput,
    HipInputButton
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage links operations.
    let link = ref(null)
    const linkAdd = () => {
      try {
        // Check for a valid URL.
        new URL(link.value)
        // Save link into the store.
        store.commit('setGamePlatformLinksAdd', link.value)
        // Reset link input.
        link.value = null
      }
      catch {
        // Invalid URL.
        validationErrorShow()
      }
    }
    const linkRemove = (link) => {
      // Remove link from the store.
      store.commit('setGamePlatformLinksRemove', link)
    }
    let linksDialog = ref(false)
    const linksShow = () => {
      // Toggle links dialog.
      linksDialog.value = !linksDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      link,
      linkAdd,
      linkRemove,
      linksDialog,
      linksShow,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>