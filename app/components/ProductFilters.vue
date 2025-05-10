<script setup>
// 1. Создаём переменные для хранения значений
const searchName = ref('')
const sortBy = ref('')

// 2. Отправляем изменения родительскому компоненту
const emit = defineEmits(['filters-changed'])

// 3. Функция применения фильтров
const applyFilters = () => {
  emit('filters-changed', {
    name: searchName.value,
    sort: sortBy.value
  })
}
</script>

<template>
   <div>
     <!-- Поле поиска -->
     <input 
       v-model="searchName" 
       placeholder="Название товара"
       @input="applyFilters"
     >
 
     <!-- Сортировка -->
     <select v-model="sortBy" @change="applyFilters">
       <option value="">Без сортировки</option>
       <option value="name:asc">От А до Я</option>
       <option value="name:desc">От Я до А</option>
       <option value="price:asc">Сначала дешёвые</option>
       <option value="price:desc">Сначала дорогие</option>
     </select>
   </div>
 </template>