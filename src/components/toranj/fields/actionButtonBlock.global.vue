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
      inputData: {},
      inputFormScope: {},
      showDone: false,

    }
  },

  computed: {
    hasInput() {
      return this.block.meta?.hasInput && Array.isArray(this.block.inputForm) && this.block.inputForm.length
    },
    postId() {
      return this.model.id ? this.model.id : ''
    },
    // calculatedValue2() {
    //     console.log('calculated', this.model)
    //
    //     return this.model.items.length
    // }
  },
  watch: {},
  created() {
    if ((typeof this.value === 'undefined' || this.value == '' || this.value == null) && this.block.slug) // testing to enable object value work without certain defination slug means its kind of form element (another way to do this is doing it only for that specific component that needs object value)
      this.value = {} // ACTION RESPOSNCE? esential for object values

    // actions!!
    this.inputFormScope = {
      post: this.model,
    }

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

      {
        slug: 'actions',
        label: 'Actions',
        component: 'actions-button',
        // 'required': true,
        description: 'Actions to do when the status change to this one',
      },

      {
        slug: 'type',
        label: 'Type',
        component: 'select',
        block: true,
        values: [{ text: 'Link', value: 'link' }, { text: 'Button', value: 'btn' }],
      },

      {
        slug: 'size',
        label: 'Size',
        component: 'select',
        values: [{ text: 'Small', value: 'sm' }, { text: 'Medium', value: 'md' }, {
          text: 'Large',
          value: 'lg',
        }],
        // 'default': 'info', //todo: foreach map for each block and its settings field
        description: '',
        size: 'sm',
        showIf: { slug: 'type', value: 'btn' },
        // 'stacked': true,

      },

      {
        slug: 'successMessage',
        label: 'Success Message',
        component: 'input-text',
        // 'required': false,
        description: '',
      },

      // {
      //     'slug': 'align',
      //     'label': 'Align',
      //     'component': 'select',
      //     'size': 'sm',
      //     'values': [{
      //         // text: 'left',
      //         value: '',
      //         html: '<div class="close">-</div>'
      //     },{
      //         // text: 'left',
      //         value: 'left',
      //         html: '<span class="iconify" data-icon="ant-design:align-left-outlined" data-inline="false"></span>'
      //     }, {
      //         text: 'center',
      //         value: 'center',
      //         html: '<span class="iconify" data-icon="ant-design:align-center-outlined" data-inline="false"></span>'
      //
      //     }, {
      //         // text: 'right',
      //         value: 'right',
      //         html: '<span class="iconify" data-icon="ant-design:align-right-outlined" data-inline="false"></span>'
      //
      //     }],
      //     // 'default': 'info', //todo: foreach map for each block and its settings field
      //     'description': '',
      //     // 'buttons': true,
      //     // 'size': 'sm',
      //     // 'stacked': true,
      //
      // },

      // {
      //     'slug': 'bg',
      //     'label': 'Background Color',
      //     'component': 'color',
      //     'gradient': true,
      //     'transparent': true,
      //     'preset': 'basic',
      //     'options': [
      //         '#A463BF',
      //         'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
      //         'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
      //         'linear-gradient( 90.6deg,  rgba(59,158,255,1) -1.2%, rgba(246,135,255,1) 91.6% )'
      //     ],
      //     // 'required': true,
      //     'description': '',
      //     "showIf": [
      //         {"slug": "type", "value": 'btn'},
      //         {"slug": "outline", "value": false},
      //     ]
      //
      // },

      // {
      //     'slug': 'color',
      //     'label': 'Text Color',
      //     'component': 'color',
      //     'preset': 'basic', //none| material| dark| light| text or array of custom colors
      //     // 'required': true,
      //     'options': ['#fff', '#666', '#333'],
      //     'description': '',
      //     "showIf": {"slug": "type", "value": 'btn'},
      //
      // },
      // {
      //     'slug': 'outline',
      //     'label': 'Outline',
      //     'component': 'checkbox',
      //     'description': '',
      //     "showIf": {"slug": "type", "value": 'btn'},
      // },

      // {
      //     'slug': 'classes',
      //     'label': 'Classes',
      //     'component': 'input-text',
      //     // 'required': true,
      //     // 'values': [2, 3, 4],
      //     'description': '',
      // },

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
  methods: {
    doAction() {
      if (this.options.edit)
        this.$root.$emit('bv::show::modal', `settings-${this.block.id}`)
      // else if (this.hasInput)
      //     this.$root.$emit('bv::show::modal', 'action-button-input-' + this.block.id)
      else
        this.DoActions()
    },
    DoActions() {
      if (!this.postId)
        this.$toast('You may need to create data first.', 'error')
      // return
      // or maybe typeId is enough / send it to typeId actions url

      this.showDone = false

      const data = { ...this.inputData, currentModel: { ...this.model } }
      this.$axios.post(`posts/${this.postId}/actions/buttons/${this.block.slug}`, data).then(
        (res) => {
          // todo: live change for current feed after done
          this.showDone = true

          setTimeout(() => this.showDone = false, 3000)

          if (this.block.successMessage)
            this.$toast(this.block.successMessage, 'success')
          else
            this.$toast('New action was done successfully!', 'success')
          //    show result custom message!
        })
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
    :type="type"
  >
    <b-form-group
      v-if="type && type.id"
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <b-btn v-if="!hasInput" variant="secondary" :size="block.size || options.size" @click.prevent="doAction">
        <span :style="showDone ? 'opacity:1;display:inline-block' : 'opacity:0;display:none'" class="simple-checkmark" />
        {{ $helper.evaluate(block.label, true, inputFormScope, model) || 'Action' }}

        <!--                <span v-if="options.edit " class="badge badge-warning badge-outline rounded">{{ -->
        <!--                        block.actions?.length ? block.actions?.length : '' -->
        <!--                    }}</span> -->
      </b-btn>

      <b-dropdown
        v-else
        :key="`input-form-${block.id}` "
        class="mx-1 "
        :size="block.size || options.size"
        variant="secondary"
        bou2ndary="window"
        bottom
        toggle-class="no-border-bottom-radius"
        lazy
      >
        <template #button-content>
          <span :style="showDone ? 'opacity:1;display:inline-block' : 'opacity:0;display:none'" class="simple-checkmark" />

          {{ $helper.evaluate(block.label, true, inputFormScope, model) || 'Action' }}
        </template>

        <div class="p-3">
          <form
            class="" style="min-width:300px;"
            @submit.prevent="doAction"
          >
            <formFields
              class="toranj-section" :model="inputData"
              :block="{ id: `action-input-form${block.id}`, children: block.inputForm }"
              :parent="[]" :index="0" :options="{ edit: false, size: 'sm' }" :scope="inputFormScope" :type="{}"
            />

            <b-btn variant="secondary" size="sm" block type="submit">
              {{ $helper.evaluate(block.label, true, inputFormScope, model) || 'Action' }}
            </b-btn>
          </form>
        </div>
      </b-dropdown>

      <template #description>
        <!--            security -->
        <p v-if="!isView" v-html="block.description" />
      </template>
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
