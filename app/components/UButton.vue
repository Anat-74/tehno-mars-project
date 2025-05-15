<script setup lang="ts">
interface Props{
   nameClass?: string
   disabled?: boolean
   icon?: string
   label?: string | number
   size?: string
   loading?: boolean
   theme?: string
}
const { size = 'normal' } = defineProps<Props>()

const colorMode = useColorMode()

const emit = defineEmits(['click'])
const clickOnButton = () => {
   emit('click')
}
</script>

<template>
   <button 
      type="button"
      :disabled="disabled"
      @click="clickOnButton"
      :class="[
      'btn', `btn_${nameClass}`,
      { 'btn_icon': icon }, { 'btn_large': size === 'large' },
      { 'btn_loading': loading },
      { 'btn_preferred': !colorMode.unknown && theme === colorMode.preference,
      'btn_selected': !colorMode.unknown && theme === colorMode.value}
   ]"
      >
   <span v-if="icon">
      <Icon :name="icon"
      />
   </span>
   <span v-else>{{ label }}</span>
   </button>
</template>

<style lang="scss" scoped>
body:has(dialog[open]) {
   .btn_hamburger {
      span {
         width: 0;
      }
      &::before,
      &::after {
         background-color: var( --dark-color);
      }
      &::before {
         top: calc(50% - toRem(1));
         transform: rotate(-45deg);
      }
      &::after {
         bottom: calc(50% - toRem(1));
         transform: rotate(45deg);
      }
   }
 }

.btn {
   padding-inline: toRem(12);
   padding-block: toRem(8);
   border-radius: toRem(4);
   color: var(--light-color);
   background-color: transparent;
   border: none;

   &:disabled {
    opacity: .4;
    cursor: default;
  }
    span {
      display: flex;
      justify-content: center;
    }

    &_icon {
      padding: 0;
      font-size: toEm(24);
  }

   &_color-theme {
      padding: toRem(2);
      transition: transform var(--transition-duration);
      @include hover {
         transform: scale(1.4) rotate(-25deg);
      }
      svg {
         font-size: toRem(18);
         color: var(--forest-green-color);
      }
   }
   &_preferred {
         svg  {
            color: var(--primary-color);
         }
      }
      &_selected {
         svg  {
         color: var(--active-color);
         }
      }

   &_hamburger {
   display: none;
   @media (max-width:$tablet){
      display: block;
      position: absolute;
      z-index: 100;
      right: toRem(15);
      width: toRem(26);
      height: toRem(18);
      @include adaptiveValue("top", 32, 18);

         span,
      &::before,
      &::after{
         content: '';
			right: 0;
			position: absolute;
			width: 100%;
			height: toRem(2);
			background-color: var(--primary-color);
         transition: transform .4s .2s, height var(--transition-duration);
      }
      &::before {
			top: 0;
		}
		&::after {
			bottom: 0;
		}
		span {
         width: 70%;
			top: calc(50% - toRem(1));
		   }

         @include hover {
         span,
         &::before,
         &::after {
            height: toRem(3);
         }
      }
      }
  }

  &_go-forward-back {
   padding: toRem(5);
   border-radius: toRem(6);
   background-color: var(--warning-color);
   transition: background-color var(--transition-duration);

   @include hover {
      background-color: var(--warning-hover);
   }
   }

   &_share {
      padding: toRem(2);
      border: 2px solid var(--warning-color);
      svg {
         color: var(--warning-color);
      }
   }

  &_add-to-cart {
   border-radius: toRem(8);
   box-shadow: 0 toRem(4) toRem(1) rgba(0, 0, 0, 0.4);
   transition: background-color var(--transition-duration);
   background-color: var(--danger-color);

   &:active {
      translate: 0 toRem(3);
      box-shadow: 0 toRem(2) toRem(1) rgba(0, 0, 0, 0.4);
   }

   @include hover {
      background-color: var(--danger-hover);
   }
  }

  &_remove-cart-item {
   color: var(--light-color);
   background-color: var(--warning-color);
   transition: color var(--transition-duration);

   @include hover {
      background-color: var(--warning-hover);
   }
  }

  &_remove-quantity-prod {
   position: relative;
   width: toRem(32);
   height: toRem(32);
   background-color: var(--border-color);

   &::before{
         content: '';
			left: 50%;
			position: absolute;
			width: toRem(16);
         top: 50%;
         translate: -50% -50%;
			height: toRem(2);
			background-color: var(--light-color);
      }
  }

  &_add-quantity-prod {
   position: relative;
   width: toRem(32);
   height: toRem(32);
   background-color: var(--border-color);

   &::before,
      &::after{
         content: '';
			left: 50%;
			position: absolute;
			width: toRem(18);
         top: 50%;
         translate: -50% -50%;
			height: toRem(2);
			background-color: var(--light-color);
      }
      &::before {

		}
		&::after {
         transform: rotate(90deg);
		}
  }

  &_large {
   font-weight: 600;
   border-radius: toRem(25);
   background-color: var(--danger-color);
   transition: background-color var(--transition-duration);

   @include hover {
      background-color: var(--danger-hover);
   }
  }

  &_go-to-top {
   position: fixed;
   z-index: 999;
   right: toRem(12);
   bottom: toRem(16);
   width: toRem(40);
   height: toRem(40);
   padding: toRem(4);
   border: 1px solid var(--dark-golden-color);

   @media (max-width:$mobile){
      width: toRem(34);
      height: toRem(34);
   }

   svg {
      font-size: toRem(24);
      color: var(--dark-golden-color);
   }
}

&_pagination {
   background-color: var(--warning-color);
}



  &_close {
   position: absolute;
    z-index: 10;
    top: toRem(15);
    right: toRem(12);
    padding-inline: toRem(14);
    padding-block: toRem(14);

       &::before,
      &::after{
         content: '';
         position: absolute;
			right: toRem(5);
			width: toRem(22);
			height: toRem(2);
         background-color: var(--secondary-color);
      }
      &::before {
         top: calc(50% - toRem(1));
         transform: rotate(-45deg);
		}
		&::after {
         bottom: calc(50% - toRem(1));
         transform: rotate(45deg);
		}

      @include hover {
         transform: scale(1.1);
      }
  }
}
</style>