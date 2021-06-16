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
      this.$db.platforms.insert(this.platformForm);
    },
  }
};
</script>

<style>
</style>
