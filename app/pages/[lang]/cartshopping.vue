<script setup lang="ts">
import type { LocaleCode } from "../../types/types"
import { cartTranslations } from '~/locales/cart';

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
   <section class="cart-page">
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
       class="cart-page__cart-items"
     >
       <div>
         <h2>{{ cartTranslations[currentLocale].title }}</h2>
         <div class="cart-page__cart-item-body">
           <Cart />
         </div>
       </div>
 
       <div>
         <div class="cart-page__summary">
           <span class="cart-page__total">
             {{ cartTranslations[currentLocale].total }}
             <Icon 
               class="icon-bel-ruble"
               name="my-icon:icon-by-regular" 
             />
             <b>{{ cartStore.totalPrice }}</b>
           </span>
           <UButton
             @click=""
             size="large"
             :label="cartTranslations[currentLocale].checkout"
             role="link"
           />
         </div>
       </div>
 
       <OrderForm />
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