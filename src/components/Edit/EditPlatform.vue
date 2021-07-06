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
      <hip-button @click="onSubmit()">Update</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
import { HipButton } from '../Component'
import { FormName } from '../Form'

import { updatePlatform } from '../../database/controllers/Platform'

export default {
  name: 'edit-platform',
  components: {
    HipButton,
    FormName
  },
  methods: {
    onSubmit() {
      // Update platform entry.
      updatePlatform(this.$store.state.otherForm, this.$store.state.otherSelected)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>
