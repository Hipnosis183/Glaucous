<template>
  <!-- Edit developer form. -->
  <el-form
    label-position="top"
    :model="$store.state.otherForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <form-name />
    </div>
    <!-- Form buttons. -->
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Update</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import { FormName } from '../Form'
// Import UI components.
import { HipButton } from '../Component'
// Import database controllers functions.
import { updateDeveloper } from '../../database/controllers/Developer'

export default {
  name: 'EditDeveloper',
  components: {
    // Form components.
    FormName,
    // UI components.
    HipButton
  },
  methods: {
    onSubmit() {
      // Update developer entry.
      updateDeveloper(this.$store.state.otherForm, this.$store.state.otherSelected)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>
