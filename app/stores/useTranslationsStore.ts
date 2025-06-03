// import type { TranslationsCache } from "../types/types";

// export const useTranslationsStore = defineStore('translations-store', () => {
//    const { find } = useStrapi()

//    const translationsCache = useState<TranslationsCache>('translations', () => ({}))
   
//    const loadTranslations = async(lang: string) => {
//       if (translationsCache.value[lang]) {
//          return translationsCache.value[lang]
//       }
//       const { data, error } = await useAsyncData(`translations-${lang}`,
//          () => find(`translations?locale=${lang}`)
//       )
//       if (error.value) {
//          console.error('Ошибка загрузки переводов:', error.value)
//          return {} // Возвращаем пустой объект, чтобы не ломать интерфейс
//       }
//       // console.log('data', data.value)
//       const transitions = data.value?.data || {}
//       translationsCache.value[lang] = transitions
//       return translationsCache.value[lang]
//    }
//    return { loadTranslations }
// })