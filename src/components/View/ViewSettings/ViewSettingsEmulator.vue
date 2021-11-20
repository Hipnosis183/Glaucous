<template>
  <!-- Create emulator dialog. -->
  <create-emulator
    v-show="createEmulatorDialog"
    :emulator-list="emulatorList"
    :emulator-path="emulatorPath"
    @close="createEmulatorClose()"
  />
  <!-- Edit emulator dialog. -->
  <edit-emulator
    v-show="editEmulatorDialog"
    :emulator-list="emulatorList"
    :emulator-path="emulatorPath"
    @close="editEmulatorClose()"
  />
  <!-- Delete emulator dialog. -->
  <vi-dialog-box
    v-show="deleteEmulatorDialog"
    @accept="deleteEmulatorClose()"
    @cancel="deleteEmulatorOpen()"
    dialog-actions="OkCancel"
  >
    Delete emulator <b>'{{ emulatorName }}'</b> ?
  </vi-dialog-box>
  <!-- Error dialog. -->
  <vi-dialog-box
    v-show="emulatorErrorDialog"
    @accept="emulatorErrorShow()"
  >
    Can't perform the operation without an emulator selected.
  </vi-dialog-box>
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
    <!-- Emulator select. -->
    <vi-select
      v-model="emulatorStore"
      :key="emulatorList"
      select-clearable
      select-placeholder="No Emulator"
    >
      <vi-option
        v-for="item in emulatorList.sort(sortEmulatorList)"
        :key="item.id"
        :option-label="item.name"
        :option-value="item.id"
      />
      <!-- Buttons -->
      <template #append>
        <!-- Create emulator. -->
        <vi-input-button @click="createEmulatorOpen()">
          <vi-icon class="w-6">
            <icon-add />
          </vi-icon>
        </vi-input-button>
        <!-- Delete emulator. -->
        <vi-input-button @click="deleteEmulatorOpen()">
          <vi-icon class="w-6">
            <icon-remove />
          </vi-icon>
        </vi-input-button>
        <!-- Edit emulator. -->
        <vi-input-button
          input-last
          @click="editEmulatorOpen()"
        >
          <vi-icon class="w-6">
            <icon-edit />
          </vi-icon>
        </vi-input-button>
      </template>
    </vi-select>
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