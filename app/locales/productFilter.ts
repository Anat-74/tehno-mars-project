import type { LocaleCode } from "../types/types"

export const productFilterTranslations: Record<LocaleCode, {
   labelInput: string
   placeholder: string
   noResults: string
   labelSelect: string
   optionName: string
   optionPrice: string
   optionPriceDesc: string
}> = {
   ru: {
      labelInput: "Поиск товаров",
      placeholder: "Поиск...",
      noResults: "Товары не найдены",
      labelSelect: "Сортировка товаров",
      optionName: "От А до Я",
      optionPrice: "Дешевле",
      optionPriceDesc: "Дороже"
   },
   en: {
      labelInput: "Search for products",
      placeholder: "Search...",
      noResults: "No products found",
      labelSelect: "Sorting products",
      optionName: "From A to Z",
      optionPrice: "Cheaper",
      optionPriceDesc: "More expensive"
   },
   be: {
      labelInput: "Пошук тавараў",
      placeholder: "Пошук...",
      noResults: "Тавары не знойдзены",
      labelSelect: "Сартаванне тавараў",
      optionName: "Ад А да Я",
      optionPrice: "Танней",
      optionPriceDesc: "Даражэй"
   }
 }