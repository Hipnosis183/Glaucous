<template>
  <!-- Show images dialog. -->
  <vi-overlay
    @close="$emit('close')"
    class="pos-initial z-10"
  >
    <div class="flex space-x-4 w-images">
      <!-- Cover panel. -->
      <vi-modal class="max-h-content w-1/4">
        <!-- Cover header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Cover title. -->
          <p class="pt-1 text-2xl">Cover</p>
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
        <img
          v-if="coverAddImages"
          :src="'file://' + coverAddImages"
          class="object-cover rounded-xl shadow-color"
        />
        <img
          v-else-if="getCover && !coverRemoveImages"
          :src="'file://' + imagePath + '/' + getCover"
          class="object-cover rounded-xl shadow-color"
        />
        <div
          v-else
          class="ar-square bg-theme-100 dark:bg-theme-800 flex items-center rounded-xl shadow-color w-full"
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
        <!-- Back button. -->
        <vi-button
          color
          large
          @click="$emit('close')"
          class="mt-6"
        >Back</vi-button>
      </vi-modal>
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
          </div>
        </div>
        <!-- Pictures grid. -->
        <div class="flex flex-1 max-h-images overflow-hidden rounded-xl">
          <div
            v-if="getPictures[0] || picturesAddImages[0]"
            class="flex-1 no-scrollbar overflow-y-scroll"
          >
            <div class="gap-4 grid grid-cols-4">
              <div
                v-for="(image, index) in getPictures"
                :key="index"
                :value="image"
                class="flex h-full justify-center relative rounded-xl shadow-color w-full"
              >
                <transition>
                  <div
                    v-show="picturesRemoveList(image)"
                    @click="picturesRemoveSelect(image)"
                    class="absolute bg-red-800 bg-opacity-50 cursor-pointer flex h-full rounded-xl w-full"
                  >
                    <div class="m-auto text-theme-100">
                      <vi-icon class="w-16">
                        <icon-remove />
                      </vi-icon>
                    </div>
                  </div>
                </transition>
                <img
                  @click="picturesRemoveSelect(image)"
                  :src="'file://' + imagePath + '/' + image"
                  class="cursor-pointer object-cover rounded-xl"
                />
              </div>
              <div
                v-for="(image, index) in picturesAddImages"
                :key="index"
                :value="image"
                class="flex h-full justify-center relative rounded-xl shadow-color w-full"
              >
                <transition>
                  <div
                    @click="picturesRemove(image)"
                    class="absolute bg-green-800 bg-opacity-50 cursor-pointer flex h-full rounded-xl w-full"
                  >
                    <div class="m-auto text-theme-100">
                      <vi-icon class="w-16">
                        <icon-add />
                      </vi-icon>
                    </div>
                  </div>
                </transition>
                <img
                  :src="'file://' + image"
                  class="cursor-pointer object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="bg-theme-100 dark:bg-theme-800 flex h-images items-center rounded-xl shadow-color w-full"
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
import { existsSync, readdirSync } from 'fs-extra'

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
    const getPictures = computed(() => {
      // Get array of pictures.
      return imageFiles.value.filter((res) => !res.startsWith('0'.repeat(8)))
    })
    const getImages = () => {
      // Set the base image directory path of the game.
      let basePath = app.getAppPath() + '/data/' + store.state.gameForm.gamePlatform.platform + '/' + store.state.gameSelected.gamePlatform
      switch (props.gameType) {
        // Set the working variables for the game platform images.
        case 'gamePlatform': {
          imagePath.value = basePath + '/images'
          gameTypeName.value = 'Platform'
          break
        }
        // Set the working variables for the game region images.
        case 'gameRegion': {
          imagePath.value = basePath + '/games/' + store.state.gameSelected.gameRegion + '/images'
          gameTypeName.value = 'Region'
          break
        }
        // Set the working variables for the game version images.
        case 'gameVersion': {
          imagePath.value = basePath + '/games/' + store.state.gameSelected.gameRegion + '/games/' + store.state.gameSelected.gameVersion + '/images'
          gameTypeName.value = 'Version'
          break
        }
      }
      // Avoid showing the images of the selected game if not in an edit form.
      if (existsSync(imagePath.value) && props.editForm) {
        // Load images filenames.
        imageFiles.value = readdirSync(imagePath.value)
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
      coverAddImages.value = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
    }
    const coverRemove = () => {
      // Remove image from the store.
      coverAddImages.value = null
      coverRemoveImages.value = true
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
      let dialogResult = dialog.showOpenDialogSync({
        properties: ['openFile', 'multiSelections'],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
      if (dialogResult) {
        // Save images into the store.
        dialogResult.forEach((res) => picturesAddImages.value = res)
      }
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

    return {
      coverAdd,
      coverAddImages,
      coverRemove,
      coverRemoveImages,
      getCover,
      getPictures,
      imagePath,
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
.h-images {
  height: calc(100vh - 11rem);
}
.max-h-content {
  max-height: calc(100vh - 4rem);
}
.max-h-images {
  max-height: calc(100vh - 11rem);
}
.w-images {
  width: calc(100vw - 7.5rem);
}
</style>