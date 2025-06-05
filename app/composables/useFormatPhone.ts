export const useFormatPhone = () => {
   const formatPhone = (phone: string) => {
      return phone
        .replace(/ /g, '&nbsp;')   // Неразрывный пробел
        .replace(/-/g, '&#8209;')  // Неразрывный дефис
    }
   return { formatPhone }
}