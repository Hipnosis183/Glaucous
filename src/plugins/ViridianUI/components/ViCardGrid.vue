<template>
  <!-- Game card background. -->
  <div
    @mouseenter="gameInfoShow()"
    @mouseleave="gameInfoShow()"
    :style="{ height: listHeight + 'px' }"
    class="bg-theme-200 dark:bg-theme-700 flex overflow-hidden relative rounded-list shadow-color transform"
    :class="gameInfoHover && $store.getters.getSettingsListsListScaling ? $store.getters.getSettingsPlatformListColumns > 1 ? $store.getters.getSettingsPlatformListColumns > 3 ? 'hover:scale-102' : 'hover:scale-101' : 'hover:scale-1005' : ''"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-list w-full z-5" />
    <!-- Game card image. -->
    <img
      v-if="getImage"
      :src="'file://' + getImage"
      class="h-full image-content rounded-list"
      :class="[
        { 'rendering-pixelated' : imagesFiltering && (!gameInfo.image.cover || (listImages != 0 && listImages != 1)) },
        { 'card-blur' : ((gameInfoHover && $store.getters.getSettingsListsListTextShow == 0) || $store.getters.getSettingsListsListTextShow == 1) && $store.getters.getSettingsListsListTextStyle == 3 }
      ]"
    >
    <div
      v-else
      class="flex h-full image-content rounded-list text-theme-0 dark:text-theme-300 w-full"
    >
      <vi-icon class="w-16">
        <icon-picture />
      </vi-icon>
    </div>
    <!-- Game card information. -->
    <transition name="slide-card">
      <div
        v-show="(gameInfoHover && $store.getters.getSettingsListsListTextShow == 0) || $store.getters.getSettingsListsListTextShow == 1"
        class="flex transition-menu w-full z-0"
      >
        <div
          class="flex flex-col mt-auto p-3 w-full"
          :class="[
            { 'card-solid' : $store.getters.getSettingsListsListTextStyle == 0 },
            { 'card-transparent' : $store.getters.getSettingsListsListTextStyle == 1 },
            { 'card-gradient h-full' : $store.getters.getSettingsListsListTextStyle == 2 },
            { 'card-blurred text-shadow' : $store.getters.getSettingsListsListTextStyle == 3 && gameInfo.image.path }
          ]"
        >
          <div class="mb-1 mt-auto text-sm">
            <h1 class="font-medium text-base">
              {{ gameInfo.gameRegions[0].title }}
            </h1>
            <h2 v-if="gameInfo.gameRegions[0].subTitle">
              {{ gameInfo.gameRegions[0].subTitle }}
            </h2>
            <h2 v-else>
              {{ gameInfo.gameRegions[0].originalTitle }}
            </h2>
          </div>
          <div class="text-sm whitespace-nowrap">
            <h4 v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
              {{ parentName }} ({{ gameInfo.platform.name }})
            </h4>
            <h4 v-else>
              {{ gameInfo.platform.name }}
            </h4>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { existsSync, readdirSync, readJSONSync } from 'fs-extra'
// Import database controllers functions.
import { getPlatform } from '@/database/controllers/Platform'

export default {
  name: 'ViCardGrid',
  props: {
    gameInfo: { type: Object },
    listPlatform: { type: Boolean, default: false }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    onMounted(() => {
      // Check if the platform has a parent group.
      if (props.gameInfo.platform.parent) {
        // Get parent platform name.
        getPlatform(props.gameInfo.platform.parent)
          .then((res) => parentName.value = res.name)
      }
    })

    // Manage game info display when hovering.
    let gameInfoHover = ref(false)
    const gameInfoShow = () => {
      gameInfoHover.value = !gameInfoHover.value
    }

    // Get additional game properties.
    let parentName = ref(null)

    // Image reading operations.
    let imageFiles = ref([])
    let imagePath = ref(null)
    const getImage = computed(() => {
      if (!(imagePath.value && imageFiles.value)) {
        // Set the image directory path of the game platform.
        let gamePath = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
        // Check if there are images for the selected game version.
        imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[0]._id + '/games/' + props.gameInfo.gameRegions[0].gameVersions[0] + '/images'
        if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
          // Load images filenames.
          imageFiles.value = readdirSync(imagePath.value)
        }
        else {
          // Check if there are images for the selected game region.
          imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[0]._id + '/images'
          if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
            // Load images filenames.
            imageFiles.value = readdirSync(imagePath.value)
          }
          else {
            // Check if there are images for the selected game platform.
            imagePath.value = gamePath + '/images'
            if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
              // Load images filenames.
              imageFiles.value = readdirSync(imagePath.value)
            }
            else {
              // Empty image variables.
              imagePath.value = null
              imageFiles.value = []
            }
          }
        }
      }
      // Select type of image to display from settings.
      switch (listImages.value) {
        case 0: {
          // Default to the normal image fallback mode.
          return props.gameInfo.image.path
        }
        case 1: {
          let image = imageFiles.value.filter(res => res.startsWith('0'.repeat(8)))[0]
          return image ? imagePath.value + '/' + image : false
        }
        case 2: {
          // Asume that the first picture is the title image.
          let image = imageFiles.value.filter(res => !res.startsWith('0'.repeat(8)))[0]
          return image ? imagePath.value + '/' + image : false
        }
        case 3: {
          // Asume that after the first picture are all in-game images.
          let image = imageFiles.value.filter(res => !res.startsWith('0'.repeat(8)))
          // Skip title image.
          image = image.filter((res, index) => index > 0)
          // Select random in-game image to display.
          image = image[Math.floor(Math.random() * (image.length))]
          return image ? imagePath.value + '/' + image : false
        }
      }
    })

    // Manage card display properties.
    const listHeight = computed(() => {
      return props.listPlatform
        ? store.getters.getSettingsPlatformOverSettingsOver
          ? store.getters.getSettingsPlatformOverListHeight
          : store.getters.getSettingsPlatformListHeight
        : store.getters.getSettingsPlatformListHeight
    })
    const listImages = computed(() => {
      return props.listPlatform
        ? store.getters.getSettingsPlatformOverSettingsOver
          ? store.getters.getSettingsPlatformOverListImages
          : store.getters.getSettingsPlatformListImages
        : store.getters.getSettingsPlatformListImages
    })
    const imagesFiltering = computed(() => {
      if (props.listPlatform) {
        return store.getters.getSettingsPlatformOverSettingsOver
          ? !store.getters.getSettingsPlatformOverImagesFiltering
          : !store.getters.getSettingsPlatformImagesFiltering
      } else {
        // Set the platform configuration file path for the game.
        let configPlatformPath = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/config.json'
        try { return !readJSONSync(configPlatformPath).settingsPlatformOver.imagesFiltering }
        catch { return false }
      }
    })

    return {
      gameInfoHover,
      gameInfoShow,
      getImage,
      imageFiles,
      imagesFiltering,
      listHeight,
      listImages,
      parentName
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.card-blur {
  filter: blur(10px);
}
.card-blurred h1 {
  @apply text-color-500;
}
.card-blurred h2 {
  @apply text-color-400;
}
.card-blurred h4 {
  @apply text-theme-200;
}
.card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-100), 0),
    rgba(var(--color-theme-100), 0.1) 10%,
    rgba(var(--color-theme-100), 0.3) 20%,
    rgba(var(--color-theme-100), 0.5) 30%,
    rgba(var(--color-theme-100), 0.7) 45%,
    rgba(var(--color-theme-100), 0.9) 65%,
    rgba(var(--color-theme-100), 1)
  );
}
.dark .card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-900), 0),
    rgba(var(--color-theme-900), 0.1) 10%,
    rgba(var(--color-theme-900), 0.3) 20%,
    rgba(var(--color-theme-900), 0.5) 30%,
    rgba(var(--color-theme-900), 0.7) 45%,
    rgba(var(--color-theme-900), 0.9) 65%,
    rgba(var(--color-theme-900), 1)
  );
}
.card-solid {
  background-color: rgba(var(--color-theme-100), 1);
}
.dark .card-solid {
  background-color: rgba(var(--color-theme-900), 1);
}
.card-transparent {
  background-color: rgba(var(--color-theme-100), 0.8);
}
.dark .card-transparent {
  background-color: rgba(var(--color-theme-900), 0.8);
}
.image-content {
  @apply absolute cursor-pointer left-0 object-cover top-0 w-full;
}
.rendering-pixelated {
  image-rendering: pixelated;
}
/* Transitions. */
div {
  transition: border-color 0.2s;
}
img {
  transition: filter 0.2s ease-in-out;
}
.slide-card-leave-to,
.slide-card-enter-active {
  transform: scaleY(0);
}
.slide-card-enter-from,
.slide-card-leave-to {
  opacity: 0;
}
.transition-menu {
  transform-origin: bottom;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
</style>