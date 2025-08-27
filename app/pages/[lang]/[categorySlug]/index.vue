<script setup lang="ts">
import type { Category, SubcategoriesResponse } from "../../../types/types"
import { buttonTranslations } from '~/locales/button'

const { find } = useStrapi()
const route = useRoute()
const { categorySlug } = route.params
const { currentLocale } = useLocale()
const config = useRuntimeConfig()
const { goBack, goForward } = useGoToForwardOrBack()

const page = ref(route.query.page ? +route.query.page : 1)
const pageSize = 12

const { data, pending, error, refresh } = useAsyncData(
  `category-data-${currentLocale.value}-${categorySlug}-${page.value}`,
  async () => {
    // Параллельная загрузка категории и подкатегорий
    const [categoryRes, subcategoriesRes] = await Promise.all([
      find('categories', {
        filters: {
          slug: { $eq: categorySlug },
          locale: currentLocale.value
        },
        fields: ['id', 'name']
      }),
      find('subcategories', {
        filters: {
          category: { slug: { $eq: categorySlug } }, // Фильтруем по slug категории!
          locale: currentLocale.value
        },
        populate: {
          image: {
            fields: ["alternativeText", "url"]
          }
        },
        pagination: {
          page: page.value,
          pageSize: pageSize
        }
      })
    ])

    // Обработка ошибок
    if (!categoryRes.data || categoryRes.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category Not Found'
      })
    }

    return {
      category: categoryRes.data[0] as Category,
      subcategories: subcategoriesRes as SubcategoriesResponse
    }
  }
)

// 2. Разделяем данные
const category = computed(() => data.value?.category);
const subcategories = computed(() => data.value?.subcategories);

// 3. Управление загрузкой и ошибками
const isLoading = ref(pending);
const pageCount = computed(() => {
  return subcategories.value?.meta?.pagination?.pageCount || 1;
})

// 4. Обновление данных при изменении страницы
watch(() => route.query.page, (newPage) => {
  page.value = newPage ? +newPage : 1;
  refresh();
})

// 5. SEO оптимизация
watchEffect(() => {
  if (category.value) {
    useSeoMeta({
      title: category.value.name,
      description: category.value.name
    })
  }
})
</script>

<template>

    <Loader v-show="isLoading"
      class="loader"
    />
   <section 
      v-show="!isLoading" 
     class="sub-category"
     aria-labelledby="sub-category"
   >
     <div class="sub-category__buttons">
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
     </div>
     <h1 class="sub-category__category-title">
         {{ category?.name }}
      </h1>
     <ul 
       v-if="subcategories?.data?.length"
       class="sub-category__list"
     >
       <li 
         v-for="subcategory in subcategories.data" 
         :key="subcategory.id"
         class="sub-category__item"
       >
         <NuxtLink class="sub-category__link"
            :to="`/${currentLocale}/${categorySlug}/${subcategory.slug}`"
          >
          <h2 class="sub-category__title">
           {{ subcategory.name }}
         </h2>
            <NuxtImg
              v-if="subcategory.image?.length"
              :src="`${config.public.strapi.url}${subcategory.image[0]?.url}`"
              :alt="subcategory.name"
              class="sub-category__image"
              loading="lazy"
              decoding="async"
              width="240"
              height="180"
             format="webp"
            />
         </NuxtLink>
       </li>
     </ul>

     <Pagination 
       class="sub-category__pagination"
       :page="page"
       :pageCount="pageCount"
       :routeName="route.name?.toString() || ''"
     />
   </section>
 
   <div v-if="error" class="error">
     {{ error.message }}
   </div>
 </template>

<style lang="scss" scoped>
.sub-category {
   padding-block: toEm(12);

&__buttons {
   display: inline-flex;
   align-items: center;
   column-gap: toRem(7);
   margin-block-end: toEm(12);
}

&__category-title {
   color: var(--dark-golden-color);
   @include adaptiveValue("margin-block-end", 66, 32);
}

&__list {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(toRem(262), 1fr));
   justify-items: center;
   row-gap: toEm(32);
   @include adaptiveValue("column-gap", 64, 7);
}

&__item {
   width: 100%;
   display: grid;
   justify-items: center;
   padding-inline: toEm(12);
   padding-block-end: toEm(7);
   background-color: var(--bg-product);
   box-shadow: 0px 1px 2px 0px var(--shadow);
   border-radius: toEm(4);
}

&__link {
   min-height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   row-gap: toEm(4);
   transition: scale var(--transition-duration);
   @include hover {
      scale: 1.1;

      .sub-category__title {
         color: var(--warning-hover);
      }
   }
}

&__title {
   flex: 1 1 auto;
   text-align: center;
   margin-block-end: toEm(7);
   transition: color var(--transition-duration);
}

&__pagination {
   justify-self: end;
}
}

</style>