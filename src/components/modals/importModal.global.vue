<script>
// import {directive as onClickaway} from "vue-clickaway";

export default {
  directives: {
    // onClickaway: onClickaway
  },
  // components: {PageSettingsModal},
  props: ['modalId', 'type', 'url', 'params'],

  data() {
    return {

      importForm: {
        component: 'form',
        children: [],
      },
      defaultForm: [
        {
          slug: 'importUrl', // todo: csv file only
          label: 'CSV File to import',
          component: 'upload',
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'noHeader',
          label: 'CSV without header',
          component: 'checkbox',
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },
        {
          slug: 'helper',
          description: '',
          label: '',
          html: 'Put ${field1} ${field2} ${fieldN} in related fields',
          component: 'html-field',
          showIf: 'noHeader && importUrl',
        },
        {
          slug: 'helper2',
          description: '',
          label: '',
          html: 'Put ${column_name} in related fields. Replace spaces with _ (e.g. ${Col_Name} instead of Col Name)',
          component: 'html-field',
          showIf: '!noHeader && importUrl',
        },

        // {
        //     'slug': 'typeId',
        //     'label': 'Choose Post Type',
        //     'component': 'select-type',
        //     'idField': 'id',
        //     'values': [], //maybe to be reactive
        //     'required': true,
        //     'description': '',
        //     // 'showIf': {"slug": "type", "value": 'number'}
        // },

        {
          slug: 'useTextarea',
          label: 'Use Long Text',
          component: 'checkbox',
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

      ],
      scope: {},
      importData: {},
    }
  },
  computed: {
    formulaFields() {
      if (!this.type.id || !Array.isArray(this.type?.postFields))
        return []

      const arr = []
      const defaultComponent = this.importData.useTextarea ? 'textarea' : 'input-text'

      this.type.postFields.forEach((item, index) => {
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
    // 'scope.typeId_data'(newVal) {
    //     console.log('data changed')
    //     this.importForm.children = [...this.defaultForm, ...this.formulaFields]
    // },
    // 'importData.importUrl'(newVal) {
    //     this.importForm.children = [...this.defaultForm, ...this.formulaFields]
    // },
    'importData.useTextarea': function (newVal) {
      this.importForm.children = [...this.defaultForm, ...this.formulaFields]
    },
  },
  created() {
    this.importForm.children = [...this.defaultForm, ...this.formulaFields]
  },
  methods: {
    shown() {

    },
    importPosts() {
      this.$http.post(`types/${this.type.id}/posts/import`, this.importData)
        .then((res) => {
          // tod: maybe wait for 3 seconds and the refresh the table id
          this.$toast('The result will be email to you!', 'info')
          this.importData = { newPost: {} }
        }, (error) => {
        })
      this.$root.$emit('bv::hide::modal', this.modalId)
    },
  },

}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false" size="md" hide-backdrop
    content-class="modal-draggable" modal-class="dsht" ok-title="Import" lazy scrollable
    @ok="importPosts" @shown="shown"
  >
    <form @submit.prevent="importPosts">
      <formFields
        :model="importData" :block="importForm" :parent="[]"
        :index="0"
        :options="{ edit: false }"
        :scope="scope"
      />
    </form>
    <!--        <div slot="modal-footer"> -->
    <!--            <b-button -->
    <!--                variant="secondary" -->
    <!--                class="mx-1" -->
    <!--                type="button" -->
    <!--                @click="$root.$emit('bv::hide::modal', modalId)" -->
    <!--            > -->
    <!--                <span class="icon-left-1"/> -->
    <!--                {{ $t('components.headerBarBack') }} -->
    <!--            </b-button> -->

    <!--            <b-button -->
    <!--                variant="primary" -->
    <!--                class="" -->
    <!--                type="button" -->
    <!--                @click="addPage" -->
    <!--            > -->
    <!--                <span class="icon-ok "/> -->
    <!--                Create -->
    <!--            </b-button> -->
    <!--        </div> -->
  </b-modal>
</template>
