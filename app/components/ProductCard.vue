<script setup lang="ts">
import type { Product } from "../types/types"

const props = defineProps<{
   product: Product & {
      category?: {
        slug: string
      }
      subcategory?: {
      slug: string
    }
  }
}>()

const route = useRoute()
const { currentLocale } = useLocale()

const categorySlug = computed(() => {
  return (route.params.categorySlug as string) 
    || props.product.subcategory?.category?.slug 
    || 'category'
})

const subcategorySlug = computed(() => {
  return (route.params.subcategorySlug as string)
    || props.product.subcategory?.slug
    || 'subcategory'
})
</script>

<template>
      <li class="product-card">
  <NuxtLink
    :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
    class="product-card__link"
  >
  <h2 class="product-card__title">{{ product.name }}</h2>
  </NuxtLink>
   </li>
</template>

<style lang="scss" scoped>
.product-card {
&__title {
   font-size: toEm(16);
}
}

</style>