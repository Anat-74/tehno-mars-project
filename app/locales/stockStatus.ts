import type { LocaleCode } from "../types/types"

export const stockStatusTranslations: Record<LocaleCode, {
   inStock: string
   outOfStock: string
}> = {
   ru: {
      inStock: "В наличии",
      outOfStock: "Под заказ ",
   },
   en: {
      inStock: "in stock",
      outOfStock: "out of stock",
   }, 
   be: {
      inStock: "В н",
      outOfStock: "Под з",
   }
 }