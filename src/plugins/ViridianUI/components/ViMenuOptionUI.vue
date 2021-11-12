<template>
  <!-- Option item. -->
  <div
    @click="method"
    class="hover:bg-color-600 dark:hover:bg-color-700 duration-500 h-14 relative"
  >
    <!-- Option overlay. -->
    <div class="absolute cursor-pointer h-full w-full" />
    <!-- Option container. -->
    <div class="h-full p-3 pr-5 pointer-events-none">
      <slot>
        <!-- Default option content. -->
        <div class="flex h-full items-center slot text-lg">
          <vi-icon
            v-if="icon"
            icon-manual
            :class="small ? '-ml-0.5 mr-1.5 -mt-0.5 w-7' : 'mr-2 w-6'"
          >
            <component :is="icon" />
          </vi-icon>
          <h6>{{ label }}</h6>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViMenuOptionUI',
  props: {
    icon: { type: String },
    label: { type: String },
    method: { type: Function },
    small: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.slot {
  filter: drop-shadow(1px 1px 0px rgba(var(--color-theme-900), 0.6));
}
</style>