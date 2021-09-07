<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="dialog.validationError"
    @close="validationError()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Complete the required fields.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <hip-button
        :icon="true"
        @click="validationError()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <div class="flex h-10">
      <p class="mr-4 pt-1 text-2xl">Edit Game Entry</p>
      <form-game-images
        editForm
        showPlatform
        showRegion
        showVersion
      />
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
  <!-- Edit game form. -->
  <form>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-game-region-title />
        <form-game-region-pre-title />
        <form-game-region-sub-title />
        <form-game-region-original-title />
        <form-game-region-romanized-title />
        <form-game-region-translated-title />
      </div>
      <div class="w-1/2">
        <div class="flex space-x-4">
          <form-game-region-region />
          <form-game-platform-serial />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-developer :gameDeveloper="gameDeveloper" />
          <form-game-platform-platform :gamePlatform="gamePlatform" />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-release-year />
          <form-game-platform-number-players />
        </div>
        <form-game-version-name />
        <div class="flex space-x-4">
          <form-game-version-number />
          <form-game-version-latest />
        </div>
        <form-game-version-comments />
        <form-game-platform-links />
      </div>
    </div>
  </form>
</template>

<script>
// Import form components.
import {
  FormGameImages,
  FormGamePlatformDeveloper,
  FormGamePlatformLinks,
  FormGamePlatformNumberPlayers,
  FormGamePlatformPlatform,
  FormGamePlatformReleaseYear,
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
} from '../Form'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../Component'
// Import database controllers functions.
import { updateGame } from '../../database/controllers/Game'
import {
  createDeveloper,
  getDeveloper
} from '../../database/controllers/Developer'
import {
  createPlatform,
  getPlatform
} from '../../database/controllers/Platform'

export default {
  name: 'EditGame',
  components: {
    // Form components.
    FormGameImages,
    FormGamePlatformDeveloper,
    FormGamePlatformLinks,
    FormGamePlatformNumberPlayers,
    FormGamePlatformPlatform,
    FormGamePlatformReleaseYear,
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
    FormGameVersionNumber,
    // UI components.
    HipButton,
    HipDialog
  },
  data() {
    return {
      dialog: {
        validationError: false
      }
    }
  },
  emits: [
    'close'
  ],
  props: [
    'gameDeveloper',
    'gamePlatform'
  ],
  methods: {
    onSubmit() {
      // Validate required fields.
      if (
        !this.$store.state.gameForm.gameRegion.title ||
        !this.$store.state.gameForm.gameRegion.region ||
        !this.$store.state.gameForm.gamePlatform.developer ||
        !this.$store.state.gameForm.gamePlatform.platform ||
        !this.$store.state.gameForm.gamePlatform.releaseYear
      ) {
        this.validationError()
        return
      }
      // Check developer existance.
      this.checkDeveloper()
        // Check platform existance.
        .then(() => this.checkPlatform()
          .then(() => {
            // Update game entry.
            updateGame(this.$store.state.gameForm, this.$store.state.gameSelected)
              .then(() => this.$emit('close'))
          }))
    },
    async checkDeveloper() {
      // Check if the developer entered exists.
      await getDeveloper(this.developer)
        .then(async res => {
          if (!res) {
            // Populate new developer form.
            this.$store.commit('setDeveloperName', this.developer)
            // Save new developer entry.
            await createDeveloper(this.$store.state.developerForm)
              // Set the new developer in the game form.
              .then(res => this.developer = res._id)
          }
        })
    },
    async checkPlatform() {
      // Check if the platform entered exists.
      await getPlatform(this.platform)
        .then(async res => {
          if (!res) {
            // Populate new platform form.
            this.$store.commit('setPlatformName', this.platform)
            // Save new platform entry.
            await createPlatform(this.$store.state.platformForm)
              // Set the new platform in the game form.
              .then(res => this.platform = res._id)
          }
        })
    },
    // Show validation errors.
    validationError() {
      // Open error dialog.
      this.dialog.validationError = !this.dialog.validationError
    }
  },
  computed: {
    developer: {
      get() { return this.$store.state.gameForm.gamePlatform.developer },
      set(value) { this.$store.commit('setGamePlatformDeveloper', value) }
    },
    platform: {
      get() { return this.$store.state.gameForm.gamePlatform.platform },
      set(value) { this.$store.commit('setGamePlatformPlatform', value) }
    }
  }
}
</script>

<style>
</style>