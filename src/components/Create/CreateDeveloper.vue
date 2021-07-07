<template>
  <el-form
    :model="$store.state.otherForm"
    label-position="top"
    ref="otherForm"
    :show-message="false"
  >
    <div class="flex space-x-4">
      <form-name />
    </div>
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Create</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
import { HipButton } from '../Component'
import { FormName } from '../Form'

import { createDeveloper } from '../../database/controllers/Developer'

export default {
  name: "create-developer",
  components: {
    HipButton,
    FormName
  },
  methods: {
    onSubmit() {
      // Save new developer entry.
      createDeveloper(this.$store.state.otherForm)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>
