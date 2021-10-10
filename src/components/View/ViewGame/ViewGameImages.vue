<template>
  <!-- View cover image. -->
  <vi-overlay
    v-if="getCover || getPictures[0]"
    v-show="imagesCoverDialog"
    @close="imagesCoverClose()"
    class="pos-initial z-10"
  >
    <div class="flex">
      <img
        @click="imageZoomToggle()"
        :src="'file://' + imagePath + '/' + (getCover ? getCover : getPictures[0])"
        class="cursor-pointer object-contain rounded-xl"
        :class="[
          imageZoom ? 'h-full' : 'h-cover',
          { 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !getCover }
        ]"
      />
    </div>
  </vi-overlay>
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
  <!-- View gallery. -->
  <transition>
    <div
      v-show="imagesGalleryDialog"
      @close="imagesGalleryShow()"
      class="fixed h-screen pos-initial w-gallery"
    >
      <div class="absolute bg-black bg-opacity-70 flex h-full items-center justify-center w-full">
        <div class="absolute max-h-gallery max-w-gallery overflow-y-scroll rounded-xl w-full">
          <transition name="gallery">
            <!-- Pictures grid. -->
            <div
              v-if="getPictures[0]"
              v-show="imagesGalleryDialog"
              class="flex-1 overflow-y-scroll"
            >
              <div class="gap-4 grid grid-cols-4">
                <div
                  v-for="(image, index) in getPictures"
                  :key="index"
                  :value="image"
                  class="flex h-full justify-center"
                >
                  <img
                    @click="imagesPicturesOpen(index)"
                    :src="'file://' + imagePath + '/' + image"
                    class="cursor-pointer object-cover rounded-xl w-full"
                    :class="{ 'rendering-pixelated' : gameInfo.config.imageFiltering == false }"
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
      </div>
    </div>
  </transition>
  <!-- Cover image. -->
  <div class="ar-square justify-center w-full">
    <img
      ref="coverImage"
      v-if="getCover || getPictures[0]"
      @click="imagesCoverOpen()"
      @load="loadImage()"
      :src="'file://' + imagePath + '/' + (getCover ? getCover : getPictures[0])"
      class="cursor-pointer m-auto mb-4 object-contain rounded-xl shadow-color"
      :class="[
        renderReady ? coverWidth > coverHeight ? 'w-full' : 'h-full' : '',
        { 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !getCover }
      ]"
    />
    <div
      v-else
      class="bg-theme-100 dark:bg-theme-800 flex h-full items-center mb-4 rounded-3xl shadow-color w-full"
    >
      <div class="flex flex-col items-center m-auto">
        <div class="mb-4 text-theme-300">
          <vi-icon class="w-16">
            <icon-picture />
          </vi-icon>
        </div>
        <p>No image available</p>
      </div>
    </div>
    <!-- Open gallery. -->
    <div class="flex w-full">
      <vi-button
        color
        large
        @click="imagesGalleryShow()"
      >Gallery</vi-button>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
// Import functions from modules.
import { app } from '@electron/remote'
import { existsSync, readdirSync } from 'fs-extra'

export default {
  name: 'ViewGameImages',
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Declare template refs.
    const coverImage = ref(null)
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
        renderReady.value = false
      }
    }

    // Manage image when loaded.
    let coverWidth = ref(0)
    let coverHeight = ref(0)
    let renderReady = ref(false)
    const loadImage = () => {
      if (coverImage.value) {
        // Get image width and height.
        coverWidth.value = coverImage.value.clientWidth
        coverHeight.value = coverImage.value.clientHeight
        // Enable the image resizing.
        renderReady.value = true
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

    // Cover image display management.
    let imagesCoverDialog = ref(false)
    const imagesCoverOpen = () => {
      // Reset zoom mode.
      imageZoom.value = false
      // Open cover view.
      imagesCoverDialog.value = !imagesCoverDialog.value
    }
    const imagesCoverClose = () => {
      // Close cover view.
      imagesCoverDialog.value = !imagesCoverDialog.value
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
      coverImage,
      coverWidth,
      coverHeight,
      getCover,
      getPictures,
      imageCenter,
      imageContainer,
      imageIndex,
      imageLoaded,
      imagePath,
      imageZoom,
      imageZoomToggle,
      imagesCoverClose,
      imagesCoverDialog,
      imagesCoverOpen,
      imagesGalleryDialog,
      imagesGalleryShow,
      imagesPicturesClose,
      imagesPicturesDialog,
      imagesPicturesLoad,
      imagesPicturesOpen,
      loadImage,
      nextImage,
      pictureImage,
      prevImage,
      renderReady,
      slideBack
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-cover {
  height: calc(100vh - 4rem);
}
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