<template>
  <!-- Show selected image dialog. -->
  <vi-overlay
    width="w-full"
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <transition>
      <!-- View selected image. -->
      <vi-overlay
        v-if="imageSelected"
        v-show="imageSelectedDialog"
        @close="imageSelectedClose()"
        class="pos-initial z-20"
      >
        <div class="flex">
          <img
            @click="imageZoomToggle()"
            :src="'file://' + imageSelected"
            class="cursor-pointer object-contain rounded-xl"
            :class="imageZoom ? 'h-full' : 'h-content'"
          />
        </div>
      </vi-overlay>
    </transition>
    <div class="flex space-x-4 w-full">
      <div class="h-content max-h-content space-y-4 w-1/4">
        <!-- Cover panel. -->
        <vi-modal class="flex flex-col h-content-half relative">
          <!-- Cover header. -->
          <div class="flex justify-between mb-6 mx-2">
            <!-- Cover title. -->
            <p class="overflow-x-hidden pt-1 text-2xl">Cover</p>
            <!-- Cover buttons. -->
            <div class="flex h-10 space-x-4">
              <vi-button-icon @click="coverAdd()">
                <vi-icon class="w-6">
                  <icon-add />
                </vi-icon>
              </vi-button-icon>
              <vi-button-icon @click="coverRemove()">
                <vi-icon class="w-6">
                  <icon-remove />
                </vi-icon>
              </vi-button-icon>
            </div>
          </div>
          <!-- Cover image. -->
          <div class="absolute bottom-0 flex h-full left-0 pointer-events-none p-6 pt-22 right-0 top-0 w-full">
            <img
              v-if="coverAddImages"
              @click="imageSelectedOpen(coverAddImages)"
              :src="'file://' + coverAddImages"
              class="border-2 border-transparent hover:border-color-700 cursor-pointer duration-200 image-shadow object-cover pointer-events-auto rounded-xl w-full"
            />
            <img
              v-else-if="getCover && !coverRemoveImages"
              @click="imageSelectedOpen(imagePath + '/' + getCover)"
              :src="'file://' + imagePath + '/' + getCover"
              class="border-2 border-transparent hover:border-color-700 cursor-pointer duration-200 image-shadow object-cover pointer-events-auto rounded-xl w-full"
            />
            <div
              v-else
              class="bg-theme-100 dark:bg-theme-800 flex items-center rounded-3xl shadow-color w-full"
            >
              <div class="flex flex-col items-center m-auto">
                <div class="mb-4 text-6xl text-theme-300">
                  <vi-icon class="w-16">
                    <icon-picture />
                  </vi-icon>
                </div>
                <p>No image available</p>
              </div>
            </div>
          </div>
        </vi-modal>
        <!-- Background panel. -->
        <vi-modal class="flex flex-col h-content-half relative">
          <!-- Background header. -->
          <div class="flex justify-between mb-6 mx-2">
            <!-- Background title. -->
            <p class="overflow-x-hidden pt-1 text-2xl">Background</p>
            <!-- Background buttons. -->
            <div class="flex h-10 space-x-4">
              <vi-button-icon @click="backgroundAdd()">
                <vi-icon class="w-6">
                  <icon-add />
                </vi-icon>
              </vi-button-icon>
              <vi-button-icon @click="backgroundRemove()">
                <vi-icon class="w-6">
                  <icon-remove />
                </vi-icon>
              </vi-button-icon>
            </div>
          </div>
          <!-- Background image. -->
          <div class="absolute bottom-0 flex h-full left-0 pointer-events-none p-6 pt-22 right-0 top-0 w-full">
            <img
              v-if="backgroundAddImages"
              @click="imageSelectedOpen(backgroundAddImages)"
              :src="'file://' + backgroundAddImages"
              class="border-2 border-transparent hover:border-color-700 cursor-pointer duration-200 image-shadow object-cover pointer-events-auto rounded-xl w-full"
            />
            <img
              v-else-if="getBackground && !backgroundRemoveImages"
              @click="imageSelectedOpen(imagePath + '/' + getBackground)"
              :src="'file://' + imagePath + '/' + getBackground"
              class="border-2 border-transparent hover:border-color-700 cursor-pointer duration-200 image-shadow object-cover pointer-events-auto rounded-xl w-full"
            />
            <div
              v-else
              class="bg-theme-100 dark:bg-theme-800 flex items-center rounded-3xl shadow-color w-full"
            >
              <div class="flex flex-col items-center m-auto">
                <div class="mb-4 text-6xl text-theme-300">
                  <vi-icon class="w-16">
                    <icon-picture />
                  </vi-icon>
                </div>
                <p>No image available</p>
              </div>
            </div>
          </div>
        </vi-modal>
      </div>
      <!-- Pictures panel. -->
      <vi-modal class="h-content max-h-content w-3/4">
        <!-- Pictures header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Pictures title. -->
          <p class="pt-1 text-2xl">Pictures</p>
          <!-- Pictures buttons. -->
          <div class="flex h-10 space-x-4">
            <vi-button-icon @click="picturesAdd()">
              <vi-icon class="w-6">
                <icon-add />
              </vi-icon>
            </vi-button-icon>
            <vi-button-icon @click="$emit('close')">
              <vi-icon class="w-6">
                <icon-close />
              </vi-icon>
            </vi-button-icon>
          </div>
        </div>
        <!-- Pictures grid. -->
        <div class="flex flex-1 max-h-images rounded-2xl">
          <div
            v-if="getPictures[0] || picturesAddImages[0]"
            class="flex-1 -mr-4 overflow-y-scroll p-1 pr-2"
            :class="{ 'dark-scrollbar' : $store.getters.getSettingsThemesDarkMode}"
          >
            <div class="gap-4 grid grid-cols-4">
              <div
                v-for="(image, index) in getPictures"
                :key="index"
                :value="image"
              >
                <div class="duration-200 flex h-full image-shadow relative hover:scale-101 transform w-full">
                  <transition>
                    <div
                      v-show="picturesRemoveList(image)"
                      @click="picturesRemoveSelect(image)"
                      class="absolute bg-red-800 bg-opacity-40 cursor-pointer flex h-full rounded-xl w-full"
                    />
                  </transition>
                  <img
                    @click="picturesRemoveSelect(image)"
                    :src="'file://' + imagePath + '/' + image"
                    class="border-2 border-transparent hover:border-color-700 cursor-pointer object-cover rounded-xl"
                  />
                </div>
              </div>
              <div
                v-for="(image, index) in picturesAddImages"
                :key="index"
                :value="image"
              >
                <div class="duration-200 flex h-full image-shadow relative hover:scale-101 transform w-full">
                  <transition>
                    <div
                      @click="picturesRemove(image)"
                      class="absolute bg-green-800 bg-opacity-40 cursor-pointer flex h-full rounded-xl w-full"
                    />
                  </transition>
                  <img
                    :src="'file://' + image"
                    class="border-2 border-transparent hover:border-color-700 cursor-pointer object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="bg-theme-100 dark:bg-theme-800 flex h-images items-center rounded-3xl shadow-color w-full"
          >
            <div class="flex flex-col items-center m-auto">
              <div class="mb-4 text-theme-300">
                <vi-icon class="w-16">
                  <icon-picture />
                </vi-icon>
              </div>
              <p>No images available</p>
            </div>
          </div>
        </div>
      </vi-modal>
    </div>
  </vi-overlay>
</template>

<script>
// Import Vue functions.
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app, dialog } from '@electron/remote'
import { existsSync } from 'fs-extra'
// Import utility functions.
import { readfiles } from '@/utils/filesystem'

export default {
  name: 'FormGameImagesView',
  emit: [
    'close'
  ],
  props: {
    gameType: { type: String },
    editForm: { type: Boolean, default: false },
    show: { type: Boolean, default: false }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Watch for game selection changes.
    watch(() => props.show, (value) => {
      // Load images.
      if (value) { getImages() }
    })

    // Manage images loading.
    let imageFiles = ref([])
    let imagePath = ref(null)
    let gameTypeName = ref(null)
    const getCover = computed(() => {
      // Get cover image.
      return imageFiles.value.filter((res) => res.startsWith('0'.repeat(8)))[0]
    })
    const getBackground = computed(() => {
      // Get background image.
      return imageFiles.value.filter((res) => res.startsWith('1'.repeat(8)))[0]
    })
    const getPictures = computed(() => {
      // Get array of pictures.
      return imageFiles.value.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)))
    })
    const getImages = () => {
      // Set the base image directory path of the game.
      let basePath = app.getAppPath() + '/data/images/' + store.state.gameForm.gamePlatform.platform + '/' + store.state.gameSelected.gamePlatform
      switch (props.gameType) {
        // Set the working variables for the game platform images.
        case 'gamePlatform': {
          imagePath.value = basePath
          gameTypeName.value = 'Platform'
          break
        }
        // Set the working variables for the game region images.
        case 'gameRegion': {
          imagePath.value = basePath + '/' + store.state.gameSelected.gameRegion
          gameTypeName.value = 'Region'
          break
        }
        // Set the working variables for the game version images.
        case 'gameVersion': {
          imagePath.value = basePath + '/' + store.state.gameSelected.gameRegion + '/' + store.state.gameSelected.gameVersion
          gameTypeName.value = 'Version'
          break
        }
      }
      // Avoid showing the images of the selected game if not in an edit form.
      if (existsSync(imagePath.value) && props.editForm) {
        // Load images filenames.
        imageFiles.value = readfiles(imagePath.value)
      }
      else {
        // Empty image variables.
        imagePath.value = null
        imageFiles.value = []
      }
    }

    // Manage cover image operations.
    const coverAddImages = computed({
      get() { return store.state.gameForm[props.gameType].images.cover.add },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesCoverAdd', value) }
    })
    const coverRemoveImages = computed({
      get() { return store.state.gameForm[props.gameType].images.cover.remove },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesCoverRemove', value) }
    })
    const coverAdd = () => {
      // Open dialog to select an image.
      dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      }).then((res) => {
        if (res.filePaths.length > 0) {
          coverAddImages.value = res.filePaths
        }
      })
    }
    const coverRemove = () => {
      // Remove image from the store.
      coverAddImages.value = null
      coverRemoveImages.value = true
    }

    // Manage background image operations.
    const backgroundAddImages = computed({
      get() { return store.state.gameForm[props.gameType].images.background.add },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesBackgroundAdd', value) }
    })
    const backgroundRemoveImages = computed({
      get() { return store.state.gameForm[props.gameType].images.background.remove },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesBackgroundRemove', value) }
    })
    const backgroundAdd = () => {
      // Open dialog to select an image.
      dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      }).then((res) => {
        if (res.filePaths.length > 0) {
          backgroundAddImages.value = res.filePaths
        }
      })
    }
    const backgroundRemove = () => {
      // Remove image from the store.
      backgroundAddImages.value = null
      backgroundRemoveImages.value = true
    }

    // Manage picture images operations.
    const picturesAddImages = computed({
      get() { return store.state.gameForm[props.gameType].images.pictures.add },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesPicturesAdd', value) }
    })
    const picturesRemoveImages = computed({
      get() { return store.state.gameForm[props.gameType].images.pictures.remove },
      set(value) { store.commit('setGame' + gameTypeName.value + 'ImagesPicturesRemove', value) }
    })
    const picturesAdd = () => {
      // Open dialog to select images.
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      }).then((res) => {
        if (res.filePaths.length > 0) {
          // Save images into the store.
          res.filePaths.forEach((file) => picturesAddImages.value = file)
        }
      })
    }
    const picturesRemove = (image) => {
      // Remove image from the store.
      picturesAddImages.value.splice(picturesAddImages.value.indexOf(image), 1)
    }
    const picturesRemoveList = (image) => {
      // Check if the image is in the remove list.
      return picturesRemoveImages.value.includes(image)
    }
    const picturesRemoveSelect = (image) => {
      if (picturesRemoveList(image)) {
        // Remove image from the remove list.
        picturesRemoveImages.value.splice(picturesRemoveImages.value.indexOf(image), 1)
      } else {
        // Add image to the remove list.
        picturesRemoveImages.value = image
      }
    }

    // Selected image display management.
    let imageSelected = ref(null)
    let imageSelectedDialog = ref(false)
    const imageSelectedOpen = (image) => {
      // Set image to view.
      imageSelected.value = image
      // Reset zoom mode.
      imageZoom.value = false
      // Open image view.
      imageSelectedDialog.value = !imageSelectedDialog.value
    }
    const imageSelectedClose = () => {
      // Close image view.
      imageSelectedDialog.value = !imageSelectedDialog.value
    }
    let imageZoom = ref(false)
    const imageZoomToggle = () => {
      // Toggle zoom mode.
      imageZoom.value = !imageZoom.value
    }

    return {
      backgroundAdd,
      backgroundAddImages,
      backgroundRemove,
      backgroundRemoveImages,
      coverAdd,
      coverAddImages,
      coverRemove,
      coverRemoveImages,
      getBackground,
      getCover,
      getPictures,
      imagePath,
      imageSelected,
      imageSelectedClose,
      imageSelectedDialog,
      imageSelectedOpen,
      imageZoom,
      imageZoomToggle,
      picturesAdd,
      picturesAddImages,
      picturesRemove,
      picturesRemoveList,
      picturesRemoveSelect
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 4rem);
}
.h-content-half {
  height: calc((100vh - 4rem) / 2 - 0.5rem);
}
.max-h-content {
  max-height: calc(100vh - 4rem);
}
.h-images {
  height: calc(100vh - 11rem);
}
.max-h-images {
  max-height: calc(100vh - 11rem);
}
/* Styling. */
.image-shadow {
  filter: drop-shadow(1px 1px 1px rgba(var(--color-theme-900), 0.6));
}
</style>