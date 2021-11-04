<template>
  <!-- Create game region dialog. -->
  <vi-dialog
    @close="onClose()"
    width="w-4/5"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
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
        <form-game-images
          :reset-form="resetForm"
          show-region
          show-version
        />
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
import { newGameRegion } from '@/database/controllers/Game'
// Import form components.
import {
  FormGameImages,
  FormGamePlatformSerial,
  FormGameRegionRegion,
  FormGameRegionTitle,
  FormGameVersionComments,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'CreateGameRegion',
  components: {
    FormGameImages,
    FormGamePlatformSerial,
    FormGameRegionRegion,
    FormGameRegionTitle,
    FormGameVersionComments,
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
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.gameForm.gameRegion.title) {
        validationErrorShow()
        return
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
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
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