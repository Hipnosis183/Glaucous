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
      >
        <hip-icon class="w-6">
          <icon-check />
        </hip-icon>
      </hip-button>
    </div>
  </hip-dialog>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <p class="mr-10 pt-1 text-2xl">New Platform</p>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
      <hip-button
        icon
        @click="onSubmit()"
      >
        <hip-icon class="w-6">
          <icon-check />
        </hip-icon>
      </hip-button>
      <hip-button
        icon
        @click="$emit('close')"
      >
        <hip-icon class="w-6">
          <icon-close />
        </hip-icon>
      </hip-button>
    </div>
  </div>
  <!-- Create platform form. -->
  <form>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <form-platform-name />
      <form-platform-group />
    </div>
    <form-platform-parent
      v-show="!groupPlatform"
      :groupPlatform="groupPlatform"
    />
  </form>
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
        validationErrorShow()
        return
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