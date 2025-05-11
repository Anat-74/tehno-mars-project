<script setup lang="ts">
import type { Product } from '~/types/types'

const config = useRuntimeConfig()
const route = useRoute()
const { currentLocale } = useLocale()
const { categorySlug, subcategorySlug } = route.params

defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
})
</script>

<template>
  <div class="product-card">

    <NuxtLink
            :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
            class="product-link"
          >
          <h3>{{product.name }}</h3>
          <p>Цена: {{product. price }}</p>
          <NuxtImg 
          width="88"
          loading="lazy"
          decoding="async"
          :src="`${config.public.strapi.url}${product.image[0]?.url}`" />
         </NuxtLink>
  </div>
</template>