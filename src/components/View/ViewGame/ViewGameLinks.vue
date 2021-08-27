<template>
  <div class="flex ml-auto pt-4 space-x-2">
    <!-- External links. -->
    <div
      v-if="links"
      class="flex space-x-2"
    >
      <div
        v-for="(link, index) in links"
        :key="index"
        :value="link"
      >
        <div
          @click="openLink(link)"
          class="cursor-pointer text-2xl"
        >
          <!-- Link icon image. -->
          <img
            :src="getIcon(link)"
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
// Import functions from modules.
import {
  app,
  shell
} from '@electron/remote'
import {
  existsSync,
  readdirSync,
  readFile
} from 'fs-extra'

export default {
  name: 'ViewGameImages',
  data() {
    return {
      links: [],
      googleKeys: [
        this.fullTitle,
        this.gameRegion.originalTitle,
        this.gameInfo.developer.name
      ]
    }
  },
  emits: [
    'loaded'
  ],
  props: [
    'fullTitle',
    'gameInfo',
    'gameRegion'
  ],
  methods: {
    // Links management.
    getLinks() {
      // Set the links file path for the game platform.
      let linksPath = app.getAppPath() + '/data/' + this.gameInfo.platform._id + '/games/' + this.gameInfo._id + '/links'
      if (existsSync(linksPath)) {
        // Load links file.
        readFile(linksPath, 'utf8')
          .then(res => {
            this.links = []
            let links = res.split('\n').filter(res => res != '')
            for (let link of links) {
              this.links.push(new URL(link))
            }
            // Send event to parent with the loaded data.
            this.$emit('loaded', links)
          })
      }
    },
    getIcon(link) {
      // Set the icon image path for links.
      let iconPath = app.getAppPath() + '/assets/links'
      // Get all files under the directory.
      let iconDir = readdirSync(iconPath)
      // Select an icon if its name matches with the link requested.
      let iconFile = iconDir.filter(res => res.includes(link.hostname))[0]
      // Return icon image path.
      return iconFile
        ? 'file://' + iconPath + '/' + iconFile
        : './images/links/default.svg'
    },
    openLink(link) {
      // Open the selected link in the system default browser.
      shell.openExternal(link.href)
    },
    openGoogle() {
      // Select key attribute to use as a query search parameter.
      let query = this.googleKeys[this.$store.getters.getSettingsLinksSearchGoogleKey]
      // Make a Google search with the selected parameter.
      shell.openExternal('https://google.com/search?q=' + query)
    }
  },
  mounted() {
    // Load links.
    this.getLinks()
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.link-icon {
  @apply border-2 border-theme-200 dark:border-theme-800 h-12 object-cover rounded-full;
}
</style>