<template>
  <!-- Validation error dialog. -->
  <hip-dialog
    v-show="validationErrorDialog"
    @close="validationErrorShow()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Complete the required fields.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <hip-button
        :icon="true"
        @click="validationErrorShow()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Form header. -->
  <div class="flex justify-between mb-4 mx-2">
    <!-- Form title. -->
    <div class="flex h-10">
      <p class="mr-4 pt-1 text-2xl">Edit Game Entry</p>
      <form-game-images
        editForm
        showPlatform
        showRegion
        showVersion
      />
    </div>
    <!-- Form buttons. -->
    <div class="h-10 space-x-4">
      <hip-button
        :icon="true"
        @click="onSubmit()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
      <hip-button
        :icon="true"
        @click="$emit('close')"
        class="el-icon-circle-close text-2xl"
      ></hip-button>
    </div>
  </div>
  <!-- Edit game form. -->
  <form>
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
          <form-game-version-number />
          <form-game-version-latest />
        </div>
        <form-game-version-comments />
        <form-game-platform-links />
      </div>
    </div>
  </form>
</template>

<script>
// Import form components.
import {
  FormGameImages,
  FormGamePlatformDeveloper,
  FormGamePlatformLinks,
  FormGamePlatformNumberPlayers,
  FormGamePlatformPlatform,
  FormGamePlatformReleaseYear,
  FormGamePlatformSerial,
  FormGameRegionOriginalTitle,
  FormGameRegionPreTitle,
  FormGameRegionRegion,
  FormGameRegionRomanizedTitle,
  FormGameRegionSubTitle,
  FormGameRegionTitle,
  FormGameRegionTranslatedTitle,
  FormGameVersionComments,
  FormGameVersionLatest,
  FormGameVersionName,
  FormGameVersionNumber
} from '@/components/Form'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '@/components/Component'
// Import database controllers functions.
import { updateGame } from '@/database/controllers/Game'
import {
  createDeveloper,
  getDeveloper
} from '@/database/controllers/Developer'
import {
  createPlatform,
  getPlatform
} from '@/database/controllers/Platform'

// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'EditGame',
  components: {
    // Form components.
    FormGameImages,
    FormGamePlatformDeveloper,
    FormGamePlatformLinks,
    FormGamePlatformNumberPlayers,
    FormGamePlatformPlatform,
    FormGamePlatformReleaseYear,
    FormGamePlatformSerial,
    FormGameRegionOriginalTitle,
    FormGameRegionPreTitle,
    FormGameRegionRegion,
    FormGameRegionRomanizedTitle,
    FormGameRegionSubTitle,
    FormGameRegionTitle,
    FormGameRegionTranslatedTitle,
    FormGameVersionComments,
    FormGameVersionLatest,
    FormGameVersionName,
    FormGameVersionNumber,
    // UI components.
    HipButton,
    HipDialog
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
        !store.state.gameForm.gameRegion.region ||
        !store.state.gameForm.gamePlatform.developer ||
        !store.state.gameForm.gamePlatform.platform ||
        !store.state.gameForm.gamePlatform.releaseYear
      ) {
        validationErrorShow()
        return
      }
      // Check developer existance.
      checkDeveloper()
        // Check platform existance.
        .then(() => checkPlatform()
          .then(() => {
            // Update game entry.
            updateGame(store.state.gameForm, store.state.gameSelected)
              .then(() => emit('close'))
          }))
    }
    let validationErrorDialog = ref(false)
    const validationErrorShow = () => {
      // Toggle validation error dialog.
      validationErrorDialog.value = !validationErrorDialog.value
    }

    // Manage developer and platform field inputs.
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