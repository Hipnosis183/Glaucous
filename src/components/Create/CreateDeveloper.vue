<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="name">Name:</label>
      <input id="name" v-model="developerForm.name" />
      <br />
      <input class="button" type="submit" value="Submit" />
    </form>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
import { createDeveloper } from '../../database/controllers/Developer'

export default {
  name: "create-developer",
  data() {
    return {
      developerForm: {
        name: null,
      },
    };
  },
  methods: {
    onSubmit() {
      for (const prop in this.developerForm) {
        if (this.developerForm[prop] === null) return
      }
      createDeveloper(this.developerForm)
        .then(this.$router.back())
    },
  }
};
</script>

<style>
</style>
