<script setup lang="ts">
const { isAccount, isContacts } = useVisibilityProvider()
</script>

<template>
<header class="header">
   <div class="header__container-top">
<ClientOnly >
   <ColorMode class="header__color-mode"/>
</ClientOnly>
<BaseNavigation class="header__navigation hidden-tablet" />
<LangSwitcher class="header__lang hidden-tablet" />
<ShowModalHamburger class="header__dialog-header" />
</div>
</header>

   <main class="main">
      <div class="main__container">
      <slot />
   </div>
   </main>
</template>

<style lang="scss" scoped>
.header {
   margin-block-end: toEm(22, 16);

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
}
</style>