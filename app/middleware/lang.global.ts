export default defineNuxtRouteMiddleware((to) => {
   const supportedLangs = ['en', 'ru', 'be']
   const lang = to.params.lang
 
   // Если язык не поддерживается — редирект на 'en'
   if (!supportedLangs.includes(String(lang))) {
     return navigateTo('/ru')
   }
 })