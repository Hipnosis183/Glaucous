<template>
  <!-- Playlists management dialog. -->
  <vi-dialog
    v-show="expandedTagsDialog"
    @close="expandedTagsShow()"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Tags</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="expandedTagsShow()"
      />
    </div>
    <!-- Separator. -->
    <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
    <!-- List game playlists. -->
    <div class="font-medium space-y-2">
      <div
        v-for="item in gameInfo.gameTags"
        :key="item"
        :value="item"
      >
        <vi-chip
          chip-large
          clickable
          :removable="false"
          @clicked="$router.push({ name: 'Tag', params: { id: item._id } })"
        >
          {{ item.name }}
        </vi-chip>
      </div>
    </div>
  </vi-dialog>
  <div class="flex mt-auto -mb-2 pr-14 relative">
    <!-- View game tags list. -->
    <div
      ref="gameTags"
      v-if="gameInfo.gameTags.length > 0"
      :class="gameTagsIndex != 100 ? 'flex whitespace-nowrap' : 'flex flex-wrap'"
    >
      <!-- Tags container. -->
      <div
        v-for="(tag, index) in gameInfo.gameTags"
        :key="tag._id"
      >
        <vi-chip-ui
          v-if="!(index > gameTagsIndex)"
          @clicked="$router.push({ name: 'Tag', params: { id: tag._id } })"
          class="mr-0.5"
        >{{ tag.name }}</vi-chip-ui>
      </div>
    </div>
    <!-- View extended game tags. -->
    <div class="relative">
      <vi-chip-ui
        v-if="gameTagsIndex != 100"
        @clicked="expandedTagsShow()"
        class="absolute top-0"
      >+{{ gameInfo.gameTags.length - (gameTagsIndex + 1) }}</vi-chip-ui>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { nextTick, onUnmounted, ref, watch } from 'vue'
// Import utility functions.
import { debounce } from '@/utils/debounce'

export default {
  name: 'ViewGameTags',
  props: {
    gameInfo: { type: Object }
  },
  setup() {
    // Manage tags load and display.
    const gameTags = ref(null)
    let gameTagsIndex = ref(100)
    watch(() => gameTags.value, () => { gameTagsDisplay() })
    const gameTagsDisplay = () => {
      if (gameTags.value) {
        // Get all child elements (tags) from the parent container.
        for (let [index, child] of Object.entries(gameTags.value.children)) {
          // Intersect index where the list wraps.
          if (child.getBoundingClientRect().top > gameTags.value.getBoundingClientRect().top) {
            // Assign index to flag value.
            gameTagsIndex.value = index - 1
            break
          }
        }
      }
    }
    let expandedTagsDialog = ref(false)
    const expandedTagsShow = () => {
      // Toggle expanded tags dialog.
      expandedTagsDialog.value = !expandedTagsDialog.value
    }

    // Manage tags list resizing.
    const resizeTags = () => {
      // Reset tag wrapping index.
      gameTagsIndex.value = 100
      // Wait for template to react to the index change.
      nextTick(() => { gameTagsDisplay() })
    }
    const resizeTagsDebounced = debounce(() => resizeTags(), 500)
    // Attach window resize event listener on creation.
    window.addEventListener('resize', resizeTagsDebounced)
    onUnmounted(() => {
      // Remove window resize event listener on unmount.
      window.removeEventListener('resize', resizeTagsDebounced)
    })

    return {
      expandedTagsDialog,
      expandedTagsShow,
      gameTags,
      gameTagsIndex
    }
  }
}
</script>

<style>
</style>