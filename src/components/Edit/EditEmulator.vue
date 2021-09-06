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
    <p class="mr-10 pt-1 text-2xl">Edit Emulator</p>
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
  <!-- Create emulator form. -->
  <form>
    <!-- Form components. -->
    <div class="flex mb-6 space-x-4">
      <div class="w-1/2">
        <form-emulator-name />
        <form-emulator-path />
      </div>
      <div class="w-1/2">
        <form-emulator-file />
        <form-emulator-params />
      </div>
    </div>
  </form>
  <!-- Command preview. -->
  <div class="space-y-6">
    <div />
    <hip-section-header label="Preview" />
    <div class="bg-theme-100 dark:bg-theme-800 px-4 py-2 rounded-xl text-base text-theme-800 dark:text-theme-200 shadow w-full">
      <div
        v-if="$store.state.emulatorForm.path || $store.state.emulatorForm.file"
        class="cursor-default"
      >{{ fullCommand }}</div>
      <div
        v-else
        class="invisible"
      >.</div>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import { outputJSONSync } from 'fs-extra'
// Import form components.
import {
  FormEmulatorFile,
  FormEmulatorName,
  FormEmulatorParams,
  FormEmulatorPath
} from '../Form'
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipSectionHeader
} from '../Component'

export default {
  name: 'EditEmulator',
  components: {
    // Form components.
    FormEmulatorFile,
    FormEmulatorName,
    FormEmulatorParams,
    FormEmulatorPath,
    // UI components.
    HipButton,
    HipDialog,
    HipSectionHeader
  },
  data() {
    return {
      dialog: {
        validationError: false
      }
    }
  },
  props: {
    emulatorList: { type: Array, default: [] },
    emulatorPath: { type: String, default: '' }
  },
  emits: [
    'close'
  ],
  methods: {
    onSubmit() {
      // Validate required fields.
      if (
        !this.$store.state.emulatorForm.name ||
        !this.$store.state.emulatorForm.path ||
        !this.$store.state.emulatorForm.file
      ) {
        this.validationError()
        return
      }
      // Find entry and update the list.
      let index = this.emulatorList.findIndex(res => res.id == this.$store.state.emulatorForm.id)
      this.emulatorList[index] = this.$store.state.emulatorForm
      // Save updated list back to file.
      outputJSONSync(this.emulatorPath, this.emulatorList)
      this.$emit('close')
    },
    // Show validation errors.
    validationError() {
      // Open error dialog.
      this.dialog.validationError = !this.dialog.validationError
    }
  },
  computed: {
    fullCommand() {
      // Get the emulator form values.
      let emu = this.$store.state.emulatorForm
      // Return command to execute.
      return '"' + (emu.path ? emu.path : '') + '/' + (emu.file ? emu.file : '') + '" ' + (emu.params ? emu.params : '')
    }
  }
}
</script>

<style>
</style>