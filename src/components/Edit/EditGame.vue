<template>
  <!-- Edit game dialog. -->
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
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="mr-4 pt-1 text-2xl">Edit Game Entry</p>
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
        <form-game-platform-tags />
        <form-game-version-name />
        <form-game-images
          edit-form
          :reset-form="resetForm"
          show-platform
          show-region
          show-version
        />
      </div>
      <div class="w-3/5">
        <div
          :key="resetGame"
          class="flex space-x-4"
        >
          <form-game-platform-developer :game-developer="gameDeveloper" />
          <form-game-platform-platform :game-platform="gamePlatform" />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-serial />
        </div>
        <div class="flex space-x-4">
          <form-game-version-type />
          <form-game-version-number />
        </div>
        <div class="flex space-x-4">
          <form-game-platform-release-year />
          <form-game-platform-number-players />
        </div>
      </div>
    </div>
    <div class="flex space-x-4">
      <form-game-files
        show-platform
        show-region
        show-version
      />
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
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { updateGame } from '@/database/controllers/Game'
import { createDeveloper, getDeveloper } from '@/database/controllers/Developer'
import { createPlatform, getPlatform } from '@/database/controllers/Platform'
import { createTag, getTag } from '@/database/controllers/User'
// Import form components.
import {
  FormGameFiles,
  FormGameImages,
  FormGameLinks,
  FormGameNotes,
  FormGamePlatformDeveloper,
  FormGamePlatformNumberPlayers,
  FormGamePlatformPlatform,
  FormGamePlatformReleaseYear,
  FormGamePlatformSerial,
  FormGamePlatformTags,
  FormGameRegionTitle,
  FormGameVersionName,
  FormGameVersionNumber,
  FormGameVersionType
} from '@/components/Form'

export default {
  name: 'EditGame',
  components: {
    FormGameFiles,
    FormGameImages,
    FormGameLinks,
    FormGameNotes,
    FormGamePlatformDeveloper,
    FormGamePlatformNumberPlayers,
    FormGamePlatformPlatform,
    FormGamePlatformReleaseYear,
    FormGamePlatformSerial,
    FormGamePlatformTags,
    FormGameRegionTitle,
    FormGameVersionName,
    FormGameVersionNumber,
    FormGameVersionType
  },
  emits: [
    'close'
  ],
  props: {
    gameDeveloper: { type: String },
    gamePlatform: { type: String },
    gameReset: { type: Boolean }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game editing.
    let resetForm = ref(false)
    let resetGame = ref(false)
    watch(() => props.gameReset, (res) => {
      // Reset form components when the dialog is opened.
      if (res) { resetGame.value = !resetGame.value }
    })
    const onSubmit = () => {
      // Validate required fields.
      if (
        !store.state.gameForm.gameRegion.title ||
        !store.state.gameForm.gamePlatform.developer ||
        !store.state.gameForm.gamePlatform.platform
      ) { validationErrorShow(); return }
      // Check developer existance.
      checkDeveloper()
        // Check platform existance.
        .then(() => checkPlatform()
          // Check tags existance.
          .then(() => checkTags()
            .then(() => {
              // Update game entry.
              updateGame(store.state.gameForm, store.state.gameSelected)
                .then(() => onClose(true))
            })))
    }
    const onClose = (edited) => {
      // Reset images forms.
      resetForm.value = !resetForm.value
      // Emit close dialog event.
      emit('close', edited)
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
      onClose,
      onSubmit,
      resetForm,
      resetGame,
      validationErrorDialog,
      validationErrorShow
    }
  }
}
</script>

<style>
</style>