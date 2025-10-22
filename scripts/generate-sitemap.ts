// @ts-ignore
import { writeFileSync } from 'fs'
import { $fetch } from 'ofetch'

interface SitemapUrl {
  loc: string
  lastmod?: string
  priority?: number
 changefreq?: string
  images?: Array<{ loc: string }>
}

async function generateSitemap() {
 // Загружаем переменные окружения
  const siteUrl = 'http://localhost:3000'
 // Явно использовать переменную окружения для API Base URL
 const strapiUrl = 'https://api.vh324.by3020.ihb.by'
  const strapiToken = '7b2ca5371dbd307d41b14c90476b4b1aef6bd27b567aea96031ffe7466866249cd763f099b3b6f67494ba88cf62fe6a08faf65b0f772eaab73d0abd8e6e59a75e742d9d8d503d7e2c77d0250ff2b08819385ca0c7fc52d4670c582230a46435ac79cbf47556861be88a0178aed509fb9ba57b566d08f70feff536abf5607bb1a' // Установите токен вручную или через env
  console.log('Strapi URL:', strapiUrl) // Отладочный вывод

  let urls: SitemapUrl[] = []
  
  try {
    // Get data directly from Strapi API (more reliable than Nuxt API)
    
    try {
      // Fetch data directly from Strapi with correct populate syntax
      // Transform Strapi data to sitemap format
      const langs = ['ru', 'en', 'be']
      
      // Add static pages
      for (const lang of langs) {
        urls.push({ loc: `/${lang}/about`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/services`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/contacts`, lastmod: '2024-01-01' })
        urls.push({ loc: `/${lang}/cartshopping`, lastmod: new Date().toISOString() })
      }
      
      // Fetch data only for the main locale where data exists
      const mainLocale = 'ru';
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
      console.log('Full category response:', JSON.stringify(categoriesRes.data?.[0], null, 2));
      console.log('Full subcategory response:', JSON.stringify(subcategoriesRes.data?.[0], null, 2));
      console.log('Full product response:', JSON.stringify(productsRes.data?.[0], null, 2));
      
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