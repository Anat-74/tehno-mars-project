import type { LocaleCode } from "../types/types"

export const cartTranslations: Record<LocaleCode, {
   title: string
   description: string
   visuallyHidden: string
   ariaLabelBasket: string
   total: string
 }> = {
   ru: {
     title: 'Корзина',
     description: 'Страница корзины сайта',
     visuallyHidden: 'Корзина товаров и оформление заказа',
     ariaLabelBasket: 'Перейти в кознину товаров',
     total: 'Всего товаров:'
   },
   en: {
     title: 'Cart',
     description: 'Website cart page',
      visuallyHidden: 'Shopping Cart and Checkout',
      ariaLabelBasket: 'Go to the goods market',
      total: 'Total items::'
   },
   be: {
     title: 'Кошык',
     description: 'Старонка кошыка сайта',
     visuallyHidden: 'Кошык тавараў, афармленне замовы',
     ariaLabelBasket: 'Перайсці ў казіну тавараў',
     total: 'Усяго тавараў::'
   }
 }