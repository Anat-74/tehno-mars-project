<script lang="ts" setup>
import { baseNavigationTranslations } from '~/locales/baseNavigation'

const { isContacts, visibleIsContacts } = useVisibilityConsumer()
const { currentLocale } = useLocale()


</script>

<template>
   <nav class="nav">
      <ul class="nav__list">
         <li class="nav__item">
            <NuxtLink :to="`/${currentLocale}`" 
            class="nav__link">
            {{ baseNavigationTranslations[currentLocale].home }}
         </NuxtLink>
      </li>
      <li class="nav__item">
            <NuxtLink
            class="nav__link"
            :to="`/${currentLocale}/about`">
            {{ baseNavigationTranslations[currentLocale].about }}
         </NuxtLink>
      </li>
      <li class="nav__item">
            <NuxtLink 
            class="nav__link" 
            :to="`/${currentLocale}/services`">
            {{ baseNavigationTranslations[currentLocale].services }}
         </NuxtLink>
      </li>
      <li class="nav__item">
            <NuxtLink 
            class="nav__link" 
            :to="`/${currentLocale}/info`">
            {{ baseNavigationTranslations[currentLocale].info }}
         </NuxtLink>
      </li>

      <li :class="['nav__item', {nav__item_contacts: isContacts}]"
      @mouseenter="visibleIsContacts"
      @mouseleave="isContacts = false"
      >
            <NuxtLink 
            class="nav__link" 
            :to="`/${currentLocale}/contacts`"
            ><Icon name="material-symbols:send-to-mobile-outline-rounded" />
            {{ baseNavigationTranslations[currentLocale].contacts }}
            </NuxtLink>
            <div
            v-if="isContacts"
            class="nav__contacts contacts">
            <a 
            class="contacts__viber-link contacts-link"
            href="#"
            >
            <Icon name="fa-brands:viber" />
               Viber
         </a>
            <a
            class="contacts__phone-link contacts-link"
            href="tel:+375293348180"
            >
            <Icon name="my-icon:icon-a1" color="red" />
            +37529 334-81-80
         </a>
      <a 
      class="contacts__mail-link contacts-link"
      href="mailto:technomars@bk.ru"
      >
      <Icon name="material-symbols:mail-outline-rounded" />
      technomars@bk.ru
   </a>
         </div>
      </li>
      </ul>
   </nav>
</template>

<style lang="scss" scoped>
   .nav {
      &__list {
         padding-inline-end: toRem(16);
         display: flex;
         align-items: center;
         column-gap: toRem(36);
      }

      &__item {
         display: flex;
         align-items: center;
         column-gap: toRem(4);
         font-weight: 500;
         color: var(--primary-color);

         .iconify--material-symbols {
            font-size: toRem(20);
         }

         &_contacts {
         position: relative;
         padding-block-start: toRem(7);
         margin-block-start: toRem(-7);
         padding-block-end: toRem(24);
         margin-block-end: toRem(-24);

         svg {
            color: var(--active-color);
            transition: color var(--transition-duration);
         }
      }
   }

   &__link {
      position: relative;
      display: flex;
      align-items: center;
      column-gap: toRem(5);
      padding-block: toRem(3);

      &:not(.router-link-active) {
         @include hover {
         &::after {
            width: 100%;
         }
      }
   }
         &::before {
            content: '';
            position: absolute;
            top: 0;
            right: toRem(-20);
            width: toRem(4);
            height: 100%;
            border-radius: toRem(25);
            background-color: currentColor;
      }

      &::after {
         content: '';
         position: absolute;
         top: 100%;
         left: 50%;
         translate: -50%;
         width: 0;
         height: toRem(2);
         background-color: currentColor;
         transition: width var(--transition-duration);
      }
   }
}

   .contacts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: toRem(5);
      padding: toRem(12);
      white-space: nowrap;
      position: absolute;
      top: toRem(56);
      right: 0;
      border-radius: toRem(4);
      background-color: var(--secondary-color);

      &__phone-link {
         .iconify--carbon {
            color: var(--dark-color);
         }
   }

      &__viber-link {
         svg {
            color: var(--indigo-color);
         }
      }

   &__mail-link {
      svg {
         color: var(--deep-sky-blue);
      }
   }
}
.contacts-link {
   width: toRem(236);
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: center;
   justify-items: end;
   column-gap: toRem(9);
   padding-inline: toRem(9);
   padding-block: toRem(1);
   border: 2px solid currentColor;
   border-radius: toRem(4);
   font-size: toRem(18);
   font-weight: 500;

      svg {
         font-size: toRem(18);
      }

      @include hover {
         color: var(--light-color);
         border-color:var(--gold-color);
         background-color: var(--danger-color);
         transition: background-color var(--transition-duration);
      }
}

.router-link-active {
   color: var(--active-color) !important;
   pointer-events: none !important;
}
</style>