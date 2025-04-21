<script setup lang="ts">
interface PropsProducts {
   id?: number | string
   name?: string
   price?: number
   image?: string
   description?: string
   slug?: string
}
defineProps<PropsProducts>()
const { currentLocale } = useLocale()
</script>

<template>
   <div>
      <h3>{{ name }}</h3>
      <span>Цена: {{ price }} ₽</span>
      <p>Описание: {{ description }}</p>
   <NuxtLink
            :to="`/${currentLocale}/${slug}`">
            <NuxtImg
          :src="image"
          :alt="name"
          format="webp"
          width="122"
        />
         </NuxtLink>
   </div>
</template>

<style lang="scss" scoped>

</style>