<script setup lang="ts">
const cartStore = useCartStore()
const config = useRuntimeConfig()


onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
    <ul
   class="cart-item"
    aria-label="Список товаров в корзине"
    >
      <li 
      v-for="item in cartStore.items" 
      :key="item.product.id"
      class="cart-item__item"
      >
        <h3 class="cart-item__title" >{{ item.product.name }}</h3>
        <NuxtLink
            to=""
          >
        <NuxtImg
          :src="`${config.public.strapi.url}${item.product.image}`"
          :alt="item.product.name"
          format="webp"
          loading="lazy"
          decoding="async"
          width="144"
          height="108"
          class="cart-item__image"
        />
      </NuxtLink>
        <span class="cart-item__price">
         <Icon name="my-icon:icon-by-regular" />
         {{ item.product.price }}
      </span>
        <div class="cart-item__controls">
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity -1)"
         :disabled="item.quantity <= 1"
         name-class="remove-quantity-prod"
         aria-label="Уменьшить количество"
        />
         <span 
         class="quantity-value"
         aria-live="polite"
         role="status"
         aria-atomic="true"
      >
    {{ item.quantity }}
  </span>
        <UButton
         @click="cartStore.updateQuantity(item.product.id, item.quantity +1)"
         name-class="add-quantity-prod"
         aria-label="Увеличить количество"
        />
      </div>
        <UButton
        @click="cartStore.removeFromCart(item.product.id)"
        icon="material-symbols:delete-outline-rounded"
        aria-label="Удалить товар из корзины"
        class="cart-item__remove-from-cart"
        />
      </li>
    </ul>
 </template>

 <style lang="scss" scoped>
.cart-item {
&__item {
   display: grid;
   grid-template-columns: auto repeat(3, 1fr) auto;
   justify-items: center;
   align-items: center;
   grid-template-areas: 
   'image title controls price remove'
   'image title controls price remove'
   ;
   padding: toEm(7);
   border: toRem(2) solid var(--bg);
   border-radius: toRem(6);

   &:not(:last-child) {
      margin-block-end: toEm(16);
   }

   @media (max-width: toEm(639.98)){
      grid-template-columns: auto 1fr;
      justify-items: start;
      grid-template-areas: 
   'image price'
   'image title'
   'remove controls'
   ;
   }
}

&__title {
   grid-area: title;

   @media (max-width: toEm(639.98)){
        align-self: start;
   }
}

&__image {
   grid-area: image;
}

&__price {
   grid-area: price;
   font-weight: 600;
   color: var(--primary-color);
}

&__controls {
   grid-area: controls;
   display: flex;
   align-items: center;
   column-gap: toEm(12);

   @media (max-width:$tablet){
   overflow: hidden;
   border: toEm(3) solid var(--bg);
   border-radius: toRem(25);
   }

   @media (max-width: toEm(639.98)){
      justify-self: end;
   }
}

&__remove-from-cart {
   grid-area: remove;
   color: var(--warning-color);
}
}
</style>
