export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://whimsical-beauty-1d8dda3475.strapiapp.com/api/categories')
    return response
  } catch (err) {
    console.error('Strapi request failed:', err)
    // Возвращаем пустые данные вместо падения
    return { data: null }
  }
})