<script setup lang="ts">

let currentImage = ref('')
const images = ref([
   'https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148725042.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid',
   '',
   'https://img.freepik.com/free-photo/cottage-cheese-cookie-rolls-with-red-currants-ceramic-plate-with-vintage-ceramic-tea-coffee-set-tea-time-breakfast-summer-sweets_114579-1286.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid',
   'https://img.freepik.com/free-photo/pancake-shrovetide_1398-5120.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid',
])

onMounted(() => {
   watchEffect(() => {
   currentImage.value =  'https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148725042.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid',
   images.value[1] = 'https://img.freepik.com/premium-photo/autumn-soup-with-croutons-herbs-clay-pots_222185-1687.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid'
})
})

</script>

<template>
   <section class="item">
   <div class="item__images">
      <NuxtImg
      v-if="currentImage"
      class="item__main-image" 
      :src="currentImage"
      alt="image"
      format="webp"
      width="544"
      />
      <div
      v-if="images[1] !==''"
      class="item__body"
      >
      <NuxtImg
       v-for="image in images"
      :class="['item__image', {item__image_active: currentImage === image}]"
      @mouseover="currentImage = image"
      @cick="currentImage = image"
      :src="image"
      alt="image"
      format="webp"
      width="90"
      height="61"
      loading="lazy"
      />
   </div>
   </div>
   <div class="item__content">
      <h2 class="item__title">Title</h2>
      <p class="item__descr">Description section</p>
   </div>
</section>
</template>

<style lang="scss" scoped>
.item {
   padding-block: toRem(12);
   display: grid;
   grid-template-columns: auto 1fr;
   column-gap: toRem(16);

&__images {
   display: grid;
   justify-items: center;
   row-gap: toRem(12);
}

   &__body {
      display: flex;
      column-gap: toRem(9);
   }

   &__image {
      cursor: pointer;
      border-radius: toRem(6);

      @include hover {
         outline: toRem(2) solid var(--dark-golden-color);
         outline-offset: toRem(2);
      }

      @media (max-width:$mobileSmall){
         @include adaptiveValue("width", 220, 67); 
      }
      &_active {
         outline: toRem(2) solid var(--dark-golden-color);
         outline-offset: toRem(2);
      }
   }

   &__content {
      background-color: var(--light-color);
   }
}
</style>