// middleware/lang.global.ts (исправленный)
export default defineNuxtRouteMiddleware((to, from) => {
   // const supportedLangs = ['en', 'ru', 'be']
   
   // // Редирект с корня на сохраненный язык
   // if (to.path === '/') {
   //   const langCookie = useCookie('lang').value || 'ru'
   //   return navigateTo(`/${langCookie}`)
   // }
 
   // // Проверка языка в URL
   // const urlLang = to.params.lang as string
   // if (!supportedLangs.includes(urlLang)) {
   //   const langCookie = useCookie('lang').value || 'ru'
   //   return navigateTo(`/${langCookie}`)
   // }
 })