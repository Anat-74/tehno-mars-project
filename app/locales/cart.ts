import type { LocaleCode } from "../types/types"

export const cartTranslations: Record<LocaleCode, {
   title: string
   description: string
   emptyCart: string
   total: string
   checkout: string
   noProducts: string
 }> = {
   ru: {
     title: 'Корзина',
     description: 'Страница корзины сайта',
     emptyCart: 'Товаров пока нет(',
     total: 'Итого',
     checkout: 'Оформить',
     noProducts: 'Товаров пока нет('
   },
   en: {
     title: 'Cart',
     description: 'Website cart page',
     emptyCart: 'No products yet(',
     total: 'Total',
     checkout: 'Checkout',
     noProducts: 'No products yet('
   },
   be: {
     title: 'Кошык',
     description: 'Старонка кошыка сайта',
     emptyCart: 'Тавараў пакуль няма(',
     total: 'Усяго',
     checkout: 'Аформіць',
     noProducts: 'Тавараў пакуль няма('
   }
 }