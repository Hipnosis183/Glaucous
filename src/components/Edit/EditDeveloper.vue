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
    <h1 class="mr-10 pt-1 text-2xl">Edit Developer</h1>
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
  <!-- Edit developer form. -->
  <el-form
    label-position="top"
    :model="$store.state.otherForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <form-name />
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
import { updateDeveloper } from '../../database/controllers/Developer'

export default {
  name: 'EditDeveloper',
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
      // Update developer entry.
      updateDeveloper(this.$store.state.otherForm, this.$store.state.otherSelected)
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