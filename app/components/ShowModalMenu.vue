<script setup lang="ts">
import { buttonTranslations } from '~/locales/button'
import type { Category } from "../types/types"
const { currentLocale } = useLocale()

const dialogElement = useTemplateRef<HTMLDialogElement>('dialog-menu')

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


const { find } = useStrapi()
const route = useRoute()
const { categorySlug } = route.params

const { data: category, status, error } = useAsyncData(
  `category-dialog-${categorySlug}-${currentLocale.value}`,
  async () => {
     const response = await find<Category>('categories', {
       filters: {
         slug: { $eq: categorySlug },
         locale: currentLocale.value
       },
      populate: {
        subcategories: {
            fields: ['id', 'name', 'slug'],
            populate: {
               products: {
               fields: ['id', 'name', 'slug']
            }
         }
        }
       }
    })

    // Проверяем наличие данных
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

//=====================

// const { data: subcategory } = useAsyncData(
//   `subcategory-dialog-${subcategorySlug}-${currentLocale.value}`,
//   async () => {
//    const response = await find<Subcategory>('subcategories', {
//        filters: {
//           slug: { $eq: subcategorySlug },
//           category: { slug: { $eq: categorySlug } },
//           locale: currentLocale.value
//        },
//        populate: {
//         products: {
//          fields: ['id', 'name', 'slug']
//         }
//       }
//     })

//     // Проверяем наличие данных
//     if (!response.data || response.data.length === 0) {
//       throw createError({
//         statusCode: 404,
//         statusMessage: 'Category - Not Found'
//       })
//      }
//     return response.data
//    }
// )

// console.debug('SubcategoryModal', category.value)
</script>

<template>
   <Loader v-if="status === 'pending'" />
   <div class="menu">
   <UButton 
   @click="openDialog"
   icon="line-md:arrow-open-left"
   name-class="menu"
   :aira-label="buttonTranslations[currentLocale].ariaLabelDialogOpen"
   >
   </UButton>
   <dialog 
   class="dialog-menu"
   ref="dialog-menu"
   id="dialogMenu" 
   aria-label="Контакты" 
   >
     <div class="dialog-menu__items">
         <UButton 
         @click="closeDialog"
         name-class="close"
         :aira-label="buttonTranslations[currentLocale].ariaLabelDialogClosed"
          />

         <ul class="dialog-menu__accordion accordion">
         <li 
            v-for="cat in category"
           :key="cat.id"
         class="accordion">
         <details 
            name="faq" 
            class="accordion__details"
         >
           <summary 
           class="accordion__summary"> 
           {{ cat.name }}
         </summary> 
         </details>

         <div class="accordion__content">
         <div 
         class="accordion__content-items">
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
     </div>
   </dialog>
</div>
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
  background-color: var(--slate-gray);
  translate: 100%;
  transition: translate .2s linear;
  @include adaptiveValue('width', 855, 285);

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
   padding-block: toEm(25, 16);
   @include adaptiveValue('padding-inline', 22, 12);
  }
}

.accordion {
      &__details {
         font-size: toRem(22);
      }

      &__details[open] +
      &__content {
         grid-template-rows: 1fr;
      }

      &__details[open] {
         .accordion__summary {
            color: var(--danger-color);
         }
      }

      &__summary {
         @include adaptiveValue("font-size", 24, 18);
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding-block: toEm(6, 22);
         font-weight: 500;
         cursor: pointer;
      }

      &__content {
         transition: all .3s;
         display: grid;
         grid-template-rows: 0fr;
      }

      &__content-items {
         overflow: hidden;
         display: grid;
         align-items: center;
      }

      &__link {
         @include adaptiveValue("font-size", 20, 16);
         padding-inline: toEm(4, 20);
      }

      .router-link-active {
      color: var(--danger-hover);
      font-weight: 500;
   }
   }

@keyframes fade {
   0% {
      opacity: 0;
   }
   100% {
      opacity: .2;
   }
}
</style>