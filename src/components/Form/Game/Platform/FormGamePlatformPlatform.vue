<template>
  <!-- Platform input select. -->
  <hip-select
    v-model="platform"
    allow-create
    label="Platform"
    placeholder="Required"
    remote
    :remote-method="querySearch"
    required
    class="w-full"
  >
    <hip-option
      v-for="item in queryResults"
      :key="item._id"
      :label="item.name"
      :value="item._id"
    >
    </hip-option>
  </hip-select>
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '@/components/Component'
// Import database platform functions.
import {
  getPlatform,
  getPlatformByName
} from '@/database/controllers/Platform'

// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformPlatform',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  props: {
    gamePlatform: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage selected platform.
    onMounted(() => {
      // Load selected platform on mounting.
      if (props.gamePlatform) {
        selectPlatform()
      }
    })
    watch(() => props.gamePlatform, () => {
      // Watch for platform ID to be loaded.
      selectPlatform()
    })

    // Platform input operations.
    let platform = computed({
      get() { return store.state.gameForm.gamePlatform.platform },
      set(value) { store.commit('setGamePlatformPlatform', value) }
    })
    const selectPlatform = () => {
      // Get platform from parent page.
      getPlatform(props.gamePlatform)
        .then((res) => {
          platform.value = props.gamePlatform
          queryResults.value = new Array(res)
        })
    }

    // Manage search queries.
    let queryResults = ref([])
    const querySearch = (query) => {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for platforms matching the query.
        getPlatformByName(query)
          .then((res) => {
            // Store results.
            queryResults.value = res
          })
      } else {
        // Keep results empty.
        queryResults.value = []
      }
    }

    return {
      platform,
      queryResults,
      querySearch
    }
  }
}
</script>

<style>
</style>