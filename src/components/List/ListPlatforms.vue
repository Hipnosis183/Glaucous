<template>
  <div>
    <!-- Create platform dialog. -->
    <hip-dialog
      v-show="dialog.createPlatform"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create platform form component. -->
      <create-platform @close="createPlatformClose()" />
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar title="Platforms">
      <!-- Open create platform dialog. -->
      <hip-button-nb
        v-show="$store.state.editMode"
        @click="createPlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
    </hip-nav-bar>
    <!-- Show platforms list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list :remote-method="loadPlatformsNext">
            <li
              v-for="platform in platforms"
              :key="platform._id"
              :value="platform._id"
              @click="$router.push({ name: 'ViewPlatform', params: { id: platform._id } })"
            >
              <!-- Platform card. -->
              <hip-card>
                <div>
                  <h1 class="font-semibold text-xl">{{ platform.name }}</h1>
                  <h3>{{ platform.titles }} Titles</h3>
                </div>
              </hip-card>
            </li>
          </hip-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import form components.
import CreatePlatform from '../Create/CreatePlatform.vue'
// Import UI components.
import {
  HipButtonNb,
  HipCard,
  HipDialog,
  HipList,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'ListPlatforms',
  components: {
    // Form components.
    CreatePlatform,
    // UI components.
    HipButtonNb,
    HipCard,
    HipDialog,
    HipList,
    HipNavBar
  },
  data() {
    return {
      platforms: null,
      pagination: {
        index: 0,
        count: 50
      },
      dialog: {
        createPlatform: false
      }
    }
  },
  methods: {
    loadPlatforms() {
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get first batch of platforms.
      getPlatforms(this.pagination.index, this.pagination.count)
        .then(res => {
          this.platforms = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadPlatformsNext() {
      // Check loaded platforms to avoid duplication.
      if (this.platforms) {
        // Get next batch of platforms.
        getPlatforms(this.pagination.index, this.pagination.count)
          .then(res => {
            this.platforms = this.platforms.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    // Create operations.
    createPlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetOtherForm')
      // Open create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    },
    createPlatformClose() {
      // Reload platforms.
      this.loadPlatforms()
      // Close create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    }
  },
  mounted() {
    // Load platforms list.
    this.loadPlatforms()
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>