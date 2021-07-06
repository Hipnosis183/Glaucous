<template>
  <el-form
    :model="$store.state.gameForm"
    label-position="top"
    ref="gameForm"
    :show-message="false"
  >
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
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Update</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
import { HipButton } from '../Component'
import {
  FormComments,
  FormCurrentVersion,
  FormDeveloper,
  FormLatestVersion,
  FormNumberPlayers, FormOriginalTitle,
  FormPlatform,
  FormRegion,
  FormReleaseYear,
  FormRomanizedTitle,
  FormSubTitle,
  FormTitle,
  FormTranslatedTitle
} from '../Form'

import { updateGame } from '../../database/controllers/Game'

export default {
  name: 'edit-game',
  components: {
    HipButton,
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
