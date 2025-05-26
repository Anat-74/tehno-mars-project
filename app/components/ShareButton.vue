<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const copyLink = async () => {
  const productLink = `${config.public.siteUrl}${route.fullPath.split('?')[0]}` // Текущий URL без параметров

  try {
    await navigator.clipboard.writeText(productLink)
  } catch (err) {
    console.error('Ошибка копирования:', err)
    // Fallback для старых браузеров
    const input = document.createElement('input')
    input.value = productLink
    document.body.appendChild(input)
    input.select()
    document.body.removeChild(input)
   }

   console.debug('Ссылка:', `${config.public.siteUrl}${route.fullPath.split('?')[0]}`)
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