<script setup>
import { ref } from 'vue';
import TextInput from '@/components/form/TextInput.vue';
import DateInput from '@/components/form/DateInput.vue';
import SendButton from '@/components/other/SendButton.vue';
import DropdownComponent from '@/components/form/DropdownComponent.vue';
// import { fetchData } from '@/Util/fetch';
import Swal from 'sweetalert2';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();

const startDate = defineModel('startDate', {
  type: String
});
const endtDate = defineModel('endtDate', {
  type: String
});
const clientName = defineModel('clientName', {
  type: String
});
const clientIndustry = defineModel('clientIndustry', {
  type: String
});
const engagementName = defineModel('engagementName', {
  type: String
});
const riskLevel = defineModel('riskLevel', {
  type: String
});
const contingency = defineModel('contingency', {
  type: String
});
const projectCategory = defineModel('projectCategory', {
  type: String
});
const opportunity = defineModel('opportunity', {
  type: String
});
const ePartner = defineModel('ePartner', {
  type: String
});
const eManager = defineModel('eManager', {
  type: String
});
const downPayment = defineModel('downPayment', {
  type: String
});
const paymentTerm = defineModel('paymentTerm', {
  type: String
});
const billingFrequency = defineModel('billingFrequency', {
  type: String
});

const currntStep = defineModel('currntStep', {
  type: String
});
const status = defineModel('status', {
  type: Object
});

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
    const formData = new FormData(form.value);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(JSON.stringify(data));
    await Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      title: '儲存成功',
      timer: 1500
    });

    // await fetchData();
    currntStep.value = 'step3';
    status.value.step2 = 'active';
    modalStore.setShowLoading(false);
  } else {
    console.log('fail');
    // Swal.fire({
    //   //   icon: "error",
    //   title: "錯誤",
    //   text: "Please fill in all required fields correctly.",
    // });
    modalStore.setShowLoading(false);
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h1 class="stepTitle">Project Overview Information</h1>
      <form class="form" ref="form">
        <date-input
          :isRequired="true"
          :id="'startDate'"
          v-model:data="startDate"
          :inputType="'month'"
        >
          <template #labelName>Start Date</template>
        </date-input>
        <date-input
          :isRequired="true"
          :id="'endDate'"
          v-model:data="endtDate"
          :inputType="'month'"
          :min="startDate"
        >
          <template #labelName>End Date</template>
        </date-input>
        <text-input :isRequired="true" :id="'clientName'" v-model:data="clientName">
          <template #labelName>Client Name</template>
        </text-input>
        <dropdown-component
          :id="'clientIndustry'"
          :dropdown-opts="[
            'CONSUMER BUSINESS',
            'ENERGY&RESOURCE',
            'FINANCIAL SERVICES',
            'LIFE SCIENCES & HEALTH CARE'
          ]"
          v-model:data="clientIndustry"
        >
          <template #labelName>Client Industry</template>
        </dropdown-component>
        <text-input :id="'engagementName'" v-model:data="engagementName">
          <template #labelName>Engagement Name</template>
        </text-input>
        <dropdown-component
          :id="'riskLevel'"
          :dropdown-opts="['Much Greater than Normal', 'Greater than Normal', 'Normal']"
          v-model:data="riskLevel"
        >
          <template #labelName>Risk Level</template>
        </dropdown-component>
        <dropdown-component
          :id="'contingency'"
          :isRequired="true"
          :dropdown-opts="['0%', '3%', '5%', '10%']"
          v-model:data="contingency"
        >
          <template #labelName>Contingency(% of the Contract Value)</template>
        </dropdown-component>
        <dropdown-component
          :id="'projectCategory'"
          :dropdown-opts="[
            'PRC SOE',
            'PRC PE',
            'HK govt',
            'PRC MNC',
            'All HK Entities (excl HK govt)'
          ]"
          v-model:data="projectCategory"
        >
          <template #labelName>Project Category</template>
        </dropdown-component>
        <text-input :id="'opportunity'" v-model:data="opportunity">
          <template #labelName>Opportunity</template>
        </text-input>
        <text-input :id="'ePartner'" v-model:data="ePartner">
          <template #labelName>Engagement Partner</template>
        </text-input>

        <text-input :id="'eManager'" v-model:data="eManager">
          <template #labelName>Engagement Manager</template>
        </text-input>
        <text-input
          :isRquired="true"
          :id="'downPayment'"
          :pattern="'[0-9]*'"
          v-model:data="downPayment"
        >
          <template #labelName>Down Payment% </template>
          <template #errorSting>僅接受數字</template>
        </text-input>
        <text-input
          :isRquired="true"
          :id="'paymentTerm'"
          :pattern="'[0-9]*'"
          v-model:data="paymentTerm"
        >
          <template #labelName>Payment Term</template>
          <template #errorSting>僅接受數字</template>
        </text-input>
        <dropdown-component
          :id="'billingFrequency'"
          :dropdown-opts="['Monthly', 'Bi-Monthly', 'Quaterly', 'Upon Project Completion']"
          v-model:data="billingFrequency"
        >
          <template #labelName>Billing Frequency</template>
        </dropdown-component>
      </form>
    </div>
    <SendButton :clickFunc="submit">儲存</SendButton>
  </div>
</template>

<style lang="scss" scoped></style>
