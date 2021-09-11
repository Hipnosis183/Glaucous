<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="validationErrorDialog"
    @close="validationErrorShow()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Complete the required fields.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <hip-button
        icon
        @click="validationErrorShow()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <p class="mr-10 pt-1 text-2xl">New Emulator</p>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
      <hip-button
        icon
        @click="onSubmit()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
      <hip-button
        icon
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
} from '@/components/Form'
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipSectionHeader
} from '@/components/Component'
// Import database functions.
import { generateID } from '@/database/datastore'

// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CreateEmulator',
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
  emits: [
    'close'
  ],
  props: {
    emulatorList: { type: Array, default: [] },
    emulatorPath: { type: String, default: '' }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage emulator creation.
    const fullCommand = computed(() => {
      // Get the emulator form values.
      let emu = store.state.emulatorForm
      // Return command to execute.
      return '"' + (emu.path ? emu.path : '') + '/' + (emu.file ? emu.file : '') + '" ' + (emu.params ? emu.params : '')
    })
    const onSubmit = () => {
      // Validate required fields.
      if (
        !store.state.emulatorForm.name ||
        !store.state.emulatorForm.path ||
        !store.state.emulatorForm.file
      ) {
        validationErrorShow()
        return
      }
      // Create entry and populate list.
      store.state.emulatorForm.id = generateID()
      props.emulatorList.push(store.state.emulatorForm)
      // Save new list back to file.
      outputJSONSync(props.emulatorPath, props.emulatorList)
      emit('close')
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      fullCommand,
      onSubmit,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>