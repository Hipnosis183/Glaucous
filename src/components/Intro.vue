<template>
  <transition>
    <div
      v-show="showIntro"
      class="absolute flex h-screen items-center w-screen"
    >
      <viridian-logo
        :dark="!$store.getters.getSettingsThemesDarkMode"
        class="m-auto w-1/2"
      />
    </div>
  </transition>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import assets.
import ViridianLogo from '@/components/Assets/ViridianLogoIntro.vue'

export default {
  name: 'Intro',
  components: {
    ViridianLogo
  },
  emits: [
    'finish'
  ],
  setup(props, { emit }) {
    // Manage intro lifecycle.
    let showIntro = ref(false)
    onMounted(() => {
      // Initiate intro.
      showIntro.value = true
      setTimeout(() => {
        // Finish intro.
        showIntro.value = false
        // Delay to compensate transition.
        setTimeout(() => {
          // Emit end of intro event to parent.
          emit('finish')
        }, 600)
      }, 4000)
    })

    return {
      showIntro
    }
  }
}
</script>

<style>
</style>