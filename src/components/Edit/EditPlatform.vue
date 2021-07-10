<template>
  <!-- Edit platform form. -->
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
      <hip-button
        class="el-icon-circle-check text-2xl"
        @click="onSubmit()"
        :icon="true"
      ></hip-button>
      <hip-button
        class="el-icon-circle-close text-2xl"
        @click="$emit('close')"
        :icon="true"
      ></hip-button>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import { FormName } from '../Form'
// Import UI components.
import { HipButton } from '../Component'
// Import database controllers functions.
import { updatePlatform } from '../../database/controllers/Platform'

export default {
  name: 'EditPlatform',
  components: {
    // Form components.
    FormName,
    // UI components.
    HipButton
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
