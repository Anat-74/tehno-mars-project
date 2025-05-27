<script setup lang="ts">
const dialogElement = useTemplateRef<HTMLDialogElement>('dialog-contacts')

const openDialog = () => {
   dialogElement.value?.showModal()
   }

const closeDialog = () => {
   dialogElement.value?.close()
}

onMounted(() => {
   if (dialogElement.value) {
   useCloseDialogElement(dialogElement.value)
  }
})
</script>

<template>
   <div>
   <UButton 
   @click="openDialog" 
   name-class="hamburger"
   aria-label="Открыть модальное окно" 
   >
   </UButton>
   <dialog 
   class="dialog-contacts"
   ref="dialog-contacts"
   id="dialogContacts" 
   aria-label="Контакты" 
   >
     <div class="dialog-contacts__items">
         <UButton 
         @click="closeDialog"
         name-class="hamburger"
         aria-label="Закрыть модальное окно"
          />
     </div>
   </dialog>
</div>
 </template>

<style lang="scss" scoped>
.dialog-contacts {
  min-height: 100dvh;
  display: block;
  position: fixed;
  inset: 0;
  margin-inline-end: 0;
  background-color: var(--slate-gray);
  translate: 100%;
//   transition: translate .2s linear;
  @include adaptiveValue('width', 855, 285);

  &[open] {
   translate: 0;
   transition: translate .2s linear;
  }
  &[open]::backdrop {
   background-color: var(--dark-color);
   animation: fade .2s linear forwards;
  }

  &__items {
   min-height: 100dvh;
   padding-block: toEm(25, 16);
   @include adaptiveValue('padding-inline', 22, 12);
  }
}

@keyframes fade {
   0% {
      opacity: 0;
   }
   100% {
      opacity: .4;
   }
}
</style>