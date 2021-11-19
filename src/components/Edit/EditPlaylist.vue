<template>
  <!-- Edit playlist dialog. -->
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
      <p class="mr-10 pt-1 text-2xl">Edit Playlist</p>
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
    <form-playlist-name />
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
import { updatePlaylist } from '@/database/controllers/User'
// Import form components.
import { FormPlaylistName } from '@/components/Form'

export default {
  name: 'EditPlaylist',
  components: {
    FormPlaylistName
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage playlist editing.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.playlistForm.name) {
        validationErrorShow(); return
      }
      // Update playlist entry.
      updatePlaylist(store.state.playlistForm, store.state.playlistSelected)
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