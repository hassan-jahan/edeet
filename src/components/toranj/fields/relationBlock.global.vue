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
    }
  },
  computed: {
    showPostSelect() {
      // block.editable || (block.required && (!model || (!model.id || !model[block.slug])) )
      if (this.block.editable)
        return true

      if (this.block.required) {
        if (this.model && this.model[this.block.slug])
          return false

        if (!this.model || !this.model.id)
          return true
      }

      return false
    },

  },
  watch: {
    value(newVal) {
      setTimeout(() => {
        // if (!this.block.getOnlyIds || this.block.defined) {
        //     this.tempModel = this.value
        //     return
        // }

        // this.$helper.pluckArray()
        console.log('value of relation changed', this.value)

        const IdListString = Array.isArray(this.value) && this.value.length ? this.value.join(',') : this.value
        console.log('IdListString', IdListString)

        if (!IdListString)
          return

        // this.isBusy = true
        this.$axios.get(`types/${this.block.relationTypeId}/posts/`, { params: { 'id:in': IdListString } }).then((res) => {
          console.log(res)

          // if (this.scope){
          const data = Array.isArray(this.value) && this.value.length ? res.data : res.data[0]
          console.log('this.scope, this.block.slug+ \'_data\', data')
          console.log(this.scope, `${this.block.slug}_data`, data, this.block)
          this.$set(this.scope, `${this.block.slug}_data`, data)
          // }

          this.tempModel = res.data
          // this.isBusy = false
        },
        (err) => {
          // this.isBusy = false
        })
      }, 1000)
    },
  }, // {
  // edit: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // current: {
  //     type: String,
  //     required: true
  // }
  // },

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
        required: true,
        maxLength: 8,
        exclude: '-:/',
        separator: '_',
        description: 'Maximum 8 characters',
      },

      {
        slug: 'relationTypeId',
        label: 'Related Type',
        component: 'select-type',
        idField: 'id',
        values: [], // maybe to be reactive
        required: true,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'required',
        label: 'Required?',
        component: 'checkbox',
        // 'required': true,
        description: '',
      },

      {
        slug: 'editable',
        label: 'Can be edited',
        component: 'checkbox',
        description: '',
      },

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

      {
        slug: 'relationReverse',
        label: 'Use Relation ID',
        component: 'select',
        values: [{ text: 'New', value: false }, { text: 'Current', value: true }],

        description: '',
      },
      {
        slug: 'relationId',
        label: 'Relation ID',
        component: 'slug',
        type: 'text',
        description: '',
        prepend: 'New Relation ID:',
        // 'dependsOn': 'label',

        default: '@{slice(relationTypeId_data.slug,0,5)}_${randomString(2)}',
        // 'maxLength': 8,
        // 'showIf': {"slug": "relationReverse",op: "neq", "value": true}
      },

      // {
      //     'slug': 'selectedRelation',
      //     'label': 'Relation List',
      //     'component': 'select-relation',
      //     'type': 'text',
      //     'description': 'Choose from current relations (Reversed Relation)',
      //     // 'prepend': 'Relation ID:',
      //     // 'dependsOn': 'relationTitle',
      //     // 'maxLength': 8,
      //     'showIf': {"slug": "relationReverse", "value": true}
      // },

      // relationMode
      {
        slug: 'multiple',
        label: 'Multiple Items',
        component: 'checkbox',
        description: '',
      },
      //    is it sub content or just related
      //    two sided or not?
    ]
    // this.settingsForm = {component: 'form', children: [...this.commonSettings.children, ...settings]} //change in future for better performance
    this.settingsForm = { component: 'form', children: [...settings] } // change in future for better performance
  },
  mounted() {

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
    <template v-if="showPostSelect">
      <b-form-group
        :label-for="`${block.id}-input`"
        :disabled="block.disabled"
      >
        <template #label>
          {{ block.label }}
          <span v-if="block.required" class="required">*</span>
        </template>

        <post-selector
          :block="block" :parent="parent" :index="index" :options="options" :model="model" :scope="scope"
        />

        <template #description>
          <p v-html="block.description" />
        </template>
      </b-form-group>
    </template>

    <div v-else-if="options.edit" class="text-center big text-muted p-3">
      <div class="small text-22right mb-1">
        Admin Field
      </div>

      [{{ block.label || block.slug }}]
      <div class="small mt-1">
        Relation: connect this type to another one
      </div>
    </div>

    <!--        <template v-slot:menu-item> -->
    <!--            <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                Upload / Replace -->
    <!--            </b-dropdown-item> -->
    <!--        </template> -->

    <!--        <template v-slot:menu-right> -->
    <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                <span class="iconify big" data-icon="bx:bx-cloud-upload" data-inline="false"></span> -->
    <!--            </b-btn> -->
    <!--        </template> -->
  </field-wrapper>
</template>

<style>

</style>
