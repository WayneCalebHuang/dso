<script setup>
import { computed } from 'vue';

defineProps({
  inputWidth: {
    type: String,
    default: '100%'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    default: 'date'
  },
  max: {
    type: String,
    default: ''
  },
  min: {
    type: String,
    default: ''
  }
});

const data = defineModel('data', {
  type: String
});

const hasData = computed(() => {
  return data.value !== '';
});
</script>

<template>
  <div class="formGroup">
    <div class="formGroup__input">
      <label :for="id">
        <slot name="labelName"></slot>
        <span class="requiredTag" v-if="isRequired">*</span>
      </label>
      <input
        ref="input"
        :name="id"
        :type="inputType"
        :id="id"
        :required="isRequired"
        v-model="data"
        :class="{ hasData }"
        :min="min"
        :max="max"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  width: v-bind(inputWidth);

  .formGroup__input {
    input {
      font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
      display: block;
      border-radius: 0.375rem;
      border: 0.5px solid #ddd;
      font-size: 0.75rem;
      width: 100%;
      padding: 5px 10px;
      appearance: none;
      line-height: 1.5;

      &:invalid {
        background-color: #f4f3cc;
        border: 1px solid red;
      }

      &:focus {
        border-color: #86bc25;
        box-shadow: 3px 4px 1px rgba(134, 188, 37, 0.5);
        background-color: #fff;
        outline: 0;
      }
    }

    label {
      display: inline-block;
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
      color: #212529;

      .requiredTag {
        color: var(--color-danger);
      }
    }
  }
}
</style>
