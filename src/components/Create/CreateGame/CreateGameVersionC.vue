<template>
  <div class="flex-1 relative">
    <div
      class="transform ease-in-out transition-all duration-1000 top-0 flex items-center justify-center fixed h-full"
      :class="[comments ? 'visible' : 'hidden', $store.state.sidenavExpanded ? 'w-exp left-exp' : 'w-cont left-cont']"
    >
      <div
        class="bg-black bg-opacity-50 w-full h-full"
        @click="showComments()"
      >
      </div>
      <div class="absolute bg-white p-6 rounded-xl shadow leading-loose max-w-prose">
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
              <button
                class="px-5 py-2 block rounded-full bg-gray-300"
                @click="removeComment(index)"
              >-</button>
            </div>
          </ul>
          <ul
            class="list-disc list-inside"
            v-else
          >
            <li>None</li>
          </ul>
        </div>
      </div>
    </div>
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
      <button
        class="mt-1 mb-2 px-4 py-1 block w-auto h-full rounded-full bg-gray-300"
        @click="showComments()"
      >*</button>
      <button
        class="mt-1 mb-2 px-4 py-1 block w-auto h-full rounded-full bg-gray-300"
        @click="addComment()"
      >+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-game-version-c',
  data() {
    return {
      comment: null,
      comments: 0
    }
  },
  methods: {
    addComment() {
      this.$store.commit('setGameVersionCommentsAdd', this.comment)
      this.comment = null
    },
    removeComment(com) {
      this.$store.commit('setGameVersionCommentsRemove', com)
    },
    showComments() {
      this.comments = !this.comments
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
.w-exp {
  width: calc(100vw - 15rem);
}
.w-cont {
  width: calc(100vw - 3.5rem);
}
.left-exp {
  left: 15rem;
}
.left-cont {
  left: 3.5rem;
}
</style>
