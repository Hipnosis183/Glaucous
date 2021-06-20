<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="name">Name:</label>
      <input id="name" v-model="platformForm.name" />
      <br />
      <input class="button" type="submit" value="Submit" />
    </form>
    <button @click="$router.back()">Back</button>
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
        name: null,
      },
    };
  },
  methods: {
    onSubmit() {
      for (const prop in this.platformForm) {
        if (this.platformForm[prop] === null) return
      }
      connectDatastore().then(() => {
        createPlatform(this.platformForm)
          .then(this.$router.back())
      })
    },
  }
};
</script>

<style>
</style>
