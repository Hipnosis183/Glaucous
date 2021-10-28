<template>
  <!-- Create playlist dialog. -->
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
      <p class="mr-10 pt-1 text-2xl">New Playlist</p>
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
    <form-playlist-name />
  </vi-dialog>
</template>

<script>
// Import form components.
import { FormPlaylistName } from '@/components/Form'
// Import database controllers functions.
import { createPlaylist } from '@/database/controllers/User'

// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "CreatePlaylist",
  components: {
    FormPlaylistName
  },
  emits: [
    'close'
  ],
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage playlist creation.
    const onSubmit = () => {
      // Validate required fields.
      if (!store.state.playlistForm.name) {
        validationErrorShow()
        return
      }
      // Save new playlist entry.
      createPlaylist(store.state.playlistForm)
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