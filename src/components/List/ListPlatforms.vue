<template>
  <div>
    <!-- Create platform dialog. -->
    <hip-dialog
      v-show="createPlatformDialog"
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
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="createPlatformOpen()"
      >
        <hip-icon class="w-6">
          <icon-add />
        </hip-icon>
      </hip-button-nb>
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
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlatforms } from '@/database/controllers/Platform'
// Import form components.
import CreatePlatform from '@/components/Create/CreatePlatform.vue'

export default {
  name: 'ListPlatforms',
  components: {
    CreatePlatform
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Load platforms list on mounting.
    onMounted(() => { loadPlatforms() })

    // Load platforms list.
    let platforms = ref(null)
    const paginationCount = 50
    let paginationIndex = ref(0)
    const loadPlatforms = () => {
      // Ensure pagination index is reset.
      paginationIndex.value = 0
      // Get first batch of platforms.
      getPlatforms(paginationIndex.value, paginationCount)
        .then((res) => {
          platforms.value = res
          // Set next pagination index.
          paginationIndex.value += paginationCount
        })
    }
    const loadPlatformsNext = () => {
      // Check loaded platforms to avoid duplication.
      if (platforms.value) {
        // Get next batch of platforms.
        getPlatforms(paginationIndex.value, paginationCount)
          .then((res) => {
            platforms.value = platforms.value.concat(res)
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
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload platforms.
      loadPlatforms()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }

    return {
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      loadPlatformsNext,
      platforms
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