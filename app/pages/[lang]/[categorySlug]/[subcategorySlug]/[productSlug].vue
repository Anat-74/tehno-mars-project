<script setup lang="ts">
import type { Product } from "../../../../types/types"

const { find } = useStrapi()
const route = useRoute()
const lang = route.params.lang
const { productSlug } = route.params
const config = useRuntimeConfig()
const { currentLocale } = useLocale()

const currentImage = useState<string | null>('currentImage', () => null)

const { data: product, error, status } = useAsyncData(`product-${lang}-${productSlug}`,
   async () => {
    const response = await find<Product>('products', {
       filters: {
          slug: { $eq: productSlug },
          locale: currentLocale.value
       },
      populate: '*'
    })

    if (!response.data || response.data.length === 0) {
       throw createError({
          statusCode: 404,
          message: 'Product Not Found'
       })
  }

     const productData = response.data[0]
     const firstImage = productData?.image?.[0]?.url

     if (firstImage) {
      currentImage.value = `${config.public.strapi.url}${firstImage}`
    }
      return productData
})

const isActive = (imgUrl: string) => 
  computed(() => currentImage.value === `${config.public.strapi.url}${imgUrl}`)

onMounted(() => {
   console.debug('Продукт:', product.value)
   console.log('product data:', product.value)
})
watch(product, (newCategory) => {
  console.log('product data:', newCategory)
})

watch(product, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.description
    })
  }
})

useSeoMeta({
  title: product.value?.name,
  description: product.value?.description
})
</script> 

<template>
   <Loader v-if="status === 'pending'" />
   <div v-if="product"
   class="product-review"
   >
     <h1>Name: {{ product.name }}</h1>
      <NuxtImg 
        v-if="currentImage"
        :src="currentImage"
        :alt="product.name"
        format="webp"
        width="380"
        class="product-review__image"
      />
     <div v-if="product.image?.length"
     class="product-review__thumbnails"
     >
     <div
        v-for="(img, index) in product.image" 
        :key="img.id"
        :class="['product-review__thumbnail', {'product-review__thumbnail_active': isActive(img.url).value}]"
        @mouseover="currentImage = `${config.public.strapi.url}${img.url}`"
        @click="currentImage = `${config.public.strapi.url}${img.url}`"
      >
        <NuxtImg 
          :src="`${config.public.strapi.url}${img.url}`"
          :alt="`${product.name} - Image ${index + 1}`"
          format="webp"
          width="80"
          loading="lazy"
          class="product-review__thumbnail-image"
        />
      </div>
     </div>
     <p
     class="product-review__description"
     >
     <span>{{ product.inStock }}</span>
     {{ product.description }}</p>
     <span>{{ product.price }}</span>
     <UButton
     @click="useAddToCart(product)"
      name-class="add-to-cart"
      label="Добавить в корзину"
      class="product-review__btn"
     />
   </div>
   <div v-else-if="error">Error: {{ error.message }}</div>
 </template>

 <style lang="scss" scoped>
.product-review {
&__image {
   border-radius: toRem(8);
   box-shadow: 0 toRem(2) toRem(8) rgba(0,0,0,0.1);
}

&__thumbnails {
   display: inline-flex;
   align-items: center;
   gap: toRem(10);
   margin-block-start: toRem(15);
}

&__thumbnail {
   cursor: pointer;
  border: toRem(2) solid transparent;
  border-radius: toRem(4);
  transition: all var(--transition-duration);
   &_active {
      opacity: 1;
      border-color: #3b82f6;
   }

   @include hover {
      scale: .9;
   }
}

&__thumbnail-image {
   border-radius: toRem(4);
   transition: opacity var(--transition-duration);
}

&__description {
}

&__btn {
}
}

</style>