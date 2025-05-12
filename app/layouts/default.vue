<script setup lang="ts">
const { currentLocale } = useLocale()
const { isContacts } = useVisibilityProvider()

const searchStore = useSearchStore()
const { products, totalPages, currentPage } = storeToRefs(searchStore)
</script>

<template>
<header class="header">
   <div class="header__container-top">
<ClientOnly >
   <ColorMode class="header__color-mode"/>
</ClientOnly>
<BaseNavigation class="header__navigation hidden-tablet" />
<ShowModalHamburger class="header__dialog-header" />
</div>
<div :class="['header__bg', {header__bg_hidden: isContacts}]">
   <div class="header__container-bottom">
   <NuxtLink 
   class="header__link-logo"
   :to="`/${currentLocale}`">
      <NuxtImg 
   class="header__logo"
   src="/image/logo.png"
   alt="logo"
   format="webp"
   widht="68"
   height="68"
   />
</NuxtLink>
<ProductFilter class="header__search" />
   <div 
      v-if="searchStore.products.length" 
      class="header__product-card">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
        <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page"
          type="button"
          @click="searchStore.changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
      </div>
<CartShopping class="header__cart" />
</div>
</div>
</header>

   <main class="main">
      <div class="main__container">
      <slot />
   </div>
   </main>

   <footer class="footer">
      <div class="footer__container">
         <ScrollToTop />
   </div>
   </footer>
</template>

<style lang="scss" scoped>
.header {
   &__container-top {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      @include adaptiveValue("padding-block", 25, 16);

      @media (min-width:$tablet){
         @include adaptiveValue("column-gap", 32, 0, 0, $containerWidth, 1023.98);
      }
   }

&__navigation {
   justify-self: end;
}

&__lang {
   translate: 0 toRem(-14);
}

&__bg {
   background-color: var(--secondary-color);
   transition: visibility 0s, opacity .7s;

   &_hidden {
      visibility: hidden;
      opacity: 0;
   }
}

&__container-bottom {
   display: grid;
   grid-template-columns: auto 1fr auto;
   align-items: center;
   @include adaptiveValue("column-gap", 44, 7);
}

&__link-logo {
   margin-inline-start: toRem(20);
   padding-inline: toRem(2);
   padding-block: toRem(6);
   margin-block: toRem(5);
   border-radius: 50%;
   background-color: var(--light-color);
   transition: box-shadow var(--transition-duration);

   @include hover {
      box-shadow: 0 toRem(1) toRem(32) toRem(27) #f3f5f4;
   }

   @media (max-width:$mobile){
      width: toRem(59);
      margin-inline-start: toRem(0);
   }
}

   &__search {
      justify-self: end;
      width: 80%;

   @media (max-width:$tablet){
      width: 100%;
   }
   }

   &__product-card {
      position: absolute;
      top: 20%;
      left: 80%;
      translate: -50% 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 22px;
      justify-items: center;
      align-items: center;
   }

   &__cart {
      translate: 0 toRem(5);
      margin-inline-end: toRem(9);
   }
}

//======================================================================================================================================================================================================================================

.footer {
   &__container {
      display: grid;
   }
   &__show-modal {
      justify-self: end;
   }
}
</style>
