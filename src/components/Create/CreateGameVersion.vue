<template>
  <!-- Create game version dialog. -->
  <vi-dialog
    @close="onClose()"
    width="w-4/5"
    class="z-10"
  >
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="mr-4 pt-1 text-2xl">New Game Version</p>
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
        <form-game-version-name />
      </div>
      <div class="w-3/5">
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
          show-version
        />
      </div>
      <form-game-files show-version />
      <form-game-links show-version />
      <form-game-notes show-version />
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
import { newGameVersion } from '@/database/controllers/Game'
// Import form components.
import {
  FormGameFiles,
  FormGameImages,
  FormGameLinks,
  FormGameNotes,
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

    // Manage game version creation.
    let resetForm = ref(false)
    const onSubmit = () => {
      // Save new game entry.
      newGameVersion(store.state.gameForm, store.state.selectedPlatform, store.state.gameSelected)
        .then(() => onClose(true))
    }
    const onClose = (created) => {
      // Reset images forms.
      resetForm.value = !resetForm.value
      // Emit close dialog event.
      emit('close', created)
    }

    return {
      onClose,
      onSubmit,
      resetForm
    }
  }
}
</script>

<style>
</style>