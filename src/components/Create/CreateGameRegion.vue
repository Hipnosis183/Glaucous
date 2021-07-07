<template>
  <el-form
    :model="$store.state.gameForm"
    label-position="top"
    ref="gameForm"
    :show-message="false"
  >
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
    <div class="flex space-x-4 mt-4 justify-center">
      <hip-button @click="onSubmit()">Create</hip-button>
      <hip-button @click="$emit('close')">Cancel</hip-button>
    </div>
  </el-form>
</template>

<script>
import { HipButton } from '../Component'
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

import { newGameRegion } from '../../database/controllers/Game'

export default {
  name: 'create-game-region',
  components: {
    HipButton,
    FormComments,
    FormCurrentVersion,
    FormOriginalTitle,
    FormRegion,
    FormRomanizedTitle,
    FormSubTitle,
    FormTitle,
    FormTranslatedTitle
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
