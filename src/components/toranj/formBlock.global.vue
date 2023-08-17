<script>
// import fMixin from './fMixin'

import blockMixin from './blockMixin'

// import {getters, state, mutations} from "../../plugins/store";

export default {
  // components: { FormFields },
  // components: { AddFieldPopover },
  directives: {},
  mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'model', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      dataTemp: {},
      type: {},

    }
  },
  computed: {
    isCustomForm() {
      return !this.block.type || this.block.type == '_custom'
    },
    settingsForm() {
      const typeList = (!this.options || !this.options.typeList) ? [] : this.options.typeList

      return {
        component: 'form',
        children: [
          {
            slug: 'type',
            label: 'Form Type',
            component: 'dropdown',
            values: [{ text: 'Simple Custom Form', value: '_custom' }, {
              text: '-- Pre-made Form Type --',
              value: '',
              disabled: true,
            }].concat(...typeList), // dynamic ...
            default: '_custom',
            required: false,
            description: 'Use pre-made form for current types or choose simple custom form',
            // 'description': 'Enter type ID for a pre-made form or leave it bank to create your own form',
          },
          {
            slug: 'successMessage',
            label: 'Success Message',
            component: 'input-text',
            required: false,
            description: 'e.g. Thank you for your message!',
          },

          {
            slug: 'submitBtnText',
            label: 'Submit Button Text',
            component: 'input-text',
            // 'required': true,

            description: 'e.g. Submit',
          },

          {
            slug: 'notify',
            label: 'Notify me by email after each submit',
            component: 'checkbox',
            // 'required': true,
            description: '',
            // "showIf": {"slug": "block.type", "value": '_custom'},

          },

          {
            slug: 'redirect',
            label: 'Redirect Url',
            component: 'input-text',
            required: false,
            description: 'Redirects user to another URL after a successful submit, Can be empty',
          },
        ],

      }
    },
  },
  watch: {
    'block.type': function (newVal) {
      if (!this.isCustomForm)
        this.loadType()
    },
  },
  created() {
    if (this.model)
      this.dataTemp = this.model

    if (!this.block.children || !this.block.children.length)
      this.$set(this.block, 'children', [])

    this.loadType()
    // this.options.typeList = [] // initial value before initilization
    // else {
    //     this.dataTemp = {}
    // }
  },
  mounted() { // it's ok no problem with created SSR
    // console.log('this.$refs')
    // console.log(this.$refs)

  },
  methods: {
    Submit() {
      if (!this.isCustomForm) {
        console.log('newPost', this.model)
        if (this.model && !this.model.title)
          this.model.title = 'Untitled'

        this.model.typeId = this.type.id

        this.$axios.post('/posts', this.model).then((res) => {
          this.successActions()
        }, (error) => {
          // console.log('مشکل در ثبت فرم ') //invalid msg from server
          // this.$toast('Error, please try again ', 'error')
          console.log(error) // invalid msg from server
        })
      }

      if (this.isCustomForm || this.block.notify) {
        this.$axios.post('forms/mailer', { form: this.block, model: this.model }).then((res) => {
          this.successActions()
        }, (error) => {
          // console.log('مشکل در ثبت فرم ') //invalid msg from server

          // this.$toast('Error, please try again ', 'error')
          console.log(error) // invalid msg from server
        })
      }
    },

    loadType() {
      if (this.isCustomForm)
        return

      this.$axios.get(`/types/${this.block.type}/?with=initialStatus`).then((res) => {
        this.type = res.data

        if (this.type.initialStatus && Array.isArray(this.type.initialStatus.hiddenFields))
          this.options.hiddenFields = this.type.initialStatus.hiddenFields

        if (this.type.initialStatus && Array.isArray(this.type.initialStatus.readOnlyFields))
          this.options.readOnlyFields = this.type.initialStatus.readOnlyFields

        // if (this.type.postFields) {
        //     this.$set(this.block, 'children', {...this.type.postFields})
        // }
      })
    },

    successActions() {
      if (!this.block.redirect)
        this.$toast(this.block.successMessage || 'Form was submitted successfully!', 'success')

      if (this.block.redirect) {
        window.location = this.block.redirect
        return
      }
      this.model = {}
    },

  },
}
</script>

<template>
  <widget-wrapper
    :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="inside" left-slot-pos="outside"
    :hide-features="['add', 'duplicate', 'paste']"
    :settings-form="settingsForm"
    :selectable="false"
    :movable="false"
  >
    <!--        only to get default -->
    <!-- todo: 1. // if (!this.block.form)
                //     this.$set(this.block, 'form', {...this.defaultForm})
                2. add fieldoptions {eidt:true , ...
                3. global types
                4. test / done /

                5. create new type in future
                555. in future remove custom form!

                -->

    <form :action="block.action" :method="block.method" class="p-4 pt-5" v-bind="$attrs" @submit.prevent="Submit">
      <!--            <editable name="title" :block="block" :options="options"> -->
      <!--                <h2>Form Title</h2> -->
      <!--            </editable> -->
      <!--            <editable name="description" :block="block" :options="options">Form Description</editable> -->

      <formFields
        v-if="isCustomForm" :model="dataTemp"
        :block="{ id: `${block.id}_fields`, children: block.children }"
        :parent="block.children" :index="index"
        :options="{ ...options, edit: options.edit ? isCustomForm : options.edit }"
      />

      <formFields
        v-else-if="!isCustomForm && type && type.postFields && type.postFields.length" :model="dataTemp"
        :block="{ id: `${block.id}_fields`, children: type.postFields }"
        :parent="type.postFields" :index="index" :options="{ ...options, edit: false }"
      />

      <div v-else class="text-center">
        No field for this database, create your fields
        <a class="" target="_blank" :href="`${$options.filters.typeEditURL(type, $currentApp)}/workflow`">here
        </a>
      </div>

      <b-btn type="submit" class="mt-3 btn btn-primary btn-block">
        {{ block.submitBtnText || 'Submit' }}
      </b-btn>
      <!--            Form Here2 -->
      <!--            <b-btn size="xs" @click.prevent="$root.$emit('openAddField', block8, block.children, index )"> -->
      <!--                <span class="iconify" data-icon="dashicons:plus-alt2" data-inline="true"></span> Add Field1 -->
      <!--            </b-btn> -->
      <!-- hey -->
      <!--            {{options.typeList}} -->
      <!--            {{options}} -->
      <!--            {{options.edit}} -->
    </form>

    <!--        <div v-if="!block.html && options.edit" -->
    <!--             class="slot-wrapper" -->
    <!--             style="display: none"> -->
    <!--            &lt;!&ndash;            maybe good for &ndash;&gt; -->
    <!--            <slot/> -->
    <!--        </div> -->

    <template #menu-right>
      <b-btn
        v-if="isCustomForm" :id="`add-field-${block.id}`" size="sm"
        @click.prevent="$root.$emit('bv::show::popover', `add-field-${block.id}`)"
      >
        <span class="iconify" data-icon="dashicons:plus-alt2" data-inline="true" /> Add Field
      </b-btn>

      <b-btn
        v-if="!isCustomForm" size="sm" target="_blank"
        :href="`${$options.filters.typeEditURL(type, $currentApp)}/workflow`"
      >
        <span
          class="iconify text-muted" data-icon="feather:external-link"
          data-inline="true"
        />
        Edit This Form
      </b-btn>

      <b-btn
        size="sm"
        @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
      >
        <span class="iconify" data-icon="ic:baseline-settings" data-inline="true" />
      </b-btn>
      <!--            should always be bottom of co -->
      <addFieldPopover :target-id="`add-field-${block.id}`" :block="block" :parent="block.children" />
    </template>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->
  </widget-wrapper>
</template>
