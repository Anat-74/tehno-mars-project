<script setup lang="ts">
import { buttonTranslations } from '~/locales/button'
const { currentLocale } = useLocale()

defineProps({
  message: String,
  type: {
    type: String,
    default: 'success'
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="message"
       :class="['notification', `notification_${type}`]"
    >
         <Icon  class="notification__icon"
         name="material-symbols:check-circle"/>
        <slot>{{ message }}</slot>
      <UButton
       class="notification__close"
      @click="close"
      icon="mdi:close"
      :aria-label="buttonTranslations[currentLocale].ariaLabelClosedSuccess"
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.notification {
  width: 50%;
  position: fixed;
  top: toEm(12);
  left: 50%;
  translate: -50% 0;
  padding: toEm(22);
  border-radius: toEm(8);
   display: grid;
   grid-template-columns: auto 1fr auto;
   grid-auto-flow: column;
   align-items: center;
   column-gap: toEm(16);
  z-index: 1000;
  box-shadow: 0px 0px 22px 24px rgba(0, 0, 0, 0.12);

  @media (max-width:$mobile){
    width: 80%; 
  }
  @media (max-width:$mobileSmall){
    width: 95%; 
  }

  &_success {
   background-color: var(--green-color);
   color: var(--light-color);
  }

  &__icon {
   font-size: toEm(28);
  }

  &__close {
  color: inherit;
  cursor: pointer;
  opacity: .8;
  transition: all var(--transition-duration);

  @include hover {
   opacity: 1;
   scale: 1.1;
  }
}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>