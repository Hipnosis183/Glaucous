<template>
  <!-- Platform input select. -->
  <vi-select
    v-model="platform"
    select-allow-create
    select-label="Platform *"
    select-placeholder="Search or create platform..."
    select-remote
    :select-remote-method="querySearch"
    select-required
    class="w-full"
  >
    <vi-option
      v-for="item in queryResults"
      :key="item._id"
      :option-label="item.name"
      :option-value="item._id"
    />
  </vi-select>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import database platform functions.
import { getPlatform, getPlatformByName } from '@/database/controllers/Platform'

export default {
  name: 'FormGamePlatformPlatform',
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