<template>
  <!-- Platform group input select. -->
  <hip-select
    v-model="parent"
    label="Parent Group"
    remote
    :remote-method="querySearch"
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
} from '../../Component'
// Import database platform functions.
import {
  getPlatform,
  getPlatformGroupByName
} from '../../../database/controllers/Platform'

export default {
  name: 'FormPlatformParent',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      queryResults: []
    }
  },
  props: [
    'groupPlatform'
  ],
  methods: {
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for platform groups matching the query.
        getPlatformGroupByName(query, this.$route.params.id)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Autocomplete platform group input field.
    selectPlatformGroup() {
      // Get platform group from parent page.
      getPlatform(this.groupPlatform)
        .then(res => {
          this.parent = this.groupPlatform
          // Check if it has a value or not, since it's not a required field.
          this.queryResults = res ? [res] : []
        })
    }
  },
  mounted() {
    if (this.groupPlatform) {
      this.selectPlatformGroup()
    }
  },
  computed: {
    parent: {
      get() { return this.$store.state.platformForm.parent },
      set(value) { this.$store.commit('setPlatformParent', value) }
    }
  },
  watch: {
    // Watch for platform group ID to be loaded.
    groupPlatform() {
      this.selectPlatformGroup()
    }
  }
}
</script>

<style>
</style>