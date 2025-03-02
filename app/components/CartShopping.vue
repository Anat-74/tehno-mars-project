<script setup lang="ts">
const cartStre = useCartStore()
</script>

<template>
<div >
<NuxtLink
class="cart-link"
   to="/cartshopping"
   >
   <span class="cart-link__price">{{ cartStre.totalPrice }}</span>
   <Icon
   name="carbon:shopping-cart"
   width="30"
   height="30"
   />
</NuxtLink>
</div>
</template>

<style lang="scss" scoped>
   .cart-link {
      position: relative;

      svg {
         transition: color var(--transition-duration), transform var(--transition-duration);
         @include hover {
            transform: scale(1.1);
            color: var(--danger-color);
         }
      }

      &__price {
         display: flex;
         justify-content: center;
         align-items: center;
         padding-inline: toRem(4);
         padding-block: toRem(1);
         position: absolute;
         top: toRem(-27);
         right: toRem(-7);
         font-weight: 500;
         border-radius: 50%;
         color: var(--light-color);
         background-color: var(--danger-color);
         transition: transform var(--transition-duration);

         @include hover {
            transform: scale(1.2);
         }
      }
   }

</style>