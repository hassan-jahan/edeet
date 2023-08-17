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
      fieldList: [],
      isBusy: false,
    }
  },
  computed: {
    relationList() {
      // block.editable || (block.required && (!model || (!model.id || !model[block.slug])) )

      if (!this.type.postFields)
        console.error('Dasht: There\'s no relation Field')

      const relations = this.$helper.findObjectsInArray(this.type.postFields, 'component', 'relation')

      return this.$helper.makeDropdownList(relations, 'label', 'slug')
    },

    selectedRelation() {
      if (this.type && this.type.postFields.length && this.block.relation)
        return this.$helper.findOneObjectInArray(this.type.postFields, 'slug', this.block.relation)
      return {}
    },

  },
  watch: {
    'type.postFields': function (newVal) {
      console.log('chnage post fields')
      this.setFieldList()
    },
    'block.relation': function () {
      console.log('chnage post fields block relation')

      this.setFieldList()

      console.log('this.fieldList', this.fieldList)
    },
  },
  created() {
    console.log('this is scope', this.scope, this.block)

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
        required: true,
        // 'maxLength': 8,
        exclude: '-:/',
        separator: '_',
        description: '',
      },

      // {
      //     'slug': 'relationTypeId',
      //     'label': 'Related Type',
      //     'component': 'select-type',
      //     'idField': 'id',
      //     'values': [], //maybe to be reactive
      //     'required': true,
      //     'description': '',
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },

      // {
      //     'slug': 'required',
      //     'label': 'Required?',
      //     'component': 'checkbox',
      //     // 'required': true,
      //     'description': '',
      // },

      {
        id: 'relation_field',
        slug: 'relation',
        label: 'Relation',
        component: 'dropdown',
        // 'buttons': true,
        // stacked: true,
        variant: 'outline-dark',
        size: 'md',
        values: this.relationList,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      // {
      //     'slug': 'relationTypeId',
      //     'label': 'Relation Type',
      //     'component': 'input-text',
      //     // 'buttons': true,
      //     // stacked: true,
      //     // 'variant': "outline-dark",
      //     'size': 'md',
      //     values: this.fieldList,
      //     // useFormula: true,
      //     // formula: ,
      //     'description': '',
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },

      // {
      //     'slug': 'field0',
      //     'label': 'Related Field0',
      //     'component': 'dropdown',
      //     // 'buttons': true,
      //     // stacked: true,
      //     'variant': "outline-dark",
      //     'size': 'md',
      //     values: this.fieldList, /// depends on model.relation.typeId
      //     // dependsOn: 'relation.typeId', // model[this.block.relation + '.typeId']
      //     // dependsOn:  this.type.postFields[this.model['relation']], // model[this.block.relation + '.typeId']
      //     'description': '',
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },

      {
        slug: 'field',
        label: 'Related Field',
        component: 'input-text',
        // 'buttons': true,
        // stacked: true,
        // values: this.fieldList, /// depends on model.relation.typeId
        // dependsOn: 'relation.typeId', // model[this.block.relation + '.typeId']
        // dependsOn:  this.type.postFields[this.model['relation']], // model[this.block.relation + '.typeId']
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'op',
        label: 'Operation',
        component: 'dropdown',
        // 'buttons': true,
        // stacked: true,
        variant: 'outline-dark',
        size: 'md',
        values: ['show', 'count', 'sum', 'avg', 'min', 'max', 'variance', 'STDEV'], /// depends on model.relation.typeId
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      // {
      //     'slug': 'field2',
      //     'label': 'Related Field2',
      //     'component': 'select-field',
      //     // 'buttons': true,
      //     // stacked: true,
      //     'variant': "outline-dark",
      //     'size': 'md',
      //     dependsOn: this.block.slug + '_data.relationTypeID', //relation is name of slug to watch on scope
      //     // values: this.fieldList, /// depends on model.relation.typeId
      //     // dependsOn: 'relation.typeId', // model[this.block.relation + '.typeId']
      //     // dependsOn:  this.type.postFields[this.model['relation']], // model[this.block.relation + '.typeId']
      //     'description': '',
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },

      { // maybe it's html?
        slug: 'description',
        label: 'Description',
        component: 'input-text',
        required: false,
        description: 'Add an example or help text',
        showIf: { slug: 'editable', value: true },
      },

      // {
      //     'slug': 'relationTitle',
      //     'label': 'Relation Title',
      //     'component': 'input-text',
      //     'type': 'text',
      //     'description': '',
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },
      // {
      //     'slug': 'relationSlug',
      //     'label': 'Relation Slug',
      //     'component': 'slug',
      //     'type': 'text',
      //     'prepend': 'Relation Slug:',
      //     'description': '',
      //     'dependsOn': 'relationTitle',
      //     'maxLength': 8,
      //     // 'showIf': {"slug": "type", "value": 'number'}
      // },

      // {
      //     'slug': 'relationReverse',
      //     'label': 'Use Relation ID',
      //     'component': 'select',
      //     'values': [{text: 'New', value: false}, {text: 'Current', value: true}],
      //
      //     'description': '',
      // },
      // {
      //     'slug': 'relationId',
      //     'label': 'Relation ID',
      //     'component': 'slug',
      //     'type': 'text',
      //     'description': 'Maximum 8 characters, unique',
      //     'prepend': 'New Relation ID:',
      //     // 'dependsOn': 'label',
      //
      //     'default': "${slice(relationTypeId_data.slug,0,6) + '_' + randomString(1)}",
      //     'maxLength': 8,
      //     'showIf': {"slug": "relationReverse", op: "neq", "value": true}
      // },

      // //relationMode
      // {
      //     'slug': 'multiple',
      //     'label': 'Multiple Items',
      //     'component': 'checkbox',
      //     'description': '',
      // },
      //    is it sub content or just related
      //    two sided or not?
    ]
    // this.settingsForm = {component: 'form', children: [...this.commonSettings.children, ...settings]} //change in future for better performance
    this.settingsForm = { component: 'form', children: [...settings] } // change in future for better performance
  },
  mounted() {

  },
  methods: {
    setFieldList() {
      if (this.selectedRelation && this.selectedRelation.relationTypeId) {
        console.log('relation: has post fields block rela', this.selectedRelation)
        if (this.scope)
          this.$set(this.scope, `${this.block.slug}_data`, this.selectedRelation)
        else
          console.error('Dasht: no scope was provided for formFields')

        // if (this.scope && this.scope[relation.slug + '_data']) { //doesn't work at this stage
        //     console.log('dataa scope relatoion slug data', this.scope[relation.slug + '_data'].postFields)
        //     this.fieldList = this.$helper.makeDropdownList(this.scope[relation.slug + '_data'].postFields, 'label', 'slug')
        // } else {
        // console.log('send request for ' + relation.relationTypeId)
        // this.$axios.get('/types/' + relation.relationTypeId).then(
        //     res => {
        //         console.log('type the', res.data)
        //         console.log('type the field', this.$helper.makeDropdownList(res.data.postFields, 'label', 'slug'))
        //         this.fieldList = this.$helper.makeDropdownList(res.data.postFields, 'label', 'slug')
        //     })
        // // }
      }

      // if (!typeList) {
    },
  },
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
    <div v-if="options.edit && !block.show" class="text-center big text-muted p-3">
      <div class="small text-22right mb-1">
        Admin Field
      </div>

      [{{ block.label || block.slug }}]
      <div class="small mt-1">
        Hidden Relation Field
      </div>

      <!--            {{ type.postFields }} -->
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
    </b-form-group>
  </field-wrapper>
</template>

<style>

</style>
