<template>
  <vi-dialog
    dialog-height="h-full"
    dialog-width="w-full"
    class="pos-initial z-10"
  >
    <!-- Length error dialog. -->
    <vi-dialog-box
      v-show="lengthErrorDialog"
      @accept="lengthErrorShow()"
    >
      You can only upload a single image file.
    </vi-dialog-box>
    <!-- Format error dialog. -->
    <vi-dialog-box
      v-show="formatErrorDialog"
      @accept="formatErrorShow()"
    >
      The file selected is not an image.
    </vi-dialog-box>
    <!-- Pictures format error dialog. -->
    <vi-dialog-box
      v-show="picturesErrorDialog"
      @accept="picturesErrorShow(false)"
    >
      One or more files selected are not images and were not uploaded.
    </vi-dialog-box>
    <!-- View selected image. -->
    <transition>
      <vi-overlay
        v-if="imageSelected"
        v-show="imageSelectedDialog"
        @close="imageSelectedClose()"
        :overlay-border="1"
        :overlay-rounded="false"
        class="pos-initial z-20"
      >
        <div class="flex relative">
          <img
            @click="imageZoomToggle()"
            :src="'file://' + imageSelected"
            class="cursor-pointer object-contain"
            :class="imageZoom ? 'h-full' : 'h-image rounded-3xl'"
          />
          <!-- Close selected image view. -->
          <div class="absolute h-full pointer-events-none right-0 top-0">
            <div
              @click="imageSelectedClose()"
              class="cursor-pointer m-4 sticky top-4"
            >
              <vi-icon class="bg-theme-800 duration-200 opacity-60 hover:opacity-100 p-1 pointer-events-auto rounded-full text-theme-200 w-8">
                <icon-cross />
              </vi-icon>
            </div>
          </div>
        </div>
      </vi-overlay>
    </transition>
    <!-- Header. -->
    <div class="flex justify-between mb-4 mx-2">
      <!-- Title. -->
      <p class="pt-1 text-2xl">Images</p>
      <!-- Buttons. -->
      <div class="h-10 space-x-4">
        <vi-button
          button-icon="icon-check"
          @click="onSubmit()"
        />
        <vi-button
          button-icon="icon-close"
          @click="onCancel()"
        />
      </div>
    </div>
    <!-- Images containers. -->
    <div class="flex h-content w-full">
      <div class="h-full w-1/4">
        <!-- Cover panel. -->
        <div class="flex flex-col h-1/2 pb-3 w-full">
          <div
            @mouseenter="coverHover = true"
            @mouseleave="coverHover = false"
            @dragenter="coverHover = true"
            @dragleave="coverHover = false"
            @dragover.prevent
            @drop.prevent="coverAddDrop"
            class="cursor-pointer h-full overflow-hidden p-0.5 relative w-full"
          >
            <!-- New cover image. -->
            <img
              v-if="coverAddImages"
              :src="'file://' + coverAddImages"
              @click="imageSelectedOpen(coverAddImages)"
              class="border-2 border-transparent hover:border-color-700 duration-200 h-full image-shadow object-cover rounded-xl w-full"
            />
            <!-- Existing cover image. -->
            <img
              v-else-if="getCover && !coverRemoveImages"
              :src="'file://' + imagePath + '/' + getCover"
              @click="imageSelectedOpen(imagePath + '/' + getCover)"
              class="border-2 border-transparent hover:border-color-700 duration-200 h-full image-shadow object-cover rounded-xl w-full"
            />
            <!-- No cover image. -->
            <div
              v-else
              @click="coverAddClick()"
              class="duration-500 flex h-full items-center rounded-xl shadow-color w-full"
              :class="coverHover ? 'bg-theme-200 dark:bg-theme-900' : 'bg-theme-100 dark:bg-theme-800'"
            >
              <div class="flex flex-col items-center mx-auto opacity-40 p-4 pointer-events-none text-center text-theme-800 dark:text-theme-200">
                <vi-icon
                  icon-manual
                  class="w-16"
                >
                  <icon-picture />
                </vi-icon>
                <p class="mb-4 text-lg">Cover</p>
                <h6>Click to select a cover image or drag and drop an image file here...</h6>
              </div>
            </div>
            <!-- Remove cover image icon. -->
            <transition>
              <div
                v-show="coverHover && (coverAddImages || (getCover && !coverRemoveImages))"
                @click="coverRemove()"
                class="absolute image-transition m-4 right-0 top-0"
              >
                <vi-icon class="bg-theme-800 duration-200 opacity-60 hover:opacity-100 p-1 rounded-full text-theme-200 w-6">
                  <icon-cross />
                </vi-icon>
              </div>
            </transition>
          </div>
        </div>
        <!-- Background panel. -->
        <div class="flex flex-col h-1/2 pt-3 w-full">
          <div
            @mouseenter="backgroundHover = true"
            @mouseleave="backgroundHover = false"
            @dragenter="backgroundHover = true"
            @dragleave="backgroundHover = false"
            @dragover.prevent
            @drop.prevent="backgroundAddDrop"
            class="cursor-pointer h-full overflow-hidden p-0.5 relative w-full"
          >
            <!-- New background image. -->
            <img
              v-if="backgroundAddImages"
              :src="'file://' + backgroundAddImages"
              @click="imageSelectedOpen(backgroundAddImages)"
              class="border-2 border-transparent hover:border-color-700 duration-200 h-full image-shadow object-cover rounded-xl w-full"
            />
            <!-- Existing background image. -->
            <img
              v-else-if="getBackground && !backgroundRemoveImages"
              :src="'file://' + imagePath + '/' + getBackground"
              @click="imageSelectedOpen(imagePath + '/' + getBackground)"
              class="border-2 border-transparent hover:border-color-700 duration-200 h-full image-shadow object-cover rounded-xl w-full"
            />
            <!-- No background image. -->
            <div
              v-else
              @click="backgroundAddClick()"
              class="duration-500 flex h-full items-center rounded-xl shadow-color w-full"
              :class="backgroundHover ? 'bg-theme-200 dark:bg-theme-900' : 'bg-theme-100 dark:bg-theme-800'"
            >
              <div class="flex flex-col items-center mx-auto opacity-40 p-4 pointer-events-none text-center text-theme-800 dark:text-theme-200">
                <vi-icon
                  icon-manual
                  class="w-16"
                >
                  <icon-picture />
                </vi-icon>
                <p class="mb-4 text-lg">Background</p>
                <h6>Click to select a background image or drag and drop an image file here...</h6>
              </div>
            </div>
            <!-- Remove background image icon. -->
            <transition>
              <div
                v-show="backgroundHover && (backgroundAddImages || (getBackground && !backgroundRemoveImages))"
                @click="backgroundRemove()"
                class="absolute image-transition m-4 right-0 top-0"
              >
                <vi-icon class="bg-theme-800 duration-200 opacity-60 hover:opacity-100 p-1 rounded-full text-theme-200 w-6">
                  <icon-cross />
                </vi-icon>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="flex flex-col h-full ml-6 w-3/4">
        <!-- Pictures panel. -->
        <div
          @mouseenter="picturesHover = true"
          @mouseleave="picturesHover = false"
          @dragenter="picturesHover = true"
          @dragleave="picturesHover = false"
          @dragover.prevent
          @drop.prevent="picturesAddDrop"
          class="h-full overflow-hidden p-0.5 select-none w-full"
        >
          <!-- New and existing picture images. -->
          <div
            v-if="getPictures[0] || picturesAddImages[0]"
            class="bg-theme-100 dark:bg-theme-800 h-full p-3 pr-1 rounded-xl shadow-color w-full"
          >
            <!-- Pictures container. -->
            <div
              class="flex-1 h-full overflow-y-scroll"
              :class="{ 'dark-scrollbar ' : $store.getters.getSettingsThemesDarkMode}"
            >
              <!-- Pictures grid. -->
              <div class="gap-2 grid grid-cols-4">
                <!-- Add images button -->
                <div
                  @click="picturesAddClick()"
                  class="ar-square bg-theme-200 dark:bg-theme-900 hover:bg-color-200 dark:hover:bg-color-900 cursor-pointer duration-500 flex h-full items-center overflow-hidden rounded-xl shadow-color w-full"
                >
                  <div class="flex flex-col items-center mx-auto opacity-40 p-4 pointer-events-none text-center text-theme-800 dark:text-theme-200">
                    <vi-icon
                      icon-manual
                      class="mb-4 w-12"
                    >
                      <icon-picture />
                    </vi-icon>
                    <h6>Click to add more pictures...</h6>
                  </div>
                </div>
                <!-- Existing images list. -->
                <div
                  v-for="(image, index) in getPictures"
                  :key="index"
                  @mouseenter="picturesGetHover = index"
                  @mouseleave="picturesGetHover = null"
                  class="cursor-pointer relative"
                >
                  <!-- Existing picture image. -->
                  <img
                    :src="'file://' + imagePath + '/' + image"
                    @click="imageSelectedOpen(imagePath + '/' + image)"
                    class="ar-square border-2 border-transparent hover:border-color-700 duration-200 image-shadow object-cover rounded-xl"
                  />
                  <!-- Remove picture image icon. -->
                  <transition>
                    <div
                      v-show="picturesGetHover == index"
                      @click="picturesRemoveSelect(image)"
                      class="absolute image-transition m-2 right-0 top-0"
                    >
                      <vi-icon class="bg-theme-800 duration-200 opacity-60 hover:opacity-100 p-1 rounded-full text-theme-200 w-6">
                        <icon-cross />
                      </vi-icon>
                    </div>
                  </transition>
                </div>
                <!-- Added images list. -->
                <div
                  v-for="(image, index) in picturesAddImages"
                  :key="index"
                  @mouseenter="picturesAddHover = index"
                  @mouseleave="picturesAddHover = null"
                  class="cursor-pointer relative"
                >
                  <!-- Added picture image. -->
                  <img
                    :src="'file://' + image"
                    @click="imageSelectedOpen(image)"
                    class="ar-square border-2 border-transparent hover:border-color-700 duration-200 image-shadow object-cover rounded-xl"
                  />
                  <!-- Remove picture image icon. -->
                  <transition>
                    <div
                      v-show="picturesAddHover == index"
                      @click="picturesRemove(image)"
                      class="absolute image-transition m-2 right-0 top-0"
                    >
                      <vi-icon class="bg-theme-800 duration-200 opacity-60 hover:opacity-100 p-1 rounded-full text-theme-200 w-6">
                        <icon-cross />
                      </vi-icon>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
          <!-- No picture images. -->
          <div
            v-else
            @click="picturesAddClick()"
            class="cursor-pointer duration-500 flex h-full items-center rounded-xl shadow-color w-full"
            :class="picturesHover ? 'bg-theme-200 dark:bg-theme-900' : 'bg-theme-100 dark:bg-theme-800'"
          >
            <div class="flex flex-col items-center mx-auto opacity-40 p-4 pointer-events-none text-center text-theme-800 dark:text-theme-200">
              <vi-icon
                icon-manual
                class="w-16"
              >
                <icon-picture />
              </vi-icon>
              <p class="mb-4 text-lg">Pictures</p>
              <h6>Click to select pictures or drag and drop image files here...</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vi-dialog>
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
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Watch for game selection changes.
    watch(() => props.show, (value) => {
      // Load images.
      if (value) { getImages() }
    })

    // Manage changes saving.
    const onSubmit = () => {
      let setGameType = 'setGame' + gameTypeName.value
      // Save value changes to the store.
      store.commit(setGameType + 'ImagesCoverAdd', coverAddImages.value)
      store.commit(setGameType + 'ImagesCoverRemove', coverRemoveImages.value)
      store.commit(setGameType + 'ImagesBackgroundAdd', backgroundAddImages.value)
      store.commit(setGameType + 'ImagesBackgroundRemove', backgroundRemoveImages.value)
      // Avoid reactivity to alter the original reference values.
      let picturesAddStore = []
      for (let image of picturesAddImages.value) {
        picturesAddStore.push(image)
      }
      store.commit(setGameType + 'ImagesPicturesAdd', picturesAddStore)
      let picturesRemoveStore = []
      for (let image of picturesRemoveImages.value) {
        picturesRemoveStore.push(image)
      }
      store.commit(setGameType + 'ImagesPicturesRemove', picturesRemoveStore)
      // Close images dialog.
      emit('close')
    }
    const onCancel = () => {
      setTimeout(() => {
        let imagesStore = store.state.gameForm[props.gameType].images
        // Restore values from the store.
        coverAddImages.value = imagesStore.cover.add
        coverRemoveImages.value = imagesStore.cover.remove
        backgroundAddImages.value = imagesStore.background.add
        backgroundRemoveImages.value = imagesStore.background.remove
        // Avoid reactivity to alter the original reference values.
        picturesAddImages.value = []
        for (let image of imagesStore.pictures.add) {
          picturesAddImages.value.push(image)
        }
        picturesRemoveImages.value = []
        for (let image of imagesStore.pictures.remove) {
          picturesRemoveImages.value.push(image)
        }
      }, 500)
      // Close images dialog.
      emit('close')
    }

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
      return imageFiles.value.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)) && !picturesRemoveImages.value.includes(res))
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
    let coverHover = ref(false)
    let coverAddImages = ref(null)
    let coverRemoveImages = ref(false)
    const coverAddClick = () => {
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
    const coverAddDrop = (files) => {
      if (files.dataTransfer.files.length > 0) {
        // Check if only one image file is being uploaded.
        if (files.dataTransfer.files.length > 1) {
          // Toggle length error dialog.
          lengthErrorShow()
        } else {
          // Check if the file uploaded is an image.
          if (files.dataTransfer.files[0].type.includes('image')) {
            // Set image's path as the cover image.
            coverAddImages.value = [files.dataTransfer.files[0].path]
          } else {
            // Toggle format error dialog.
            formatErrorShow()
          }
        }
      }
    }
    const coverRemove = () => {
      // Remove image from the store.
      coverAddImages.value = null
      coverRemoveImages.value = true
    }

    // Manage background image operations.
    let backgroundHover = ref(false)
    let backgroundAddImages = ref(null)
    let backgroundRemoveImages = ref(false)
    const backgroundAddClick = () => {
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
    const backgroundAddDrop = (files) => {
      if (files.dataTransfer.files.length > 0) {
        // Check if only one image file is being uploaded.
        if (files.dataTransfer.files.length > 1) {
          // Toggle length error dialog.
          lengthErrorShow()
        } else {
          // Check if the file uploaded is an image.
          if (files.dataTransfer.files[0].type.includes('image')) {
            // Set image's path as the background image.
            backgroundAddImages.value = [files.dataTransfer.files[0].path]
          } else {
            // Toggle format error dialog.
            formatErrorShow()
          }
        }
      }
    }
    const backgroundRemove = () => {
      // Remove image from the store.
      backgroundAddImages.value = null
      backgroundRemoveImages.value = true
    }

    // Manage picture images operations.
    let picturesHover = ref(false)
    let picturesAddHover = ref(null)
    let picturesGetHover = ref(null)
    let picturesAddImages = ref([])
    let picturesRemoveImages = ref([])
    const picturesAddClick = () => {
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
          res.filePaths.forEach((file) => picturesAddImages.value.push(file))
        }
      })
    }
    const picturesAddDrop = (files) => {
      if (files.dataTransfer.files.length > 0) {
        for (let file of files.dataTransfer.files) {
          // Check if the file uploaded is an image.
          if (file.type.includes('image')) {
            // Add image's path to the picture images array.
            picturesAddImages.value.push(file.path)
          } else {
            // Toggle format error dialog.
            picturesErrorShow(true)
          }
        }
      }
    }
    const picturesRemove = (image) => {
      // Remove image from the store.
      picturesAddImages.value.splice(picturesAddImages.value.indexOf(image), 1)
    }
    const picturesRemoveSelect = (image) => {
      // Add image to the remove list.
      picturesRemoveImages.value.push(image)
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

    // Manage error dialogs.
    let lengthErrorDialog = ref(false)
    const lengthErrorShow = () => {
      // Toggle length error dialog.
      lengthErrorDialog.value = !lengthErrorDialog.value
    }
    let formatErrorDialog = ref(false)
    const formatErrorShow = () => {
      // Toggle format error dialog.
      formatErrorDialog.value = !formatErrorDialog.value
    }
    let picturesErrorDialog = ref(false)
    const picturesErrorShow = (res) => {
      // Toggle pictures format error dialog.
      picturesErrorDialog.value = res
    }

    return {
      backgroundAddClick,
      backgroundAddDrop,
      backgroundAddImages,
      backgroundHover,
      backgroundRemove,
      backgroundRemoveImages,
      coverAddClick,
      coverAddDrop,
      coverAddImages,
      coverHover,
      coverRemove,
      coverRemoveImages,
      formatErrorDialog,
      formatErrorShow,
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
      lengthErrorDialog,
      lengthErrorShow,
      onCancel,
      onSubmit,
      picturesAddClick,
      picturesAddDrop,
      picturesAddImages,
      picturesErrorDialog,
      picturesErrorShow,
      picturesAddHover,
      picturesGetHover,
      picturesHover,
      picturesRemove,
      picturesRemoveSelect
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100% - 3.5rem);
}
.h-image {
  height: calc(100vh - 2rem);
}
/* Styling. */
.ar-square {
  aspect-ratio: 1 / 1;
}
.image-shadow {
  filter: drop-shadow(1px 1px 1px rgba(var(--color-theme-800), 0.6));
}
.image-transition {
  transition: all 0.2s;
}
</style>