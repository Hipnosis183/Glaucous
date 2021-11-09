<template>
  <!-- Show notes dialog. -->
  <vi-dialog
    v-show="notesDialog"
    @close="notesShow()"
    class="pos-initial z-10"
  >
    <!-- Notes list. -->
    <div class="flex mb-6">
      <h1 class="font-bold text-xl">Notes</h1>
    </div>
    <div class="mt-1 text-lg">
      <ul class="list-disc list-inside text-theme-800 dark:text-theme-100">
        <div
          v-if="$store.state.gameForm.gameVersion.notes.length > 0"
          class="space-y-4"
        >
          <div
            v-for="(note, index) in $store.state.gameForm.gameVersion.notes"
            :key="index"
            :value="note"
            class="flex items-center space-x-6"
          >
            <li class="text-justify">{{ note }}</li>
            <!-- Remove related note from the list. -->
            <vi-button
              button-icon="icon-remove"
              @click="noteRemove(index)"
            />
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </vi-dialog>
  <!-- Notes input. -->
  <vi-input
    v-model="note"
    label="Notes"
  >
    <template #append>
      <!-- View notes list dialog. -->
      <vi-input-button @click="notesShow()">
        <vi-icon class="w-5">
          <icon-list />
        </vi-icon>
      </vi-input-button>
      <!-- Add input note to the list. -->
      <vi-input-button
        last-element
        @click="noteAdd()"
      >
        <vi-icon class="w-5">
          <icon-add />
        </vi-icon>
      </vi-input-button>
    </template>
  </vi-input>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionNotes',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage notes operations.
    let note = ref(null)
    const noteAdd = () => {
      // Save note into the store.
      store.commit('setGameVersionNotesAdd', note.value)
      // Reset note input.
      note.value = null
    }
    const noteRemove = (com) => {
      // Remove note from the store.
      store.commit('setGameVersionNotesRemove', com)
    }
    let notesDialog = ref(false)
    const notesShow = () => {
      // Toggle notes dialog.
      notesDialog.value = !notesDialog.value
    }

    return {
      note,
      noteAdd,
      noteRemove,
      notesDialog,
      notesShow
    }
  }
}
</script>

<style>
</style>