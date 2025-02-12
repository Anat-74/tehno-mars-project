<script setup lang="ts">
useSeoMeta({
   title: 'Корзина',
   ogTitle: 'Корзина',
   description: 'Страница корзины сайта',
   ogDescription: 'Страница корзины сайта'
})

// const userStore = useUserStore()

// interface ElType {
//   id: number;
// }

// let selectedArray = ref<ElType[]>([])

// onMounted(() => {
//    setTimeout(() => userStore.isLoading = false, 200)
// })

// const totalPriceComputed = computed(() => {
//    let price = 0
//    userStore.cart.forEach(prod => {
//       price += prod.price
//    })
//    return price / 100
// })

//Альтернативный вариант
// const totalPriceComputed = computed(() => {
//   const totalPrice = userStore.cart.reduce((acc, item) => {
//    return acc+=item.price
//    },0)
//    return totalPrice / 100
// })

// const selectedRadioFunc = (el: ElType): void => {
//    if (!selectedArray.value.length) {
//       selectedArray.value.push(el)
//       return
//    }
//    selectedArray.value.forEach((item, index) => {
//       if (el.id !== item.id) {
//          selectedArray.value.push(el)
//       } else {
//          selectedArray.value.splice(index, 1)
//       }
//    })
// }

// const goToCheckout = () => {
//    let ids: number[] = []
//    userStore.checkout = []

//    selectedArray.value.forEach(item => ids.push(item.id))

//    let res = userStore.cart.filter((item) => {
//       return ids.indexOf(item.id) != -1
//    })

//    res.forEach(item => userStore.checkout.push(toRaw(item)))

//    return navigateTo('/checkout')
// }

const products = [
   { id: 1, title: "Title 1", description: "This is a description", url: "https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148725042.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 15899 },
   { id: 2, title: "Title 2", description: "This is a description", url: "https://img.freepik.com/free-photo/pancake-with-caviar-tea_1398-3625.jpg?ga=GA1.1.239409238.1713800473&semt=ais_hybrid", price: 8949 },
]
</script>

<template>
   <section class="cart-page">
      <div 
      v-if="false"
      class="cart-page__no-product-items"
      >
         <NuxtImg
      class="cart-page__image" 
      src="image/cart-empty-img.png"
      alt="image"
      format="webp"
      width="444"
      />
      <span class="cart-page__text">Товаров пока нет(</span>

      <NuxtLink
      v-if="true"
      to="/auth"
      class="cart-page__link"
      >Войти
      </NuxtLink>
   </div>

   <div 
   v-else
   class="cart-page__cart-items">
   <div>
   <h2 class="cart-page__title">
      Корзина (0)
</h2>
<p class="cart-page__descr">
   Приветственная сделка только на 1 товар
</p>
<div class="cart-page__cart-item-body">
   <CartItem
   v-for="product in products"
   :key="product.id"
   :id="product.id"
   :title="product.title"
   :description="product.description"
   :url="product.url"
   :price="product.price"
   @selectedRadio-="selectedRadioFunc"
   />
</div>
</div>

<div>
<div class="cart-page__summary">
   <span class="cart-page__headline">Краткое содержание</span>
   <span class="cart-page__total">Итого
      <Icon 
      class="icon-bel-ruble"
      name="my-icon:icon-by-regular" />
      <b>{{ totalPriceComputed }}</b>
   </span>
   <UButton
   @click="goToCheckout"
   size="large"
   label="Проверить"
   role="link"
   />
</div>
</div>
</div>
   </section>
</template>

<style lang="scss" scoped>
.cart-page {
   padding-block: toRem(32);

   &__no-product-items {
      display: grid;
      justify-items: center;
      align-items: center;
      row-gap: toRem(4);
   }

   &__text {
      font-family: $font-family2;
      font-size: toRem(22);
      letter-spacing: 1.5;
      color: var(--danger-color);
      margin-block-end: toRem(22);
   }

   &__link {
      padding-inline: toRem(44);
      padding-block: toRem(8);
      border-radius: toRem(25);
      color: var(--light-color);
      font-weight: 500;
      background-color: var(--danger-color);
   }

   &__cart-items {
      display: grid;
      grid-template-columns: 1fr minmax(auto, toRem(344));
      column-gap: toRem(22);
   }

   &__title {
      padding-inline: toRem(8);
      padding-block: toRem(16);
      margin-block-end: toRem(22);
      border-radius: toRem(6);
      font-weight: 600;
      font-size: toRem(20);
      background-color: var(--secondary-color);
   }

   &__descr {
      padding-inline: toRem(8);
      padding-block: toRem(16);
      margin-block-end: toRem(22);
      border-radius: toRem(6);
      font-weight: 600;
      font-size: toRem(18);
      color: var(--danger-color);
      background-color: var(--warning-hover);
   }

   &__cart-item-body {
      padding-block: toRem(12);
      border-radius: toRem(6);
      background-color: var(--secondary-color);
   }

   &__summary {
      display: flex;
      flex-direction: column;
      row-gap: toRem(9);
      padding-inline: toRem(16);
      padding-block: toRem(12);
      margin-block-end: toRem(16);
      border-radius: toRem(6);
      background-color: var(--secondary-color);
}

   &__headline {
      font-size: toRem(18);
      font-weight: 600;
}

   &__total {
      display: grid;
      grid-template-columns: 1fr repeat(2, auto);
      align-items: center;
      column-gap: toRem(4);
      font-weight: 500;
      margin-block-end: toRem(16);

      svg {
         font-size: toRem(14);
      }

      b {
         font-size: toRem(20);
      }
   }
}

</style>