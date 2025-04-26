<script setup lang="ts">
const route = useRoute()

interface PropsPagination {
   page: number
   pageCount: number
   routeName: string
}

const props = defineProps<PropsPagination>()

const getPageLink = (newPage: number) => {
   return {
      name: props.routeName,
      params: route.params,
      query: { ...route.query, page: newPage}
   }
}
</script>

<template>
  <div class="pagination">
    <NuxtLink 
      v-if="page > 1"
      :to="getPageLink(page - 1)"
      class="pagination__prev"
    >
      Назад
    </NuxtLink>

    <span class="pagination__current">
      Страница {{ page }} из {{ pageCount }}
    </span>

    <NuxtLink
      v-if="page < pageCount"
      :to="getPageLink(page + 1)"
      class="pagination__next"
    >
      Вперед
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>

</style>


<!-- <template>
  <div class="pagination">
    <button 
      @click="currentPage--"
      :disabled="currentPage <= 1"
    >
      Назад
    </button>

    <span>Страница {{ currentPage }} из {{ totalPages }}</span>

    <button
      @click="currentPage++"
      :disabled="currentPage >= totalPages"
    >
      Вперед
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

const emit = defineEmits(['update:currentPage']);
</script> -->