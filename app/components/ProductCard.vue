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
   <div class="product-card">
  <NuxtLink
    :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
    class="product-card__link"
  >
  <h3 class="product-card__title">{{ product.name }}</h3>
    <NuxtImg 
      v-if="product.image?.length"
      width="58"
      loading="lazy"
      decoding="async"
      :src="`${config.public.strapi.url}${product.image[0]?.url}`" 
      :alt="product.name"
      class="product-card__image"
    />
    <span class="product-card__price">{{ product.price }}</span>
  </NuxtLink>
</div>
</template>

<style lang="scss" scoped>
.product-card {
&__link {
}

&__title {
   font-size: toEm(16);
}

&__image {
}

&__price {

}
}

</style>