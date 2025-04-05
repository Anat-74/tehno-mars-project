export const useLocale = () => {
  const route = useRoute()
  const router = useRouter()

  // Текущий язык из URL (например, `/ru` → `ru`)
   const currentLocale = ref<string>(route.params.lang as string || 'ru')

  // Список доступных локалей (должен совпадать с Strapi)
  const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'be', name: 'Беларускi', flag: 'BE' }
  ]

  // Переключение языка
  const switchLocale = async (newLocale: string) => {
    // Обновляем URL без перезагрузки страницы
    await router.push({
      params: { lang: newLocale },
      query: route.query, // Сохраняем query-параметры
    })
    currentLocale.value = newLocale
  }

  return { currentLocale, locales, switchLocale }
}