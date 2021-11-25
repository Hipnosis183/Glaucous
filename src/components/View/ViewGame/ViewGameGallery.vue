<template>
  <!-- View game gallery. -->
  <vi-overlay
    :overlay-border="3"
    overlay-height="h-full"
    :overlay-rounded="false"
    overlay-width="w-full"
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <div v-if="getPictures[0]">
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
              :name="slideBack ? 'slide-left' : 'slide-right'"
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
            <div class="flex h-10 justify-between mx-1 space-x-4">
              <!-- Close dialog. -->
              <vi-button
                button-icon="icon-close"
                @click="imagesPicturesClose()"
              />
              <!-- Control bar buttons. -->
              <div class="flex h-10 rounded-full shadow-color">
                <!-- Previous image. -->
                <vi-button
                  button-first
                  button-icon="icon-arrow-left-d"
                  @click="prevImage()"
                  class="px-4"
                />
                <!-- Display image in its original size. -->
                <vi-button
                  button-middle
                  button-icon="icon-full-screen"
                  @click="imageZoomToggle()"
                  class="px-4"
                />
                <!-- Next image. -->
                <vi-button
                  button-last
                  button-icon="icon-arrow-right-d"
                  @click="nextImage()"
                  class="px-4"
                />
              </div>
              <!-- Image counter. -->
              <vi-button class="cursor-default">
                {{ (imageIndex + 1) + ' / ' + getPictures.length }}
              </vi-button>
            </div>
          </div>
        </vi-overlay>
      </transition>
      <!-- Gallery images. -->
      <div class="absolute max-h-full max-w-gallery overflow-y-scroll w-full">
        <transition name="gallery">
          <!-- Pictures grid. -->
          <div
            v-show="galleryShow"
            class="flex-1 mr-4 no-scrollbar overflow-y-scroll"
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
        </transition>
      </div>
      <!-- Gallery buttons. -->
      <div class="absolute right-0 top-0">
        <!-- Close dialog. -->
        <vi-button
          button-icon="icon-close"
          @click="$emit('close')"
        />
      </div>
      <!-- List settings. -->
      <div class="absolute bottom-0 mr-1 right-0">
        <settings-images />
      </div>
    </div>
    <!-- No images available dialog. -->
    <vi-dialog-box
      v-else
      :dialog-overlay="false"
      @accept="$emit('close')"
    >
      No images available.
    </vi-dialog-box>
  </vi-overlay>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { ensureDirSync } from 'fs-extra'
// Import utility functions.
import { readfiles } from '@/utils/filesystem'
// Import form components.
import SettingsImages from '@/components/Settings/SettingsImages.vue'

export default {
  name: 'ViewGameGallery',
  components: {
    SettingsImages
  },
  emits: [
    'close'
  ],
  props: {
    galleryShow: { type: Boolean, default: false },
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
        let gamePathPlatform = store.getters.getAppPath + '/data/images/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
        let gamePathRegion = '/' + props.gameInfo.gameRegions[props.regionIndex]._id
        let gamePathVersion = '/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
        imagePathPlatform.value = gamePathPlatform
        imagePathRegion.value = gamePathPlatform + gamePathRegion
        imagePathVersion.value = gamePathPlatform + gamePathRegion + gamePathVersion
        // Ensure images directories existance.
        ensureDirSync(imagePathPlatform.value)
        ensureDirSync(imagePathRegion.value)
        ensureDirSync(imagePathVersion.value)
        // Load images filenames.
        imageFilesPlatform.value = readfiles(imagePathPlatform.value)
        imageFilesRegion.value = readfiles(imagePathRegion.value)
        imageFilesVersion.value = readfiles(imagePathVersion.value)
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
      return !store.getters.getSettingsPlatformOverImagesFiltering
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
.max-w-gallery {
  max-width: calc(100% - 0.5rem);
}
.h-viewer {
  height: calc(100vh - 7.5rem);
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