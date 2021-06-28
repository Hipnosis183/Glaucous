<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label class="text-blue-900 ml-2">Name</label>
      <input
        type="text"
        class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
        v-model="platformForm.name"
      />
      <button
        class="bg-gray-300 font-semibold mt-6 px-6 py-3 rounded-full text-base text-blue-800"
        @click="onSubmit()"
      >Submit</button>
    </form>
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
