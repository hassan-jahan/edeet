<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'type', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      // actionSettings: [],
      actionSettings: [
        // {
        //     'slug': 'disabled',
        //     'label': 'Disabled',
        //     'component': 'checkbox',
        //     'required': false,
        //     'description': 'Temporary disable this action.',
        // },

        {
          slug: 'title',
          label: 'Action Title',
          component: 'input-text',
          required: true,
          description: '',
          // 'showIf': '!disabled'
        },

        {
          slug: 'slug',
          label: 'Slug',
          // 'type': 'email',
          prepend: 'Slug Name: ',
          size: 'sm',
          component: 'slug',
          required: true,
          maxLength: 8,
          exclude: '-:/',
          separator: '_',
          description: 'Maximum 8 characters',
          // 'showIf': '!disabled'
        },
        {
          slug: 'typeId',
          label: 'Choose Post Type',
          component: 'select-type',
          idField: 'id',
          values: [], // maybe to be reactive
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        // {
        //     'slug': 'useTextarea',
        //     'label': 'Use Long Text',
        //     'component': 'checkbox',
        //     'description': '',
        //     // 'showIf': {"slug": "type", "value": 'number'}
        // },

      ],
      settingsForm: {
        component: 'form', children: [],
      },
    }
  },
  computed: {
    valueToUpdate() {
      if (!this.scope.typeId_data?.postFields || !this.block.fieldToUpdate)
        return []

      const defaultComponent = 'textarea' // this.block.useTextarea ? 'textarea' : 'input-text'

      const field = this.$helper.findOneObjectInArray(this.scope.typeId_data?.postFields, 'slug', this.block.fieldToUpdate)

      return [{
        component: defaultComponent,
        // type: 'text',
        // default: item.useFormula ? '${' + item.formula + '}' : item.default, //set value
        slug: 'valueToUpdate',
        label: 'Value To Update',
        disableAllFormula: true,
        // useFormula: item.useFormula,
        // formula: item.formula,

      }]
    },
    fieldToUpdate() {
      if (this.block.typeId && !this.scope.typeId_data || !Array.isArray(this.scope.typeId_data?.postFields))
        return []

      return [{
        component: 'input-text',
        // type: 'text',
        // default: item.useFormula ? '${' + item.formula + '}' : item.default, //set value
        slug: 'postId',
        label: 'Post ID',
        // disableAllFormula: true
        // useFormula: item.useFormula,
        // formula: item.formula,

      }, {
        component: 'select',
        label: 'Choose a field to update',
        slug: 'fieldToUpdate',
        values: this.$helper.makeDropdownList(this.scope.typeId_data.postFields, 'label', 'slug'),
        description: '',

      }]
    },
  },
  watch: {
    'scope.typeId_data': function (newVal) {
      console.log('data changed')
      console.log(this.fieldToUpdate)
      this.settingsForm.children = [...this.actionSettings, ...this.fieldToUpdate, ...this.valueToUpdate]

      // console.log(this.settingsForm.children,'567')
    },
    'block.fieldToUpdate': function (newVal) {
      this.settingsForm.children = [...this.actionSettings, ...this.fieldToUpdate, ...this.valueToUpdate]
    },
    'block.useTextarea': function (newVal) {
      this.settingsForm.children = [...this.actionSettings, ...this.fieldToUpdate, ...this.valueToUpdate]
    },
  },
  created() {
    // created fired too early for settings modal (when the list show up)
    // console.log('scopeee', this.scope)
    // setTimeout(()=>{

    this.settingsForm.children = [...this.actionSettings, ...this.fieldToUpdate, ...this.valueToUpdate]
    //     console.log('scopeee22', this.scope)
    //
    // }, 2000)
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html

  },
  methods: {},
}
</script>

<template>
  <action-wrapper
    :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="inside" left-slot-pos="inside"
    :hide-features="['move']"
    :settings-form="settingsForm"
    :type="type"
    :scope="scope"
  >
    <template #menu-right>
      <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal', 'code-editor-'+block.id)"> -->
      <!--                <span class="iconify" data-icon="ion:code-slash" data-inline="true"></span> Code -->
      <!--            </b-btn> -->
    </template>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->
    <div v-b-tooltip.top.ds500="'Click To Edit'" class="">
      {{ block.title }}
    </div>
  </action-wrapper>
</template>

<style>

</style>
