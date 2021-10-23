<template>
  <!-- View selected picture. -->
  <transition>
    <vi-overlay
      v-if="getPictures[imageIndex]"
      v-show="imagesPicturesDialog"
      @close="imagesPicturesClose()"
      class="left-12 top-0 z-20"
    >
      <div
        ref="imageContainer"
        class="h-viewer mb-4 no-scrollbar overflow-y-scroll relative rounded-xl w-viewer"
      >
        <transition
          :name="slideBack ? 'slide-b' : 'slide-f'"
          class="absolute bottom-0 left-0 right-0 top-0"
        >
          <img
            ref="pictureImage"
            :key="imageIndex"
            @click="imagesPicturesClose()"
            @load="imagesPicturesLoad()"
            :src="'file://' + imagePath + '/' + getPictures[imageIndex]"
            class="object-contain rounded-xl"
            :class="[
              imageZoom
                ? ['h-auto mx-auto', imageCenter ? 'my-auto' : 'mt-0' ]
                : ['m-auto', imageLoaded ? 'h-viewer' : ''],
              { 'rendering-pixelated' : imagesFiltering }
            ]"
          />
        </transition>
      </div>
      <div class="mx-auto max-w-max">
        <!-- Control bar. -->
        <vi-modal class="ml-8 p-viewer rounded-full">
          <div class="flex h-10 justify-between mx-1 space-x-2">
            <!-- Close dialog. -->
            <vi-button-icon @click="imagesPicturesClose()">
              <vi-icon class="w-6">
                <icon-close />
              </vi-icon>
            </vi-button-icon>
            <!-- Control bar buttons. -->
            <div class="flex h-10 rounded-full shadow-color">
              <!-- Previous image. -->
              <vi-button-group
                firstElement
                @click="prevImage()"
              >
                <vi-icon class="w-6">
                  <icon-arrow-left-d />
                </vi-icon>
              </vi-button-group>
              <!-- Display image in its original size. -->
              <vi-button-group @click="imageZoomToggle()">
                <vi-icon class="w-6">
                  <icon-full-screen />
                </vi-icon>
              </vi-button-group>
              <!-- Next image. -->
              <vi-button-group
                lastElement
                @click="nextImage()"
              >
                <vi-icon class="w-6">
                  <icon-arrow-right-d />
                </vi-icon>
              </vi-button-group>
            </div>
            <!-- Image counter. -->
            <vi-button
              color
              class="cursor-default"
            >
              {{ (imageIndex + 1) + ' / ' + getPictures.length }}
            </vi-button>
          </div>
        </vi-modal>
      </div>
    </vi-overlay>
  </transition>
  <!-- View game gallery. -->
  <transition>
    <div
      v-show="imagesGalleryDialog"
      @close="imagesGalleryShow()"
      class="fixed h-screen left-12 top-0 w-gallery z-10"
    >
      <div class="absolute bg-black bg-opacity-70 flex h-full items-center justify-center w-full">
        <div class="absolute max-h-gallery max-w-gallery overflow-y-scroll rounded-image w-full">
          <transition name="gallery">
            <!-- Pictures grid. -->
            <div
              v-if="getPictures[0]"
              v-show="imagesGalleryDialog"
              class="flex-1 mr-6 no-scrollbar overflow-y-scroll"
            >
              <div class="grid grid-cols-image">
                <div
                  v-for="(image, index) in getPictures"
                  :key="index"
                  :value="image"
                  class="flex h-full justify-center"
                  :class="{ 'p-1' : $store.getters.getSettingsImagesContentSpacing }"
                >
                  <img
                    @click="imagesPicturesOpen(index)"
                    :src="'file://' + imagePath + '/' + image"
                    class="border-2 border-transparent hover:border-color-500 dark:hover:border-color-700 cursor-pointer duration-200 object-cover rounded-image transform w-full"
                    :class="[
                      { 'rendering-pixelated' : imagesFiltering },
                      // Disable scaling when the image is not filtered, otherwise it looks horrible.
                      { 'hover:scale-102' : $store.getters.getSettingsImagesScalingEffect && ($store.getters.getSettingsImagesContentSpacing && $store.getters.getSettingsImagesGridColumns > 1 && !imagesFiltering) }
                    ]"
                  />
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center m-auto"
            >
              <vi-modal>
                <p>No images available.</p>
              </vi-modal>
            </div>
          </transition>
        </div>
        <!-- Gallery buttons. -->
        <div class="absolute mr-4 mt-6 right-0 top-0">
          <!-- Close dialog. -->
          <vi-button-icon @click="imagesGalleryShow()">
            <vi-icon class="w-6">
              <icon-close />
            </vi-icon>
          </vi-button-icon>
        </div>
        <!-- List settings. -->
        <div class="absolute bottom-0 mr-5 mb-6 right-0">
          <settings-images />
        </div>
      </div>
    </div>
  </transition>
  <!-- Open game gallery. -->
  <vi-button-ui @click="imagesGalleryShow()">
    <vi-icon
      icon-manual
      class="w-6"
    >
      <icon-picture />
    </vi-icon>
  </vi-button-ui>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { ensureDirSync, readdirSync } from 'fs-extra'
// Import form components.
import SettingsImages from '@/components/Settings/SettingsImages.vue'

export default {
  name: 'ViewGameGallery',
  components: {
    SettingsImages
  },
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Declare template refs.
    const imageContainer = ref(null)
    const pictureImage = ref(null)

    // Load game images.
    onMounted(() => { getImages() })
    const getImages = () => {
      if (props.gameInfo._id) {
        // Set the image directory path for all game types.
        let gamePathPlatform = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
        let gamePathRegion = '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id
        let gamePathVersion = '/games/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
        imagePathPlatform.value = gamePathPlatform + '/images'
        imagePathRegion.value = gamePathPlatform + gamePathRegion + '/images'
        imagePathVersion.value = gamePathPlatform + gamePathRegion + gamePathVersion + '/images'
        // Ensure images directories existance.
        ensureDirSync(imagePathPlatform.value)
        ensureDirSync(imagePathRegion.value)
        ensureDirSync(imagePathVersion.value)
        // Load images filenames.
        imageFilesPlatform.value = readdirSync(imagePathPlatform.value)
        imageFilesRegion.value = readdirSync(imagePathRegion.value)
        imageFilesVersion.value = readdirSync(imagePathVersion.value)
      }
    }

    // Watch for game selection changes.
    watch(() => [props.regionIndex, props.versionIndex], () => { getImages() })

    // Image reading operations.
    let imagePath = ref(null)
    let imagePathPlatform = ref(null)
    let imagePathRegion = ref(null)
    let imagePathVersion = ref(null)
    let imageFilesPlatform = ref([])
    let imageFilesRegion = ref([])
    let imageFilesVersion = ref([])
    const getPictures = computed(() => {
      return getImage((images) => {
        return images.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)))
      }, true)
    })
    const getImage = (method, array) => {
      // Get array of images for the game version.
      if (imageFilesVersion.value.length > 0) {
        let imagesVersion = method(imageFilesVersion.value)
        if (array ? imagesVersion.length > 0 : imagesVersion) {
          imagePath.value = imagePathVersion.value
          return imagesVersion
        }
      }
      // Get array of images for the game region.
      if (imageFilesRegion.value.length > 0) {
        let imagesRegion = method(imageFilesRegion.value)
        if (array ? imagesRegion.length > 0 : imagesRegion) {
          imagePath.value = imagePathRegion.value
          return imagesRegion
        }
      }
      // Get array of images for the game platform.
      if (imageFilesPlatform.value.length > 0) {
        let imagesPlatform = method(imageFilesPlatform.value)
        if (array ? imagesPlatform.length > 0 : imagesPlatform) {
          imagePath.value = imagePathPlatform.value
          return imagesPlatform
        }
      }
      return array ? [] : null
    }

    // Manage image navigation.
    let imageIndex = ref(null)
    let imageLoaded = ref(false)
    let slideBack = ref(false)
    const nextImage = () => {
      if (imageIndex.value < getPictures.value.length - 1) {
        // Unload image.
        imageLoaded.value = false
        // Set sliding transition orientation.
        slideBack.value = false
        // Increase image index.
        imageIndex.value++
      }
    }
    const prevImage = () => {
      if (imageIndex.value > 0) {
        // Unload image.
        imageLoaded.value = false
        // Set sliding transition orientation.
        slideBack.value = true
        // Decrease image index.
        imageIndex.value--
      }
    }

    // General image display management.
    let imageZoom = ref(false)
    const imageZoomToggle = () => {
      // Toggle zoom mode.
      imageZoom.value = !imageZoom.value
    }
    let imagesGalleryDialog = ref(false)
    const imagesGalleryShow = () => {
      // Toggle gallery display.
      imagesGalleryDialog.value = !imagesGalleryDialog.value
    }

    // Picture images display management.
    let imageCenter = ref(false)
    let imagesPicturesDialog = ref(false)
    const imagesPicturesLoad = () => {
      // Determine centering by the image's height.
      imageCenter.value = (pictureImage.value.clientHeight < imageContainer.value.clientHeight) ? true : false
      // Load image.
      imageLoaded.value = true
    }
    const imagesPicturesOpen = (index) => {
      // Set selected image.
      imageIndex.value = index
      // Reset zoom mode.
      imageZoom.value = false
      // Open pictures view.
      imagesPicturesDialog.value = !imagesPicturesDialog.value
    }
    const imagesPicturesClose = () => {
      // Unload image.
      imageLoaded.value = false
      // Empty selected image.
      imageIndex.value = null
      // Close pictures view.
      imagesPicturesDialog.value = !imagesPicturesDialog.value
    }
    const imagesFiltering = computed(() => {
      return store.getters.getSettingsPlatformOverSettingsOver
        ? !store.getters.getSettingsPlatformOverImagesFiltering
        : !store.getters.getSettingsPlatformImagesFiltering
    })

    return {
      getPictures,
      imageCenter,
      imageContainer,
      imageIndex,
      imageLoaded,
      imagePath,
      imageZoom,
      imageZoomToggle,
      imagesFiltering,
      imagesGalleryDialog,
      imagesGalleryShow,
      imagesPicturesClose,
      imagesPicturesDialog,
      imagesPicturesLoad,
      imagesPicturesOpen,
      nextImage,
      pictureImage,
      prevImage,
      slideBack
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.max-h-gallery {
  max-height: calc(100vh - 3rem);
}
.max-w-gallery {
  max-width: calc(100% - 3rem);
}
.w-gallery {
  width: calc(100% - 3.5rem);
}
.h-viewer {
  height: calc(100vh - 9.2rem);
}
.p-viewer {
  padding: 0.8rem;
}
.w-viewer {
  width: calc(100vw - 7.5rem);
}
/* Styling. */
::-webkit-scrollbar-thumb {
  border-top-width: 56px !important;
  border-bottom-width: 48px !important;
}
.rendering-pixelated {
  image-rendering: pixelated;
}
/* Transitions. */
.gallery-enter-active {
  transition: 0.5s;
}
.gallery-leave-active {
  transition: 1.5s;
}
.gallery-leave-to,
.gallery-enter-from {
  transform: translateY(100%);
}
</style>