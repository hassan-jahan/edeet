<!-- fieldAwesome.vue -->
<script>
import {css} from 'styn'
import {breakpoints} from '@styn/plugin-breakpoints'
import fieldMixin from '../fieldMixin'

const stynPlugins = [
  breakpoints({
    md: '768px',
    lg: '1024px',
  }),
]
// const styles = css({
//   ".foo": {
//     backgroundColor: "red",
//     "&:hover": {
//       backgroundColor: "blue",
//     },
//   },
//   ".bar": {
//     color: "yellow",
//   },
// });

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['type'], //for testing
  inheritAttrs: false,

  data() {
    return {
      theClassList: '',
      directionBlock: {
        slug: 'direction',
        label: '',
        component: 'select',
        size: 'sm',
        values: [{
          // text: 'left',
          value: '',
          html: '<div class="close">-</div>',
        }, {
          value: 'ltr',
          html: '<span class="iconify" data-icon="bx:bx-left-arrow-alt" data-inline="false"></span>'
        }, {
          value: 'rtl',
          html: '<span class="iconify" data-icon="bx:bx-right-arrow-alt" data-inline="false"></span>'
        }]
      },
      alignBlock: {
        slug: 'textAlign',
        label: '',
        component: 'select',
        size: 'sm',
        values: [{
          // text: 'left',
          value: '',
          html: '<div class="close">-</div>',
        }, {
          // text: 'left',
          value: 'left',
          html: '<span class="iconify" data-icon="ant-design:align-left-outlined" data-inline="false"></span>',
        }, {
          text: 'center',
          value: 'center',
          html: '<span class="iconify" data-icon="ant-design:align-center-outlined" data-inline="false" />',

        }, {
          // text: 'right',
          value: 'right',
          html: '<span class="iconify" data-icon="ant-design:align-right-outlined" data-inline="false" />',

        }],
        // 'default': 'info', //todo: foreach map for each block and its settings field
        description: '',
        // 'buttons': true,
        // 'size': 'sm',
        // 'stacked': true,
      },
      settingsForm: {},
      temp: {},
      unit: 'px',
      test: '',

    }
  },
  computed: {
    css() {
      const cssObject = {}
      cssObject[`#${this.block.targetId || this.block.id}`] = this.value
      // cssObject['&:hover'] = cssObject['__hover']

      console.log(cssObject)
      return css(cssObject, {plugins: stynPlugins})
    },
    // let styles = css({}
  },
  watch: {},

  mounted() {

  },
  created() {
    // console.log('scccope', this.scope)
    // console.log('vaaalue', this.value)
    if ((typeof this.value === 'undefined' || this.value == '' || this.$helper.isEmptyObject(this.value)) && this.block.slug) {
      this.value = {}
    }

    // this.settingsForm = {
    //   component: 'form',
    //   children: [...this.commonSettings.children, ...settings],
    // } // change in future for better performance            //
    // this.commonSettings.children.push()
  },
  methods: {
    change() {
      if (!this.isDirty) {
        this.isDirty = true
      }
    },
  },
}
</script>

<template>
  <field-wrapper
      v-if="ShowIf(block)" :block="block" :parent="parent" :index="index" :options="options"
      :footer-add="true" right-slot-pos="outside"
      left-slot-pos="outside"
      :hide-features="[]"
      style="position: relative;"
      :settings-form="settingsForm"
      :scope="scope"
  >
    <div class="css-builder">
      <b-form-group
          :label-for="`${block.id}-classes`"
          label="Classes"
      >
<!--        doesn't work with value.classlist ???? -->
        <b-form-tags
            :id="`${block.id}-classes`"
            v-model="theClassList"
            placeholder="Enter new class separated by space"
            remove-on-delete
            separator=" "
            size="sm"
        />
      </b-form-group>

      <!--            <dropdown-selector size="xs" variant="danger" v-model="unit" right :options="[ -->
      <!--                { value: '', text: ' ' }, -->
      <!--                { value: 'block', text: 'Block' }, -->
      <!--                { value: 'flex', text: 'Flex' }]"> </dropdown-selector> -->
      <b-form-group
          :label-for="`${block.id}-margin`"
          label="Margin"
      >
        <four-css-number
            :value="value" :names="['marginTop', 'marginLeft', 'marginBottom', 'marginRight']"
            label="Margin"
        />
      </b-form-group>

      <b-form-group
          :label-for="`${block.id}-padding`"
          label="Padding"
      >
        <four-css-number
            :value="value" :names="['paddingTop', 'paddingLeft', 'paddingBottom', 'paddingRight']"
            label="Padding"
        />
      </b-form-group>


      <b-form-group
          label="Display"
      >
        <b-form-select
            v-model="value.display" :options="[
          { value: '', text: '' },
          { value: 'block', text: 'Block' },
          { value: 'flex', text: 'Flex' },
          { value: 'inline-block', text: 'Inline Block' },
          { value: 'inline', text: 'Inline' },
          { value: 'none', text: 'None' },
        ]" size="sm" class="mt-0"
        />
      </b-form-group>

      <b-form-group
          :label-for="`${block.id}-text`"
          label="Text"
      >
        <div class="d-flex justify-content-between">
          <b-form-select
              v-model="value.fontFamily"
              class="mr-2" :options="[
            // { value: '', text: '-- Font Family --' },
            { value: 'Arial, Helvetica, sans-serif', text: 'Arial' },
            { value: 'Courier New,Courier, monospace', text: 'Courier New' },
            { value: 'Times New Roman, Times, serif', text: 'Times New Roman' },
            { value: 'Verdana, Tahoma, sans-serif', text: 'Verdana' },
          ]" size="sm"
          >
            <template #first>
              <b-form-select-option :value="undefined" disabled>
                - Font Family -
              </b-form-select-option>
            </template>
          </b-form-select>

          <b-form-select
              v-model="value.fontWeight"
              style="max-width: 100px"
              class="ml-2" :options="[
            // { value: '', text: '-- Font Family --' },
            { text: 'Thin (100)', value: '100' },
            { text: 'Extra Light (200)', value: '200' },
            { text: 'Light (300)', value: '300' },
            { text: 'Normal (400)', value: '400' },
            { text: 'Medium (500)', value: '500' },
            { text: 'Semibold (600)', value: '600' },
            { text: 'Bold (700)', value: '700' },
            { text: 'Extra Bold (800)', value: '800' },
            { text: 'Black (900)', value: '900' },

          ]" size="sm"
          >
            <template #first>
              <b-form-select-option :value="undefined" disabled>
                - Weight -
              </b-form-select-option>
            </template>
          </b-form-select>
        </div>

        <!--      background image color multiple free text code location

        height widtgh  and others
        borders
        maybe shadow?
        responsiveness?
        -->
        <div class="d-flex">
          <css-number
              v-model="value.fontSize"
              class="input-xs"
              placeholder="Size"
              style="min-width: 90px;"
          />


        </div>

        <color-block
            :model="value" :block="{
          slug: 'color',
          component: 'color',
          gradient: false,
          transparent: false,
          preset: 'basic',
          label: '',
          description: '',
          options: '',
        }" :parent="[]" :index="0" :options="{ edit: false }"
            :scope="{}"
        />
      </b-form-group>

      <div class="d-flex">
        <select-block
            :model="value"
            :block="alignBlock" :parent="[]" :index="0" :options="{edit:false}" :scope="{}"
            class="mx-2"
        >
        </select-block>


        <select-block
            :model="value"
            :block="directionBlock" :parent="[]" :index="0" :options="{edit:false}" :scope="{}"
            class="mx-2"
        >
        </select-block>
      </div>
    </div>
    <pre>{{ css }}</pre>
  </field-wrapper>
</template>

<style>
.css-builder, .css-builder label, .css-builder .form-group, .css-builder legend, .css-builder .col-form-label {
  font-size: 12px !important;
}

.css-builder input[type=number]{
  font-size: 13px !important;

}
/*.css-builder .margin-box:hover .padding-box{*/
/*  opacity: .7;*/
/*}*/

/*.css-builder .margin-box .padding-box:hover{*/
/*  opacity: 1 !important;*/
/*}*/

/*.css-builder > .margin-box:has(.padding-box:hover) {*/
/*  opacity: .6;*/
/*}*/
</style>
