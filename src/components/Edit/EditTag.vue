<template>
  <!-- Edit tag dialog. -->
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
    <!-- Form header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Form title. -->
      <p class="mr-10 pt-1 text-2xl">Edit Tag</p>
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
    <!-- Form components. -->
    <form-tag-name />
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { updateTag } from '@/database/controllers/User'
// Import form components.
import { FormTagName } from '@/components/Form'

export default {
  name: 'EditTag',
  components: {
    FormTagName
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage tag editing.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.tagForm.name) {
        validationErrorShow()
        return
      }
      // Update tag entry.
      updateTag(store.state.tagForm, store.state.tagSelected)
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