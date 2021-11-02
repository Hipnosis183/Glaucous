<template>
  <!-- Validation error dialog. -->
  <vi-dialog-box
    v-show="validationErrorDialog"
    @accept="validationErrorShow()"
  >
    Enter a valid URL.
  </vi-dialog-box>
  <!-- Show links dialog. -->
  <vi-dialog
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
            <vi-button
              button-icon="icon-remove"
              @click="linkRemove(index)"
            />
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </vi-dialog>
  <!-- Links input. -->
  <vi-input
    v-model="link"
    label="Links"
  >
    <template #append>
      <!-- View links list dialog. -->
      <vi-input-button @click="linksShow()">
        <vi-icon class="w-5">
          <icon-list />
        </vi-icon>
      </vi-input-button>
      <!-- Add input link to the list. -->
      <vi-input-button
        last-element
        @click="linkAdd()"
      >
        <vi-icon class="w-5">
          <icon-add />
        </vi-icon>
      </vi-input-button>
    </template>
  </vi-input>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformLinks',
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