import type { LocaleCode } from "../types/types"

export const cartTranslations: Record<LocaleCode, {
   title: string
   description: string
   emptyCart: string
   noProducts: string
 }> = {
   ru: {
     title: 'Корзина',
     description: 'Страница корзины сайта',
     emptyCart: 'Товаров пока нет(',
     noProducts: 'Товаров пока нет('
   },
   en: {
     title: 'Cart',
     description: 'Website cart page',
     emptyCart: 'No products yet(',
     noProducts: 'No products yet('
   },
   be: {
     title: 'Кошык',
     description: 'Старонка кошыка сайта',
     emptyCart: 'Тавараў пакуль няма(',
     noProducts: 'Тавараў пакуль няма('
   }
 }