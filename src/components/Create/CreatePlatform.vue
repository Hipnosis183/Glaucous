<template>
  <hip-nav-bar>
    <hip-button-nb @click="onSubmit()">Submit</hip-button-nb>
    <div class="w-full"></div>
  </hip-nav-bar>
  <div class="flex m-6 space-x-6">
    <div class="w-full bg-white p-6 rounded-xl shadow leading-loose">
      <div>
        <label class="text-blue-900 ml-2">Name</label>
        <input
          type="text"
          class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
          v-model="platformForm.name"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HipButtonNb, HipNavBar } from '../Component'

import { createPlatform } from '../../database/controllers/Platform'

export default {
  name: "create-platform",
  components: {
    HipButtonNb,
    HipNavBar
  },
  data() {
    return {
      platformForm: {
        name: null
      }
    }
  },
  methods: {
    onSubmit() {
      // Avoid submitting incomplete form.
      for (const prop in this.platformForm) {
        if (this.platformForm[prop] === null) return
      }
      // Save new platform entry.
      createPlatform(this.platformForm)
        .then(() => this.$router.back())
    }
  }
}
</script>

<style>
</style>
