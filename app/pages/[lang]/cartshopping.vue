<script setup lang="ts">
import type { LocaleCode } from '../../types/types'
import { cartTranslations } from '~/locales/cart'

const { currentLocale } = useLocale()
const cartStore = useCartStore()
const { goBack } = useGoToForwardOrBack()

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
   <h1
   class="visually-hidden"
   id="cart-page"
   >{{ cartTranslations[currentLocale].visuallyHidden }}</h1>
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
       class="cart-page__body"
     >
     <UButton
      @click="goBack"
      icon="material-symbols:arrow-back"
      aria-label="go back"
      name-class="go-forward-back"
      class="cart-page__go-back"
     />
     <div class="cart-page__cart-items">
      <h2 class="cart-page__title">
         {{ cartTranslations[currentLocale].title }}
         </h2>
         <span 
         aria-atomic="true"
         aria-live="polite"
         role="status"
         class="cart-page__total">
         {{ cartTranslations[currentLocale].total }}
            <b>{{ cartStore.totalItems }}</b>
         </span>
           <CartShopping
           class="cart-page__products"
           />
         </div>
         <OrderForm 
         class="cart-page__order-form"
         />
         </div>
   </section>
 </template>

<style lang="scss" scoped>
.cart-page {
   position: relative;

   &__no-product-items {
         display: grid;
         justify-items: center;
         padding-block: toEm(44);
   }

   &__text {
      font-family: $font-family2;
      font-size: toEm(24);
      color: var(--danger-color);
   }
//----------------------------------------------------------------------------------------------------------------------------------------------
&__go-back {
   position: absolute;
   top: toRem(12);
   left: 0;
}

&__body {
   display: grid;
   grid-template-columns: 1fr auto;
   column-gap: toEm(22);
   padding-block-start: toEm(58);
   padding-block-end: toEm(32);

   @media (max-width:$tablet){
      grid-template-columns: 1fr;
      row-gap: toEm(32);
      column-gap: 0;
   }
}

&__cart-items {
   padding-inline: toEm(16);
   padding-block: toEm(16);
   border-radius: toEm(8);
   background-color: var(--secondary-color);
   box-shadow:
      0px 4px 4px -4px rgba(30, 33, 44, 0.05),
      0px 12px 10px -6px rgba(30, 33, 44, 0.08),
      0px 26px 24px -10px rgba(30, 33, 44, 0.1),
      0px 30px 120px -50px rgba(30, 33, 44, 0.16);
}

&__title {
   margin-block-end: toEm(4);
   color: var(--dark-golden-color);
}

&__total {
   display: inline-block;
   margin-block-end: toRem(4);
   color: var(--primary-color);

   b {
      font-size: toEm(18);
      color: var(--gray-color);
   }
}

&__order-form {
   justify-self: end;
   @media (max-width:$mobileSmall){
      justify-self: center;
   }
}
}
</style>