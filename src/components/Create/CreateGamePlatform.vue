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
    <h1 class="pt-1 text-2xl">New Game Entry</h1>
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
  <!-- Create game platform form. -->
  <el-form
    label-position="top"
    :model="$store.state.gameForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-images />
        <form-title />
        <form-sub-title />
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
      </div>
      <div class="w-1/2">
        <form-region />
        <form-developer :gameDeveloper="gameDeveloper" />
        <form-platform :gamePlatform="gamePlatform" />
        <div class="flex space-x-4">
          <form-release-year />
          <form-number-players />
        </div>
        <div class="flex space-x-4">
          <form-current-version />
          <form-latest-version />
        </div>
        <form-comments />
      </div>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormCurrentVersion,
  FormDeveloper,
  FormImages,
  FormLatestVersion,
  FormNumberPlayers,
  FormOriginalTitle,
  FormPlatform,
  FormRegion,
  FormReleaseYear,
  FormRomanizedTitle,
  FormSubTitle,
  FormTitle,
  FormTranslatedTitle
} from '../Form'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../Component'
// Import database controllers functions.
import { newGamePlatform } from '../../database/controllers/Game'
import {
  createDeveloper,
  getDeveloper
} from '../../database/controllers/Developer'
import {
  createPlatform,
  getPlatform
} from '../../database/controllers/Platform'

export default {
  name: 'CreateGamePlatform',
  components: {
    // Form components.
    FormComments,
    FormCurrentVersion,
    FormDeveloper,
    FormImages,
    FormLatestVersion,
    FormNumberPlayers,
    FormOriginalTitle,
    FormPlatform,
    FormRegion,
    FormReleaseYear,
    FormRomanizedTitle,
    FormSubTitle,
    FormTitle,
    FormTranslatedTitle,
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
            // Save new game entry.
            newGamePlatform(this.$store.state.gameForm)
              .then(() => this.$emit('close'))
          }))
    },
    async checkDeveloper() {
      // Check if the developer entered exists.
      await getDeveloper(this.developer)
        .then(async res => {
          if (!res) {
            // Populate new developer form.
            this.$store.commit('setOtherName', this.developer)
            // Save new developer entry.
            await createDeveloper(this.$store.state.otherForm)
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
            this.$store.commit('setOtherName', this.platform)
            // Save new platform entry.
            await createPlatform(this.$store.state.otherForm)
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