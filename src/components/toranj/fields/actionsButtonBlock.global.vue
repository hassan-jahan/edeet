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
    }
  },

  computed: {

    // calculatedValue2() {
    //     console.log('calculated', this.model)
    //
    //     return this.model.items.length
    // }
  },
  watch: {},
  created() {
    if ((typeof this.value === 'undefined' || this.value == '' || this.value == null) && this.block.slug) // testing to enable object value work without certain defination slug means its kind of form element (another way to do this is doing it only for that specific component that needs object value)
      this.value = [] // esential for object values

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
        // 'maxLength': 8,
        // 'description': 'Maximum 8 characters',
      },

      // {
      //     'slug': 'formula',
      //     'label': 'Formula',
      //     'component': 'input-text',
      //     // 'required': true,
      //     'type': 'text',
      //     'description': 'Enter variable from the scope. The value will be calculated on client before save.',
      //     // "showIf": {"slug": "useFormula", op: 'neq', "value": false},
      //
      // },

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
    :type="type"
  >
    <b-form-group
      v-if="type && type.id"
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <b-btn
        size="sm"
        @click.prevent="$root.$emit('bv::show::modal', `status-actions-${block.id}`)"
      >
        {{ block.label || 'Actions' }}

        <span v-if="!$helper.isEmptyObject(value)" class="badge badge-warning badge-outline rounded">{{
          value.length
        }}</span>
      </b-btn>

      <template #description>
        <!--            security -->
        <p v-html="block.description" />
      </template>

      <actionsModal
        :model="model" :modal-id="`status-actions-${block.id}`" :block="block" :actions="value"
        :scope="scope" :type="type" :options="{ edit: true }"
      />
    </b-form-group>
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
