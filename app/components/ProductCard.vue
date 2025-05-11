<script setup lang="ts">
import type { Product } from "../types/types"

const props = defineProps<{
  product: Product & {
    subcategory?: {
      slug: string
      category?: {
        slug: string
      }
    }
  }
}>()

const route = useRoute()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const subcategorySlug = computed(() => props.product.subcategory?.slug || 'subcategory')
const categorySlug = computed(() => {
  return route.params.categorySlug 
    || props.product.subcategory?.category?.slug 
    || 'category'
})
</script>

<template>
  <NuxtLink
    :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
    class="product-link"
  >
    <NuxtImg 
      v-if="product.image?.length"
      width="88"
      loading="lazy"
      decoding="async"
      :src="`${config.public.strapi.url}${product.image[0]?.url}`" 
      :alt="product.name"
    />
  </NuxtLink>
</template>