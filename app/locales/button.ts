import type { LocaleCode } from "../types/types"

export const buttonTranslations: Record<LocaleCode, {
   label: string
   ariaLabelLang: string
   ariaLabelGoBack: string
   ariaLabelGoForward: string
   ariaLabelAdded: string
   ariaLabelPagination: string
   ariaLabelScrollToTop: string
   ariaLabelClosedSuccess: string

 }> = {
   ru: {
       label: "Добавить в корзину",
       ariaLabelAdded: "Добавлено в корзину",
      ariaLabelLang: "Переключить язык",
      ariaLabelGoBack: "Вернуться назад",
       ariaLabelGoForward: "Идти вперед",
       ariaLabelPagination: "Перейти на следующую страницу",
       ariaLabelClosedSuccess: "Закрыть сообщение",
       ariaLabelScrollToTop: "Прокрутить наверх"
   },
   en: {
      label: "Add to cart",
      ariaLabelAdded: "Added to cart",
      ariaLabelLang: "Switch language",
      ariaLabelGoBack: "Go back",
      ariaLabelGoForward: "Go forward",
      ariaLabelPagination: "Go to the next page",
      ariaLabelClosedSuccess: "Close message",
      ariaLabelScrollToTop: "Scroll to top"
   },
   be: {
      label: "Дадаць у кошык",
      ariaLabelAdded: "Паведамленні ў кошык",
      ariaLabelLang: "Пераключыць мову",
      ariaLabelGoBack: "Вярнуцца назад",
      ariaLabelGoForward: "Ідзі наперад",
      ariaLabelPagination: "Перайсці на наступную старонку",
      ariaLabelClosedSuccess: "Закрыць паведамленне",
      ariaLabelScrollToTop: "Пракруціць уверх"
   }
 }