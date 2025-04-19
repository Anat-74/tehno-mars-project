// composables/useLocale.ts
export const useLocale = () => {
   const route = useRoute()
   const router = useRouter()
   const langCookie = useCookie<string>('lang', {
     maxAge: 365 * 24 * 60 * 60,
     sameSite: 'lax'
   })
 
   // Инициализация из URL или куки
   const currentLocale = useState<string>('locale', () => {
     return (route.params.lang as string) || langCookie.value || 'ru'
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
 
   const locales = [
     { code: 'en', name: 'English' },
     { code: 'ru', name: 'Русский' },
     { code: 'be', name: 'Беларускi' }
   ]
 
   const switchLocale = (newLocale: string) => {
     currentLocale.value = newLocale
   }
 
   return { currentLocale, locales, switchLocale }
 }