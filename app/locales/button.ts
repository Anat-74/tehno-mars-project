import type { LocaleCode } from "../types/types"

export const buttonTranslations: Record<LocaleCode, {
   label: string
   ariaLabelLang: string
   ariaLabelGoBack: string
   ariaLabelGoForward: string
   ariaLabelAdded: string
   ariaLabelPagination: string
   ariaLabelScrollToTop: string

 }> = {
   ru: {
       label: "Добавить в корзину",
       ariaLabelAdded: "Добавлено в корзину",
      ariaLabelLang: "Переключить язык",
      ariaLabelGoBack: "Вернуться назад",
       ariaLabelGoForward: "Идти вперед",
       ariaLabelPagination: "Перейти на следующую страницу",
       ariaLabelScrollToTop: "Прокрутить наверх"
   },
   en: {
      label: "Add to cart",
      ariaLabelAdded: "Added to cart",
      ariaLabelLang: "Switch language",
      ariaLabelGoBack: "Go back",
      ariaLabelGoForward: "Go forward",
      ariaLabelPagination: "Go to the next page",
      ariaLabelScrollToTop: "Scroll to top"
   },
   be: {
      label: "Дадаць у кошык",
      ariaLabelAdded: "Паведамленні ў кошык",
      ariaLabelLang: "Пераключыць мову",
      ariaLabelGoBack: "Вярнуцца назад",
      ariaLabelGoForward: "Ідзі наперад",
      ariaLabelPagination: "Перайсці на наступную старонку",
      ariaLabelScrollToTop: "Пракруціць уверх"
   }
 }