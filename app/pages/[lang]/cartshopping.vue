<script setup lang="ts">
import type { LocaleCode } from '../../types/types'
import { cartTranslations } from '~/locales/cart'

const { currentLocale } = useLocale()
const cartStore = useCartStore()

useSeoMeta({
  title: cartTranslations[currentLocale.value as LocaleCode].title,
  ogTitle: cartTranslations[currentLocale.value as LocaleCode].title,
  description: cartTranslations[currentLocale.value as LocaleCode].description,
  ogDescription: cartTranslations[currentLocale.value as LocaleCode].description
})

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
   <section 
   class="cart-page"
   aria-labelledby="cart-page"
   >
     <div 
       v-if="cartStore.totalItems === 0"
       class="cart-page__no-product-items"
     >
       <NuxtImg
         class="cart-page__image" 
         src="image/cart-empty-img.png"
         alt="image"
         format="webp"
         width="444"
       />
       <span class="cart-page__text">
         {{ cartTranslations[currentLocale].noProducts }}
       </span>
     </div>
 
     <div 
       v-else
       class="cart-page__grid"
     >
     <div class="cart-page__cart-items">
         <h2 
         class="cart-page__title"
         id="cart-page">
            {{ cartTranslations[currentLocale].title }}
         </h2>
         <span class="cart-page__total">
            Всего товаров:
            {{ cartStore.totalItems }}
         </span>
           <CartShopping
           class="cart-page__products"
           />
           <!-- <UButton
           @click="cartStore.clearCart"
           label="Очистить корзину"
           name-class="remove-cart-item"
           /> -->
         </div>
         <OrderForm 
         class="cart-page__order-form"
         />
         </div>
   </section>
 </template>

<style lang="scss" scoped>
.cart-page {

&__grid {
   display: grid;
   grid-template-columns: 1fr auto;
}

&__cart-items {
   margin-block: toRem(16);
   border-radius: toRem(8);
   background-color: var(--secondary-color);
}

&__title {
}

&__total {
}

&__products {
}

&__order-form {
}
}
</style>