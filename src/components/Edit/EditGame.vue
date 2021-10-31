<template>
  <!-- Edit game dialog. -->
  <vi-dialog
    @close="$emit('close')"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <div class="flex h-10">
        <p class="mr-4 pt-1 text-2xl">Edit Game Entry</p>
        <form-game-images
          editForm
          showPlatform
          showRegion
          showVersion
        />
      </div>
      <!-- Buttons. -->
      <div class="h-10 space-x-4">
        <vi-button-icon @click="onSubmit()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <vi-button-icon @click="$emit('close')">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </div>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-1/2">
        <form-game-region-title />
        <form-game-region-pre-title />
        <form-game-region-sub-title />
        <form-game-region-original-title />
        <form-game-region-romanized-title />
        <form-game-region-translated-title />
      </div>
      <div class="w-1/2">
        <div class="flex space-x-4">
          <form-game-region-region />
          <form-game-platform-serial />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-developer :gameDeveloper="gameDeveloper" />
          <form-game-platform-platform :gamePlatform="gamePlatform" />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-release-year />
          <form-game-platform-number-players />
        </div>
        <form-game-version-name />
        <div class="flex space-x-4">
          <form-game-version-type />
          <form-game-version-number />
        </div>
        <form-game-platform-tags />
        <form-game-version-comments />
        <form-game-platform-links />
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { updateGame } from '@/database/controllers/Game'
import { createDeveloper, getDeveloper } from '@/database/controllers/Developer'
import { createPlatform, getPlatform } from '@/database/controllers/Platform'
import { createTag, getTag } from '@/database/controllers/User'
// Import form components.
import {
  FormGameImages,
  FormGamePlatformDeveloper,
  FormGamePlatformLinks,
  FormGamePlatformNumberPlayers,
  FormGamePlatformPlatform,
  FormGamePlatformReleaseYear,
  FormGamePlatformSerial,
  FormGamePlatformTags,
  FormGameRegionOriginalTitle,
  FormGameRegionPreTitle,
  FormGameRegionRegion,
  FormGameRegionRomanizedTitle,
  FormGameRegionSubTitle,
  FormGameRegionTitle,
  FormGameRegionTranslatedTitle,
  FormGameVersionComments,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'EditGame',
  components: {
    FormGameImages,
    FormGamePlatformDeveloper,
    FormGamePlatformLinks,
    FormGamePlatformNumberPlayers,
    FormGamePlatformPlatform,
    FormGamePlatformReleaseYear,
    FormGamePlatformSerial,
    FormGamePlatformTags,
    FormGameRegionOriginalTitle,
    FormGameRegionPreTitle,
    FormGameRegionRegion,
    FormGameRegionRomanizedTitle,
    FormGameRegionSubTitle,
    FormGameRegionTitle,
    FormGameRegionTranslatedTitle,
    FormGameVersionComments,
    FormGameVersionName,
    FormGameVersionNumber,
    FormGameVersionType
  },
  emits: [
    'close'
  ],
  props: {
    gameDeveloper: { type: String },
    gamePlatform: { type: String }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game editing.
    const onSubmit = () => {
      // Validate required fields.
      if (
        !store.state.gameForm.gameRegion.title ||
        !store.state.gameForm.gamePlatform.developer ||
        !store.state.gameForm.gamePlatform.platform
      ) {
        validationErrorShow()
        return
      }
      // Check developer existance.
      checkDeveloper()
        // Check platform existance.
        .then(() => checkPlatform()
          // Check tags existance.
          .then(() => checkTags()
            .then(() => {
              // Update game entry.
              updateGame(store.state.gameForm, store.state.gameSelected)
                .then(() => emit('close', true))
            })))
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage developer field input.
    const developer = computed({
      get() { return store.state.gameForm.gamePlatform.developer },
      set(value) { store.commit('setGamePlatformDeveloper', value) }
    })
    const checkDeveloper = async () => {
      // Check if the developer entered exists.
      await getDeveloper(developer.value)
        .then(async (res) => {
          if (!res) {
            // Populate new developer form.
            store.commit('setDeveloperName', developer.value)
            // Save new developer entry.
            await createDeveloper(store.state.developerForm)
              // Set the new developer in the game form.
              .then((res) => developer.value = res._id)
          }
        })
    }

    // Manage platform field input.
    const platform = computed({
      get() { return store.state.gameForm.gamePlatform.platform },
      set(value) { store.commit('setGamePlatformPlatform', value) }
    })
    const checkPlatform = async () => {
      // Check if the platform entered exists.
      await getPlatform(platform.value)
        .then(async (res) => {
          if (!res) {
            // Populate new platform form.
            store.commit('setPlatformName', platform.value)
            // Save new platform entry.
            await createPlatform(store.state.platformForm)
              // Set the new platform in the game form.
              .then((res) => platform.value = res._id)
          }
        })
    }

    // Manage tags field input.
    const tags = computed({
      get() { return store.state.gameForm.gamePlatform.gameTags },
      set(value) { store.commit('setGamePlatformTags', value) }
    })
    const checkTags = async () => {
      let gameTags = []
      // Check all the tags on the game form.
      for (let tag of tags.value) {
        // Check if the tag entered exists.
        await getTag(tag)
          .then(async (res) => {
            if (!res) {
              // Save new tag entry.
              await createTag(tag)
                // Add the new tag to the array.
                .then((res) => gameTags.push(res._id))
            } else {
              // Add the existing tag to the array.
              gameTags.push(tag)
            }
          })
      }
      // Set the new tags in the game form.
      tags.value = gameTags
    }

    return {
      onSubmit,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>