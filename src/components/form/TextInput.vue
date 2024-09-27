<script setup>
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
    default: false
  },
  tagTitle: {
    type: String,
    default: ''
  }
});

const data = defineModel('data', {
  type: String
});
</script>

<template>
  <div class="formGroup">
    <label :for="id" :title="tagTitle">
      <slot name="labelName"></slot>
      <span class="requiredTag" v-if="isRequired">*</span>
    </label>
    <input
      :name="id"
      :type="inputType"
      :id="id"
      :required="isRequired"
      v-model.trim="data"
      :pattern="pattern"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
    />
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  width: v-bind(inputWidth);

  input {
    font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
    font-size: 0.75rem;
    display: block;
    border-radius: 0.375rem;
    border: 0.5px solid #ddd;
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

    &[disabled] {
      background: #ddd;
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
