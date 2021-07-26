<template>
  <!-- External links. -->
  <div
    v-if="links"
    class="flex ml-auto space-x-2"
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
          class="border-2 border-gray-200 h-12 object-cover rounded-full"
        />
      </div>
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
    }
  },
  emits: [
    'loaded'
  ],
  props: [
    'gameInfo'
  ],
  methods: {
    // Links management.
    getLinks() {
      // Set the links file path for the game platform.
      let linksPath = app.getAppPath() + '/images/' + this.gameInfo._id + '/links'
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
    }
  },
  mounted() {
    // Load links.
    this.getLinks()
  }
}
</script>

<style>
</style>