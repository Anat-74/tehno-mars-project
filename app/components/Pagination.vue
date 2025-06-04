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
    <Icon name="material-symbols:arrow-back" />
    </NuxtLink>

    <div class="pagination__current"
    >
    <span class="pagination__page">{{ page }}</span>
     <b>...</b>
     <span class="pagination__page-count">{{ pageCount }}</span>
    </div>

    <NuxtLink
      v-if="page < pageCount"
      :to="getPageLink(page + 1)"
      class="pagination__next"
    >
    <Icon name="material-symbols:arrow-forward" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
   display: flex;
   align-items: center;
   column-gap: toEm(16);
   padding-block-start: toEm(22);

&__prev {
   display: flex;
   align-items: center;
   padding-inline: toRem(5);
   padding-block: toRem(3);
   border-radius: toEm(4);
   outline: toEm(3) solid var(--secondary-color);

   svg {
      font-size: toRem(18);
      color: var(--primary-color);
      transition: color var(--transition-duration);

      @include hover {
      color: var(--warning-color);
   }
   }
}

&__current {
   display: flex;
   column-gap: toEm(4);
   font-weight: 600;

   b {
      letter-spacing: toRem(1.4);
   }
}

&__page {
   color: var(--warning-color);
}

&__page-count {
   font-weight: 500;
}

&__next {
   display: flex;
   align-items: center;
   padding-inline: toRem(5);
   padding-block: toRem(3);
   border-radius: toEm(4);
   outline: toEm(3) solid var(--secondary-color);

   svg {
      font-size: toRem(18);
      color: var(--primary-color);
      transition: color var(--transition-duration);

      @include hover {
      color: var(--warning-color);
      }
   }
}
}

</style>