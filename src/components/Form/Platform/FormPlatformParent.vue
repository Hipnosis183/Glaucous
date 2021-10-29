<template>
  <!-- Platform group input select. -->
  <vi-select
    v-model="parent"
    label="Parent Group"
    remote
    :remote-method="querySearch"
    class="w-full"
  >
    <vi-option
      v-for="item in queryResults"
      :key="item._id"
      :label="item.name"
      :value="item._id"
    />
  </vi-select>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// Import database platform functions.
import { getPlatform, getPlatformGroupByName } from '@/database/controllers/Platform'

export default {
  name: 'FormPlatformParent',
  props: {
    groupPlatform: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const route = useRoute()
    const store = useStore()

    // Manage selected platform group.
    onMounted(() => {
      // Load selected platform group on mounting.
      if (props.groupPlatform) {
        selectPlatformGroup()
      }
    })
    watch(() => props.groupPlatform, () => {
      // Watch for platform group ID to be loaded.
      selectPlatformGroup()
    })

    // Platform group input operations.
    let parent = computed({
      get() { return store.state.platformForm.parent },
      set(value) { store.commit('setPlatformParent', value) }
    })
    const selectPlatformGroup = () => {
      // Get platform group from parent page.
      getPlatform(props.groupPlatform)
        .then((res) => {
          parent.value = props.groupPlatform
          // Check if it has a value or not, since it's not a required field.
          queryResults.value = res ? [res] : []
        })
    }

    // Manage search queries.
    let queryResults = ref([])
    const querySearch = (query) => {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for platform groups matching the query.
        getPlatformGroupByName(query, route.params.id)
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
      parent,
      queryResults,
      querySearch
    }
  }
}
</script>

<style>
</style>