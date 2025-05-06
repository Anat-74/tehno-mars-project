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
   <div class="product-review__wrapper-left wrapper-left">
      <span class="wrapper-left__in-stock">{{ product.inStock }}</span>
      <NuxtImg 
        v-if="currentImage"
        :src="currentImage"
        :alt="product.name"
        width="480"
        class="wrapper-left__image"
      />
     <ul
      v-if="product.image?.length"
     class="wrapper-left__thumbnails"
     >
     <li
        v-for="(img, index) in product.image" 
        :key="img.id"
        :class="['wrapper-left__thumbnail', {'wrapper-left__thumbnail_active': isActive(img.url).value}]"
        @mouseover="currentImage = `${config.public.strapi.url}${img.url}`"
        @click="currentImage = `${config.public.strapi.url}${img.url}`"
      >
        <NuxtImg 
          :src="`${config.public.strapi.url}${img.url}`"
          :alt="`${product.name} - Image ${index + 1}`"
          width="80"
          class="wrapper-left__thumbnail-image"
        />
      </li>
     </ul>
   </div>
   <div class="product-review__wrapper-right wrapper-right">
      <h2 class="wrapper-right__title">{{ product.name }}</h2>
      <p class="wrapper-right__characteristics">{{ product.characteristics }}</p>
     <p class="wrapper-right__description"
     >{{ product.description }}</p>
     <span class="wrapper-right__price">{{ product.price }}</span>
     <UButton
     @click="useAddToCart(product)"
      name-class="add-to-cart"
      label="Добавить в корзину"
      class="product-review__btn"
     />
   </div>
</div>
   <span v-else-if="error">Error: {{ error.message }}</span>
 </template>

 <style lang="scss" scoped>
.product-review {
   display: grid;
   grid-template-columns: auto minmax(toRem(190), toRem(1220));
   column-gap: toEm(24, 16);
   padding-inline: toEm(22, 16);
   padding-block: toEm(18, 16);
}

.wrapper-left {
   &__in-stock {
   grid-area: inStock;
   display: inline-block;
   margin-block-end: toRem(32);
   color: var(--dark-golden-color);
}

   &__image {
   border-radius: toRem(8);
   box-shadow: 0 toRem(2) toRem(8) rgba(0,0,0,0.1);
}

&__thumbnails {
   display: flex;
   align-items: center;
   justify-content: center;
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
}

.wrapper-right {
   display: grid;
   align-items: center;
   grid-template-columns: 1fr auto;
   grid-template-areas: 
   'title title'
   'descr descr'
   'charact charact'
   'price btn'
   ;

&__title {
   grid-area: title;
   margin-block-end: toEm(22, 16);
}

&__characteristics {
   grid-area: charact;
}

&__description {
   grid-area: descr;
   margin-block-end: toRem(12);
}

&__price {
   grid-area: price;
}

&__btn {
   grid-area: btn;
}
}



</style>