<template>
  <!-- Show comments dialog. -->
  <vi-dialog
    v-show="commentsDialog"
    @close="commentsShow()"
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
            <vi-button-icon @click="commentRemove(index)">
              <vi-icon class="w-6">
                <icon-remove />
              </vi-icon>
            </vi-button-icon>
          </div>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </vi-dialog>
  <!-- Comments input. -->
  <vi-input
    v-model="comment"
    label="Comments"
  >
    <template #append>
      <!-- View comments list dialog. -->
      <vi-input-button @click="commentsShow()">
        <vi-icon class="w-5">
          <icon-list />
        </vi-icon>
      </vi-input-button>
      <!-- Add input comment to the list. -->
      <vi-input-button
        last-element
        @click="commentAdd()"
      >
        <vi-icon class="w-5">
          <icon-add />
        </vi-icon>
      </vi-input-button>
    </template>
  </vi-input>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionComments',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage comments operations.
    let comment = ref(null)
    const commentAdd = () => {
      // Save comment into the store.
      store.commit('setGameVersionCommentsAdd', comment.value)
      // Reset comment input.
      comment.value = null
    }
    const commentRemove = (com) => {
      // Remove comment from the store.
      store.commit('setGameVersionCommentsRemove', com)
    }
    let commentsDialog = ref(false)
    const commentsShow = () => {
      // Toggle comments dialog.
      commentsDialog.value = !commentsDialog.value
    }

    return {
      comment,
      commentAdd,
      commentRemove,
      commentsDialog,
      commentsShow
    }
  }
}
</script>

<style>
</style>