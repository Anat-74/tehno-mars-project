<!-- <script setup lang="ts">
const searchStore = useSearchStore()
const { products, status, hasSearched, totalPages, currentPage } = storeToRefs(searchStore)
</script> -->

<template>
  <div>
    <!-- Состояние до первого поиска -->
    <div v-if="!hasSearched && status !== 'pending'" class="initial-state">
      Введите параметры поиска
    </div>

    <!-- Загрузка -->
    <div v-if="status === 'pending'">Идёт поиск...</div>

    <!-- Результаты -->
    <div v-else-if="products?.length">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />

      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="searchStore.changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- Нет результатов -->
    <div v-else-if="hasSearched" class="no-results">
      Товары не найдены
    </div>
  </div>
</template>