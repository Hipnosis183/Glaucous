<template>
  <div>
    <!-- Create platform dialog. -->
    <hip-dialog
      v-show="createPlatformDialog"
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
      v-show="editPlatformDialog"
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
      v-show="deletePlatformDialog"
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
            icon
            @click="deletePlatformClose()"
          >
            <hip-icon class="w-6">
              <icon-check />
            </hip-icon>
          </hip-button>
          <!-- Cancel platform deletion. -->
          <hip-button
            icon
            @click="deletePlatformOpen()"
          >
            <hip-icon class="w-6">
              <icon-close />
            </hip-icon>
          </hip-button>
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
            icon
            @click="deletePlatformOpen()"
          >
            <hip-icon class="w-6">
              <icon-check />
            </hip-icon>
          </hip-button>
        </div>
      </div>
    </hip-dialog>
    <!-- Navigation bar. -->
    <hip-nav-bar :title="platform.name">
      <!-- Open create platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-add />
        </hip-icon>
      </hip-button-nb>
      <!-- Open edit platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-edit />
        </hip-icon>
      </hip-button-nb>
      <!-- Open delete platform dialog. -->
      <hip-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="deletePlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-remove />
        </hip-icon>
      </hip-button-nb>
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
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import database controllers functions.
import { deletePlatform, getPlatform, getPlatformsGroup } from '@/database/controllers/Platform'
// Import form components.
import CreatePlatform from '@/components/Create/CreatePlatform.vue'
import EditPlatform from '@/components/Edit/EditPlatform.vue'

export default {
  name: 'ListPlatformsGroup',
  components: {
    CreatePlatform,
    EditPlatform
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load platforms list on mounting.
    onMounted(() => { loadPlatform() })

    // Load platforms list.
    let platform = ref({
      name: null,
      parent: null,
      platforms: []
    })
    const paginationCount = 50
    let paginationIndex = ref(0)
    const loadPlatform = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get platform group.
      getPlatform(route.params.id)
        .then((res) => {
          platform.value.name = res.name
          platform.value.parent = res.parent ? res.parent._id : ''
        })
      // Get first batch of platforms.
      getPlatformsGroup(route.params.id, paginationIndex.value, paginationCount)
        .then((res) => {
          platform.value.platforms = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlatformNext = () => {
      // Check loaded platforms to avoid duplication.
      if (platform.value.platforms) {
        // Get next batch of platforms.
        getPlatformsGroup(route.params.id, paginationIndex.value, paginationCount)
          .then((res) => {
            platform.value.platforms = platform.value.platforms.concat(res)
            // Set next pagination index.
            paginationIndex.value += paginationCount
          })
      }
    }

    // Manage platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlatformForm')
      // Save data of the current platform group into the store.
      store.commit('setPlatformParent', route.params.id)
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload platforms.
      loadPlatform()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    let editPlatformDialog = ref(false)
    const editPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlatformForm')
      // Save current platform group ID into the store.
      store.state.platformSelected = route.params.id
      // Save data of the current platform group into the store.
      store.commit('setPlatformName', platform.value.name)
      store.commit('setPlatformParent', platform.value.parent)
      // Open edit dialog.
      editPlatformDialog.value = !editPlatformDialog.value
    }
    const editPlatformClose = () => {
      // Reload platforms.
      loadPlatform()
      // Close edit dialog.
      editPlatformDialog.value = !editPlatformDialog.value
    }
    let deletePlatformDialog = ref(false)
    const deletePlatformOpen = () => {
      // Open delete dialog.
      deletePlatformDialog.value = !deletePlatformDialog.value
    }
    const deletePlatformClose = () => {
      // Delete platform group.
      deletePlatform(route.params.id)
        .then(() => router.back())
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      deletePlatformClose,
      deletePlatformDialog,
      deletePlatformOpen,
      editPlatformClose,
      editPlatformDialog,
      editPlatformOpen,
      loadPlatformNext,
      platform
    }
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