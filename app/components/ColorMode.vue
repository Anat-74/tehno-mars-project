<script setup lang="ts">
const colorMode = useColorMode()

function iconName(theme: string) {
  if (theme === 'system') return 'i-ph-laptop'
  if (theme === 'light') return 'i-ph-sun'
  if (theme === 'dark') return 'i-ph-moon'
   return 'i-ph-coffee'
}
</script>

<template>
   <ul class="color-mode">
      <li class="color-mode__item"
      v-for="theme of ['system', 'light', 'dark', 'sepia']"
      :key="theme"
      >
      <UButton
      @click="colorMode.preference = theme"
       name-class="color-theme"
      :icon="iconName(theme)"
      :theme="theme"
      :aria-label="theme"
      />
      </li>
   </ul>
 </template>
 
 <style lang="scss" scoped>
 .color-mode {
   display: flex;
   column-gap: toRem(4);
   &__item {
      display: flex;
      border: 2px solid var(--border-color);
      border-radius: toRem(6);
   }
 }
 </style>