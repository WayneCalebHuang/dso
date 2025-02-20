<script setup>
import { ref } from 'vue';

const otherChecked = ref(false);

const { hasOther } = defineProps({
  sectionWidth: {
    type: String,
    default: '100%'
  },
  sectionMarginTop: {
    type: String,
    default: '0'
  },
  optMaxWidth: {
    type: String,
    default: '14rem'
  },
  accentColor: {
    type: String,
    default: 'var(--color-green-primary)'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /* example of checkboxOpts
['董總辦公室', '法務部', '研發部', '業務部', '財務部']
*/
  checkboxOpts: {
    type: Array,
    required: true
  },
  trueValue: {
    default: true
  },
  falseValue: {
    default: false
  },
  id: {
    type: String,
    required: true
  },
  hasOther: {
    type: Boolean,
    default: false
  }
});

const data = defineModel('data', {
  type: [Array, String, Number, Boolean]
});
const other = defineModel('other', {
  type: String,
  default: ''
});
</script>

<template>
  <div class="formGroup">
    <label>
      <slot name="labelName"></slot>
      <span class="requiredTag" v-if="isRequired">*</span>
    </label>

    <div class="checkboxGroup">
      <div class="checkboxOpt" v-for="(v, i) of checkboxOpts" :key="id + i">
        <input
          v-show="showCheckbox"
          type="checkbox"
          :id="id + i"
          :name="id"
          :value="v"
          :true-value="trueValue"
          :false-value="falseValue"
          v-model="data"
        />
        <label :for="id + i">{{ v }}</label>
      </div>
      <div v-if="hasOther" class="checkboxOpt">
        <input
          v-show="showCheckbox"
          type="checkbox"
          :id="id + 'other'"
          value="other"
          @change="other = ''"
          v-model="otherChecked"
        />
        <label :for="id + 'other'">其他</label>
      </div>
      <div class="otherInput" v-if="otherChecked">
        <input
          type="text"
          pattern='[^\/\\\|*?&$=%<>" ]*'
          v-model.trim="other"
          required
          :class="{ hasData: hasData }"
          placeholder="請輸入"
        />
        <p class="errStr">
          <v-icon name="ri-error-warning-fill" scale="1" />
          不可包含: &#92; &#47; &#42; &#63; &quot; &lt; &gt; &#124; &amp; &#36; &#61; &#37;
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  padding-inline: 0.25rem;
  width: v-bind(sectionWidth);
  margin-top: v-bind(sectionMarginTop);

  > label {
    display: inline-block;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    color: #212529;

    .requiredTag {
      color: var(--color-danger);
    }
  }

  .checkboxGroup {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(v-bind(optMaxWidth), 1fr));

    .checkboxOpt {
      display: flex;
      align-items: center;

      label {
        display: inline-block;
        font-size: 0.75rem;
        color: #212529;
        margin-left: 0.5rem;

        .requiredTag {
          color: var(--color-danger);
        }
      }

      input[type='checkbox'] {
        accent-color: v-bind(accentColor);
      }
    }

    .otherInput {
      grid-column: 1/-1;

      input {
        font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
        display: block;
        border: none;
        box-shadow: 0 0 0 1px #d1d6d4;
        border-radius: 5px;
        font-size: 1rem;
        color: #252525;
        width: 100%;
        padding: 0.75rem 0.5rem;
        line-height: 1.25rem;

        &:hover {
          box-shadow: 0 0 0 2px #d1d6d4;
        }

        &.hasData,
        &:focus {
          outline: none;
        }

        &:focus {
          box-shadow: 0 0 0 2px var(--color-deloitte);
        }

        &:invalid {
          &.hasData {
            box-shadow: 0 0 0 2px var(--color-danger);

            & + .errStr {
              display: block;
            }
          }

          &.invalid {
            box-shadow: 0 0 0 2px var(--color-danger);
          }
        }
      }

      &:has(input.hasData) {
        ~ .requiredTag {
          display: none;
        }
      }

      .errStr {
        background-color: #f9dedc;
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: none;
      }
    }
  }
}
</style>
