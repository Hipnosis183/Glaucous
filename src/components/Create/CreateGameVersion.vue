<template>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <div class="flex h-10">
      <p class="mr-4 pt-1 text-2xl">New Game Version</p>
      <form-game-images showVersion />
    </div>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
      <hip-button
        :icon="true"
        @click="onSubmit()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
      <hip-button
        :icon="true"
        @click="$emit('close')"
        class="el-icon-circle-close text-2xl"
      ></hip-button>
    </div>
  </div>
  <!-- Create game version form. -->
  <form>
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
  </form>
</template>

<script>
// Import form components.
import {
  FormGameImages,
  FormGameVersionComments,
  FormGameVersionLatest,
  FormGameVersionName,
  FormGameVersionNumber
} from '../Form'
// Import UI components.
import { HipButton } from '../Component'
// Import database controllers functions.
import { newGameVersion } from '../../database/controllers/Game'

export default {
  name: 'CreateGameRegion',
  components: {
    // Form components.
    FormGameImages,
    FormGameVersionComments,
    FormGameVersionLatest,
    FormGameVersionName,
    FormGameVersionNumber,
    // UI components.
    HipButton
  },
  emits: [
    'close'
  ],
  methods: {
    onSubmit() {
      // Save new game entry.
      newGameVersion(this.$store.state.gameForm, this.$store.state.selectedPlatform, this.$store.state.gameSelected)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>