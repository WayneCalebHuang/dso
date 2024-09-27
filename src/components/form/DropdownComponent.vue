<script setup>
import {} from 'vue';

defineProps({
  sectionWidth: {
    type: String,
    default: '100%'
  },
  sectionMarginTop: {
    type: String,
    default: '0'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  dropdownOpts: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const data = defineModel('data', {
  type: String
});
</script>

<template>
  <div class="formGroup">
    <div class="formGroup__input">
      <label :for="id">
        <slot name="labelName"></slot>
        <span class="requiredTag" v-if="isRequired">*</span>
      </label>
      <select :id="id" :name="id" v-model="data" :required="isRequired">
        <option v-for="(v, i) of dropdownOpts" :key="i" :value="v">
          {{ v }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  width: v-bind(sectionWidth);

  .formGroup__input {
    select {
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

      option {
        font-size: 15px;
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
