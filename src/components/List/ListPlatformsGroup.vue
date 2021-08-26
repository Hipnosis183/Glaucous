<template>
  <div>
    <!-- Create platform dialog. -->
    <hip-dialog
      v-show="dialog.createPlatform"
      @close="createPlatformClose()"
      class="z-10"
    >
      <!-- Insert create platform form component. -->
      <create-platform
        :groupPlatform="$route.params.id"
        @close="createPlatformClose()"
      />
    </hip-dialog>
    <!-- Edit platform dialog. -->
    <hip-dialog
      v-show="dialog.editPlatform"
      @close="editPlatformClose()"
      class="z-10"
    >
      <!-- Insert edit platform form component. -->
      <edit-platform
        :groupPlatform="platform.parent"
        @close="editPlatformClose()"
      />
    </hip-dialog>
    <!-- Delete platform dialog. -->
    <hip-dialog
      v-show="dialog.deletePlatform"
      @close="deletePlatformOpen()"
      class="z-10"
    >
      <!-- Delete allowed. -->
      <div v-if="!platform.platforms.length > 0">
        <!-- Dialog message. -->
        <p class="text-center text-lg">
          Delete platform group <b>'{{ platform.name }}'</b> ?
        </p>
        <div class="flex justify-center mt-6 space-x-4">
          <!-- Confirm platform deletion. -->
          <hip-button
            :icon="true"
            @click="deletePlatformClose()"
            class="el-icon-circle-check text-2xl"
          ></hip-button>
          <!-- Cancel platform deletion. -->
          <hip-button
            :icon="true"
            @click="deletePlatformOpen()"
            class="el-icon-circle-close text-2xl"
          ></hip-button>
        </div>
      </div>
      <!-- Delete denied. -->
      <div v-else>
        <!-- Dialog message. -->
        <p class="text-center text-lg">
          You can't delete a group if it has platforms on it.
          <br />
          Delete the platforms individually first.
        </p>
        <div class="flex justify-center mt-6">
          <!-- Cancel platform deletion. -->
          <hip-button
            :icon="true"
            @click="deletePlatformOpen()"
            class="el-icon-circle-check text-2xl"
          ></hip-button>
        </div>
      </div>
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar :title="platform.name">
      <!-- Open create platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button-nb>
      <!-- Open edit platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editPlatformOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button-nb>
      <!-- Open delete platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deletePlatformOpen()"
        class="el-icon-remove-outline text-2xl"
      ></hip-button-nb>
    </hip-nav-bar>
    <!-- Show platforms list. -->
    <div class="h-content m-6">
      <div class="flex flex-col max-h-content min-h-content overflow-hidden">
        <div class="flex-1 no-scrollbar overflow-y-scroll rounded-xl">
          <hip-list :remote-method="loadPlatformNext">
            <li
              v-for="platform in platform.platforms"
              :key="platform._id"
              :value="platform._id"
              @click="$router.push({ name: platform.group ? 'ListPlatformsGroup' : 'ViewPlatform', params: { id: platform._id } })"
            >
              <!-- Platform card. -->
              <hip-card>
                <div>
                  <h1 class="font-semibold text-xl">{{ platform.name }}</h1>
                  <h3 v-if="platform.group">{{ platform.titles }} Platforms</h3>
                  <h3 v-else>{{ platform.titles }} Titles</h3>
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
import EditPlatform from '../Edit/EditPlatform.vue'
// Import UI components.
import {
  HipButton,
  HipButtonNb,
  HipCard,
  HipDialog,
  HipList,
  HipNavBar
} from '../Component'
// Import database controllers functions.
import {
  getPlatform,
  getPlatformsGroup,
  deletePlatform
} from '../../database/controllers/Platform'

export default {
  name: 'ListPlatformsGroup',
  components: {
    // Form components.
    CreatePlatform,
    EditPlatform,
    // UI components.
    HipButton,
    HipButtonNb,
    HipCard,
    HipDialog,
    HipList,
    HipNavBar
  },
  data() {
    return {
      platform: {
        name: null,
        parent: null,
        platforms: []
      },
      pagination: {
        index: 0,
        count: 50
      },
      dialog: {
        createPlatform: false,
        editPlatform: false,
        deletePlatform: false
      }
    }
  },
  methods: {
    loadPlatform() {
      // Ensure pagination index is reset.
      this.pagination.index = 0
      // Get platform group.
      getPlatform(this.$route.params.id)
        .then(res => {
          this.platform.name = res.name
          this.platform.parent = res.parent ? res.parent._id : ''
        })
      // Get first batch of platforms.
      getPlatformsGroup(this.$route.params.id, this.pagination.index, this.pagination.count)
        .then(res => {
          this.platform.platforms = res
          // Set next pagination index.
          this.pagination.index += this.pagination.count
        })
    },
    loadPlatformNext() {
      // Check loaded platforms to avoid duplication.
      if (this.platform.platforms) {
        // Get next batch of platforms.
        getPlatformsGroup(this.$route.params.id, this.pagination.index, this.pagination.count)
          .then(res => {
            this.platform.platforms = this.platform.platforms.concat(res)
            // Set next pagination index.
            this.pagination.index += this.pagination.count
          })
      }
    },
    // Create operations.
    createPlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetPlatformForm')
      // Save data of the current platform group into the store.
      this.$store.commit('setPlatformParent', this.$route.params.id)
      // Open create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    },
    createPlatformClose() {
      // Reload platforms.
      this.loadPlatform()
      // Close create dialog.
      this.dialog.createPlatform = !this.dialog.createPlatform
    },
    // Edit operations.
    editPlatformOpen() {
      // Restore the data on the store.
      this.$store.commit('resetPlatformForm')
      // Save current platform group ID into the store.
      this.$store.state.platformSelected = this.$route.params.id
      // Save data of the current platform group into the store.
      this.$store.commit('setPlatformName', this.platform.name)
      this.$store.commit('setPlatformParent', this.platform.parent)
      // Open edit dialog.
      this.dialog.editPlatform = !this.dialog.editPlatform
    },
    editPlatformClose() {
      // Reload platforms.
      this.loadPlatform()
      // Close edit dialog.
      this.dialog.editPlatform = !this.dialog.editPlatform
    },
    // Delete operations.
    deletePlatformOpen() {
      // Open delete dialog.
      this.dialog.deletePlatform = !this.dialog.deletePlatform
    },
    deletePlatformClose() {
      // Delete platform group.
      deletePlatform(this.$route.params.id)
        .then(() => this.$router.back())
    }
  },
  mounted() {
    // Load platforms list.
    this.loadPlatform()
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