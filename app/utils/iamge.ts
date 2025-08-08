export const getStrapiImagePath = (url: any) => {
  if (!url) return '';
  
  // Извлекаем путь после /uploads/
  const match = url.match(/\/uploads\/(.+)/);
  return match ? match[1] : url;
};