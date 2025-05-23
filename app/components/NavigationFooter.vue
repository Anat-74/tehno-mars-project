<script lang="ts" setup>
import { baseNavigationTranslations } from '~/locales/baseNavigation'
const { currentLocale } = useLocale()
</script>

<template>
   <nav
   class="nav-footer"
   aria-label="secondary navigation"
   >
   <ul class="nav-footer__list">
   <li class="nav-footer__item">
            <NuxtLink
            class="nav-footer__link"
            :to="`/${currentLocale}/about`">
            {{ baseNavigationTranslations[currentLocale].about }}
         </NuxtLink>
      </li>
      <li class="nav-footer__item">
            <NuxtLink 
            class="nav-footer__link" 
            :to="`/${currentLocale}/services`">
            {{ baseNavigationTranslations[currentLocale].services }}
         </NuxtLink>
      </li>
      <li class="nav-footer__item">
            <NuxtLink 
            class="nav-footer__link" 
            :to="`/${currentLocale}/contacts`">
            {{ baseNavigationTranslations[currentLocale].contacts }}
         </NuxtLink>
      </li>
   </ul>
   </nav>
</template>

<style lang="scss" scoped>
.nav-footer {
   position: relative;

&__list {
   display: flex;
   flex-direction: column;
   row-gap: toRem(32);
   align-items: center;
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
}
&__item {
}

&__link {
   font-weight: 600;
   letter-spacing: 1.2px;
   font-family: $font-family2;
   color: var(--primary-color);
   @include adaptiveValue("font-size", 18, 14);
}
}

.router-link-active {
   border-color: var(--active-color);
   color: var(--active-color) !important;
   pointer-events: none !important;
}

</style>