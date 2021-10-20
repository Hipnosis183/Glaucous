<template>
  <vi-button-ui>
    <vi-icon class="w-6">
      <icon-link />
    </vi-icon>
  </vi-button-ui>
  <div class="flex hidden ml-auto pt-4 space-x-2">
    <!-- External links. -->
    <div
      v-if="gameLinks"
      class="flex space-x-2"
    >
      <div
        v-for="(link, index) in gameLinks"
        :key="index"
        :value="link"
      >
        <div
          @click="openLink(link)"
          class="cursor-pointer text-2xl"
        >
          <!-- Link icon image. -->
          <img
            :src="getLinkIcon(link)"
            class="link-icon"
          />
        </div>
      </div>
    </div>
    <!-- Google search. -->
    <div
      v-if="$store.getters.getSettingsLinksSearchGoogle"
      @click="openGoogle()"
      class="cursor-pointer text-2xl"
    >
      <!-- Link icon image. -->
      <img
        :src="'./images/links/google.com.svg'"
        class="link-icon"
      />
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app, shell } from '@electron/remote'
import { existsSync, readdirSync, readFile } from 'fs-extra'

export default {
  name: 'ViewGameLinks',
  emits: [
    'loaded'
  ],
  props: {
    fullTitle: { type: String },
    gameInfo: { type: Object },
    gameRegion: { type: Object }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Load game links on mounting.
    onMounted(() => { getLinks() })

    // Manage game links.
    let gameLinks = ref([])
    const getLinks = () => {
      // Set the links file path for the game platform.
      let linksPath = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id + '/links'
      if (existsSync(linksPath)) {
        // Load links file.
        readFile(linksPath, 'utf8')
          .then((res) => {
            gameLinks.value = []
            let links = res.split('\n').filter((res) => res != '')
            for (let link of links) {
              gameLinks.value.push(new URL(link))
            }
            // Send event to parent with the loaded data.
            emit('loaded', links)
          })
      }
    }
    const getLinkIcon = (link) => {
      // Set the icon image path for links.
      let iconPath = app.getAppPath() + '/assets/links'
      // Get all files under the directory.
      let iconDir = readdirSync(iconPath)
      // Select an icon if its name matches with the link requested.
      let iconFile = iconDir.filter((res) => res.includes(link.hostname))[0]
      // Return icon image path.
      return iconFile
        ? 'file://' + iconPath + '/' + iconFile
        : './images/links/default.svg'
    }

    // Manage links opening.
    const googleKeys = [
      props.fullTitle,
      props.gameRegion.originalTitle,
      props.gameInfo.developer.name
    ]
    const openLink = (link) => {
      // Open the selected link in the system default browser.
      shell.openExternal(link.href)
    }
    const openGoogle = () => {
      // Select key attribute to use as a query search parameter.
      let query = googleKeys[store.getters.getSettingsLinksSearchGoogleKey]
      // Make a Google search with the selected parameter.
      shell.openExternal('https://google.com/search?q=' + query)
    }

    return {
      gameLinks,
      getLinkIcon,
      openLink,
      openGoogle
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.link-icon {
  @apply border-2 border-theme-200 dark:border-theme-800 h-12 object-cover rounded-full;
}
</style>