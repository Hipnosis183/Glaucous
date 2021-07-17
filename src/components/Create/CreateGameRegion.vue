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
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <h1 class="text-2xl pt-1">New Game Region</h1>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
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
  </div>
  <!-- Create game region form. -->
  <el-form
    label-position="top"
    :model="$store.state.gameForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-images />
        <form-region />
        <form-title />
        <form-sub-title />
      </div>
      <div class="w-1/2">
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
        <form-current-version />
      </div>
    </div>
    <form-comments />
  </el-form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormCurrentVersion,
  FormImages,
  FormOriginalTitle,
  FormRegion,
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
import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'CreateGameRegion',
  components: {
    // Form components.
    FormComments,
    FormCurrentVersion,
    FormImages,
    FormOriginalTitle,
    FormRegion,
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
      newGameRegion(this.$store.state.gameForm, this.$store.state.gameSelected.gamePlatform)
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
