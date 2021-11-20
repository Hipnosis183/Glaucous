<template>
  <!-- Open notes dialog. -->
  <vi-dialog class="pos-initial z-10">
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Enter some text first.
    </vi-dialog-box>
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Notes</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-add"
        @click="noteAdd()"
      />
    </div>
    <!-- Notes input. -->
    <vi-input
      v-model="note"
      input-label="Notes"
      input-placeholder="Add a note or comment..."
    />
    <!-- Notes list section. -->
    <div v-if="gameNotes.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- List notes. -->
      <div class="space-y-2">
        <div
          v-for="(item, index) in gameNotes"
          :key="item"
          :value="item"
        >
          <vi-chip
            chip-large
            @remove="noteRemove(index)"
          >{{ item }}</vi-chip>
        </div>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameNotesView',
  props: {
    gameType: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage notes operations.
    let note = ref(null)
    const gameNotes = computed(() => {
      return store.state.gameForm['g' + props.gameType.slice(1)].notes
    })
    const noteAdd = () => {
      // Validate required fields.
      if (!note.value) {
        validationErrorShow(); return
      }
      // Save note into the store.
      store.commit('set' + props.gameType + 'NotesAdd', note.value)
      // Reset note input.
      note.value = null
    }
    const noteRemove = (index) => {
      // Remove note from the store.
      store.commit('set' + props.gameType + 'NotesRemove', index)
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      gameNotes,
      note,
      noteAdd,
      noteRemove,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>