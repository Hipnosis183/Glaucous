<template>
  <div class="inline-flex shadow bg-white w-full justify-between">
    <button
      class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800"
      @click="onSubmit()"
    >Submit</button>
    <div></div>
  </div>
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
import { connectDatastore } from '../../database/datastore'
import { createPlatform } from '../../database/controllers/Platform'

export default {
  name: "create-platform",
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
      // Set datastore and save new platform entry.
      connectDatastore().then(() => {
        createPlatform(this.platformForm)
          .then(() => this.$router.back())
      })
    }
  }
}
</script>

<style>
</style>
