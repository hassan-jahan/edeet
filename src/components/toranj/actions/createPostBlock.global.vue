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

        {
          slug: 'useTextarea',
          label: 'Use Long Text',
          component: 'checkbox',
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },
      ],
      settingsForm: {
        component: 'form', children: [],
      },
    }
  },
  computed: {
    formulaFields() {
      if (this.block.typeId && !this.scope.typeId_data || !Array.isArray(this.scope.typeId_data?.postFields))
        return []

      const arr = []
      const defaultComponent = this.block.useTextarea ? 'textarea' : 'input-text'

      this.scope.typeId_data.postFields.forEach((item, index) => {
        // todo: autofill and hidden and default may not work correctly

        const component = defaultComponent
        // let component = item.component
        // if (['invoice'].includes(item.component))
        //     component = 'input-text'

        console.log('item', item)
        // if (['input-text', 'hidden', 'textarea'].includes(item.component))
        // todo: create an invoice or optimized invoice component for formula (total and tax and disacpint should be calculated on backend!!??? maybe we use out formula in front end, too!)
        // todo: disable default settings and chnage for settings for each action?? and do not use wrapper!? find a way for common settings
        // todo: think about differett data number , date, array and objects like invoice
        // todo: make simple default fomula work on backend (pass model on main scope)
        // todo: change input-text to input
        // todo: think about relations and array
        // maybe add an optionto enter as formula for each component view as programmable
        arr.push({
          component,
          type: 'text',
          default: item.useFormula ? `\${${item.formula}}` : item.default, // set value
          slug: `newPost.${item.slug}`,
          label: item.label,
          disableAllFormula: true,
          // useFormula: item.useFormula,
          // formula: item.formula,

        })
      })
      console.log('arr', arr)

      return arr
    },
  },
  watch: {
    'scope.typeId_data': function (newVal) {
      console.log('data changed')
      this.settingsForm.children = [...this.actionSettings, ...this.formulaFields]
    },
    'block.useTextarea': function (newVal) {
      this.settingsForm.children = [...this.actionSettings, ...this.formulaFields]
    },
  },
  created() {
    // created fired too early for settings modal (when the list show up)
    // console.log('scopeee', this.scope)
    // setTimeout(()=>{
    this.settingsForm.children = [...this.actionSettings, ...this.formulaFields]
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
