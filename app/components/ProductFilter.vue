<script setup lang="ts">
const searchStore = useSearchStore()
const route = useRoute()
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
   >Поиск товаров
</label>
    <input 
      v-model="searchName" 
      placeholder="Название товара"
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
      Товары не найдены
    </span>
   <div class="search-select-wrapper">
      <label 
      class="visually-hidden"
      for="sort-product"
      >Сортировка товаров
   </label>
      <select 
      v-model="sortBy" 
      @change="applyFilters"
      class="search-select"
      id="sort-product"
      :class="{ 'sort-active': sortBy }"
    >
      <option value=""></option>
      <option value="name:asc">От А до Я</option>
      <option value="price:asc">Дешевле</option>
      <option value="price:desc">Дороже</option>
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
      font-size: toRem(18);
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
      position: relative;
      height: 100%;

&::before,
   &::after{
      content: '';
      pointer-events: none;
      position: absolute;
      top: calc(50% - toRem(1));
      width: toRem(8);
      height: toRem(2);
      background-color: var(--danger-color);
   }
   &::before {
      right: toRem(12);
      transform: rotate(-125deg);
   }
   &::after {
      right: toRem(8);
      transform: rotate(125deg);
   }
   }

   &-select {
      height: 100%;
      outline: none;
      appearance: none;
      cursor: pointer;
      color: var(--gray-color);
      border: toRem(2) solid var( --danger-color);
      border-radius: toEm(0) toEm(4) toEm(4) toEm(0);
      padding-inline: toEm(9);
      @include adaptiveValue("width", 112, 27);

   option {
      background-color: var(--bg);
   }
   }
}

</style>