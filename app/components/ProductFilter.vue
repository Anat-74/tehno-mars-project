<script setup lang="ts">
import { productFilterTranslations } from '~/locales/productFilter'
const { currentLocale } = useLocale()
const route = useRoute()
const searchStore = useSearchStore()
const { products, status, hasSearched } = storeToRefs(searchStore)

// Полная синхронизация с хранилищем
const searchName = computed({
  get: () => searchStore.filters.name,
  set: value => searchStore.filters.name = value
})

const sortBy = computed({
  get: () => searchStore.filters.sort,
  set: value => searchStore.filters.sort = value
})

// Автоматический сброс при переходе на товар
watch(() => route.params.productSlug, (newSlug) => {
  if (newSlug) {
    searchStore.resetFilters()
    // Принудительный триггер обновления
    searchName.value = ''
    sortBy.value = ''
  }
})

// Дебаунс для поиска
const applyFilters = () => {
  searchStore.executeSearch()
}

// Реакция на любые изменения фильтров
watch([searchName, sortBy], () => {
  applyFilters()
})
</script>

<template>
  <div
  class="search-body" 
   role="search"
  >
  <label 
   class="visually-hidden"
   for="my-search"
   > {{ productFilterTranslations[currentLocale].labelInput }}
</label>
    <input 
      v-model="searchName" 
      :placeholder="productFilterTranslations[currentLocale].placeholder"
      @input="applyFilters"
      class="search-input"
      type="search"
      id="my-search"
    >
      <Icon
   v-if="status === 'pending'"
   name="eos-icons:bubble-loading" 
   class="search-loader"
   />

   <Icon
   name="ph:magnifying-glass-light"
   class="search-glass"
   />
   <span 
    v-if="hasSearched && products.length === 0 && status !== 'pending'"
   class="search-no-results">
   {{ productFilterTranslations[currentLocale].noResults }}
    </span>
   <div class="search-select-wrapper select-wrapper">
      <label 
      class="visually-hidden"
      for="sort-product"
      >{{ productFilterTranslations[currentLocale].labelSelect }}
   </label>
      <select 
      v-model="sortBy" 
      @change="applyFilters"
      id="sort-product"
      class="search-select select"
    >
      <option 
      class="search-option option"
      disabled
      value="">
   </option>
      <option 
      class="search-option option" 
      value="name:asc"
      >{{ productFilterTranslations[currentLocale].optionName }}
   </option>
      <option 
      class="search-option option" 
      value="price:asc"
      >{{ productFilterTranslations[currentLocale].optionPrice }}(🡹)
   </option>
      <option 
      class="search-option option" 
      value="price:desc"
      > {{ productFilterTranslations[currentLocale].optionPriceDesc }}(🡻)
   </option>
    </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
   &-body {
      position: relative;
      height: toRem(40);
      display: flex;
      align-items: center;
   }

   &-input {
      width: 100%;
      height: 100%;
      padding-inline-start: toRem(42);
      border-radius: toEm(4) toEm(0) toEm(0) toEm(4);
      border: toRem(2) solid var(--danger-color);
      border-right: none;
      font-size: toEm(18);
      background-color: var(--light-color);
   }

   &-loader {
      position: absolute;
      top: 50%;
      right: toRem(222);
      translate: 0 -50%;
      font-size: toRem(25);
      color: var(--sky-blue-color);
   }

   &-glass {
      position: absolute;
      top: 50%;
      left: toRem(12);
      translate: 0 -50%;
      color: var(--warning-color);
      font-size: toRem(25);
   }

   &-no-results {
      white-space: nowrap;
      position: absolute;
      left: 50%;
      translate: -50% 0;
      bottom: toRem(-22);
      font-weight: 600;
      color: var(--primary-color);
   }

   &-select-wrapper {
      height: 100%;

&::before,
   &::after{
      content: '';
      width: toRem(10);
      height: toEm(3);
      background-color: var(--danger-color);

      @media (max-width:$mobile){
         background-color: var(--light-color);
      }
   }
   &::before {
      right: toRem(16);
      transform: rotate(-125deg);
      @include adaptiveValue("right", 16, 10);
   }
   &::after {
      right: toRem(12);
      transform: rotate(125deg);
      @include adaptiveValue("right", 11, 5);
   }
   }

   &-select {
      height: 100%;
      width: toEm(116);
      border: toRem(2) solid var(--danger-color);
      border-radius: 0 toEm(4) toEm(4) 0;
      padding-inline-start: toEm(6);

      @media (max-width:$mobile){
          width: toEm(40);
          padding-inline: toRem(2);
          color: var(--danger-color);
          background-color: currentColor;
      }
   }
   &-option {
      background-color: var(--border-color);
      color: var(--light-color);
   }
}
</style>