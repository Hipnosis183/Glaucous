<template>
  <!-- Create game version dialog. -->
  <vi-dialog
    @close="$emit('close')"
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
          @click="$emit('close')"
        />
      </div>
    </div>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-2/5">
        <form-game-version-name />
        <form-game-images show-version />
      </div>
      <div class="w-3/5">
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
import { useStore } from 'vuex'
// Import database controllers functions.
import { newGameVersion } from '@/database/controllers/Game'
// Import form components.
import {
  FormGameImages,
  FormGameVersionComments,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'CreateGameRegion',
  components: {
    FormGameImages,
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

    // Manage game version creation.
    const onSubmit = () => {
      // Save new game entry.
      newGameVersion(store.state.gameForm, store.state.selectedPlatform, store.state.gameSelected)
        .then(() => emit('close', true))
    }

    return {
      onSubmit
    }
  }
}
</script>

<style>
</style>