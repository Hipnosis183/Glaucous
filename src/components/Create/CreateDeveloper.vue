<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label class="text-blue-900 ml-2">Name</label>
      <input
        type="text"
        class="mt-2 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:bg-gray-200 focus:ring-0"
        v-model="developerForm.name"
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
