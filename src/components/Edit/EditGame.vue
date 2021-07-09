<template>
  <!-- Edit game form. -->
  <el-form
    label-position="top"
    :model="$store.state.gameForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-title />
        <form-sub-title />
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
      </div>
      <div class="w-1/2">
        <form-region />
        <form-developer />
        <form-platform />
        <div class="flex space-x-4">
          <form-release-year />
          <form-number-players />
        </div>
        <div class="flex space-x-4">
          <form-current-version />
          <form-latest-version />
        </div>
      </div>
    </div>
    <form-comments />
    <!-- Form buttons. -->
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Update</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormCurrentVersion,
  FormDeveloper,
  FormLatestVersion,
  FormNumberPlayers,
  FormOriginalTitle,
  FormPlatform,
  FormRegion,
  FormReleaseYear,
  FormRomanizedTitle,
  FormSubTitle,
  FormTitle,
  FormTranslatedTitle
} from '../Form'
// Import UI components.
import { HipButton } from '../Component'
// Import database controllers functions.
import { updateGame } from '../../database/controllers/Game'

export default {
  name: 'EditGame',
  components: {
    // Form components.
    FormComments,
    FormCurrentVersion,
    FormDeveloper,
    FormLatestVersion,
    FormNumberPlayers,
    FormOriginalTitle,
    FormPlatform,
    FormRegion,
    FormReleaseYear,
    FormRomanizedTitle,
    FormSubTitle,
    FormTitle,
    FormTranslatedTitle,
    // UI components.
    HipButton
  },
  methods: {
    onSubmit() {
      // Update game entry.
      updateGame(this.$store.state.gameForm, this.$store.state.gameSelected)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>
