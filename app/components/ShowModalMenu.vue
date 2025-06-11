<script setup lang="ts">
import type { Category, Product, FooterData, SocialLink, Phone } from "../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'

const dialogElement = useTemplateRef<HTMLDialogElement>('dialog-menu')

defineProps<{
   footer: FooterData
   socials: SocialLink[]
   phones: Phone[]
}>()

const config = useRuntimeConfig()
const { currentLocale } = useLocale()
const { formatPhone } = useFormatPhone()
const { find } = useStrapi()

const openDialog = () => {
   dialogElement.value?.showModal()
   }

const closeDialog = () => {
   dialogElement.value?.close()
}

onMounted(() => {
   if (dialogElement.value) {
   useCloseDialogElement(dialogElement.value)
  }
})


const { data: category, status, error } = useAsyncData(
  `category-dialog-${currentLocale.value}`,
  async () => {
     const response = await find<Category>('categories', {
       filters: {
         locale: currentLocale.value
       },
      populate: {
        subcategories: {
            fields: ['id', 'name', 'slug'],
         //    populate: {
         //       products: {
         //       fields: ['id', 'name', 'slug','isDiscount'],
         //    }
         // }
        }
       }
    })


    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category - Not Found'
      })
     }
    return response.data
   }
)

console.debug('CategoryModal', category.value)


const { data: product } = useAsyncData(
  `product-dialog-${currentLocale.value}`,
  async () => {
     const response = await find<Product>('products', {
       filters: {
         locale: currentLocale.value,
         isDiscount: true,
       },
       fields: ['id', 'name', 'isDiscount', 'slug'],
       pagination: {
        pageSize: 100
      },
         populate: {
         subcategory: {
         fields: ['id', 'name', 'slug'],
         populate: {
            category: {
               fields: ['id', 'name', 'slug'],
            }
         }
            }
         }
    })


    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product - Not Found'
      })
     }
    return response.data
   }
)

console.debug('ProductModal', product.value)
</script>

<template>
   <Loader v-if="status === 'pending'" />
   <UButton 
   @click="openDialog"
   icon="line-md:arrow-open-left"
   name-class="dialog-menu"
   aria-label="open"
   />
   <dialog 
   class="dialog-menu"
   ref="dialog-menu"
   id="dialogMenu" 
   aria-label="Menu" 
   >
   <h1
         class="visually-hidden"
         >{{ visuallyHiddenTranslations[currentLocale].showModalMenuTitle }}</h1>
     <div class="dialog-menu__items">
         <UButton 
         @click="closeDialog"
         name-class="close"
         aria-label="closed"
          />
         <div class="dialog-menu__top">
      <NuxtLink class="dialog-menu__logo"
      :to="`/${currentLocale}`">
      <NuxtImg
         v-if="footer.logo?.length"
         :src="`${config.public.strapi.url}${footer.logo[0]?.url}`"
         :alt="footer.companyName"
         format="webp"
         width="55"
         loading="lazy"
         class="base-footer__logo"
         aria-label="Go home"
    />
   </NuxtLink>
   <AnimateTitle />
</div>
         <ul
         v-if="category?.length"
         class="dialog-menu__accordion accordion">
         <li 
          v-for="cat in category"
         :key="cat.id"
         class="accordion__item">
         <details 
            name="faq" 
            class="accordion__details"
         >
           <summary 
           class="accordion__summary">
           <Icon name="mdi:chevron-left" />
           {{ cat.name }}
         </summary> 
         </details>

         <div class="accordion__content">
         <div 

         class="accordion__subcategories">
         <NuxtLink
         v-for="sub in cat.subcategories"
         :key="sub.id"
         :to="`/${currentLocale}/${cat.slug}/${sub.slug}`"
          class="accordion__link"
         >{{ sub.name }}
      </NuxtLink>
                  </div>
               </div>
            </li>
      </ul>

      <div v-if="product?.length">
      >
      <NuxtLink
         v-for="prod in product"
         :key="prod.id"
         :to="`/${currentLocale}/${prod.subcategory.category.slug}/${prod.subcategory.slug}/${prod.slug}`"
          class="accordion__link"
         >{{ prod.name }}
         {{prod.subcategory.name}}
         {{prod.subcategory.category.name}}
      </NuxtLink>
      </div>

      <div
      class="dialog-menu__phones"
      v-for="item in phones" 
      :key="item.id"
      >
         <Icon
          v-if="item.isMobile"
         name="et:phone"
         />

         <Icon
          v-if="!item.isMobile"
         name="carbon:phone-ip"
         />
    <a
    :href="`tel:${item.phoneNumber.replace(/[^0-9+]/g, '')}`"
    class="company__link-phones"
    v-html="formatPhone(item.phoneNumber)"
    >
    </a>
   </div>

      <div class="dialog-menu__socials"
    v-if="socials"
   >
   <a
   v-for="link in socials" 
   :key="link.id"
    :href="link.href" 
    target="_blank"
    >
      <NuxtImg 
         v-if="link.icon"
        :src="`${config.public.strapi.url}${link.icon[0]?.url}`"
        :alt="link.label"
        width="26"
        height="26"
      />
    </a>
   </div>
     </div>
   </dialog>
<div v-if="error" class="error">
      {{ error.message }}
    </div>
 </template>

<style lang="scss" scoped>
.dialog-menu {
  min-height: 100dvh;
  display: block;
  position: fixed;
  inset: 0;
  margin-inline-end: 0;
  translate: 100% 0;
  background-color: var(--bg);
  transition: translate .2s linear;

  &[open] {
   translate: 0;
   transition: translate .2s linear;
  }
  &[open]::backdrop {
   background-color: var(--dark-color);
   animation: fade .2s linear forwards;
  }

  &__items {
   min-height: 100dvh;
   display: flex;
   flex-direction: column;
   row-gap: toEm(18);
   padding-block: toEm(16);
   padding-inline: toEm(7);
   background:linear-gradient(-135deg, transparent toRem(45), var(--secondary-color) 0);
   @include adaptiveValue('margin-inline', 32, 7);
  }

  &__top {
   position: relative;
   display: flex;
  }

  &__logo {
   border-radius: 50%;
   padding-inline: toEm(4);
   padding-block: toEm(6);
   outline: 1px solid var(--light-color);
   outline-offset: toRem(2);
   background-color: var(--light-color);
  }

  &__accordion {
   flex: 1 1 auto;
  }

  &__phones {
   align-self: center;
   display: flex;
   align-items: center;
   column-gap: toRem(4);
   color: var(--border-color);
   font-weight: 600;
   transition: all var(--transition-duration);

   svg {
      font-size: toEm(22);
      color: var(--warning-color);
   }

   @include hover {
      color: var(--warning-color);
      svg {
      color: var(--border-color);
   }
   }
}

  &__socials {
   align-self: end;
   display: flex;
   column-gap: toEm(12);

      img {
         transition: scale var(--transition-duration);

         @include hover {
            scale: 1.1;
         }
      }
  }
}

.accordion {
   color: var(--gray-color);

      &__details {
         margin-block-end: toEm(2);
         svg {
            font-size: toEm(22);
         }
      }

      &__details[open] +
      &__content {
         grid-template-rows: 1fr;
      }

      &__details[open] {
         .accordion__summary {
            color: var(--danger-color);

            svg {
               transform: rotate(-90deg);
               transition: transform .3s;
            }
         }
      }

      &__summary {
         display: grid;
         grid-template-columns: auto 1fr;
         align-items: center;
         justify-items: center;
         padding-block: toEm(6, 22);
         font-weight: 600;
         font-size: toEm(20);
         cursor: pointer;
         transition: color var(--transition-duration);

            @include hover {
               color: var(--warning-color);
            }
      }

      &__content {
         display: grid;
         grid-template-rows: 0fr;
         transition: all .3s;
      }

      &__subcategories {
         overflow: hidden;
         display: grid;
         align-items: center;
         row-gap: toEm(9);
         justify-content: center;
         color: var(--color);
      }

      &__link {
         padding-inline: toEm(4, 18);
         font-size: toEm(18);
         transition: all var(--transition-duration);

         @include hover {
            color: var(--dark-color);
            text-decoration: underline;
         }
      }

      .router-link-active {
      color: var(--danger-hover);
   }
   }

@keyframes fade {
   0% {
      opacity: 0;
   }
   100% {
      opacity: .3;
   }
}
</style>