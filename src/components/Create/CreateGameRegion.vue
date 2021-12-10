<template>
  <!-- Create game region dialog. -->
  <vi-dialog
    dialog-width="w-4/5"
    @close="onClose()"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Collision error dialog. -->
    <vi-dialog-box
      v-show="collisionErrorDialog"
      @accept="collisionErrorShow()"
    >
      The indicated region is already in use.
      <br />
      Select a different region or leave empty.
    </vi-dialog-box>
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="mr-4 pt-1 text-2xl">New Game Region</p>
      <!-- Buttons. -->
      <div class="h-10 space-x-4">
        <vi-button
          button-icon="icon-check"
          @click="onSubmit()"
        />
        <vi-button
          button-icon="icon-close"
          @click="onClose()"
        />
      </div>
    </div>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-2/5">
        <form-game-region-title />
        <form-game-version-name />
      </div>
      <div class="w-3/5">
        <div class="flex space-x-4">
          <form-game-region-region />
          <form-game-platform-serial />
        </div>
        <div class="flex space-x-4">
          <form-game-version-type />
          <form-game-version-number />
        </div>
      </div>
    </div>
    <div class="flex space-x-4">
      <div class="w-full">
        <form-game-images
          :reset-form="resetForm"
          show-region
          show-version
        />
      </div>
      <form-game-files
        show-region
        show-version
      />
    </div>
    <div class="flex space-x-4">
      <form-game-links
        show-region
        show-version
      />
      <form-game-notes
        show-region
        show-version
      />
    </div>
    <!-- Required fields aclaration. -->
    <p class="mt-8 text-center text-sm">
      * The fields with red text are required
    </p>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getGamePlatform, newGameRegion } from '@/database/controllers/Game'
// Import form components.
import {
  FormGameFiles,
  FormGameImages,
  FormGameLinks,
  FormGameNotes,
  FormGamePlatformSerial,
  FormGameRegionRegion,
  FormGameRegionTitle,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'CreateGameRegion',
  components: {
    FormGameFiles,
    FormGameImages,
    FormGameLinks,
    FormGameNotes,
    FormGamePlatformSerial,
    FormGameRegionRegion,
    FormGameRegionTitle,
    FormGameVersionName,
    FormGameVersionNumber,
    FormGameVersionType
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game region creation.
    let resetForm = ref(false)
    const onSubmit = async () => {
      // Validate required fields.
      if (!store.state.gameForm.gameRegion.title) {
        validationErrorShow(); return
      }
      // Check for ID collisions.
      if (store.state.gameForm.gameRegion.region) {
        let gameValidation = await getGamePlatform(store.state.gameSelected.gamePlatform)
        for (let region of gameValidation.gameRegions) {
          if (region.slice(-2) == store.state.gameForm.gameRegion.region.toUpperCase()) {
            collisionErrorShow(); return
          }
        }
      }
      // Save new game entry.
      newGameRegion(store.state.gameForm, store.state.gameSelected)
        .then(() => onClose(true))
    }
    const onClose = (created) => {
      // Reset images forms.
      resetForm.value = !resetForm.value
      // Emit close dialog event.
      emit('close', created)
    }
    let collisionErrorDialog = ref(false)
    const collisionErrorShow = () => {
      // Toggle collision error dialog.
      collisionErrorDialog.value = !collisionErrorDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      collisionErrorDialog,
      collisionErrorShow,
      onClose,
      onSubmit,
      resetForm,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>