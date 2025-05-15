import type { LocaleCode } from "../types/types"

export const cartTranslations: Record<LocaleCode, {
   title: string
   description: string
   emptyCart: string
   noProducts: string
   visuallyHidden: string
   total: string
 }> = {
   ru: {
     title: 'Корзина',
     description: 'Страница корзины сайта',
     emptyCart: 'Товаров пока нет(',
     noProducts: 'Товаров пока нет(',
     visuallyHidden: 'Корзина товаров и оформление заказа',
     total: 'Всего товаров:'
   },
   en: {
     title: 'Cart',
     description: 'Website cart page',
     emptyCart: 'No products yet(',
      noProducts: 'No products yet(',
      visuallyHidden: 'Shopping Cart and Checkout',
      total: 'Total items::'
   },
   be: {
     title: 'Кошык',
     description: 'Старонка кошыка сайта',
     emptyCart: 'Тавараў пакуль няма(',
      noProducts: 'Тавараў пакуль няма(',
      visuallyHidden: 'Кошык тавараў, афармленне замовы',
      total: 'Усяго тавараў::'
   }
 }