<script setup lang="ts">
const searchStore = useSearchStore()
const route = useRoute()

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

   name="eos-icons:bubble-loading" 
   class="search-loader"
   />

   <Icon
   name="ph:magnifying-glass-light"
   class="search-glass"
   />

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
      <option value="">Без сортировки</option>
      <option value="name:asc">От А до Я</option>
      <option value="price:asc">Сначала дешёвые</option>
      <option value="price:desc">Сначала дорогие</option>
    </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
   position: relative;

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
      font-size: toRem(18);
   }

   &-loader {
      position: absolute;
      top: 50%;
      right: 212px;
      translate: 0 -50%;
      font-size: toRem(25);
      color: var(--light-green);
   }

   &-glass {
      position: absolute;
      top: 50%;
      left: toRem(12);
      translate: 0 -50%;
      color: var(--warning-color);
      font-size: toRem(25);
   }

   &-select-wrapper {
      position: relative;
      height: 100%;

&::before,
   &::after{
      content: '';
      pointer-events: none;
      position: absolute;
      top: calc(45% - toRem(1));
      width: toRem(8);
      height: toRem(2);
      background-color: var(--gray-color);
   }
   &::before {
      right: toRem(12);
      transform: rotate(-125deg);
   }
   &::after {
      right: toRem(8);
      transform: rotate(125deg);
   }

@media (max-width:$tablet){
   &::before,
   &::after{
      background-color: var(--light-green);
   }

   &::after {
      left: toRem(11);
   }
}
   }

   &-select {
      height: 100%;
      outline: none;
      appearance: none;
      cursor: pointer;
      color: var(--gray-color);
      width: toRem(195);
      border: toRem(2) solid var( --danger-color);
      border-radius: toEm(0) toEm(4) toEm(4) toEm(0);
      padding-inline: toEm(9);

      &:focus-visible {
         border: 2px solid var(--grey-color);
      }
      &:active {
         border: 2px solid var(--orange-color);
      }

      @media (min-width:$tablet){
      font-size: toRem(17);
   }

      @media (max-width:$tablet){
      width: toRem(27);
      padding-inline: toRem(12);
      border: 2px solid var(--lime-color);
      border-inline-start: 1px solid var(--lime-color);
      border-inline-end: 1px solid var(--lime-color);
      border-radius: 0;
      background-color: rgba(255 255 255/.3);

      &:focus-visible {
         border: 2px solid var(--lime-color);
         outline: 3px solid var(--whitesmoke-color);
      }

      &:active {
         border: 2px solid var(--orange-color);
      }
   }

   option {
      background-color: var(--whitesmoke-color);
      @media (min-width:$tablet){
         font-size: toRem(17);
      }
   }
   }
}

</style>