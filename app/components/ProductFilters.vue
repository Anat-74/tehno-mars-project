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
  <div>
    <input 
      v-model="searchName" 
      placeholder="Название товара"
      @input="applyFilters"
    >
    
    <select 
      v-model="sortBy" 
      @change="applyFilters"
      :class="{ 'sort-active': sortBy }"
    >
      <option value="">Без сортировки</option>
      <option value="name:asc">От А до Я</option>
      <option value="price:asc">Сначала дешёвые</option>
      <option value="price:desc">Сначала дорогие</option>
    </select>
  </div>
</template>