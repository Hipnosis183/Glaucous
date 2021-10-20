<template>
  <!-- Create game region dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Form header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Form title. -->
      <div class="flex h-10">
        <p class="mr-4 pt-1 text-2xl">New Game Region</p>
        <form-game-images
          showRegion
          showVersion
        />
      </div>
      <!-- Form buttons. -->
      <div class="h-10 space-x-4">
        <vi-button-icon @click="onSubmit()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <vi-button-icon @click="$emit('close')">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </div>
    <!-- Create game region form. -->
    <form>
      <!-- Form components. -->
      <div class="flex space-x-4">
        <div class="w-1/2">
          <form-game-region-region />
          <form-game-region-title />
          <form-game-region-pre-title />
          <form-game-region-sub-title />
        </div>
        <div class="w-1/2">
          <form-game-region-original-title />
          <form-game-region-romanized-title />
          <form-game-region-translated-title />
          <div class="flex space-x-4">
            <form-game-platform-serial />
            <form-game-version-name />
          </div>
          <div class="flex space-x-4">
            <form-game-version-number />
            <form-game-version-latest />
          </div>
        </div>
      </div>
      <form-game-version-comments />
    </form>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { newGameRegion } from '@/database/controllers/Game'
// Import form components.
import {
  FormGameImages,
  FormGamePlatformSerial,
  FormGameRegionOriginalTitle,
  FormGameRegionPreTitle,
  FormGameRegionRegion,
  FormGameRegionRomanizedTitle,
  FormGameRegionSubTitle,
  FormGameRegionTitle,
  FormGameRegionTranslatedTitle,
  FormGameVersionComments,
  FormGameVersionLatest,
  FormGameVersionName,
  FormGameVersionNumber
} from '@/components/Form'

export default {
  name: 'CreateGameRegion',
  components: {
    FormGameImages,
    FormGamePlatformSerial,
    FormGameRegionOriginalTitle,
    FormGameRegionPreTitle,
    FormGameRegionRegion,
    FormGameRegionRomanizedTitle,
    FormGameRegionSubTitle,
    FormGameRegionTitle,
    FormGameRegionTranslatedTitle,
    FormGameVersionComments,
    FormGameVersionLatest,
    FormGameVersionName,
    FormGameVersionNumber
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game region creation.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.gameForm.gameRegion.title) {
        validationErrorShow()
        return
      }
      // Save new game entry.
      newGameRegion(store.state.gameForm, store.state.gameSelected)
        .then(() => emit('close', true))
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      onSubmit,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>