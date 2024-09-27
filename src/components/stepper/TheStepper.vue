<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  activeColor: {
    type: String,
    default: 'var(--color-blue4)'
  },
  completeColor: {
    type: String,
    default: 'var(--color-green5)'
  },
  latesStep: {
    type: String,
    default: ''
  },
  status: {
    type: Object
  },
  /* example of progressSteps
    [
        { 
            title: 'Step 1', 
            subtitle: '更新日期:2023-03-16 14:50:45',
            status: 'status1'
        },
    ]
    */
  progressSteps: {
    type: Array,
    default: () => []
  }
});

const { progressSteps, latesStep, status } = toRefs(props);

const currntStep = defineModel('currntStep', {
  type: String
});

const activeIndex = computed(() => {
  return progressSteps.value.findIndex((step) => step.status === latesStep.value);
});

const currStepHandler = (step) => {
  if (step === currntStep.value) return;
  if (step === latesStep.value) {
    currntStep.value = step;
    return;
  }
  if (status.value[step] === 'inactive') return;

  currntStep.value = step;
};
</script>

<template>
  <div class="progress">
    <div class="formId">
      <div class="formId__title">表單編號</div>
      <div class="formId__content">C8763</div>
    </div>
    <div
      class="progress__item"
      :class="{
        'progress__item--active': idx === activeIndex,
        'progress__item--completed': idx < activeIndex
      }"
      v-for="(step, idx) of progressSteps"
      :key="'progressSteps' + idx"
      @click="currStepHandler(step.status)"
    >
      <div class="progress__stepWrap">
        <div
          class="progress__step"
          :class="{
            'progress__step--completed': idx <= activeIndex
          }"
        >
          <v-icon v-show="idx <= activeIndex" name="io-checkmark-circle-sharp" scale="1.4" />
          <span v-show="idx > activeIndex">{{ idx + 1 }}</span>
        </div>
        <div class="progress__stepLine"></div>
      </div>
      <div class="progress__title">
        <h4>{{ step.title }}</h4>
        <p v-if="step.subtitle" class="progress__subtitle">
          {{ step.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  flex: 0 0 15rem;
  padding-inline: 0.625rem;
  overflow: hidden;

  .formId {
    padding-inline: 10px;
    background-color: #007cb0;
    background-color: var(--color-blue-primary);
    text-align: center;
    color: white;
    font-size: calc(0.8vw + 0.8vh);
    border-radius: 5px;
    margin-bottom: 1rem;

    .formId__title {
      font-size: 0.75rem;
      padding-block: 0.25rem;
      border-bottom: 0.2px solid rgba(255, 255, 255, 0.3);
    }
    .formId__content {
      font-size: 1.25rem;
      padding-block: 0.75rem;
    }
  }

  &:hover {
    .progress__item.progress__item--active {
      flex-shrink: 1;
    }
  }

  .progress__item {
    flex-grow: 1;
    display: flex;
    min-width: 0;
    cursor: pointer;
    gap: 0.5rem;
    margin-bottom: 1rem;

    &:hover {
      flex-shrink: 0 !important;
    }
    &.progress__item--active {
      .progress__subtitle:last-child {
        color: v-bind(activeColor);
      }
    }

    &.progress__item--completed {
      .progress__subtitle:last-child {
        color: v-bind(completeColor);
      }
    }

    &:last-child {
      .progress__stepLine {
        display: none;
      }
    }

    .progress__stepWrap {
      position: relative;
      flex-shrink: 0;

      .progress__step {
        display: grid;
        place-items: center;
        place-content: center;
        width: 1.625rem;
        height: 1.625rem;
        border-radius: 50%;
        background-color: gray;
        color: #fff;
        border: 0.125rem solid #fff;
        font-size: 0.75rem;

        &.progress__step--completed {
          color: v-bind(completeColor);
          background-color: #fff;

          & + .progress__stepLine {
            background-color: v-bind(completeColor);
          }
        }
      }

      .progress__stepLine {
        position: absolute;
        bottom: -1.25rem;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        width: 1px;
        border-radius: 2px;
        background-color: gray;
      }
    }

    .progress__title {
      flex-shrink: 1;
      overflow: hidden;

      h4 {
        font-size: 1rem;
        font-weight: 700;
        color: gray;
        margin: 0.25rem 0;
      }

      h4,
      .progress__subtitle {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .progress__subtitle {
        font-size: 0.75rem;
        color: var(--color-gray6);

        &:last-child {
          font-weight: 700;
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: calc((100% - 4.5rem) / 2);
  }
}
</style>
