<template>
  <!-- View selected picture. -->
  <transition>
    <vi-overlay
      v-if="getPictures[imageIndex]"
      v-show="imagesPicturesDialog"
      @close="imagesPicturesClose()"
      class="pos-initial z-20"
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
              { 'rendering-pixelated' : gameInfo.config.imageFiltering == false }
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
      class="fixed h-screen pos-initial w-gallery z-10"
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
                  :class="{ 'p-1' : $store.getters.getSettingsImagesImageSpacing }"
                >
                  <img
                    @click="imagesPicturesOpen(index)"
                    :src="'file://' + imagePath + '/' + image"
                    class="border-2 border-transparent hover:border-color-500 dark:hover:border-color-700 cursor-pointer duration-200 object-cover rounded-image transform w-full"
                    :class="[
                      { 'rendering-pixelated' : gameInfo.config.imageFiltering == false },
                      // Disable scaling when the image is not filtered, otherwise it looks horrible.
                      { 'hover:scale-102' : $store.getters.getSettingsImagesImageScaling && ($store.getters.getSettingsImagesImageSpacing && $store.getters.getSettingsImagesImageColumns > 1 && gameInfo.config.imageFiltering) }
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
// Import functions from modules.
import { app } from '@electron/remote'
import { existsSync, readdirSync } from 'fs-extra'
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
    // Declare template refs.
    const imageContainer = ref(null)
    const pictureImage = ref(null)

    // Load game images on mounting.
    onMounted(() => { getImages() })

    // Watch for game selection changes.
    watch(() => [props.regionIndex, props.versionIndex], () => { getImages() })

    // Image reading operations.
    let imageFiles = ref([])
    let imagePath = ref(null)
    const getCover = computed(() => {
      // Get cover image.
      return imageFiles.value.filter(res => res.startsWith('0'.repeat(8)))[0]
    })
    const getPictures = computed(() => {
      // Get array of pictures.
      return imageFiles.value.filter(res => !res.startsWith('0'.repeat(8)))
    })
    const getImages = () => {
      // Store currently selected cover image.
      let coverOld = getCover.value ? getCover.value : getPictures.value[0]
      // Set the image directory path of the game platform.
      let gamePath = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
      // Check if there are images for the selected game version.
      imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id + '/games/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id + '/images'
      if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
        // Load images filenames.
        imageFiles.value = readdirSync(imagePath.value)
      }
      else {
        // Check if there are images for the selected game region.
        imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id + '/images'
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
      // Store newly selected cover image.
      let coverNew = getCover.value ? getCover.value : getPictures.value[0]
      // Disable the image resizing.
      if (coverOld != coverNew) {
        //renderReady.value = false
      }
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

    return {
      getCover,
      getPictures,
      imageCenter,
      imageContainer,
      imageIndex,
      imageLoaded,
      imagePath,
      imageZoom,
      imageZoomToggle,
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