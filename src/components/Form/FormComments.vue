<template>
  <hip-dialog
    v-show="showComments"
    @close="showComments = !showComments"
    :class="['top-0 left-0', $store.state.sidenavExpanded ? 'w-exp' : 'w-cont']"
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
          <el-button
            icon="el-icon-remove"
            @click="removeComment(index)"
          ></el-button>
        </div>
      </ul>
      <ul class="list-disc list-inside" v-else>
        <li>None</li>
      </ul>
    </div>
  </hip-dialog>
  <div class="flex space-x-2">
    <el-form-item
      class="w-full"
      label="Comments"
      prop="comment"
    >
      <el-input v-model="comment">
        <template #append>
          <el-button
            icon="el-icon-notebook-2"
            @click="showComments = !showComments"
          ></el-button>
          <el-button
            icon="el-icon-circle-plus"
            @click="addComment()"
          ></el-button>
        </template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
import { HipDialog } from '../Component'

export default {
  name: 'form-comments',
  components: {
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
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
