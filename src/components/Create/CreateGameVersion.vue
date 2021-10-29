<template>
  <!-- Create game version dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
  >
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <div class="flex h-10">
        <p class="mr-4 pt-1 text-2xl">New Game Version</p>
        <form-game-images showVersion />
      </div>
      <!-- Buttons. -->
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
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-game-version-name />
      </div>
      <div class="w-1/2">
        <div class="flex space-x-4">
          <form-game-version-number />
          <form-game-version-latest />
        </div>
      </div>
    </div>
    <form-game-version-comments />
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
  FormGameVersionLatest,
  FormGameVersionName,
  FormGameVersionNumber
} from '@/components/Form'

export default {
  name: 'CreateGameRegion',
  components: {
    FormGameImages,
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