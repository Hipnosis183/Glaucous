<template>
  <!-- Developer input select. -->
  <vi-select
    v-model="developer"
    select-allow-create
    select-label="Developer"
    select-placeholder="Search or create developer..."
    select-remote
    :select-remote-method="querySearch"
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
// Import database developer functions.
import { getDeveloper, getDeveloperByName } from '@/database/controllers/Developer'

export default {
  name: 'FormGamePlatformDeveloper',
  props: {
    gameDeveloper: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage selected developer.
    onMounted(() => {
      // Load selected developer on mounting.
      if (props.gameDeveloper) {
        selectDeveloper()
      }
    })
    watch(() => props.gameDeveloper, () => {
      // Watch for developer ID to be loaded.
      selectDeveloper()
    })

    // Developer input operations.
    let developer = computed({
      get() { return store.state.gameForm.gamePlatform.developer },
      set(value) { store.commit('setGamePlatformDeveloper', value) }
    })
    const selectDeveloper = () => {
      // Get developer from parent page.
      if (props.gameDeveloper) {
        getDeveloper(props.gameDeveloper)
          .then((res) => {
            developer.value = props.gameDeveloper
            queryResults.value = new Array(res)
          })
      } else {
        queryResults.value = []
      }
    }

    // Manage search queries.
    let queryResults = ref([])
    const querySearch = (query) => {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for developers matching the query.
        getDeveloperByName(query)
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
      developer,
      queryResults,
      querySearch
    }
  }
}
</script>

<style>
</style>