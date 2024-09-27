<script setup>
import SendButton from '@/components/other/SendButton.vue';
import DropdownComponent from '@/components/form/DropdownComponent.vue';
// import { fetchData } from '@/Util/fetch';
import { useModalStore } from '@/stores/modal';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const modalStore = useModalStore();

const vat = defineModel('vat', {
  type: String
});
const bu = defineModel('bu', {
  type: String
});
const isInternational = defineModel('isInternational', {
  type: String
});
const currntStep = defineModel('currntStep', {
  type: String
});
const status = defineModel('status', {
  type: Object
});
const showLoading = ref(false);
const form = ref(null);

const submit = async () => {
  const inputs = document.querySelectorAll('.form input');
  const selects = document.querySelectorAll('.form select');
  let isValid = true;
  // modalStore.setShowLoading(true);
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
  selects.forEach((select) => {
    if (!select.checkValidity()) {
      isValid = false;
      select.classList.add('invalid');
    } else {
      select.classList.remove('invalid');
    }
  });

  if (isValid) {
    showLoading.value = true;
    const formData = new FormData(form.value);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(JSON.stringify(data));

    // await fetchData();

    await Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      title: '儲存成功',
      timer: 1500
    });

    currntStep.value = 'step2';
    status.value.step1 = 'active';
    // modalStore.setShowLoading(false);
  } else {
    console.log('fail');
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: 'Please fill in all required fields correctly.',
      confirmButtonColor: 'var(--color-blue-primary)'
    });
    modalStore.setShowLoading(false);
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h1 class="stepTitle">設置專案參數</h1>
      <form class="form" ref="form">
        <dropdown-component
          :id="'vat'"
          :dropdown-opts="['Included Tax', 'Excluded Tax']"
          :isRequired="true"
          v-model:data="vat"
        >
          <template #labelName>VAT</template>
        </dropdown-component>
        <dropdown-component
          :id="'bu'"
          :dropdown-opts="['Fix Free', 'T&M']"
          :isRequired="true"
          v-model:data="bu"
        >
          <template #labelName>BU</template>
        </dropdown-component>
        <dropdown-component
          :id="'international'"
          :dropdown-opts="['yes', 'no']"
          :isRequired="true"
          v-model:data="isInternational"
        >
          <template #labelName>international Project</template>
        </dropdown-component>
      </form>
    </div>
    <SendButton :clickFunc="submit"
      >儲存 <v-icon name="ri-loader-4-fill" fill="#fff" animation="spin" v-show="showLoading"
    /></SendButton>
  </div>
</template>

<style lang="scss" scoped></style>
