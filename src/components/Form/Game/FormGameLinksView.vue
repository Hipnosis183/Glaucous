<template>
  <!-- Open links dialog. -->
  <vi-dialog class="pos-initial z-10">
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Enter a valid URL.
    </vi-dialog-box>
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">Links</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-add"
        @click="linkAdd()"
      />
    </div>
    <!-- Name input. -->
    <vi-input
      v-model="link.name"
      input-label="Name"
      input-placeholder="Enter a name for the link..."
    />
    <!-- Links input. -->
    <vi-input
      v-model="link.url"
      input-label="URL"
      input-placeholder="https://www.viridian.com/"
      input-required
    />
    <!-- Links list section. -->
    <div v-if="gameLinks.length > 0">
      <!-- Separator. -->
      <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
      <!-- List links. -->
      <div class="space-y-2">
        <div
          v-for="(item, index) in gameLinks"
          :key="item"
        >
          <vi-chip
            chip-large
            @remove="linkRemove(index)"
          >
            <h2
              v-if="item.name"
              class="text-sm mb-1"
            >{{ item.name }}</h2>
            {{ item.url }}
          </vi-chip>
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
  name: 'FormGameLinksView',
  props: {
    gameType: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage links operations.
    let link = ref({
      name: null,
      url: null
    })
    const gameLinks = computed(() => {
      return store.state.gameForm['g' + props.gameType.slice(1)].links
    })
    const linkAdd = () => {
      try {
        // Check for a valid URL.
        new URL(link.value.url)
        // Avoid reactivity to alter the original reference values.
        let linkStore = {
          name: link.value.name,
          url: link.value.url.replace(/www\./, '')
        }
        // Save link into the store.
        store.commit('set' + props.gameType + 'LinksAdd', linkStore)
        let linksStore = gameLinks.value
        store.commit('set' + props.gameType + 'Links', linksStore.sort(sortLinksList))
        // Reset link input.
        link.value.name = null
        link.value.url = null
      }
      // Invalid URL.
      catch { validationErrorShow() }
    }
    const linkRemove = (link) => {
      // Remove link from the store.
      store.commit('set' + props.gameType + 'LinksRemove', link)
    }
    const sortLinksList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.url.toString().localeCompare(b.url.toString(), navigator.language, { numeric: true, ignorePunctuation: true })
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    return {
      gameLinks,
      link,
      linkAdd,
      linkRemove,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>