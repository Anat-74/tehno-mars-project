<script setup lang="ts">
useSeoMeta({
   title: 'Заказы',
   ogTitle: 'Заказы',
   description: 'Страница оформление заказов',
   ogDescription: 'Страница оформление заказов'
})

// const products = [
//    { id: 1, title: "Title 1", description: "This is a description", url: "https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148725042.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 15899 },
//    { id: 2, title: "Title 2", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-with-caviar-tea_1398-3625.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 8949 },
// ]
</script>

<template>
   <section class="checkout-page">
      <h2 class="checkout-page__title">Адрес доставки</h2>
   </section>
</template>

<style lang="scss" scoped>
.checkout-page {
   padding-inline: toRem(16);
   padding-block: toRem(22);
   margin-block-start: toRem(16);
   border-radius: toRem(6);
   background-color: var(--secondary-color);

   &__title {
      margin-block-end: toRem(9);
   }
}

</style>