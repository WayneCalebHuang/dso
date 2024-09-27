<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, watchEffect } from 'vue';
import TextInput from '@/components/form/TextInput.vue';
import TextInputDisabled from '@/components/form/TextInputDisabled.vue';

import DropdownComponent from '@/components/form/DropdownComponent.vue';
import SendButton from '@/components/other/SendButton.vue';
// import { fetchData } from '@/Util/fetch';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();

const staffList = defineModel('staffList', {
  type: Object
});
const staffNames = ref([]);
const showCard = ref('staff');
const showCardHandler = (section) => {
  if (!staffNames.value.length) return;
  showCard.value = section;
};
const staffDays = ref({});
// const currntStep = defineModel('currntStep', {
//   type: String
// });
// const status = defineModel('status', {
//   type: Object
// });
const showDayYr = ref(1);
const showExpenseYr = ref(1);
const currFy = ref(0);
const staffCount = ref(1);

watchEffect(() => {
  let index = 1;
  staffList.value.forEach((staff) => {
    staff.id = index;
    index++;
  });
});
const mosOrder = ref([
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  'jan',
  'feb',
  'mar',
  'apr',
  'may'
]);
const yrTotal = computed(() => {
  let total = Object.values(staffDays.value).reduce((acc, staff) => {
    return (
      acc +
      Object.values(staff[showDayYr.value]).reduce((monthAcc, month) => {
        return monthAcc + (+month || 0);
      }, 0)
    );
  }, 0);

  return total;
});
const allYrsTotal = computed(() => {
  let total = Object.values(staffDays.value).reduce((acc, staff) => {
    return (
      acc +
      Object.values(staff).reduce((yrAcc, yr) => {
        return (
          yrAcc +
          Object.values(yr).reduce((monthAcc, month) => {
            return monthAcc + (+month || 0);
          }, 0)
        );
      }, 0)
    );
  }, 0);

  return total * 8;
});

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
    console.log('success');

    if (showCard.value === 'days') {
      // currntStep.value = 'step4';
      // status.value.step3 = 'active';
    }

    if (showCard.value === 'staff') {
      staffNames.value = [];
      Object.keys(staffList.value).forEach((key) => {
        staffNames.value.push(staffList.value[key].name);
        staffDays.value[staffList.value[key].name] = {
          1: {
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',
            nov: '',
            dec: '',
            jan: '',
            feb: '',
            mar: '',
            apr: '',
            may: ''
          },
          2: {
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',
            nov: '',
            dec: '',
            jan: '',
            feb: '',
            mar: '',
            apr: '',
            may: ''
          },
          3: {
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',
            nov: '',
            dec: '',
            jan: '',
            feb: '',
            mar: '',
            apr: '',
            may: ''
          },
          4: {
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',
            nov: '',
            dec: '',
            jan: '',
            feb: '',
            mar: '',
            apr: '',
            may: ''
          },
          5: {
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',
            nov: '',
            dec: '',
            jan: '',
            feb: '',
            mar: '',
            apr: '',
            may: ''
          }
        };
      });
      showCard.value = 'days';
    }
    // Swal.fire({
    //   icon: "success",
    //   showConfirmButton: false,
    //   title: "新增成功",
    //   width: "20rem",
    //   text: "請等待管理員審核",
    // });

    // await fetchData();

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

const addPerson = () => {
  staffList.value.push({
    name: '',
    comments: '',
    projectRole: '',
    staffLocation: '',
    staffTeam: '',
    staffLevel: ''
  });
};
const deletePerson = (id) => {
  staffList.value = staffList.value.filter((person) => person.id !== id);
};
onBeforeUnmount(() => {
  /*   if (!confirm('Are you sure you want to leave?')) {
    // currntStep.value = 'step3';
  } */
});
watch(
  () => staffCount.value,
  (newValue) => {
    console.log('newValue', newValue);
    if (staffList.value[`staff${newValue}`]) return;

    staffList.value = {
      ...staffList.value,
      [`staff${newValue}`]: {
        name: '',
        comments: '',
        projectRole: '',
        staffLocation: '',
        staffTeam: '',
        staffLevel: ''
      }
    };
  }
);
onMounted(() => {
  const date = new Date();
  currFy.value = date.getMonth() < 5 ? date.getFullYear() % 100 : (date.getFullYear() % 100) + 1;
  staffCount.value = Object.keys(staffList.value).length;
});
</script>
<template>
  <div class="container">
    <div class="tabGroup">
      <div
        class="tab"
        :class="{ 'tab--active': showCard === 'staff' }"
        @click="showCardHandler('staff')"
      >
        Staff
      </div>
      <div
        class="tab"
        :class="{ 'tab--active': showCard === 'days' }"
        @click="showCardHandler('days')"
      >
        Days
      </div>
      <div
        class="tab"
        :class="{ 'tab--active': showCard === 'expense' }"
        @click="showCardHandler('expense')"
      >
        Expense
      </div>
    </div>
    <div class="card" v-if="showCard === 'staff'">
      <h1 class="stepTitle">Staff</h1>
      <div class="form" id="staffForm" v-for="v of staffList" :key="'person' + v.id">
        <text-input :id="'staffName' + v.id" v-model:data="v.name" :isRequired="true">
          <template #labelName>Staff Name</template>
        </text-input>
        <text-input :id="'comments' + v.id" v-model:data="v.comments">
          <template #labelName>Comments</template>
        </text-input>
        <dropdown-component
          :id="'projectRole' + v.id"
          :dropdown-opts="['EP', 'EM', 'Project Team']"
          v-model:data="v.projectRole"
        >
          <template #labelName>Project Role</template>
        </dropdown-component>

        <dropdown-component
          :id="'staffLocation' + v.id"
          :dropdown-opts="['TW']"
          v-model:data="v.staffLocation"
        >
          <template #labelName>Staff Location</template>
        </dropdown-component>
        <dropdown-component
          :id="'staffTeam' + v.id"
          :dropdown-opts="['C10A', 'R11C/R11D/R12B/R12C']"
          v-model:data="v.staffTeam"
        >
          <template #labelName>Staff Team</template>
        </dropdown-component>
        <dropdown-component
          :id="'staffLevel' + v.id"
          :dropdown-opts="['EP2+', 'EP1', 'SP3+', 'SP2', 'SP1']"
          v-model:data="v.staffLevel"
        >
          <template #labelName>Staff Level</template>
        </dropdown-component>
        <div class="deletCol">
          <p @click="deletePerson(v.id)">
            <v-icon name="fa-trash-alt" scale="1" fill="var(--color-danger)" />
          </p>
        </div>
      </div>
      <div class="addPerson"><p @click="addPerson">+</p></div>
    </div>
    <div class="card" v-if="showCard === 'days'">
      <h1 class="stepTitle">Days</h1>
      <div class="tabGroup">
        <div class="tab" :class="{ 'tab--active': showDayYr === 1 }" @click="showDayYr = 1">
          FY{{ currFy }}
        </div>
        <div class="tab" :class="{ 'tab--active': showDayYr === 2 }" @click="showDayYr = 2">
          FY{{ currFy + 1 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showDayYr === 3 }" @click="showDayYr = 3">
          FY{{ currFy + 2 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showDayYr === 4 }" @click="showDayYr = 4">
          FY{{ currFy + 3 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showDayYr === 5 }" @click="showDayYr = 5">
          FY{{ currFy + 4 }}
        </div>
      </div>
      <div class="formWrap">
        <template v-for="yr of 5" :key="'fy' + yr">
          <template v-for="(staff, idx) of staffNames" :key="'staff' + idx">
            <div v-show="showDayYr === yr" class="form fyForm">
              <text-input-disabled :id="'fy' + (currFy + yr - 1) + staff + idx" :value="staff">
                <template #labelName>Name</template>
              </text-input-disabled>
              <template
                v-for="v of 12"
                :key="'fy' + (currFy + yr - 1 + mosOrder[v - 1].toUpperCase())"
              >
                <text-input
                  :id="'fy' + (currFy + yr - 1 + mosOrder[v - 1].toUpperCase()) + staff + idx"
                  v-model:data="staffDays[staff][yr][mosOrder[v - 1]]"
                  :pattern="'[0-9]*'"
                >
                  <template #labelName>{{ mosOrder[v - 1].toUpperCase() }}</template>
                </text-input>
              </template>
              <text-input-disabled
                :id="'fy' + (currFy + yr - 1) + 'Total' + staff + idx"
                :value="
                  Object.values(staffDays[staff][yr]).reduce((acc, curr) => {
                    return acc + +curr || 0;
                  }, 0)
                "
              >
                <template #labelName>Total</template>
              </text-input-disabled>
            </div></template
          >
        </template>
      </div>
      <h2 class="form__yrTotal">{{ yrTotal }} Days</h2>
    </div>
    <div class="card" v-if="showCard === 'expense'">
      <h1 class="stepTitle">Expense</h1>
      <div class="tabGroup">
        <div class="tab" :class="{ 'tab--active': showExpenseYr === 1 }" @click="showExpenseYr = 1">
          FY{{ currFy }}
        </div>
        <div class="tab" :class="{ 'tab--active': showExpenseYr === 2 }" @click="showExpenseYr = 2">
          FY{{ currFy + 1 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showExpenseYr === 3 }" @click="showExpenseYr = 3">
          FY{{ currFy + 2 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showExpenseYr === 4 }" @click="showExpenseYr = 4">
          FY{{ currFy + 3 }}
        </div>
        <div class="tab" :class="{ 'tab--active': showExpenseYr === 5 }" @click="showExpenseYr = 5">
          FY{{ currFy + 4 }}
        </div>
      </div>
      <div class="formWrap">
        <template v-for="yr of 5" :key="'yr' + yr">
          <template v-for="(staff, idx) of staffNames" :key="'staff' + idx">
            <div v-show="showExpenseYr === yr" class="form fyForm">
              <text-input-disabled :id="'expense' + yr + idx + 'Name'" :value="staff">
                <template #labelName>Name</template>
              </text-input-disabled>
              <text-input :id="'expense' + yr + 'accommodation'" :pattern="'[0-9]*'">
                <template #labelName>Accommodation</template>
              </text-input>
              <text-input :id="'expense' + yr + 'localTravel'" :pattern="'[0-9]*'">
                <template #labelName>Local Travel</template>
              </text-input>
              <text-input :id="'expense' + yr + 'airTickets'" :pattern="'[0-9]*'">
                <template #labelName>Air Tickets</template>
              </text-input>
              <text-input :id="'expense' + yr + 'communication'" :pattern="'[0-9]*'">
                <template #labelName>Communication</template>
              </text-input>
              <text-input :id="'expense' + yr + 'perdiem'" :pattern="'[0-9]*'">
                <template #labelName>Perdiem</template>
              </text-input>
              <text-input :id="'expense' + yr + 'others'" :pattern="'[0-9]*'">
                <template #labelName>Others</template>
              </text-input>
              <text-input :id="'expense' + yr + 'overseas'" :pattern="'[0-9]*'">
                <template #labelName>Overseas Travel Expense</template>
              </text-input>
            </div></template
          >
        </template>
      </div>
    </div>

    <SendButton :clickFunc="submit">儲存</SendButton>

    <div class="card" v-if="showCard === 'days'">
      <h1 class="stepTitle">Days Total</h1>
      <div class="formWrap">
        <template v-for="(staff, idx) of staffNames" :key="'staff' + idx">
          <div class="form fyForm">
            <text-input-disabled :id="'total' + staff + idx" :value="staff">
              <template #labelName>Name</template>
            </text-input-disabled>
            <text-input-disabled
              :id="'totalDay' + staff + idx"
              :value="
                Object.values(staffDays[staff]).reduce((acc, curr) => {
                  return (
                    Object.values(curr).reduce((monthAcc, month) => {
                      return monthAcc + (+month || 0);
                    }, 0) + acc
                  );
                }, 0)
              "
            >
              <template #labelName>Total Days</template>
            </text-input-disabled>
            <text-input-disabled
              :id="'totalHour' + staff + idx"
              :value="
                Object.values(staffDays[staff]).reduce((acc, curr) => {
                  return (
                    Object.values(curr).reduce((monthAcc, month) => {
                      return monthAcc + (+month || 0);
                    }, 0) + acc
                  );
                }, 0) * 8
              "
            >
              <template #labelName>Total Hours</template>
            </text-input-disabled>
          </div>
        </template>
      </div>
      <h2 class="form__yrTotal">{{ allYrsTotal }} Hours</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabGroup {
  display: flex;
  margin-block: 1rem;
  border-radius: 2rem;
  max-width: 100%;
  width: fit-content;
  overflow: hidden;

  .tab {
    background-color: var(--color-teal1);
    color: green;
    font-size: 0.75rem;
    padding: 5px 25px 8px 25px;
    margin-left: 1rem;
    border-radius: 2rem;
    cursor: pointer;

    &.tab--active {
      background-color: var(--color-teal5);
      color: #fff;
    }
  }
}
.card {
  #staffForm {
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));

    .deletCol {
      display: flex;
      justify-content: center;
      align-items: end;
      p {
        border: var(--color-danger) 1px solid;
        border-radius: 0.375rem;
        padding: 5px 10px;
        font-size: 0.75rem;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .formWrap {
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;

    .fyForm {
      grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr)) !important;
      gap: 0.5rem !important;

      .fyForm__name {
        align-content: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .form__yrTotal {
    text-align: end;
  }

  .addPerson {
    display: flex;
    justify-content: center;

    p {
      margin-top: 1rem;
      width: 2rem;
      height: 2rem;
      background-color: var(--color-deloitte);
      border-radius: 50%;
      color: white;
      font-size: 1.5rem;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
