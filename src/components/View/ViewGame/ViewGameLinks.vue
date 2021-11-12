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
          <img :src="getLinkIcon(link)" />
          <!-- Link name text. -->
          <p class="link-text">{{ getLinkText(link) }}</p>
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
import { onMounted, ref, watch } from 'vue'
// Import functions from modules.
import { app, shell } from '@electron/remote'
import { existsSync, readFile, readFileSync } from 'fs-extra'

export default {
  name: 'ViewGameLinks',
  emits: [
    'close',
    'loaded'
  ],
  props: {
    fullTitle: { type: String },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props, { emit }) {
    // Load game links.
    onMounted(() => { getLinks() })
    let gameLinks = ref([])
    const getLinks = async () => {
      // Set the links directory path for all game types.
      let gamePathPlatform = app.getAppPath() + '/data/links/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
      let gamePathRegion = '/' + props.gameInfo.gameRegions[props.regionIndex]._id
      let gamePathVersion = '/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
      // Load links files.
      gameLinks.value = []
      let linksPath = []
      linksPath.push(gamePathPlatform + '/' + props.gameInfo._id + '.txt')
      linksPath.push(gamePathPlatform + gamePathRegion + gamePathRegion + '.txt')
      linksPath.push(gamePathPlatform + gamePathRegion + gamePathVersion + gamePathVersion + '.txt')
      let linksList = { gamePlatform: [], gameRegion: [], gameVersion: [] }
      for (let [index, path] of linksPath.entries()) {
        if (existsSync(path)) {
          await readFile(path, 'utf8').then((res) => {
            let links = res.split('\n').filter((res) => res != '')
            for (let link of links) {
              gameLinks.value.push(new URL(link))
              switch (index) {
                case 0: linksList.gamePlatform.push(new URL(link)); break
                case 1: linksList.gameRegion.push(new URL(link)); break
                case 2: linksList.gameVersion.push(new URL(link)); break
              }
            }
          })
        }
      }
      // Build and sort game links list.
      gameLinks.value.forEach((res, i) => {
        gameLinks.value[i].hostname = gameLinks.value[i].hostname.replace(/^www\./, '')
      })
      gameLinks.value = gameLinks.value.sort(sortLinksList)
      // Send event to parent with the loaded data.
      emit('loaded', linksList)
    }

    // Watch for game selection changes.
    watch(() => [props.regionIndex, props.versionIndex], () => { getLinks() })

    // Manage game links.
    const getLinkIcon = (link) => {
      // Strip 'www.' and top level domain ('.com') from link if present.
      let linkName = link.hostname.replace(/^www\./, '').split('.').slice(0, -1).join('.')
      // Set the icon image path for links.
      let iconPath = app.getAppPath() + '/assets/links/' + linkName + '.svg'
      // Return link icon path.
      return existsSync(iconPath) ? 'file://' + iconPath : './images/links/default.svg'
    }
    const getLinkText = (link) => {
      // Strip 'www.' and top level domain ('.com') from link if present.
      let linkName = link.hostname.replace(/^www\./, '').split('.').slice(0, -1).join('.')
      // Set the text path for links.
      let textPath = app.getAppPath() + '/assets/links/' + linkName + '.txt'
      // Return link text.
      return existsSync(textPath) ? readFileSync(textPath, 'utf8') : link.hostname
    }
    const sortLinksList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.hostname.localeCompare(b.hostname, navigator.language, { numeric: true, ignorePunctuation: true })
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