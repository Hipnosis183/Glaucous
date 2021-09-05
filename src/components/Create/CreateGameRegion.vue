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
    <div class="flex h-10 space-x-4">
      <p class="pt-1 text-2xl">New Game Region</p>
      <form-images
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
  <!-- Create game region form. -->
  <form>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-region />
        <form-title />
        <form-pre-title />
        <form-sub-title />
      </div>
      <div class="w-1/2">
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
        <div class="flex space-x-4">
          <form-serial />
          <form-version-name />
        </div>
        <div class="flex space-x-4">
          <form-version-number />
          <form-version-latest />
        </div>
      </div>
    </div>
    <form-comments />
  </form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormImages,
  FormOriginalTitle,
  FormPreTitle,
  FormRegion,
  FormRomanizedTitle,
  FormSerial,
  FormSubTitle,
  FormTitle,
  FormTranslatedTitle,
  FormVersionName,
  FormVersionNumber,
  FormVersionLatest
} from '../Form'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../Component'
// Import database controllers functions.
import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'CreateGameRegion',
  components: {
    // Form components.
    FormComments,
    FormImages,
    FormOriginalTitle,
    FormPreTitle,
    FormRegion,
    FormRomanizedTitle,
    FormSerial,
    FormSubTitle,
    FormTitle,
    FormTranslatedTitle,
    FormVersionName,
    FormVersionNumber,
    FormVersionLatest,
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
  methods: {
    onSubmit() {
      // Validate required fields.
      if (
        !this.$store.state.gameForm.gameRegion.title ||
        !this.$store.state.gameForm.gameRegion.region
      ) {
        this.validationError()
        return
      }
      // Save new game entry.
      newGameRegion(this.$store.state.gameForm, this.$store.state.gameSelected)
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