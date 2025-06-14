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

// Добавляем состояние для сообщения об успехе
const showOrderSuccess = ref(false)
const successMessage = ref('')

const handleOrderSuccess = ( orderId: number ) => {
   successMessage.value = `Заказ #${orderId} успешно сформирован! 
  В ближайшее время с вами свяжутся. 
  Благодарим за заказ!`
   showOrderSuccess.value = true

  setTimeout(() => {
    showOrderSuccess.value = false
  }, 9000)
}

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
   <section 
   :class="['cart-page', {'cart-page_empty': cartStore.totalItems === 0}]"
   aria-labelledby="cart-page"
   >
   <h1
   class="visually-hidden"
   id="cart-page"
   >{{ cartTranslations[currentLocale].visuallyHidden }}</h1>

   <UButton
      @click="goBack"
      icon="material-symbols:arrow-back"
      aria-label="go back"
      name-class="go-forward-back"
      class="cart-page__go-back"
     />
     <div 
       v-if="cartStore.totalItems === 0"
       class="cart-page__cart-empty cart-empty"
     >
     <div class="cart-empty__body" >
      <ul class="cart-empty__list">
         <li class="cart-empty__item">
         <NuxtImg
         src="image/valberg_new-removebg-preview.png"
         alt="image"
         format="webp"
         width="122"
       />
         </li>
         <li class="cart-empty__item">
         <NuxtImg
         src="image/aiko_new_1-removebg-preview.png"
         alt="image"
         format="webp"
         width="122"
       />
         </li>
         <li class="cart-empty__item">
         <NuxtImg
         src="image/praktik_profi_rgb-removebg-preview.png"
         alt="image"
         format="webp"
         width="122"
       />
         </li>
         <li class="cart-empty__item">
         <NuxtImg
         src="image/praktik-home_rgb-removebg-preview.png"
         alt="image"
         format="webp"
         width="122"
       />
         </li>
      </ul>
     </div>
     <div class="cart-empty__image">
       <NuxtImg 
         src="image/cart-empty-img.png"
         alt="image"
         format="webp"
         width="286"
       />
       <span class="cart-empty__text">{{ cartTranslations[currentLocale].cartEmpty }}</span>
      </div>
     </div>

     <div class="cart-page__body">
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
           <div v-if="cartStore.totalItems === 0">
            <NotificationOrder
            v-if="showOrderSuccess"
            :message="successMessage"
            type="success"
            @close="showOrderSuccess = false"
            />
            </div>
         </div>
         <OrderForm 
         class="cart-page__order-form"
         @order-success="handleOrderSuccess"
         />
         </div>
   </section>
 </template>

<style lang="scss" scoped>
.cart-empty {
   display: grid;
   grid-template-columns: 1fr auto;
   align-items: center;
   padding-block-start: toEm(58);

   &__body {
      min-height: 100%;
      display: grid;
      align-items: center;
      padding-inline: toEm(18);
      padding-block: toEm(12);
      border-radius: toRem(6) toRem(6) 0 0;
      background-color: var(--secondary-color);
      box-shadow:
      0px 4px 4px 5px rgba(30, 33, 44, 0.05),
      0px 12px 10px -9px rgba(30, 33, 44, 0.08),
      0px 26px 24px -120px rgba(30, 33, 44, 0.1),
      0px 30px 0px -99px rgba(30, 33, 44, 0.16);
   }

   &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      align-items: center;
      column-gap: toEm(18);
      row-gap: toEm(12);
      padding-inline: toEm(9);
      padding-block: toEm(12);
      border-radius: toRem(4);
      background-color: var(--bg);

      @media (max-width:toEm(530)){
         grid-template-columns: repeat(2, 1fr);
      }
   }

   &__item {
      padding-inline: toEm(4);
      border-radius: toRem(4);
      background-color: var(--light-color);

         &:not(:first-child) {
            padding-block: toEm(6);
         }

         @media (max-width:$mobile){
            max-width: toRem(99); 
         }
   }

   &__image {
      display: grid;
      justify-items: center;

      @media (max-width:$tablet){
         display: none;
      }
   }

   &__text {
      font-size: toEm(22);
      font-weight: 600;
      letter-spacing: toRem(1.2);
      font-family: $font-family2;
      color: var(--warning-color);
   }
}

.cart-page {
   position: relative;

   &_empty {
      .cart-page__body {
      padding-block-start: toEm(12);
      }
      .cart-page__cart-items {
         border-radius: 0 0 toRem(6) toRem(6);
      }
   }

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
   border-radius: toEm(6);
   background-color: var(--secondary-color);
   box-shadow:
      0px 4px 4px -4px rgba(30, 33, 44, 0.05),
      0px 12px 10px -6px rgba(30, 33, 44, 0.08),
      0px 26px 24px -10px rgba(30, 33, 44, 0.1),
      0px 30px 120px -90px rgba(30, 33, 44, 0.16);
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