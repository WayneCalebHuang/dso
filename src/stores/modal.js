import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const showLoading = ref(true);
  function setShowLoading(status = true) {
    status ? (showLoading.value = true) : (showLoading.value = false);
  }
  const showAlert = ref(false);
  const modalObj = ref({ icon: 'success' });
  function setShowAlert(status = true) {
    status ? (showAlert.value = true) : (showAlert.value = false);
  }

  return { showLoading, setShowLoading, showAlert, setShowAlert, modalObj };
});
