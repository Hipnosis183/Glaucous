<template>
  <el-form-item
    label="Platform"
    prop="platform"
  >
    <el-select
      v-model="platform"
      allow-create
      default-first-option
      filterable
      placeholder="Required"
      remote
      :remote-method="querySearch"
      reserve-keyword
      class="w-full"
    >
      <el-option
        v-for="item in queryResults"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import {
  getPlatform,
  getPlatformByName
} from '../../database/controllers/Platform'

export default {
  name: 'FormPlatform',
  data() {
    return {
      queryResults: []
    }
  },
  props: [
    'gamePlatform'
  ],
  methods: {
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for platforms matching the query.
        getPlatformByName(query)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Autocomplete platform input field.
    selectPlatform() {
      // Get platform from parent page.
      getPlatform(this.gamePlatform)
        .then(res => {
          this.platform = this.gamePlatform
          this.queryResults = new Array(res)
        })
    }
  },
  mounted() {
    if (this.gamePlatform) {
      this.selectPlatform()
    }
  },
  computed: {
    platform: {
      get() { return this.$store.state.gameForm.gamePlatform.platform },
      set(value) { this.$store.commit('setGamePlatformPlatform', value) }
    }
  },
  watch: {
    // Watch for platform ID to be loaded.
    gamePlatform() {
      this.selectPlatform()
    }
  }
}
</script>

<style>
</style>