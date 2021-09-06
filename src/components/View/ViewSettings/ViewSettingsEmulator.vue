<template>
  <!-- Create emulator dialog. -->
  <hip-dialog
    v-show="dialog.createEmulator"
    @close="createEmulatorClose()"
    width="w-2/3"
    class="pos-initial z-10"
  >
    <!-- Insert create emulator form component. -->
    <create-emulator
      :emulatorList="emulatorList"
      :emulatorPath="emulatorPath"
      @close="createEmulatorClose()"
    />
  </hip-dialog>
  <!-- Edit emulator dialog. -->
  <hip-dialog
    v-show="dialog.editEmulator"
    @close="editEmulatorClose()"
    width="w-2/3"
    class="pos-initial z-10"
  >
    <!-- Insert edit emulator form component. -->
    <edit-emulator
      :emulatorList="emulatorList"
      :emulatorPath="emulatorPath"
      @close="editEmulatorClose()"
    />
  </hip-dialog>
  <!-- Delete emulator dialog. -->
  <hip-dialog
    v-show="dialog.deleteEmulator"
    @close="deleteEmulatorOpen()"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      Delete emulator <b>'{{ emulatorName }}'</b> ?
    </p>
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Confirm emulator deletion. -->
      <hip-button
        :icon="true"
        @click="deleteEmulatorClose()"
        class="el-icon-circle-check text-2xl"
      ></hip-button>
      <!-- Cancel emulator deletion. -->
      <hip-button
        :icon="true"
        @click="deleteEmulatorOpen()"
        class="el-icon-circle-close text-2xl"
      ></hip-button>
    </div>
  </hip-dialog>
  <!-- Emulator Setting. -->
  <hip-section-content>
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
      <hip-button
        :icon="true"
        @click="createEmulatorOpen()"
        class="el-icon-circle-plus-outline text-2xl"
      ></hip-button>
      <!-- Edit emulator. -->
      <hip-button
        :icon="true"
        @click="editEmulatorOpen()"
        class="el-icon-edit-outline text-2xl"
      ></hip-button>
      <!-- Delete emulator. -->
      <hip-button
        :icon="true"
        @click="deleteEmulatorOpen()"
        class="el-icon-remove-outline text-2xl"
      ></hip-button>
      <!-- Emulator select. -->
      <hip-select
        v-model="emulator"
        :key="emulatorList"
      >
        <hip-option
          v-for="item in emulatorList.sort(sortEmulatorList)"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></hip-option>
      </hip-select>
    </div>
  </hip-section-content>
</template>

<script>
// Import functions from modules.
import { app } from '@electron/remote'
import {
  existsSync,
  readJSONSync,
  outputJSONSync
} from 'fs-extra'
// Import form components.
import CreateEmulator from '../../Create/CreateEmulator.vue'
import EditEmulator from '../../Edit/EditEmulator.vue'
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipOption,
  HipSectionContent,
  HipSelect
} from '../../Component'

export default {
  name: 'ViewSettingsEmulator',
  components: {
    // Form components.
    CreateEmulator,
    EditEmulator,
    // UI components.
    HipButton,
    HipDialog,
    HipOption,
    HipSectionContent,
    HipSelect
  },
  props: {
    settingsType: { type: String }
  },
  data() {
    return {
      emulatorList: [],
      emulatorPath: app.getAppPath() + '/data/emulators.json',
      dialog: {
        createEmulator: false,
        editEmulator: false,
        deleteEmulator: false
      }
    }
  },
  methods: {
    loadEmulatorList() {
      // Read and load emulator file.
      if (existsSync(this.emulatorPath)) {
        this.emulatorList = readJSONSync(this.emulatorPath)
      }
    },
    // Create operations.
    createEmulatorOpen() {
      // Clear the data on the store.
      this.$store.commit('resetEmulatorForm')
      // Open create dialog.
      this.dialog.createEmulator = !this.dialog.createEmulator
    },
    createEmulatorClose() {
      // Reload emulator list.
      this.loadEmulatorList()
      // Close create dialog.
      this.dialog.createEmulator = !this.dialog.createEmulator
    },
    // Edit operations.
    editEmulatorOpen() {
      // Save data of the current emulator into the store.
      let index = this.emulatorList.findIndex(res => res.id == this.emulator)
      this.$store.commit('setEmulatorForm', this.emulatorList[index])
      // Open edit dialog.
      this.dialog.editEmulator = !this.dialog.editEmulator
    },
    editEmulatorClose() {
      // Reload emulator list.
      this.loadEmulatorList()
      // Close edit dialog.
      this.dialog.editEmulator = !this.dialog.editEmulator
    },
    // Delete operations.
    deleteEmulatorOpen() {
      // Open delete dialog.
      this.dialog.deleteEmulator = !this.dialog.deleteEmulator
    },
    deleteEmulatorClose() {
      // Find entry and update the list.
      let index = this.emulatorList.findIndex(res => res.id == this.emulator)
      this.emulatorList.splice(index, 1)
      // Save updated list back to file.
      outputJSONSync(this.emulatorPath, this.emulatorList)
      // Reload emulator list.
      this.loadEmulatorList()
      // Close delete dialog.
      this.dialog.deleteEmulator = !this.dialog.deleteEmulator
    },
    // Compare function that returns natural ordered elements.
    sortEmulatorList(a, b) {
      return a.name.localeCompare(b.name, navigator.language, { numeric: true, ignorePunctuation: true })
    }
  },
  created() {
    // Load emulator list.
    this.loadEmulatorList()
  },
  computed: {
    emulator: {
      get() { return this.$store.state['settings' + this.settingsType].emulator },
      set(value) { this.$store.state['settings' + this.settingsType].emulator = value }
    },
    emulatorName() {
      if (this.emulator && this.emulatorList.length > 0) {
        let index = this.emulatorList.findIndex(res => res.id == this.emulator)
        return this.emulatorList[index] ? this.emulatorList[index].name : ''
      }
    }
  }
}
</script>

<style>
</style>