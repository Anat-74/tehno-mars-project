<script setup lang="ts">
interface PropsProducts {
   id?: number | string
   name?: string
   price?: number
   image?: string
   description?: string
   category?: string
   slug?: string
}
defineProps<PropsProducts>()
const { currentLocale } = useLocale()
</script>

<template>
  <!-- <li>
   <h2>{{ category }}</h2>
   <h3>{{ name }}</h3>
        <span>Цена: {{ price }} ₽</span>
        <NuxtLink
        :to="`/${currentLocale}/${slug}`"
        >
        <NuxtImg
          :src="image"
          :alt="name"
          format="webp"
          width="122"
        /></NuxtLink>
  </li> -->
</template>

<style lang="scss" scoped>

</style>