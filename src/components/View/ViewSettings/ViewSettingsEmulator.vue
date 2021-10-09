<template>
  <!-- Error dialog. -->
  <vi-dialog
    v-show="emulatorErrorDialog"
    @close="emulatorErrorShow()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Can't perform the operation without an emulator selected.
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Close message. -->
      <vi-button-icon @click="emulatorErrorShow()">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
  <!-- Create emulator dialog. -->
  <create-emulator
    v-show="createEmulatorDialog"
    :emulatorList="emulatorList"
    :emulatorPath="emulatorPath"
    @close="createEmulatorClose()"
  />
  <!-- Edit emulator dialog. -->
  <edit-emulator
    v-show="editEmulatorDialog"
    :emulatorList="emulatorList"
    :emulatorPath="emulatorPath"
    @close="editEmulatorClose()"
  />
  <!-- Delete emulator dialog. -->
  <vi-dialog
    v-show="deleteEmulatorDialog"
    @close="deleteEmulatorOpen()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Delete emulator <b>'{{ emulatorName }}'</b> ?
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Confirm emulator deletion. -->
      <vi-button-icon @click="deleteEmulatorClose()">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
      <!-- Cancel emulator deletion. -->
      <vi-button-icon @click="deleteEmulatorOpen()">
        <vi-icon class="w-6">
          <icon-close />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
  <!-- Emulator Setting. -->
  <vi-section-content>
    <p
      v-if="settingsType == 'Platform'"
      class="text-xl whitespace-nowrap"
    >Emulator</p>
    <p
      v-else
      class="text-xl whitespace-nowrap"
    >Emulator Override</p>
    <div class="flex space-x-2 w-full">
      <!-- Create emulator. -->
      <vi-button-icon @click="createEmulatorOpen()">
        <vi-icon class="w-6">
          <icon-add />
        </vi-icon>
      </vi-button-icon>
      <!-- Edit emulator. -->
      <vi-button-icon @click="editEmulatorOpen()">
        <vi-icon class="w-6">
          <icon-edit />
        </vi-icon>
      </vi-button-icon>
      <!-- Delete emulator. -->
      <vi-button-icon @click="deleteEmulatorOpen()">
        <vi-icon class="w-6">
          <icon-remove />
        </vi-icon>
      </vi-button-icon>
      <!-- Emulator select. -->
      <vi-select
        v-model="emulatorStore"
        clearable
        :key="emulatorList"
      >
        <vi-option
          v-for="item in emulatorList.sort(sortEmulatorList)"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></vi-option>
      </vi-select>
    </div>
  </vi-section-content>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { existsSync, readJSONSync, outputJSONSync } from 'fs-extra'
// Import form components.
import CreateEmulator from '@/components/Create/CreateEmulator.vue'
import EditEmulator from '@/components/Edit/EditEmulator.vue'

export default {
  name: 'ViewSettingsEmulator',
  components: {
    CreateEmulator,
    EditEmulator
  },
  props: {
    settingsType: { type: String }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage emulators list.
    let emulatorList = ref([])
    const emulatorName = computed(() => {
      if (emulatorStore.value && emulatorList.value.length > 0) {
        let index = emulatorList.value.findIndex((res) => res.id == emulatorStore.value)
        return emulatorList.value[index] ? emulatorList.value[index].name : ''
      }
    })
    const emulatorPath = app.getAppPath() + '/data/emulators.json'
    const emulatorStore = computed({
      get() { return store.state['settings' + props.settingsType].emulator },
      set(value) { store.state['settings' + props.settingsType].emulator = value }
    })
    const loadEmulatorList = () => {
      // Read and load emulator file.
      if (existsSync(emulatorPath)) {
        emulatorList.value = readJSONSync(emulatorPath)
      }
    }
    const sortEmulatorList = (a, b) => {
      // Compare function that returns natural ordered elements.
      return a.name.localeCompare(b.name, navigator.language, { numeric: true, ignorePunctuation: true })
    }

    // Load emulators list on component creation.
    loadEmulatorList()

    // Manage emulator operations.
    let createEmulatorDialog = ref(false)
    const createEmulatorOpen = () => {
      // Clear the data on the store.
      store.commit('resetEmulatorForm')
      // Open create dialog.
      createEmulatorDialog.value = !createEmulatorDialog.value
    }
    const createEmulatorClose = () => {
      // Reload emulator list.
      loadEmulatorList()
      // Close create dialog.
      createEmulatorDialog.value = !createEmulatorDialog.value
    }
    let editEmulatorDialog = ref(false)
    const editEmulatorOpen = () => {
      if (!emulatorStore.value) {
        // Open error dialog.
        emulatorErrorShow()
      } else {
        // Save data of the current emulator into the store.
        let index = emulatorList.value.findIndex((res) => res.id == emulatorStore.value)
        store.commit('setEmulatorForm', emulatorList.value[index])
        // Open edit dialog.
        editEmulatorDialog.value = !editEmulatorDialog.value
      }
    }
    const editEmulatorClose = () => {
      // Reload emulator list.
      loadEmulatorList()
      // Close edit dialog.
      editEmulatorDialog.value = !editEmulatorDialog.value
    }
    let deleteEmulatorDialog = ref(false)
    const deleteEmulatorOpen = () => {
      if (!emulatorStore.value) {
        // Open error dialog.
        emulatorErrorShow()
      } else {
        // Open delete dialog.
        deleteEmulatorDialog.value = !deleteEmulatorDialog.value
      }
    }
    const deleteEmulatorClose = () => {
      // Find entry and update the list.
      let index = emulatorList.value.findIndex((res) => res.id == emulatorStore.value)
      emulatorList.value.splice(index, 1)
      // Save updated list back to file.
      outputJSONSync(emulatorPath, emulatorList.value)
      // Reload emulator list.
      loadEmulatorList()
      // Close delete dialog.
      deleteEmulatorDialog.value = !deleteEmulatorDialog.value
    }
    let emulatorErrorDialog = ref(false)
    const emulatorErrorShow = () => {
      // Toggle error dialog.
      emulatorErrorDialog.value = !emulatorErrorDialog.value
    }

    return {
      createEmulatorClose,
      createEmulatorDialog,
      createEmulatorOpen,
      editEmulatorClose,
      editEmulatorDialog,
      editEmulatorOpen,
      emulatorErrorDialog,
      emulatorErrorShow,
      emulatorList,
      emulatorName,
      emulatorPath,
      emulatorStore,
      deleteEmulatorClose,
      deleteEmulatorDialog,
      deleteEmulatorOpen,
      sortEmulatorList,
    }
  }
}
</script>

<style>
</style>