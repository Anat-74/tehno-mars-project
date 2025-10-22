// @ts-ignore
import { writeFileSync } from 'fs'
import { $fetch } from 'ofetch'

async function loadEnv() {
  try {
    const dotenv = await import('dotenv')
    dotenv.config()
  } catch (error) {
    console.warn('dotenv not found, using default values')
  }
}

interface SitemapUrl {
  loc: string
  lastmod?: string
  priority?: number
 changefreq?: string
  images?: Array<{ loc: string }>
}

async function generateSitemap() {
  // Загружаем переменные окружения
  await loadEnv()
  
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'
  const strapiToken = process.env.NUXT_STRAPI_TOKEN || '64acd09db50794111c1b62365941ac1a5a45a54fee8e5b4b882b838d9445de32a16f000532908f67c7fe211cd66e9cd88b691005c25dae4493fc897acce3ce6131b9bc1cd202ce01e2bae8ac6d53338f4a632b6193df492582e49bc41b4213eeaa1fe47a714ac3dc1c986ebcad539a0778e4c20c5d3d5974d57591e89d382350'
  
  console.log('Strapi URL:', strapiUrl) // Отладочный вывод

  let urls: SitemapUrl[] = []
  
  try {
    // Transform Strapi data to sitemap format
    const langs = ['ru', 'en', 'be']
    const mainLocale = 'ru'; // Основная локаль, где есть все данные
    
    // Get data directly from Strapi API (more reliable than Nuxt API)
    
    try {
      // Add static pages
      for (const lang of langs) {
        urls.push({ loc: `/${lang}/about`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/services`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/contacts`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/cartshopping`, lastmod: new Date().toISOString() })
      }
      
      // Fetch data only for the main locale where data exists
      const [categoriesRes, subcategoriesRes, productsRes] = await Promise.all([
        $fetch(`${strapiUrl}/api/categories?locale=${mainLocale}`, {
          headers: { Authorization: `Bearer ${strapiToken}` }
        }).catch(() => ({ data: [] })),
        $fetch(`${strapiUrl}/api/subcategories?populate=category&locale=${mainLocale}`, {
          headers: { Authorization: `Bearer ${strapiToken}` }
        }).catch(() => ({ data: [] })),
        $fetch(`${strapiUrl}/api/products?populate=subcategory.category`, {
          headers: { Authorization: `Bearer ${strapiToken}` }
        }).catch(() => ({ data: [] }))
      ])
      
      console.log('Categories data for main locale', mainLocale, ':', categoriesRes.data?.length);
      console.log('Subcategories data for main locale', mainLocale, ':', subcategoriesRes.data?.length);
      console.log('Products data for main locale', mainLocale, ':', productsRes.data?.length);
      
      // Create a map of category ID to subcategories for easier lookup
      const categorySubcategoriesMap: Record<string, any[]> = {};
      if (subcategoriesRes.data) {
        for (const sub of subcategoriesRes.data) {
          if (sub.category) {
            const categoryId = sub.category.id;
            if (!categorySubcategoriesMap[categoryId]) {
              categorySubcategoriesMap[categoryId] = [];
            }
            categorySubcategoriesMap[categoryId].push(sub);
          }
        }
      }
      
      // Add categories and subcategories for all locales
      if (categoriesRes.data) {
        for (const cat of categoriesRes.data) {
          for (const lang of langs) {
            urls.push({ loc: `/${lang}/${cat.slug}`, lastmod: cat.updatedAt || cat.createdAt })
            
            // Add subcategories for this category
            const subcategoriesForCat = categorySubcategoriesMap[cat.id] || [];
            for (const sub of subcategoriesForCat) {
              urls.push({ loc: `/${lang}/${cat.slug}/${sub.slug}`, lastmod: sub.updatedAt || sub.createdAt })
            }
          }
        }
      }
      
      // Add products for all locales
      if (productsRes.data) {
        for (const prod of productsRes.data) {
          if (prod.subcategory && prod.subcategory.category) {
            for (const lang of langs) {
              const images = prod.images?.data ? prod.images.data.map((img: any) => ({ loc: img.url })) : []
              urls.push({
                loc: `/${lang}/${prod.subcategory.category.slug}/${prod.subcategory.slug}/${prod.slug}`,
                lastmod: prod.updatedAt || prod.createdAt,
                images
              })
            }
          } else {
            console.log('Product missing subcategory or category in subcategory:', prod.id, prod.name, prod.subcategory);
          }
        }
      }
    } catch (error) {
      console.error('Strapi API Error:', error)
      // Fallback to minimal sitemap if Strapi fails
      urls = [
        { loc: `/`, lastmod: new Date().toISOString() },
        { loc: `/ru/about`, lastmod: '2024-01-01' },
        { loc: `/ru/services`, lastmod: '2024-01-01' },
        { loc: `/ru/contacts`, lastmod: '2024-01-01' },
        { loc: `/ru/cartshopping`, lastmod: new Date().toISOString() },
        { loc: `/en/about`, lastmod: '2024-01-01' },
        { loc: `/en/services`, lastmod: '2024-01-01' },
        { loc: `/en/contacts`, lastmod: '2024-01-01' },
        { loc: `/en/cartshopping`, lastmod: new Date().toISOString() },
        { loc: `/be/about`, lastmod: '2024-01-01' },
        { loc: `/be/services`, lastmod: '2024-01-01' },
        { loc: `/be/contacts`, lastmod: '2024-01-01' },
        { loc: `/be/cartshopping`, lastmod: new Date().toISOString() }
      ]
    }
    
    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls.map(url => `
  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${url.lastmod || new Date().toISOString()}</lastmod>
    <priority>${url.priority || 0.8}</priority>
    <changefreq>${url.changefreq || 'weekly'}</changefreq>
    ${url.images ? url.images.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
    </image:image>`).join('') : ''}
  </url>
 `).join('')}
</urlset>`

    // Write to file
    const outputPath = './public/sitemap.xml'
    writeFileSync(outputPath, xml)
    console.log('✅ Sitemap generated successfully!')
    
 } catch (error) {
    console.error('❌ Sitemap generation failed:', error)
    // process.exit(1) - закомментировано для избежания ошибок типизации
 }
}

generateSitemap()