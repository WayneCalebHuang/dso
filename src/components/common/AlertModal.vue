<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import SuccessCheck from '@/components/icons/SuccessCheck.vue';
import { useModalStore } from '@/stores/modal';
const { modalObj } = useModalStore();
const { modalColor = '#fff', icon } = modalObj;

// defineProps({
//   modalColor: {
//     type: String,
//     default: '#fff'
//   },
//   icon: {
//     type: String,
//     default: ''
//   },
//   title: {
//     type: String,
//     default: ''
//   },
//   text: {
//     type: String,
//     default: ''
//   }
// });

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto';
});
</script>

<template>
  <div class="alert">
    <div class="alert__modal">
      <div class="alert__icon" v-if="icon === 'success'"><SuccessCheck /></div>
      <p class="alert__desc">{{ msgShow }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes modalShow {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  45% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: grid;
  place-content: center;
  backdrop-filter: blur(2px);

  .alert__modal {
    background-color: v-bind(modalColor);
    width: clamp(20rem, 85vw, 30rem);
    border-radius: 1.5rem;
    padding: 1rem;
    box-shadow:
      0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132),
      0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108);
    animation: modalShow 0.3s;

    .alert__icon {
      flex-shrink: 0;
    }

    .alert__desc {
      font-size: 1.25rem;
      color: v-bind(fontColor);
      font-weight: 700;
      flex: 1;
    }
  }
}
</style>
