<template>
  <!-- Create game platform dialog. -->
  <vi-dialog
    dialog-width="w-4/5"
    @close="onClose()"
    class="z-10"
  >
    <!-- Validation error dialog. -->
    <vi-dialog-box
      v-show="validationErrorDialog"
      @accept="validationErrorShow()"
    >
      Complete the required fields.
    </vi-dialog-box>
    <!-- Collision error dialog. -->
    <vi-dialog-box
      v-show="collisionErrorDialog"
      @accept="collisionErrorShow()"
    >
      The indicated ID is already in use.
      <br />
      Select a different ID or leave empty to randomly generate one.
    </vi-dialog-box>
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="mr-4 pt-1 text-2xl">New Game Entry</p>
      <!-- Buttons. -->
      <div class="h-10 space-x-4">
        <vi-button
          button-icon="icon-check"
          @click="onSubmit()"
        />
        <vi-button
          button-icon="icon-close"
          @click="onClose()"
        />
      </div>
    </div>
    <!-- Form components. -->
    <div class="flex space-x-4">
      <div class="w-2/5">
        <form-game-region-title />
        <form-game-platform-developers />
        <form-game-platform-tags />
        <form-game-version-name />
      </div>
      <div class="w-3/5">
        <div class="flex space-x-4">
          <form-game-platform-platform :game-platform="gamePlatform" />
          <form-game-id />
        </div>
        <div class="flex space-x-4">
          <form-game-region-region />
          <form-game-platform-serial />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-release-year />
          <form-game-platform-number-players />
        </div>
        <div class="flex space-x-4">
          <form-game-version-type />
          <form-game-version-number />
        </div>
      </div>
    </div>
    <div class="flex space-x-4">
      <form-game-images
        :reset-form="resetForm"
        show-platform
        show-region
        show-version
      />
      <form-game-files
        show-platform
        show-region
        show-version
      />
    </div>
    <div class="flex space-x-4">
      <form-game-links
        show-platform
        show-region
        show-version
      />
      <form-game-notes
        show-platform
        show-region
        show-version
      />
    </div>
    <!-- Required fields aclaration. -->
    <p class="mt-8 text-center text-sm">
      * The fields with red text are required
    </p>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getGamePlatform, newGamePlatform } from '@/database/controllers/Game'
import { createDeveloper, getDeveloper } from '@/database/controllers/Developer'
import { createPlatform, getPlatform } from '@/database/controllers/Platform'
import { createTag, getTag } from '@/database/controllers/User'
// Import form components.
import {
  FormGameFiles,
  FormGameId,
  FormGameImages,
  FormGameLinks,
  FormGameNotes,
  FormGamePlatformDevelopers,
  FormGamePlatformNumberPlayers,
  FormGamePlatformPlatform,
  FormGamePlatformReleaseYear,
  FormGamePlatformSerial,
  FormGamePlatformTags,
  FormGameRegionRegion,
  FormGameRegionTitle,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'CreateGamePlatform',
  components: {
    FormGameFiles,
    FormGameId,
    FormGameImages,
    FormGameLinks,
    FormGameNotes,
    FormGamePlatformDevelopers,
    FormGamePlatformNumberPlayers,
    FormGamePlatformPlatform,
    FormGamePlatformReleaseYear,
    FormGamePlatformSerial,
    FormGamePlatformTags,
    FormGameRegionRegion,
    FormGameRegionTitle,
    FormGameVersionName,
    FormGameVersionNumber,
    FormGameVersionType
  },
  emits: [
    'close'
  ],
  props: {
    gamePlatform: { type: String }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game platform creation.
    let resetForm = ref(false)
    const onSubmit = async () => {
      // Validate required fields.
      if (
        !store.state.gameForm.gameRegion.title ||
        !store.state.gameForm.gamePlatform.platform
      ) { validationErrorShow(); return }
      // Check for ID collisions.
      if (store.state.gameForm.id) {
        if (await getGamePlatform(store.state.gameForm.id)) {
          collisionErrorShow(); return
        }
      }
      // Check platform existance.
      checkPlatform()
        // Check developer existance.
        .then(() => checkDevelopers()
          // Check tags existance.
          .then(() => checkTags()
            .then(() => {
              // Save new game entry.
              newGamePlatform(store.state.gameForm, store.state.gameSelected.gamePlatform)
                .then(() => onClose(true))
            })))
    }
    const onClose = (created) => {
      // Reset images forms.
      resetForm.value = !resetForm.value
      // Emit close dialog event.
      emit('close', created)
    }
    let collisionErrorDialog = ref(false)
    const collisionErrorShow = () => {
      // Toggle collision error dialog.
      collisionErrorDialog.value = !collisionErrorDialog.value
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage developers field input.
    const developers = computed({
      get() { return store.state.gameForm.gamePlatform.developers },
      set(value) { store.commit('setGamePlatformDevelopers', value) }
    })
    const checkDevelopers = async () => {
      let gameDevelopers = []
      // Check all the developers on the game form.
      for (let developer of developers.value) {
        // Check if the developer entered exists.
        await getDeveloper(developer)
          .then(async (res) => {
            if (!res) {
              // Save new developer entry.
              await createDeveloper({ name: developer })
                // Add the new developer to the array.
                .then((res) => gameDevelopers.push(res._id))
            } else {
              // Add the existing developer to the array.
              gameDevelopers.push(developer)
            }
          })
      }
      // Set the new developers in the game form.
      developers.value = gameDevelopers
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
      collisionErrorDialog,
      collisionErrorShow,
      onClose,
      onSubmit,
      resetForm,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>