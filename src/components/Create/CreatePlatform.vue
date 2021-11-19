<template>
  <!-- Create platform dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
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
      <p class="mr-10 pt-1 text-2xl">New Platform</p>
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
    <div class="flex space-x-4">
      <form-platform-name />
      <form-platform-group />
    </div>
    <form-platform-parent
      v-show="!groupPlatform"
      :group-platform="groupPlatform"
    />
    <!-- Required fields aclaration. -->
    <p class="mt-8 text-center text-sm">
      * The fields with red text are required
    </p>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { createPlatform } from '@/database/controllers/Platform'
// Import form components.
import {
  FormPlatformGroup,
  FormPlatformName,
  FormPlatformParent,
} from '@/components/Form'

export default {
  name: "CreatePlatform",
  components: {
    FormPlatformGroup,
    FormPlatformName,
    FormPlatformParent
  },
  emits: [
    'close'
  ],
  props: {
    groupPlatform: { type: String }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage platform editing.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.platformForm.name) {
        validationErrorShow(); return
      }
      // Save new platform entry.
      createPlatform(store.state.platformForm)
        .then(() => emit('close'))
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      onSubmit,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>