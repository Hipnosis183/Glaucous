<template>
  <!-- Show comments dialog. -->
  <hip-dialog
    v-show="dialog.viewComments"
    class="top-0 left-14 z-10"
    @close="viewComments()"
  >
    <!-- Comments list. -->
    <div class="flex mb-6">
      <h1 class="text-xl font-bold">Comments</h1>
    </div>
    <div class="text-lg mt-1">
      <ul class="list-disc list-inside">
        <div
          v-if="$store.state.gameForm.gameVersion.comments.length > 0"
          class="space-y-4"
        >
          <div
            class="flex flex-inline items-center space-x-6"
            v-for="(comment, index) in $store.state.gameForm.gameVersion.comments"
            :key="index"
            :value="comment"
          >
            <li class="text-justify">{{ comment }}</li>
            <!-- Remove related comment from the list. -->
            <hip-button
              class="el-icon-remove-outline text-2xl"
              @click="removeComment(index)"
              :icon="true"
            ></hip-button>
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </hip-dialog>
  <!-- Comment form. -->
  <div class="flex space-x-2">
    <el-form-item
      class="w-full"
      label="Comments"
      prop="comment"
    >
      <el-input v-model="comment">
        <template #append>
          <!-- View comments list dialog. -->
          <el-button
            icon="el-icon-notebook-2"
            @click="viewComments()"
          ></el-button>
          <!-- Add input comment to the list. -->
          <el-button
            icon="el-icon-circle-plus-outline"
            @click="addComment()"
          ></el-button>
        </template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
import {
  HipButton,
  HipDialog
} from '../Component'

export default {
  name: 'FormComments',
  components: {
    HipButton,
    HipDialog
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
