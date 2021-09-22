<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="validationErrorDialog"
    @close="validationErrorShow()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Complete the required fields.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <hip-button
        icon
        @click="validationErrorShow()"
      >
        <hip-icon class="w-6">
          <icon-check />
        </hip-icon>
      </hip-button>
    </div>
  </hip-dialog>
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
      <hip-button
        icon
        @click="onSubmit()"
      >
        <hip-icon class="w-6">
          <icon-check />
        </hip-icon>
      </hip-button>
      <hip-button
        icon
        @click="$emit('close')"
      >
        <hip-icon class="w-6">
          <icon-close />
        </hip-icon>
      </hip-button>
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
      if (
        !store.state.gameForm.gameRegion.title ||
        !store.state.gameForm.gameRegion.region
      ) {
        validationErrorShow()
        return
      }
      // Save new game entry.
      newGameRegion(store.state.gameForm, store.state.gameSelected)
        .then(() => emit('close'))
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