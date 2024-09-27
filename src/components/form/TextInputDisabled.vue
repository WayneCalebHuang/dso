<script setup>
import {} from 'vue';

defineProps({
  inputWidth: {
    type: String,
    default: '100%'
  },
  inputType: {
    type: String,
    default: 'text'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  pattern: {
    type: String,
    default: '[^\\/\\\\\\|*?&$=%<>"]*'
  },
  maxlength: {
    type: Number
  },
  autocomplete: {
    type: String,
    default: 'on'
  },
  isDisabled: {
    type: Boolean,
    default: true
  },
  value: {
    type: [String, Number]
  }
});
</script>

<template>
  <div class="formGroup">
    <label :for="id">
      <slot name="labelName"></slot>
      <span class="requiredTag" v-if="isRequired">*</span>
    </label>
    <input
      :name="id"
      :type="inputType"
      :id="id"
      :required="isRequired"
      :pattern="pattern"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  width: v-bind(inputWidth);

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
    background: #ddd;

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
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;

    .requiredTag {
      color: var(--color-danger);
    }
  }
}
</style>
