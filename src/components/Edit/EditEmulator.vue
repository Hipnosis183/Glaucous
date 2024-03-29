<template>
  <!-- Edit emulator dialog. -->
  <vi-dialog
    dialog-width="w-2/3"
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Edit Emulator</p>
      <!-- Buttons. -->
      <div class="h-10 space-x-4">
        <vi-button
          button-icon="icon-check"
          @click="onSubmit()"
        />
        <vi-button
          button-icon="icon-close"
          @click="$emit('close')"
        />
      </div>
    </div>
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
    <!-- Command preview. -->
    <div class="space-y-6">
      <div />
      <vi-section-header section-label="Preview" />
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
    <!-- Required fields aclaration. -->
    <p class="mt-4 text-center text-sm">
      * The fields with red text are required
    </p>
  </vi-dialog>
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
      ) { validationErrorShow(); return }
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