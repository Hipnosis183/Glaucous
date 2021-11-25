<template>
  <!-- View external links dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <!-- Padding. -->
    <div class="w-80" />
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">External Links</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="$emit('close')"
      />
    </div>
    <!-- Separator. -->
    <div class="separator" />
    <!-- List game links. -->
    <div v-if="gameLinks.length > 0">
      <div class="space-y-2">
        <div
          v-for="(link, index) in gameLinks"
          :key="index"
          @click="openLink(link)"
          class="link-card"
        >
          <!-- Link icon image. -->
          <div
            v-if="getLinkIcon(link.url)"
            class="bg-color-200 flex h-14 items-center w-14"
          >
            <img :src="getLinkIcon(link.url)" />
          </div>
          <div
            v-else
            class="bg-color-200 flex h-14 items-center w-14"
          >
            <h6>{{ getLinkChar(link.url) }}</h6>
          </div>
          <!-- Link name text. -->
          <p class="link-text">{{ link.name ? link.name : getLinkText(link.url) }}</p>
        </div>
      </div>
      <!-- Separator. -->
      <div class="separator" />
    </div>
    <!-- List google links. -->
    <div class="space-y-2">
      <div
        v-for="link in getLinkGoogle()"
        :key="link.i"
        @click="openGoogle(link.value)"
        class="link-card"
      >
        <!-- Link icon image. -->
        <img :src="'./images/links/google.com.svg'" />
        <!-- Link name text. -->
        <p class="link-text">{{ link.name }}</p>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { shell } from '@electron/remote'
import { existsSync, readFileSync } from 'fs-extra'

export default {
  name: 'ViewGameLinks',
  emits: [
    'close'
  ],
  props: {
    fullTitle: { type: String },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Load game links.
    onMounted(() => { getLinks() })
    let gameLinks = ref([])
    const getLinks = async () => {
      gameLinks.value = []
      // Load game platform links.
      for (let linkPlatform of props.gameInfo.links) {
        linkPlatform.url = new URL(linkPlatform.url)
        gameLinks.value.push(linkPlatform)
      }
      // Load game region links.
      for (let linkRegion of props.gameInfo.gameRegions[props.regionIndex].links) {
        linkRegion.url = new URL(linkRegion.url)
        gameLinks.value.push(linkRegion)
      }
      // Load game version links.
      for (let linkVersion of props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex].links) {
        linkVersion.url = new URL(linkVersion.url)
        gameLinks.value.push(linkVersion)
      }
      // Build and sort game links list.
      gameLinks.value.forEach((res, i) => {
        gameLinks.value[i].url.hostname = gameLinks.value[i].url.hostname.replace(/^www\./, '')
      })
      gameLinks.value = gameLinks.value.sort(sortLinksList)
    }

    // Manage game links.
    const getLinkChar = (link) => {
      // Strip 'www.' from link if present and return uppercased first char.
      return link.hostname.replace(/^www\./, '').charAt(0).toUpperCase()
    }
    const getLinkIcon = (link) => {
      // Strip 'www.' and top level domain ('.com') from link if present.
      let linkName = link.hostname.replace(/^www\./, '').split('.').slice(0, -1).join('.')
      // Set the icon image path for links.
      let iconPath = store.getters.getAppPath + '/assets/links/' + linkName + '.svg'
      // Return link icon path.
      return existsSync(iconPath) ? 'file://' + iconPath : false
    }
    const getLinkText = (link) => {
      // Strip 'www.' and top level domain ('.com') from link if present.
      let linkName = link.hostname.replace(/^www\./, '').split('.').slice(0, -1).join('.')
      // Set the text path for links.
      let textPath = store.getters.getAppPath + '/assets/links/' + linkName + '.txt'
      // Return link text.
      return existsSync(textPath) ? readFileSync(textPath, 'utf8') : link.hostname
    }
    const sortLinksList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.url.hostname.localeCompare(b.url.hostname, navigator.language, { numeric: true, ignorePunctuation: true })
    }

    // Manage links opening.
    const openLink = (link) => {
      // Open the selected link in the system default browser.
      shell.openExternal(link.href)
    }
    const openGoogle = (query) => {
      // Make a Google search with the selected parameter.
      shell.openExternal('https://google.com/search?q=' + query)
    }
    const queryGoogle = [
      { i: 0, name: 'Search game full title', value: props.fullTitle },
      { i: 1, name: 'Search game original title', value: props.gameInfo.gameRegions[props.regionIndex].originalTitle },
      { i: 2, name: 'Search game developer', value: props.gameInfo.developer.name }
    ]
    const getLinkGoogle = () => {
      // Avoid showing original title search if it's not set.
      return props.gameInfo.gameRegions[props.regionIndex].originalTitle ? queryGoogle
        : queryGoogle.filter((res) => res.i != 1)
    }

    return {
      gameLinks,
      getLinkGoogle,
      getLinkChar,
      getLinkIcon,
      getLinkText,
      openGoogle,
      openLink
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
h6 {
  @apply font-semibold mt-1 text-center text-color-700 text-4xl w-full;
}
.link-card {
  @apply bg-theme-100 dark:bg-theme-900 hover:bg-theme-200 dark:hover:bg-theme-800 cursor-pointer duration-500 flex h-14 rounded-xl overflow-hidden shadow-color transform w-full;
}
.link-text {
  @apply my-auto pointer-events-none px-4;
}
.separator {
  @apply bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full;
}
</style>