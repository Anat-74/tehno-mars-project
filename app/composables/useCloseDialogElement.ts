export const useCloseDialogElement = (dialogElement: HTMLDialogElement) => {
   dialogElement.addEventListener("click", closeOnBackDropClick)
 
   function closeOnBackDropClick({ currentTarget, target }: MouseEvent): void {
     const dialogElement = currentTarget as HTMLDialogElement
     const isClickedOnBackDrop = target === dialogElement
     if (isClickedOnBackDrop) {
       dialogElement.close()
     }
   }

   onUnmounted(() => {
      dialogElement.removeEventListener("click", closeOnBackDropClick);
    })
}