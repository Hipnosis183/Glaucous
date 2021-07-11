<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="dialog.validationError"
    class="top-0 left-14 z-10"
    @close="validationError()"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Complete the required fields.
    </p>
    <div class="flex space-x-4 mt-6 justify-center">
      <!-- Close message. -->
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="validationError()"
        :icon="true"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Edit game form. -->
  <el-form
    label-position="top"
    :model="$store.state.gameForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-title />
        <form-sub-title />
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
      </div>
      <div class="w-1/2">
        <form-region />
        <form-developer />
        <form-platform />
        <div class="flex space-x-4">
          <form-release-year />
          <form-number-players />
        </div>
        <div class="flex space-x-4">
          <form-current-version />
          <form-latest-version />
        </div>
      </div>
    </div>
    <form-comments />
    <!-- Form buttons. -->
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="onSubmit()"
        :icon="true"
      ></hip-button>
      <hip-button
        class="el-icon-circle-close text-2xl"
        @click="$emit('close')"
        :icon="true"
      ></hip-button>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormCurrentVersion,
  FormDeveloper,
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
import { updateGame } from '../../database/controllers/Game'

export default {
  name: 'EditGame',
  components: {
    // Form components.
    FormComments,
    FormCurrentVersion,
    FormDeveloper,
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
  emits: ['close'],
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
      // Update game entry.
      updateGame(this.$store.state.gameForm, this.$store.state.gameSelected)
        .then(() => this.$emit('close'))
    },
    // Show validation errors.
    validationError() {
      // Open error dialog.
      this.dialog.validationError = !this.dialog.validationError
    }
  }
}
</script>

<style>
</style>
