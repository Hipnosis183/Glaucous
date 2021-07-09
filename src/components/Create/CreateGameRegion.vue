<template>
  <!-- Create game region form. -->
  <el-form
    label-position="top"
    :model="$store.state.gameForm"
    :show-message="false"
  >
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-region />
        <form-title />
        <form-sub-title />
        <form-current-version />
      </div>
      <div class="w-1/2">
        <form-original-title />
        <form-romanized-title />
        <form-translated-title />
        <form-comments />
      </div>
    </div>
    <!-- Form buttons. -->
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Create</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
// Import form components.
import {
  FormComments,
  FormCurrentVersion,
  FormOriginalTitle,
  FormRegion,
  FormRomanizedTitle,
  FormSubTitle,
  FormTitle,
  FormTranslatedTitle
} from '../Form'
// Import UI components.
import { HipButton } from '../Component'
// Import database controllers functions.
import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'CreateGameRegion',
  components: {
    // Form components.
    FormComments,
    FormCurrentVersion,
    FormOriginalTitle,
    FormRegion,
    FormRomanizedTitle,
    FormSubTitle,
    FormTitle,
    FormTranslatedTitle,
    // UI components.
    HipButton
  },
  methods: {
    onSubmit() {
      // Save new game entry.
      newGameRegion(this.$store.state.gameForm, this.$store.state.gameSelected.gamePlatform)
        .then(() => this.$emit('close'))
    }
  }
}
</script>

<style>
</style>
