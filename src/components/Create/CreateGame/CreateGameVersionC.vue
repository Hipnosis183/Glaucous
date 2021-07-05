<template>
  <hip-dialog
    v-show="showComments"
    @close="showComments = !showComments"
    :class="['top-0', $store.state.sidenavExpanded ? 'w-exp left-exp' : 'w-cont left-cont']"
  >
    <div class="flex mb-6">
      <h1 class="text-xl font-bold">Comments</h1>
    </div>
    <div class="text-lg mt-1">
      <ul
        class="list-disc list-inside"
        v-if="$store.state.gameForm.gameVersion.comments.length > 0"
      >
        <div
          class="flex flex-inline items-center space-x-6"
          v-for="(c, index) in $store.state.gameForm.gameVersion.comments"
          :key="index"
          :value="c"
        >
          <li class="text-justify">{{ c }}</li>
          <hip-button @click="removeComment(index)">-</hip-button>
        </div>
      </ul>
      <ul class="list-disc list-inside" v-else>
        <li>None</li>
      </ul>
    </div>
  </hip-dialog>
  <label class="text-blue-900 ml-2">Current Version</label>
  <input
    type="text"
    class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
    v-model="currentVersion"
  >
  <label class="text-blue-900 ml-2">Comments</label>
  <div class="flex space-x-2">
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="comment"
    >
    <hip-button @click="showComments = !showComments">*</hip-button>
    <hip-button @click="addComment()">+</hip-button>
  </div>
</template>

<script>
import { HipButton, HipDialog } from '../../Component'

export default {
  name: 'create-game-version-c',
  components: {
    HipButton,
    HipDialog
  },
  data() {
    return {
      comment: null,
      showComments: false
    }
  },
  methods: {
    addComment() {
      this.$store.commit('setGameVersionCommentsAdd', this.comment)
      this.comment = null
    },
    removeComment(com) {
      this.$store.commit('setGameVersionCommentsRemove', com)
    }
  },
  computed: {
    currentVersion: {
      get() { return this.$store.state.gameForm.gameVersion.currentVersion },
      set(value) { this.$store.commit('setGameVersionCurrentVersion', value) }
    }
  }
}
</script>

<style>
.left-exp {
  left: 15rem;
}
.left-cont {
  left: 3.5rem;
}
</style>
