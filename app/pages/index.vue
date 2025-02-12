<script lang="ts" setup>
useSeoMeta({
   title: 'Главная',
   ogTitle: 'Главная',
   description: 'Главная страница сайта',
   ogDescription: 'Главная страница сайта'
})

const products = [
   { id: 1, title: "Title 1", description: "This is a description", url: "https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148725042.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 15899 },
   { id: 2, title: "Title 2", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-with-caviar-tea_1398-3625.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 8949 },
   { id: 3, title: "Title 3", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-with-caviar-tea_1398-3625.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 19939 },
   { id: 4, title: "Title 4", description: "This is a description", url: "https://img.freepik.com/premium-photo/homemade-beef-stir-fry-with-vegetables-pots-wooden_392895-8836.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 44959 },
   { id: 5, title: "Title 5", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-with-red-caviar-tea_1398-4518.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 56999 },
   { id: 6, title: "Title 6", description: "This is a description", url: "https://img.freepik.com/premium-photo/homemade-beef-stir-fry-with-vegetables-pots-wooden_392895-8836.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 64999 },
   { id: 7, title: "Title 7", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-shrovetide_1398-5120.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 77999 },
   { id: 8, title: "Title 8", description: "This is a description", url: "https://img.freepik.com/free-photo/cottage-cheese-cookie-rolls-with-red-currants-ceramic-plate-with-vintage-ceramic-tea-coffee-set-tea-time-breakfast-summer-sweets_114579-1286.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 26299 },
   { id: 9, title: "Title 9", description: "This is a description", url: "https://img.freepik.com/premium-photo/autumn-soup-with-croutons-herbs-clay-pots_222185-1687.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 56599 },
   { id: 10, title: "Title 10", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-shrovetide_1398-5120.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 86699 },
]

</script>

<template>
      <section class="home">
         <h1>{{$t('homeTitle')}}</h1>
         <div class="home__columns">
         <Product 
         v-if="products"
         v-for="product in products"
         :key="product.id"
         :id="product.id"
         :title="product.title"
         :description="product.description"
         :url="product.url"
         :price="product.price"
         />
      </div>
      </section>
</template>

<style lang="scss" scoped>
.home {
   &__columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(toRem(290), 1fr));
      row-gap: toRem(12);
      column-gap: toRem(18);
      justify-items: center;
   }
}
</style>