<script setup lang="ts">
import type { Product } from "../../types/types"

const { find } = useStrapi()
const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()
const lang = route.params.lang
const slug = route.params.slug

const currentImage = useState<string | null>('currentImage', () => null)

const { data: product, error, status } = await useAsyncData(`product-${lang}-${slug}`,
   async () => {
    const response = await find<Product>('products', {
       filters: { slug: slug },
       locale: lang,
      populate: '*'
    })

    if (!response.data || response.data.length === 0) {
    throw createError({ statusCode: 404, message: 'Продукт не найден' })
  }

     const productData = response.data[0]
     const firstImage = productData?.image?.[0]?.url

     if (firstImage) {
      currentImage.value = `${config.public.strapi.url}${firstImage}`
    }
      return productData
})

const addToCart = (product: Product) => {
   const productData = {
    category: product.category?.name || '',
    id: product.id,
    name: product.name,
    description: product.description || '',
    image: product.image?.[0]?.url || '',
    price: product.price || 0,
  }
  cartStore.addToCart(productData)
}

const isActive = (imgUrl: string) => 
  computed(() => currentImage.value === `${config.public.strapi.url}${imgUrl}`)

onMounted(() => {
   console.debug('Продукт:', product.value)
})

useSeoMeta({
  title: product.value?.name,
  description: product.value?.description
})
</script> 

<template>
   <Loader v-if="status === 'pending'" />
   <div v-if="product">
     <h1>Name: {{ product.name }}</h1>
     <div v-if="currentImage" class="main-image">
      <NuxtImg 
        :src="currentImage"
        :alt="product.name"
        format="webp"
        width="344"
        class="main-image__img"
      />
    </div>
     
     <div v-if="product.image?.length"
     class="thumbnails"
     >
     <div 
        v-for="(img, index) in product.image" 
        :key="img.id"
        class="thumbnail"
        :class="{ 'thumbnail--active': isActive(img.url).value}"
        @mouseover="currentImage = `${config.public.strapi.url}${img.url}`"
        @click="currentImage = `${config.public.strapi.url}${img.url}`"
      >
        <NuxtImg 
          :src="`${config.public.strapi.url}${img.url}`"
          :alt="`${product.name} - Image ${index + 1}`"
          format="webp"
          width="80"
          loading="lazy"
          class="thumbnail__img"
        />
      </div>
      <button @click="addToCart(product)">addToCart</button>
     </div>
   </div>
   <div v-else-if="error">Error: {{ error.message }}</div>
 </template>

 <style lang="scss" scoped>
.main-image {
  margin: 20px 0;
}

.main-image__img {
   height: toRem(368);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.thumbnails {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.thumbnail {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.thumbnail:hover {
  transform: scale(.9);
}

.thumbnail--active {
  border-color: #3b82f6;
}

.thumbnail__img {
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.thumbnail--active .thumbnail__img {
  opacity: 1;
}
</style>

