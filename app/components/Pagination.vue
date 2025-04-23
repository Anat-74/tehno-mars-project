<script setup lang="ts">
interface PropsPagination {
   page: number
   pageCount: number
   routeName: string
}

const route = useRoute()
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