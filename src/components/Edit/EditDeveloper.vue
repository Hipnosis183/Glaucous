<template>
  <!-- Edit developer dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
  >
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
      <p class="mr-10 pt-1 text-2xl">Edit Developer</p>
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
    <!-- Edit developer form. -->
    <form>
      <!-- Form components. -->
      <form-developer-name />
    </form>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { updateDeveloper } from '@/database/controllers/Developer'
// Import form components.
import { FormDeveloperName } from '@/components/Form'

export default {
  name: 'EditDeveloper',
  components: {
    FormDeveloperName
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage developer editing.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.developerForm.name) {
        validationErrorShow()
        return
      }
      // Update developer entry.
      updateDeveloper(store.state.developerForm, store.state.developerSelected)
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