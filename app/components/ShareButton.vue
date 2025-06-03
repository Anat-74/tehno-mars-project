<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const copyLink = async () => {
  const productLink = `${config.public.siteUrl}${route.fullPath.split('?')[0]}` // Текущий URL без параметров

  try {
    await navigator.clipboard.writeText(productLink)
  } catch (err) {
    console.error('Ошибка копирования:', err)
   }
}
</script>

<template>
   <UButton
   @click="copyLink"
   icon="ph:link-simple-bold"
   name-class="share"
   aria-label="Copy link to product"
   />
</template>