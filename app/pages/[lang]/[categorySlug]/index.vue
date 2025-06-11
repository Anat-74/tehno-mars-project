<script setup lang="ts">
import type { Category, SubcategoriesResponse } from "../../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'
import { buttonTranslations } from '~/locales/button'

const { find } = useStrapi()
const route = useRoute()
const { categorySlug } = route.params
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
const config = useRuntimeConfig()

const page = ref(route.query.page ? +route.query.page : 1)
const pageSize = 12

const { data: category, pending: categoryPending, error } = useAsyncData(
  `category-${categorySlug}-${currentLocale.value}`,
  async () => {
     const response = await find('categories', {
       filters: {
          slug: { $eq: categorySlug },
          locale: currentLocale.value
        },
        fields: ['id', 'name']
    })

    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'subcategory - Not Found'
      })
     }
    return response.data[0] as Category
   }
)


const { data: subcategories, pending: subcategoriesPending, refresh: refreshSubcategories 
} = useAsyncData(
  `subcategories-${categorySlug}-${page.value}`,
  async () => {
    if (!category.value) return null
    
    const response = await find('subcategories', {
      filters: {
        category: category.value.id,
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
    
    return response as SubcategoriesResponse
  },
  {
     watch: [page, category] // Перезагрузка при смене страницы или категории
  }
)

//Единый флаг загрузки
const isLoading = computed(() => 
  categoryPending.value || subcategoriesPending.value
)

//Вычисляем количество страниц
const pageCount = computed(() => {
  return subcategories.value?.meta?.pagination?.pageCount || 1
})

//Обновляем данные при изменении страницы
watch(() => route.query.page, (newPage) => {
  page.value = newPage ? +newPage : 1
  refreshSubcategories()
})

useSeoMeta({
  title: category.value?.name || '',
  description: category.value?.name || ''
})

watch(category, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.name
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
     <h1 id="sub-category" class="visually-hidden">
       {{ visuallyHiddenTranslations[currentLocale].sectionCategorySlugTitle }}
     </h1>
     
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
     
     <ul 
       v-if="subcategories?.data?.length"
       class="sub-category__list"
     >
       <li 
         v-for="subcategory in subcategories.data" 
         :key="subcategory.id"
         class="sub-category__item"
       >
         <h2 class="sub-category__title">
           {{ subcategory.name }}
         </h2>
         <NuxtLink class="sub-category__link"
            :to="`/${currentLocale}/${categorySlug}/${subcategory.slug}`"
          >
            <NuxtImg
              v-if="subcategory.image?.length"
              :src="`${config.public.strapi.url}${subcategory.image[0]?.url}`"
              :alt="subcategory.name"
              class="sub-category__image"
              format="webp"
              loading="lazy"
              decoding="async"
              width="240"
              height="180"
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
   padding-block-start: toEm(12);
   padding-block-end: toEm(22);

&__buttons {
   display: inline-flex;
   column-gap: toEm(12);
   margin-block-end: toEm(27);
}

&__list {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(toRem(262), 1fr));
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
   box-shadow: 0px 1px 2px 0px var(--shadow);
   border-radius: toEm(4);
}

&__title {
   text-align: center;
   margin-block-end: toEm(12);
}

&__link {
   transition: scale var(--transition-duration);
   @include hover {
      scale: 1.1;
   }
}

&__image {
   height: 100%;
}

&__pagination {
   justify-self: end;
}
}

</style>