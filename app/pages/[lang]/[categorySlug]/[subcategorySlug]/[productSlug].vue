<script setup lang="ts">
import type { Product } from "../../../../types/types"

const { find } = useStrapi()
const route = useRoute()
const lang = route.params.lang
const { productSlug } = route.params
const config = useRuntimeConfig()
const { currentLocale } = useLocale()
const { goBack } = useGoToForwardOrBack()

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

  const characteristics = computed(() => {
  try {
    return JSON.parse(product.value?.characteristics || '[]')
  } catch {
    return []
  }
  })

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
      <UButton
      @click="goBack"
      icon="material-symbols:arrow-back"
      aria-label="go back"
      name-class="go-forward-back"
     />
     <ProductStatus 
      :product="product"
      class="wrapper-left__in-stock"
     />
      <NuxtImg 
        v-if="currentImage"
        :src="currentImage"
        :alt="product.name"
        width="580"
        height="436"
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
          width="133"
          height="100"
          class="wrapper-left__thumbnail-image"
        />
      </li>
     </ul>
   </div>
   <div class="product-review__wrapper-right wrapper-right">
      <h2 class="wrapper-right__title">{{ product.name }}</h2>
      <MDC 
      class="wrapper-right__description"
      :value="product.description" 
      />
      <ProductCharacteristics 
      :specs="characteristics" 
       class="wrapper-right__characteristics"
      />
     <span class="wrapper-right__price">
      <Icon name="my-icon:icon-by-regular" />
      {{ product.price }}
     </span>
     <UButton
     @click="useAddToCart(product)"
      name-class="add-to-cart"
      label="Добавить в корзину"
      class="wrapper-right__btn"
     />
   </div>
</div>
   <span v-else-if="error">Error: {{ error.message }}</span>
 </template>

 <style lang="scss" scoped>
.product-review {
   display: grid;
   grid-template-columns: auto minmax(toRem(190), toRem(1220));
   column-gap: toEm(24);
   padding-block: toEm(18);

   @media (max-width:$tablet){
      grid-template-columns: 1fr;
      justify-items: center;
      row-gap: toEm(22);
   }
}

.wrapper-left {
   position: relative;

   &__in-stock {
   display: inline-block;
   position: absolute;
   right: 0;
   top: toRem(4);
   padding-inline: toEm(8);
   padding-block: toEm(4);
   border-radius: toRem(4);
   background-color: var(--bg);
   box-shadow: 0px 1px toRem(5) var(--shadow);
}

   &__image {
   margin-block-start: toRem(10);
   border-radius: toRem(8);
   box-shadow: 0 0 toRem(4) var(--shadow);
   @include adaptiveValue("margin-block-end", 48, 12);
}

&__thumbnails {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: toEm(10);

   @media (max-width:$tablet){
      margin-block-end: toEm(22);;
   }
}

&__thumbnail {
  cursor: pointer;
  border: toRem(2) solid transparent;
  border-radius: toRem(4);
  box-shadow: 0px 1px toRem(5) var(--shadow);
  transition: all var(--transition-duration);
   &_active {
      border-color: var(--dark-golden-color);
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
   row-gap: toEm(12);
   grid-template-areas: 
   'title title'
   'descr descr'
   'charact charact'
   'price btn'
   ;

&__title {
   grid-area: title;
   justify-self: start;
   padding-inline: toEm(8, 22);
   padding-block: toEm(4, 22);
   border-radius: toEm(4, 22);
   color: var(--dark-golden-color);
   background-color: var(--bg);
   box-shadow: 0px 1px toRem(5) var(--shadow);
}

&:deep(.wrapper-right__description) {
   grid-area: descr;
   padding-inline: toEm(8);
   padding-block-start: toEm(16);
   padding-block-end: toEm(2);
   border-radius: toRem(4);
   background-color: var(--bg);
   box-shadow: 0px 1px toRem(5) var(--shadow);
}

&:deep(.wrapper-right__characteristics) {
   grid-area: charact;
}

&__price {
   grid-area: price;
   font-weight: 600;
   justify-self: start;
   padding-inline: toEm(8);
   padding-block: toEm(4);
   border-radius: toRem(4);
   color: var(--dark-golden-color);
   background-color: var(--bg);
   box-shadow: 0px 1px toRem(5) var(--shadow);
   svg {
      translate: 0 toRem(2);
      color: var(--dark-golden-color);
   }
}

&__btn {
   grid-area: btn;
}
}
</style>