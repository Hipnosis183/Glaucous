<template>
  <el-form-item
    label="Developer"
    prop="developer"
  >
    <el-select
      v-model="developer"
      allow-create
      class="w-full"
      default-first-option
      filterable
      placeholder="Required"
      remote
      :remote-method="querySearch"
      reserve-keyword
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
  getDeveloper,
  getDeveloperByName
} from '../../database/controllers/Developer'

export default {
  name: 'FormDeveloper',
  data() {
    return {
      queryResults: []
    }
  },
  props: [
    'gameDeveloper'
  ],
  methods: {
    // Query searching.
    querySearch(query) {
      // Only start search from two characters onwards.
      if (query !== '' && query.length > 1) {
        // Search for developers matching the query.
        getDeveloperByName(query)
          .then(res => {
            // Store results.
            this.queryResults = res
          })
      } else {
        // Keep results empty.
        this.queryResults = []
      }
    },
    // Autocomplete developer input field.
    selectDeveloper() {
      // Get developer from parent page.
      getDeveloper(this.gameDeveloper)
        .then(res => {
          this.developer = this.gameDeveloper
          this.queryResults = new Array(res)
        })
    }
  },
  mounted() {
    if (this.gameDeveloper) {
      this.selectDeveloper()
    }
  },
  computed: {
    developer: {
      get() { return this.$store.state.gameForm.gamePlatform.developer },
      set(value) { this.$store.commit('setGamePlatformDeveloper', value) }
    }
  },
  watch: {
    // Watch for developer ID to be loaded.
    gameDeveloper() {
      this.selectDeveloper()
    }
  }
}
</script>

<style>
</style>
