<script setup lang="ts">
useSeoMeta({
   title: 'Товар',
   ogTitle: 'Товар',
   description: 'Страница товара',
   ogDescription: 'Страница товара'
})

const userStore = useUserStore()

const route = useRoute()

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

const isInCart = computed(() => {
   let res = false
   userStore.cart.forEach(prod => {
      if (route.params.id === prod.id) {
         res = true
      }
   })
   return res
})
// проверить вариант с reduce

// const isInCart = computed(() => {
//    const res = userStore.cart.reduce((acc, prod) => route.params.id === prod.id ? true : acc, false)
//    return res
// })

const priceComputed = computed(() => {
   return '122.45'
})

const addToCart = () => {
   alert('ADDED')
}
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
      <span class="item__star">
         <Icon name="fluent:star-20-regular" />
      </span>
      <div class="item__stars">
         <Icon name="fluent:star-20-regular" />
         <Icon name="fluent:star-20-regular" />
         <Icon name="fluent:star-20-regular" />
         <Icon name="fluent:star-20-regular" />
         <Icon name="fluent:star-20-regular" />
      </div>
      <span class="item__price">
         <Icon
         class="icon-bel-ruble" 
         name="my-icon:icon-by-regular" />
         {{ priceComputed }}
      </span>
      <UButton
      v-if="isInCart"
      label="Добавлено"
      name-class="add-to-cart"
      :disabled="isInCart"
      />
   <UButton
   v-else
   label="Добавить в корзину"
   name-class="add-to-cart"
   @click="addToCart()"
   />
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