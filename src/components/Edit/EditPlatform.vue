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
  <!-- Edit platform form. -->
  <el-form
    label-position="top"
    :model="$store.state.otherForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <form-name />
    </div>
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
import { FormName } from '../Form'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../Component'
// Import database controllers functions.
import { updatePlatform } from '../../database/controllers/Platform'

export default {
  name: 'EditPlatform',
  components: {
    // Form components.
    FormName,
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
      if (!this.$store.state.otherForm.name) {
        this.validationError()
        return
      }
      // Update platform entry.
      updatePlatform(this.$store.state.otherForm, this.$store.state.otherSelected)
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
