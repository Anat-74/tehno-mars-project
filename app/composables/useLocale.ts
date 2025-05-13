import type { LocaleCode } from "../types/types"

export const useLocale = () => {
   const route = useRoute()
   const router = useRouter()
   const langCookie = useCookie<string>('lang', {
     maxAge: 365 * 24 * 60 * 60,
     sameSite: 'lax'
   })

   const currentLocale = useState<LocaleCode>('locale', () => {
      const lang = (route.params.lang as string) || langCookie.value || 'ru'
      return lang as LocaleCode
    })
   // Автоматическая синхронизация при изменении
   watch(currentLocale, (newVal) => {
     langCookie.value = newVal
     if (route.params.lang !== newVal) {
       router.replace({
         params: { ...route.params, lang: newVal },
         query: route.query
       })
     }
   })

   watch(() => route.params.lang, (newVal) => {
      if (newVal && newVal !== currentLocale.value) {
        const validLocales: LocaleCode[] = ['ru', 'en', 'be']
        currentLocale.value = validLocales.includes(newVal as LocaleCode) 
          ? newVal as LocaleCode 
          : 'ru' // fallback
      }
    })
 
   const locales = [
      { 
         code: 'ru', 
         icon: 'emojione:flag-for-russia'
       },
      { 
        code: 'en', 
        icon: 'emojione:flag-for-united-kingdom'
      },
      { 
        code: 'be', 
        icon: 'emojione:flag-for-belarus'
      }
    ]
 
    const switchLocale = (newLocale: LocaleCode) => {
      currentLocale.value = newLocale
    }
 
   return { currentLocale, locales, switchLocale }
 }