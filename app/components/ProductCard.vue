<script setup lang="ts">
import type { Product } from "../types/types"
import { formatPrice } from '~/utils/formatPrice'
import { buttonTranslations } from '~/locales/button'

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
const config = useRuntimeConfig()
const cartStore = useCartStore()
const { isInCart } = useIsInCart()

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

const handleAddToCart = () => {
  cartStore.addToCart(
    props.product,
   categorySlug.value,
   subcategorySlug.value,
  )
}
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
      :src="`${config.public.strapi.url}${product.image[0]?.url}`" 
      width="58"
      loading="lazy"
      decoding="async"
      :alt="product.name"
      class="product-card__image"
    />
    <span class="product-card__price">{{ formatPrice(product.price) }}</span>
  </NuxtLink>
  <UButton
        v-if="!isInCart(product.id)"
      @click="handleAddToCart"
      name-class="small-add-to-cart"
      icon="qlementine-icons:add-to-cart-16"
      :aria-label="buttonTranslations[currentLocale].label"
     />
     <UButton 
        class="subcategory-products__add-to-cart"
        v-else
        disabled
        name-class="small-add-to-cart"
        icon="emojione-v1:left-check-mark"
        :aira-label="buttonTranslations[currentLocale].ariaLabelAdded"
      />
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