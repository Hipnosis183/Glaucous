<template>
  <!-- Validation error dialog. -->
  <vi-dialog
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
      <vi-button-icon @click="validationErrorShow()">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <p class="mr-10 pt-1 text-2xl">Edit Emulator</p>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
      <vi-button-icon @click="onSubmit()">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
      <vi-button-icon @click="$emit('close')">
        <vi-icon class="w-6">
          <icon-close />
        </vi-icon>
      </vi-button-icon>
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
    <vi-section-header label="Preview" />
    <div class="bg-theme-100 dark:bg-theme-800 px-4 py-2 rounded-xl text-base text-theme-800 dark:text-theme-200 shadow-color w-full">
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
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { outputJSONSync } from 'fs-extra'
// Import form components.
import {
  FormEmulatorFile,
  FormEmulatorName,
  FormEmulatorParams,
  FormEmulatorPath
} from '@/components/Form'

export default {
  name: 'EditEmulator',
  components: {
    FormEmulatorFile,
    FormEmulatorName,
    FormEmulatorParams,
    FormEmulatorPath
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

    // Manage emulator editing.
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
      // Find entry and update the list.
      let index = props.emulatorList.findIndex((res) => res.id == store.state.emulatorForm.id)
      props.emulatorList[index] = store.state.emulatorForm
      // Save updated list back to file.
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