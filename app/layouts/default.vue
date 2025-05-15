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
   class="header__link-logo hidden-mobile-small"
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
        <div class="header__pagination-product">
        <UButton 
          v-for="page in totalPages" 
          :key="page"
          name-class="pagination"
          :label="page"
          @click="searchStore.changePage(page)"
          :class="{ active: currentPage === page }"
        />
      </div>
      </div>
<Basket class="header__cart" />
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
         FOOTER
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
   padding-block: toRem(16);
   @include adaptiveValue("column-gap", 44, 7);

   @media (max-width:$mobileSmall){
       grid-template-columns: 1fr auto; 
   }
}

&__link-logo {
   margin-inline-start: toRem(20);
   padding-inline: toRem(2);
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
      z-index: 999;
      top: 19%;
      display: grid;
      grid-template-columns: 1fr;
      gap: toRem(12);
      justify-items: center;
      padding: toEm(12);
      border-radius: toRem(4);
      border: toRem(2) solid var(--primary-color);
      background-color: var(--secondary-color);
      @include adaptiveValue("top", 175, 122);
      @include adaptiveValue("right", 235, 0);
   }

   &__pagination-product {
      align-self: end;
      justify-self: end;
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
