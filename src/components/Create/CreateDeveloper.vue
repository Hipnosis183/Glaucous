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
          v-model="developerForm.name"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { connectDatastore } from '../../database/datastore'
import { createDeveloper } from '../../database/controllers/Developer'

export default {
  name: "create-developer",
  data() {
    return {
      developerForm: {
        name: null
      }
    }
  },
  methods: {
    onSubmit() {
      // Avoid submitting incomplete form.
      for (const prop in this.developerForm) {
        if (this.developerForm[prop] === null) return
      }
      // Set datastore and save new developer entry.
      connectDatastore().then(() => {
        createDeveloper(this.developerForm)
          .then(() => this.$router.back())
      })
    }
  }
}
</script>

<style>
</style>
