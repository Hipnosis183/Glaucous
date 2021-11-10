<template>
  <div class="flex">
    <!-- Open view external notes dialog. -->
    <vi-button-ui
      button-small="icon-notes"
      @click="gameNotesShow()"
    />
    <!-- View external notes dialog. -->
    <vi-dialog
      v-show="gameNotesDialog"
      @close="gameNotesShow()"
      class="pos-initial z-10"
    >
      <div v-if="gameNotes.length > 0">
        <!-- Padding. -->
        <div class="w-80" />
        <!-- Header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Title. -->
          <p class="mr-10 pt-1 text-2xl">Notes</p>
          <!-- Buttons. -->
          <vi-button
            button-icon="icon-close"
            @click="gameNotesShow()"
          />
        </div>
        <!-- Separator. -->
        <div class="separator" />
        <!-- List game notes. -->
        <div class="space-y-2">
          <div
            v-for="note in gameNotes"
            :key="note"
            class="note-card"
          >
            <p class="p-4">{{ note }}</p>
          </div>
        </div>
      </div>
      <!-- No notes dialog. -->
      <vi-dialog-box
        v-else
        :overlay="false"
        @accept="gameNotesShow()"
      >
        No notes available.
      </vi-dialog-box>
    </vi-dialog>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'

export default {
  name: 'ViewGameNotes',
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Manage game notes.
    onMounted(() => { getNotes() })
    let gameNotes = ref([])
    const getNotes = () => {
      gameNotes.value = props.gameInfo.notes.concat(props.gameInfo.gameRegions[props.regionIndex].notes, props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex].notes)
    }
    let gameNotesDialog = ref(false)
    const gameNotesShow = () => {
      // Toggle details dialog.
      gameNotesDialog.value = !gameNotesDialog.value
    }

    return {
      gameNotes,
      gameNotesDialog,
      gameNotesShow
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.note-card {
  @apply bg-theme-100 dark:bg-theme-900 hover:bg-theme-200 dark:hover:bg-theme-800 duration-500 flex rounded-xl shadow-color transform w-full;
}
.separator {
  @apply bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full;
}
</style>