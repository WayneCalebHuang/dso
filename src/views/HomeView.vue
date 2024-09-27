<script setup>
import { ref, onMounted, computed } from 'vue';

import TheStepper from '@/components/stepper/TheStepper.vue';
import ProjectSetup from '@/components/ProjectSetup.vue';
import ProjectOverview from '@/components/ProjectOverview.vue';
import NonGdc from '@/components/NonGdc.vue';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();

const status = ref({ step1: 'inactive', step2: 'inactive', step3: 'inactive', step4: 'inactive' });
const latesStep = computed(() => {
  return Object.keys(status.value).find((key) => status.value[key] === 'inactive');
});
const currntStep = ref('step1');

const vat = ref('');
const bu = ref('');
const isInternational = ref('');
const startDate = ref('');
const endtDate = ref('');
const clientName = ref('');
const clientIndustry = ref('');
const engagementName = ref('');
const riskLevel = ref('');
const contingency = ref('');
const projectCategory = ref('');
const opportunity = ref('');
const ePartner = ref('');
const eManager = ref('');
const downPayment = ref('');
const paymentTerm = ref('60');
const billingFrequency = ref('');

const staffName = ref('');
const comments = ref('');
const projectRole = ref('');
const staffLocation = ref('');
const staffTeam = ref('');
const staffLevel = ref('');

const staffList = ref([
  {
    staff1: {
      name: '',
      comments: '',
      projectRole: '',
      staffLocation: '',
      staffTeam: '',
      staffLevel: '',
      id: 1
    }
  }
]);

onMounted(() => {
  modalStore.setShowLoading(false);
});
</script>

<template>
  <div class="pageWrap">
    <TheStepper
      :progress-steps="[
        {
          title: '專案參數',
          status: 'step1'
        },
        {
          title: 'Project Overview Information',
          status: 'step2'
        },
        {
          title: 'Non-GDC',
          status: 'step3'
        },
        {
          title: 'GDC',
          status: 'step4'
        }
      ]"
      :latesStep="latesStep"
      :currntStep="currntStep"
      :status="status"
      v-model:currntStep="currntStep"
    />
    <ProjectSetup
      v-model:vat="vat"
      v-model:bu="bu"
      v-model:isInternational="isInternational"
      v-model:currntStep="currntStep"
      v-model:status="status"
      v-if="currntStep === 'step1'"
    />
    <ProjectOverview
      v-if="currntStep === 'step2'"
      v-model:currntStep="currntStep"
      v-model:status="status"
      v-model:startDate="startDate"
      v-model:endtDate="endtDate"
      v-model:clientName="clientName"
      v-model:clientIndustry="clientIndustry"
      v-model:engagementName="engagementName"
      v-model:riskLevel="riskLevel"
      v-model:contingency="contingency"
      v-model:projectCategory="projectCategory"
      v-model:opportunity="opportunity"
      v-model:ePartner="ePartner"
      v-model:eManager="eManager"
      v-model:downPayment="downPayment"
      v-model:paymentTerm="paymentTerm"
      v-model:billingFrequency="billingFrequency"
    />
    <NonGdc
      v-model:staffName="staffName"
      v-model:comments="comments"
      v-model:projectRole="projectRole"
      v-model:staffLocation="staffLocation"
      v-model:staffTeam="staffTeam"
      v-model:staffLevel="staffLevel"
      v-model:currntStep="currntStep"
      v-model:status="status"
      v-model:staffList="staffList"
      v-if="currntStep === 'step3'"
    />
  </div>
</template>

<style lang="scss">
.pageWrap {
  display: flex;

  .container {
    flex-grow: 1;

    .card {
      .stepTitle {
        font-size: 1rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        border-bottom: 1px solid #ddd;
        color: #000;
      }

      .form {
        padding-top: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 1rem;
      }
    }
  }
}
</style>
