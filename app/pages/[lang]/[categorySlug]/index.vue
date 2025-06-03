<script setup lang="ts">
import type { Category, SubcategoriesResponse } from "../../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'

const { find } = useStrapi()
const route = useRoute()
const { categorySlug } = route.params
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
const config = useRuntimeConfig()

// const page = ref(route.query.page ? +route.query.page : 1)
// const pageSize = 6
//-page-${page.value} кеширование

const { data: category, status, error } = useAsyncData(
  `category-${categorySlug}-${currentLocale.value}`,
  async () => {
     const response = await find('categories', {
       filters: {
          slug: { $eq: categorySlug },
          locale: currentLocale.value
       },
      populate: {
        subcategories: {
            populate: {
              image: {
               fields: ["alternativeText", "url"]
            }
          }
         }
       },
      //  pagination: {
      //   page: page.value,
      //   pageSize: pageSize
      // }
    })

    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'subcategory - Not Found'
      })
     }
    return response.data[0] as Category & { subcategories: SubcategoriesResponse }
   }
)

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

// const pageCount = computed(() => {
//   const total = category.value?.subcategories.meta?.pagination.total || 0
//   return Math.ceil(total / pageSize)
// })
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <section class="sub-category"
      aria-labelledby="sub-category">
         <h1
      id="sub-category"
      class="visually-hidden">{{ visuallyHiddenTranslations[currentLocale].sectionCategorySlugTitle }}</h1>
         <div class="sub-category__buttons">
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
        <ul class="sub-category__list"
         v-if="category?.subcategories?.length"
         >
         <li class="sub-category__item"
          v-for="subcategory in category.subcategories"
          :key="subcategory.id"
        >
        <h2 class="sub-category__title">{{ subcategory.name }}</h2>
          <NuxtLink class="sub-category__link"
            :to="`/${currentLocale}/${categorySlug}/${subcategory.slug}`"
          >
            <NuxtImg
              v-if="subcategory.image?.length"
              :src="`${config.public.strapi.url}${subcategory.image[0]?.url}`"
              :alt="subcategory.name"
              format="webp"
              loading="lazy"
              decoding="async"
              width="180"
              height="230"
            />
         </NuxtLink>
        </li>
        </ul>
        <!-- <Pagination class="sub-category__pagination"
        :page="page"
        :pageCount="pageCount"
        :routeName="$route.name?.toString() || ''"
      /> -->
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
   row-gap: toEm(22);
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
   margin-block-end: toEm(12);
}

&__link {
}

&__pagination {
   justify-self: end;
}
}

</style>
