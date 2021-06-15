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
      this.$db.developers.insert(this.developerForm);
    },
  }
};
</script>

<style>
</style>
