<script>
// import 'vue-multiselect/dist/vue-multiselect.min.css'
// import Multiselect from 'vue-multiselect'
// import iMultiselect from './../../helpers/iMultiselect'

import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // components: {iMultiselect},

  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      settingsForm: {},
      newPost: '',
      postOptions: [],
      tempModel: false,
      isBusy: false,
      calculatedValue: '',
    }
  },
  // {
  // edit: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // current: {
  //     type: String,
  //     required: true
  // }
  // },

  computed: {
    // calculatedValue2() {
    //     console.log('calculated', this.model)
    //
    //     return this.model.items.length
    // }
  },
  watch: {
    // 'model': {
    //     deep: true,
    //     handler(newVal) {
    //         // console.log('changed model!', newVal)
    //         // console.log('block formul!', this.block.formula)
    //         // console.log('value!', this.value, this.block.formula.replace('this.',''))
    //
    //         if (this.block.formula) {
    //             if (this.block.formula.toString().startsWith('this.'))
    //                 this.calculatedValue = objGet(this.model, this.block.formula.replace('this.',''))
    //             else
    //                 this.calculatedValue = objGet(this.options.scope, this.block.formula)
    //
    //             this.value = this.calculatedValue
    //
    //         }
    //     },
    // }
  },
  created() {
    const settings = [
      {
        slug: 'label',
        label: 'Label',
        component: 'input-text',
        required: true,
        description: '',
      },

      {
        slug: 'slug',
        label: 'Slug',
        // 'type': 'email',
        prepend: 'Slug Name: ',
        component: 'slug',
        lower: false,
        required: true,
        exclude: '-:/',
        separator: '_',
        // 'maxLength': 8,
        // 'description': 'Maximum 8 characters',
      },

      {
        slug: 'formula',
        label: 'Formula',
        component: 'input-text',
        // 'required': true,
        type: 'text',
        description: 'Enter variable from the scope. The value will be calculated on client before save.',
        // "showIf": {"slug": "useFormula", op: 'neq', "value": false},

      },

      {
        slug: 'show',
        label: 'Show',
        component: 'checkbox',
        // 'required': true,
        default: false, // not 1 or 0 or these things just true or false
        description: '',
      },

      {
        slug: 'asNumber',
        label: 'Save as number',
        component: 'checkbox',
        // 'required': true,
        default: false, // not 1 or 0 or these things just true or false
        description: 'May cause problem for big numbers (more than 15 digits)',
      },

      //    is it sub content or just related
      //    two sided or not?
    ]
    // this.settingsForm = {component: 'form', children: [...this.commonSettings.children, ...settings]} //change in future for better performance
    this.settingsForm = { component: 'form', children: [...settings] } // change in future for better performance
  },
  mounted() {
    this.value = this.calculatedValue
  },
  methods: {},
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" :index="index" v-if="ShowIf(block)" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    :settings-form="settingsForm"
    :scope="scope"
  >
    <!--        TODO: Validation | MORE COMPONENT | Tabs | formgroup inline | floating labels -->
    <!--        model: {{ model }} -->
    <!--        <br> -->
    <!--        scope: {{ model }} -->
    <!--        <br> -->
    <!--        hidden value: {{ value }} -->

    <div v-if="options.edit && !block.show" class="text-center big text-muted p-3">
      <div class="small text-22right mb-1">
        Admin Field
      </div>

      [{{ block.label || block.slug }}]
      <div class="small mt-1">
        Hidden Field
      </div>
    </div>

    <b-form-group
      v-if="block.show"
      :disabled="block.disabled"
      :label-for="`${block.id}-input`"
      label-class="big"
    >
      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <!--                <span-editable name="label" :block="block" :options="options" :editor="false"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <!--                <span class="required" v-if="block.required">*</span> -->
      </template>

      <div :id="`${block.id}-input`">
        {{ value }}
      </div>
      <p v-if="!value" class="py-2 text-muted">
        [{{ block.label }}]
      </p>
    </b-form-group>

    <!--            <template  slot="label"> -->
    <!--                {{ block.label }} -->
    <!--            </template> -->
  </field-wrapper>
</template>

<style>

</style>
