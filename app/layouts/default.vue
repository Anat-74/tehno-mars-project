<script setup lang="ts">
import type { GlobalData, StrapiResponse } from "../types/types"

// const mockGlobal: GlobalData = {
//    id: 28,
//   documentId: "e7n1xuuxllynyq3bwmag1wfl",
//   createdAt: "2025-05-19T15:19:17.105Z",
//   updatedAt: "2025-05-20T15:00:10.169Z",
//   publishedAt: "2025-05-20T15:00:10.221Z",
//   locale: "ru",
//   footer: {
//     id: 44,
//     companyName: "ООО\"Техномарс",
//     workingHours: "Пн-Пт с 9:00 до 17:30 (без обеда)",
//     legalAdress: "220125, РБ, г. Минск, ул. Городецкая, д. 44, пом. 155А",
//     taxId: "УНП: 193673971",
//     copyright: "@2025",
//     logo: [
//       {
//         id: 65,
//         documentId: "my841xhv3lb5o0pitf4f7rz6",
//         alternativeText: null,
//         url: "/uploads/logo_6eae0deaf8.png"
//       }
//     ]
//   },
//   socials: [
//     {
//       id: 177,
//       label: "Viber",
//       href: "+375293348180",
//       isSocial: true,
//       icon: [
//         {
//           id: 64,
//           documentId: "cwho5qcecsb2wkvrinnjd2pk",
//           alternativeText: null,
//           url: "/uploads/viber_tile_logo_icon_170260_e947d04ecb.svg"
//         }
//       ]
//     },
//     {
//       id: 178,
//       label: "Telegram",
//       href: "/telegram",
//       isSocial: null,
//       icon: [
//         {
//           id: 66,
//           documentId: "dtfst6ayiftv4qflq3wc5t55",
//           alternativeText: null,
//           url: "/uploads/telegram_icon_130816_b2dfbcc4c3.svg"
//         }
//       ]
//     }
//   ],
//   legal: {
//     id: 34,
//     bankName: "ЗАО \"АЛЬФА-БАНК\"",
//     bankAddress: "220013, Республика Беларусь, г. Минск, ул. Сурганова, 43-47",
//     accountNumber: "р/с BY13 ALFA 3012 2F22 3200 1027 0000",
//     swiftCode: "SWIFT: ALFABY2X"
//   },
//   phones: [
//     {
//       id: 203,
//       phoneNumber: "+375(29) 334-81-80",
//       isMobile: true
//     },
//     {
//       id: 204,
//       phoneNumber: "+375(17) 334-81-80",
//       isMobile: false
//     }
//   ],
//   email: [
//     {
//       id: 96,
//       email: "technomars@bk.ru",
//       isEmail: true
//     },
//     {
//       id: 97,
//       email: "technomars@gmail-bk.ru",
//       isEmail: null
//     }
//   ]
// }
// const global = ref<GlobalData | null>(mockGlobal);

const { find } = useStrapi()
const searchStore = useSearchStore()
const { products, totalPages, currentPage } = storeToRefs(searchStore)
const { currentLocale } = useLocale()
const { isContacts } = useVisibilityProvider()

const {data: global, pending, error, refresh } = useAsyncData<any>(
   `global-${currentLocale.value}`,
   async () => {
      const response = await find('global', {
         filters: { locale: currentLocale.value },
         populate: {
            footer: {
               populate: {
                  logo: {
                     fields: ['alternativeText', 'url']
                  }
               }
            },
            socials: {
               populate: {
                  icon: {
                     fields: ['alternativeText', 'url']
                  }
               }
            },
            legal: true,
            phones: true,
            email: true,
         },
      })

      if (!response.data) {
      throw createError({ statusCode: 404, message: 'Global not found' });
      }

      return response.data
   }
)

watch(currentLocale, () => {
  refresh()
})

watchEffect(() => {
  if (global.value) {
    console.debug('Global data:', global.value);
  }
})

</script>

<template>
<header class="header">
   <div class="header__container-top">
<ClientOnly >
   <ColorMode class="header__color-mode"
   />
</ClientOnly>
<BaseNavigation 
class="header__navigation hidden-tablet" 
/>
<ShowModalHamburger class="header__dialog-header"
 />
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
<ProductFilter class="header__search"
 />
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
   <Basket class="header__cart"
   />
</div>
</div>
</header>

   <main class="main">
      <div class="main__container">
      <slot />
   </div>
   </main>

   <Footer class="footer"
     v-if="global"
      :phones="global.phones"
      :email="global.email"
      :footer="global.footer"
      :legal="global.legal"
      :socials="global.socials"
    >
    </Footer>
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
}
</style>
