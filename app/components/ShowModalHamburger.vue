<script setup lang="ts">
const dialogElement = useTemplateRef<HTMLDialogElement>('dialog-hamburger')

const { open, close } = useDialog(dialogElement)
</script>

<template>
   <div>
   <UButton 
   @click="open()" 
   name-class="hamburger"
   aria-label="open"
   />
   <dialog 
   class="dialog-hamburger"
   ref="dialog-hamburger"
   id="dialogHamburger" 
   aria-label="Контакты" 
   >
     <div class="dialog-hamburger__items">
         <UButton 
         @click="close()"
         name-class="hamburger"
         aria-label="closed"
          />
     </div>
   </dialog>
</div>
 </template>

<style lang="scss" scoped>
.dialog-hamburger {
  min-height: 100dvh;
  display: block;
  position: fixed;
  inset: 0;
  margin-inline-end: 0;
  background-color: var(--slate-gray);
  translate: 100%;
  transition: translate .2s linear;
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
      opacity: .8;
   }
}
</style>