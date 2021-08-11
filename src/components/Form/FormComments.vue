<template>
  <!-- Show comments dialog. -->
  <hip-dialog
    v-show="dialog.viewComments"
    @close="viewComments()"
    class="pos-initial z-10"
  >
    <!-- Comments list. -->
    <div class="flex mb-6">
      <h1 class="font-bold text-xl">Comments</h1>
    </div>
    <div class="mt-1 text-lg">
      <ul class="list-disc list-inside text-theme-800 dark:text-theme-100">
        <div
          v-if="$store.state.gameForm.gameVersion.comments.length > 0"
          class="space-y-4"
        >
          <div
            v-for="(comment, index) in $store.state.gameForm.gameVersion.comments"
            :key="index"
            :value="comment"
            class="flex items-center space-x-6"
          >
            <li class="text-justify">{{ comment }}</li>
            <!-- Remove related comment from the list. -->
            <hip-button
              :icon="true"
              @click="removeComment(index)"
              class="el-icon-remove-outline text-2xl"
            ></hip-button>
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </hip-dialog>
  <!-- Comments input. -->
  <hip-input
    v-model="comment"
    label="Comments"
  >
    <template #append>
      <!-- View comments list dialog. -->
      <hip-input-button
        @click="viewComments()"
        class="el-icon-notebook-2 text-xl"
      ></hip-input-button>
      <!-- Add input comment to the list. -->
      <hip-input-button
        last-element
        @click="addComment()"
        class="el-icon-circle-plus-outline text-xl"
      ></hip-input-button>
    </template>
  </hip-input>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipDialog,
  HipInput,
  HipInputButton
} from '../Component'

export default {
  name: 'FormComments',
  components: {
    // UI components.
    HipButton,
    HipDialog,
    HipInput,
    HipInputButton
  },
  data() {
    return {
      comment: null,
      dialog: {
        viewComments: false
      }
    }
  },
  methods: {
    // Comments operations.
    addComment() {
      // Save comment into the store.
      this.$store.commit('setGameVersionCommentsAdd', this.comment)
      // Reset comment input.
      this.comment = null
    },
    removeComment(com) {
      // Remove comment from the store.
      this.$store.commit('setGameVersionCommentsRemove', com)
    },
    viewComments() {
      // Open comments dialog.
      this.dialog.viewComments = !this.dialog.viewComments
    }
  }
}
</script>

<style>
</style>