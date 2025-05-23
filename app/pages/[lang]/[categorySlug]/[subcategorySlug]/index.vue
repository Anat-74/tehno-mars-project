<script setup lang="ts">
import type { Product, Subcategory } from "../../../../types/types"

const { find } = useStrapi()
const route = useRoute()
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
const config = useRuntimeConfig()
const cartStore = useCartStore()

const { categorySlug, subcategorySlug } = route.params as {
  categorySlug: string
  subcategorySlug: string
}

const { data: subcategory, status, error } = useAsyncData(
  `subcategory-${subcategorySlug}-${currentLocale.value}`,
  async () => {
    const response = await find<Subcategory>('subcategories', {
       filters: {
          slug: { $eq: subcategorySlug },
          category: { slug: { $eq: categorySlug } },
          locale: currentLocale.value
       },
       populate: {
        products: {
             populate: ['image'],
        }
      }
    })

    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Products subCategory Not Found'
      })
    }
     return response.data[0]
   }
)

watch(subcategory, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.description
    })
  }
})

useSeoMeta({
  title: subcategory.value?.name,
  description: subcategory.value?.description
})

watch(subcategory, (newCategory) => {
  console.log('subcategory data:', newCategory);
})

const handleAddToCart = (product: Product) => {
  cartStore.addToCart(
    product,
    categorySlug,
    subcategorySlug
  )
}
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <section class="subcategory-products"
      v-if="subcategory"
      aria-labelledby="subcategory-products"
      >
         <h2 
      id="subcategory-product"
      class="visually-hidden">Товары подкатегории</h2>
      <div class="subcategory-products__go-buttons">
         <UButton
      @click="goBack"
      icon="material-symbols:arrow-back"
      aria-label="go back"
      name-class="go-forward-back"
     />
     <UButton
      @click="goForward"
      icon="material-symbols:arrow-forward"
      aria-label="go forward"
      name-class="go-forward-back"
     />
   </div>
         <ul class="subcategory-products__list"
         v-if="subcategory.products?.length" 
         >
         <li class="subcategory-products__item"
          v-for="product in subcategory.products"
          :key="product.name"
        >
        <NuxtLink class="subcategory-products__link"
            :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
          >
            <NuxtImg class="subcategory-products__image"
              v-if="product.image?.length"
              :src="`${config.public.strapi.url}${product.image[0]?.url}`"
              :alt="product.name"
              loading="lazy"
              decoding="async"
              width="280"
              height="210"
            />
         </NuxtLink>
         <div class="subcategory-products__items-bottom">
              <h3 class="subcategory-products__title">
               {{ product.name }}</h3>
              <span class="subcategory-products__price">
               {{ product.price }}</span>

            <UButton class="subcategory-products__add-to-cart"
            @click="handleAddToCart(product)"
            name-class="small-add-to-cart"
            icon="qlementine-icons:add-to-cart-16"
            aria-label="add to cart"
            />
         </div>
        </li>
        </ul>
      </section>

    <span v-if="error" class="error">
      {{ error.message }}
    </span>
</template>

<style lang="scss" scoped>
.subcategory-products {

&__go-buttons {
   display: flex;
   column-gap: toEm(7);
   padding-block: toEm(9);
}

&__list {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(toRem(290), 1fr));
   justify-items: center;
   align-items: start;
   row-gap: toEm(12);
   @include adaptiveValue("column-gap", 52, 16);
}

&__item {
   justify-self: center;
   display: grid;
   align-items: end;
   min-height: 100%;
   width: 100%;
   padding-block-end: toEm(18);
   box-shadow: 0px 1px 2px 0px var(--shadow);
   border-radius: toEm(4);
}

&__link {
   display: flex;
   justify-content: center;
}

&__image {
   @media (max-width: toEm(628)){
      width: toRem(322);
}
}

&__items-bottom {
   position: relative;
   padding-inline: toEm(16);
}

&__title {
   text-align: center;
   margin-block-end: toEm(18);
}

&__price {
   padding-inline: toEm(6);
   padding-block: toEm(2);
   letter-spacing: 1.2px;
   font-weight: 600;
   color: var(--warning-color);
   background-color: var(--secondary-color);
   border-radius: toEm(4);
}

&__add-to-cart {
   position: absolute;
   right: toRem(18);
   bottom: 0;
}
}

</style>