<template>
  <!-- Expanded tags management dialog. -->
  <vi-dialog
    v-show="expandedTitleDialog"
    @close="expandedTitleShow()"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Title</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="expandedTitleShow()"
      />
    </div>
    <!-- Sub title input. -->
    <vi-input
      v-model="preTitle"
      input-label="Pretitle"
    />
    <!-- Sub title input. -->
    <vi-input
      v-model="subTitle"
      input-label="Subtitle"
    />
    <!-- Original title input. -->
    <vi-input
      v-model="originalTitle"
      input-label="Original Title"
    />
    <!-- Romanized title input. -->
    <vi-input
      v-model="romanizedTitle"
      input-label="Romanized Title"
    />
    <!-- Translated title input. -->
    <vi-input
      v-model="translatedTitle"
      input-label="Translated Title"
    />
  </vi-dialog>
  <!-- Title management form. -->
  <div class="flex items-end space-x-2">
    <!-- Title input. -->
    <vi-input
      v-model="title"
      input-label="Title *"
      input-placeholder="Enter a name for the game..."
      input-required
    >
      <template #append>
        <!-- Buttons -->
        <vi-input-button
          input-last
          @click="expandedTitleShow()"
        >
          <vi-icon class="w-6">
            <icon-edit />
          </vi-icon>
        </vi-input-button>
      </template>
    </vi-input>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const title = computed({
      get() { return store.state.gameForm.gameRegion.title },
      set(value) { store.commit('setGameRegionTitle', value) }
    })
    const preTitle = computed({
      get() { return store.state.gameForm.gameRegion.preTitle },
      set(value) { store.commit('setGameRegionPreTitle', value) }
    })
    const subTitle = computed({
      get() { return store.state.gameForm.gameRegion.subTitle },
      set(value) { store.commit('setGameRegionSubTitle', value) }
    })
    const originalTitle = computed({
      get() { return store.state.gameForm.gameRegion.originalTitle },
      set(value) { store.commit('setGameRegionOriginalTitle', value) }
    })
    const romanizedTitle = computed({
      get() { return store.state.gameForm.gameRegion.romanizedTitle },
      set(value) { store.commit('setGameRegionRomanizedTitle', value) }
    })
    const translatedTitle = computed({
      get() { return store.state.gameForm.gameRegion.translatedTitle },
      set(value) { store.commit('setGameRegionTranslatedTitle', value) }
    })

    // Manage extended title dialog display.
    let expandedTitleDialog = ref(false)
    const expandedTitleShow = () => {
      // Toggle expanded title dialog.
      expandedTitleDialog.value = !expandedTitleDialog.value
    }

    return {
      expandedTitleDialog,
      expandedTitleShow,
      originalTitle,
      preTitle,
      romanizedTitle,
      subTitle,
      title,
      translatedTitle
    }
  }
}
</script>

<style>
</style>