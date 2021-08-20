<template>
  <p class="text-xl">Edit mode</p>
  <hip-switch v-model="editMode" />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../../Component'

export default {
  name: 'SettingsGeneralEditMode',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    editMode: {
      get() { return this.$store.state.editMode },
      set() { this.$store.commit('toggleEditMode') }
    }
  }
}
</script>

<style>
</style>