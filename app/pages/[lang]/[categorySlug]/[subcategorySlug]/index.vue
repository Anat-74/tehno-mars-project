<script setup lang="ts">
import type { Product, ProductsResponse, Subcategory } from "../../../../types/types"
import { productFilterTranslations } from '~/locales/productFilter'
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'
import { buttonTranslations } from '~/locales/button'
import { formatPrice } from '~/utils/formatPrice'

const { find } = useStrapi()
const route = useRoute()
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
const { isInCart } = useIsInCart()
const config = useRuntimeConfig()
const cartStore = useCartStore()

const sortOption = ref<string>('name:asc')
const page = ref(route.query.page ? +route.query.page : 1) // Текущая страница из query-параметра
const pageSize = 12 // Количество товаров на странице

const { categorySlug, subcategorySlug } = route.params as {
  categorySlug: string
  subcategorySlug: string
}

// Получаем ID подкатегории (без товаров)
const { data: subcategory, pending: subcategoryPending, error } = useAsyncData(
  `subcategory-${currentLocale.value}-${subcategorySlug}`,
  async () => {
    const response = await find('subcategories', {
      filters: {
        slug: { $eq: subcategorySlug },
        category: { slug: { $eq: categorySlug } },
        locale: currentLocale.value
      },
      fields: ['id', 'name']
    })

    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Products subCategory Not Found'
      })
    }
    return response.data[0] as Subcategory
  }
)

// Получаем товары с пагинацией и сортировкой
const { 
  data: products, 
  pending: productsPending,
  refresh: refreshProducts
} = useAsyncData(
  `products-${subcategorySlug}-${page.value}-${sortOption.value}`,
  async () => {
    if (!subcategory.value) return null
    
    const response = await find('products', {
      filters: {
        subcategory: subcategory.value.id,
        locale: currentLocale.value
      },
      populate: {
        image: {
          fields: ["alternativeText", "url"]
        }
      },
      sort: sortOption.value,
      pagination: {
        page: page.value,
        pageSize: pageSize
      }
    })

    return response as ProductsResponse
  },
  {
    // Перезагружаем при изменении страницы, сортировки или подкатегории
    watch: [page, sortOption, subcategory]
  }
   )

//  Единый флаг загрузки
const isLoading = computed(() => 
  subcategoryPending.value || productsPending.value
)

// Вычисляем общее количество страниц
const pageCount = computed(() => {
  if (!products.value?.meta?.pagination) return 1
  return products.value.meta.pagination.pageCount
})

// Обработчик изменения страницы
watch(() => route.query.page, (newPage) => {
  page.value = newPage ? +newPage : 1
})

// Обновляем товары при изменении сортировки
watch(sortOption, () => {
  refreshProducts()
})

useSeoMeta({
  title: subcategory.value?.name,
  description: subcategory.value?.name
})

watch(subcategory, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.name
    })
  }
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
  <Loader v-show="isLoading" 
  class="loader"
  />
  <section 
    v-show="!isLoading"
    class="subcategory-products"
    aria-labelledby="subcategory-products"
  >
    <div class="subcategory-products__row-top">
      <UButton
        @click="goBack"
        icon="material-symbols:arrow-back"
        :aria-label="buttonTranslations[currentLocale].ariaLabelGoBack"
        name-class="go-forward-back"
      />
      <UButton
        @click="goForward"
        icon="material-symbols:arrow-forward"
        :aria-label="buttonTranslations[currentLocale].ariaLabelGoForward"
        name-class="go-forward-back"
      />
      <div class="subcategory-products__select-wrapper select-wrapper">
        <label 
          class="visually-hidden"
          for="sort-subcategory-product"
        >
          {{ productFilterTranslations[currentLocale].labelSelect }}
        </label>
        
        <select 
          class="subcategory-products__select select"
          v-model="sortOption"
          id="sort-subcategory-product"
        >
          <option 
            class="option"
            disabled
            value=""
          ></option>
          <option
            class="option"
            value="name:asc"
          >
            {{ productFilterTranslations[currentLocale].optionName }}
          </option>
          <option
            class="option"
            value="price:asc"
          >
            {{ productFilterTranslations[currentLocale].optionPrice }}(🡹)
          </option>
          <option 
            class="option"
            value="price:desc"
          >
            {{ productFilterTranslations[currentLocale].optionPriceDesc }}(🡻)
          </option>
        </select>
      </div>
    </div>
    <h1 class="subcategory-products__subcategory-title">
         {{ subcategory?.name }}
      </h1>
    <h2 class="visually-hidden">{{ visuallyHiddenTranslations[currentLocale].sectionSubcategorySlugList }}</h2>
    <ul
      v-if="products?.data.length" 
      class="subcategory-products__list"
    >
      <li 
        v-for="product in products.data" 
        :key="product.id"
        class="subcategory-products__item"
      >
      <Icon 
      v-if="product.isDiscount"
      class="subcategory-products__discount-icon"
      name="mdi:discount" />
      <ProductStatus 
      :product="product"
      class="subcategory-products__in-stock"
     />
        <NuxtLink 
          class="subcategory-products__link"
          :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
        >
          <NuxtImg 
            class="subcategory-products__image"
            v-if="product.image?.length"
            :src="`${config.public.strapi.url}${product.image[0]?.url}`"
            :alt="product.name"
            loading="lazy"
            decoding="async"
            width="240"
            height="180"
          />
        </NuxtLink>
        
        <div class="subcategory-products__items-bottom">
          <h3 class="subcategory-products__title">
            {{ product.name }}
          </h3>
          
          <span
          :class="['subcategory-products__price', {'subcategory-products__price_discount': product.isDiscount}]"
          >
            {{ formatPrice(product.price) }}
          </span>

          <UButton 
            v-if="!isInCart(product.id)"
            @click="handleAddToCart(product)"
            class="subcategory-products__add-to-cart"
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
      </li>
    </ul>

    <Pagination 
      v-if="pageCount > 1"
      class="subcategory-products__pagination"
      :page="page"
      :pageCount="pageCount"
      :routeName="route.name?.toString() || ''"
    />
  </section>

  <span v-if="error" class="error">
    {{ error.message }}
  </span>
</template>

<style lang="scss" scoped>
.subcategory-products {
   padding-block: toEm(12);

&__row-top {
   display: grid;
   grid-template-columns: repeat(2,auto) 1fr;
   align-items: center;
   column-gap: toRem(7);
   margin-block-end: toEm(12);
}

&__select-wrapper {
   justify-self: end;
   display: flex;
   height: 100%;
}

&__subcategory-title {
   color: var(--dark-golden-color);
   @include adaptiveValue("margin-block-end", 66, 32);
}

&__list {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(toRem(262), 1fr));
   justify-items: center;
   row-gap: toEm(32);
   @include adaptiveValue("column-gap", 64, 7);

   @media (max-width:toEm(568)){
      grid-template-columns: repeat(2, 1fr);
   }
}

&__item {
   position: relative;
   justify-self: center;
   display: grid;
   min-height: 100%;
   width: 100%;
   padding-block-end: toEm(18);
   box-shadow: 0px 1px 2px 0px var(--shadow);
   border-radius: toEm(4);
}

&__discount-icon {
   position: absolute;
   top: toEm(2);
   left: toEm(2);
   color: var(--lime-color);
   font-size: toEm(27);
}

&__in-stock {
   justify-self: end;
   padding: toEm(4);
}

&__link {
   display: flex;
   justify-content: center;
   margin-block-end: toEm(4);
   transition: scale var(--transition-duration);

@include hover {
   scale: 1.1;
}
}

&__image {
   @media (max-width: toEm(628)){
      width: toRem(322);
}
}

&__items-bottom {
   display: flex;
   flex-direction: column;
   position: relative;
   padding-inline: toEm(16);
   @include adaptiveValue("padding-inline", 16, 2);
}

&__title {
   flex: 1 1 auto;
   text-align: center;
   margin-block-end: toEm(18);
}

&__price {
   padding-inline-start: toEm(12);
   padding-block: toRem(7);
   font-weight: 600;
   color: var(--warning-color);
   background-color: var(--secondary-color);
   border-radius: toRem(14);

   &_discount {
      font-weight: 600;
      color: var(--lime-color);
   }
}

&__add-to-cart {
   position: absolute;
   right: toRem(17);
   bottom: toRem(3);
   @include adaptiveValue("right", 17, 4);
   }

   &__pagination {
      justify-self: end;
   }
}
</style>