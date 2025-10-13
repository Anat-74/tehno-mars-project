export default defineEventHandler(async () => {
  const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL
  const langs = ['ru', 'en', 'be']
  const urls = []

  for (const lang of langs) {
    try {
      // Получаем категории с подкатегориями для локали
      const categories = await $fetch(`${strapiUrl}/api/categories?populate=subcategories&locale=${lang}`, {
        headers: { Authorization: `Bearer ${process.env.NUXT_STRAPI_TOKEN}` }
      }).catch(() => ({ data: [] })) as { data: any[] }

      // Получаем продукты с категорией и изображениями для локали
      const products = await $fetch(`${strapiUrl}/api/products?populate=category,images&locale=${lang}`, {
        headers: { Authorization: `Bearer ${process.env.NUXT_STRAPI_TOKEN}` }
      }).catch(() => ({ data: [] })) as { data: any[] }

      // Добавляем статические страницы для локали
      urls.push({ loc: `/${lang}/about`, lastmod: '2024-01-01' })
      urls.push({ loc: `/${lang}/services`, lastmod: '2024-01-01' })
      urls.push({ loc: `/${lang}/contacts`, lastmod: '2024-01-01' })

      // Добавляем категории для локали
      if (categories.data) {
        for (const cat of categories.data) {
          urls.push({ loc: `/${lang}/${cat.slug}`, lastmod: cat.updatedAt || cat.createdAt })
          // Добавляем подкатегории
          if (cat.subcategories?.data) {
            for (const sub of cat.subcategories.data) {
              urls.push({ loc: `/${lang}/${cat.slug}/${sub.slug}`, lastmod: sub.updatedAt || sub.createdAt })
            }
          }
        }
      }

      // Добавляем продукты для локали
      if (products.data) {
        for (const prod of products.data) {
          if (prod.category?.data) {
            const images = prod.images?.data ? prod.images.data.map((img: any) => ({ loc: img.url })) : []
            urls.push({
              loc: `/${lang}/${prod.category.data.slug}/${prod.slug}`,
              lastmod: prod.updatedAt || prod.createdAt,
              images
            })
          }
        }
      }
    } catch (error) {
      console.error(`Ошибка получения данных для локали ${lang}:`, error)
      // Продолжаем с другими локалями
    }
  }

  return urls
})
