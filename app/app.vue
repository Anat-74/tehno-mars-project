<script setup lang="ts">
const { currentLocale } = useLocale()
useHead({
  htmlAttrs: { lang: () => currentLocale.value }
})
</script>

<template>
   <NuxtLayout>
   <NuxtPage />
</NuxtLayout>
</template>

<style lang="scss">
#__nuxt {
   min-height: 100dvh;
   display: flex;
   flex-direction: column;

   main {
      flex: 1 1 auto;
   }
}
</style>
