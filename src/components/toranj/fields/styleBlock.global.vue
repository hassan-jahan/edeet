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
  mounted() {

  },
  created() {
    // console.log('scccope', this.scope)
    // console.log('vaaalue', this.value)
    if ((typeof this.value === 'undefined' || this.value == '' || this.$helper.isEmptyObject(this.value)) && this.block.slug) {
      this.value = {}
      // this.$set(this.value, 'md', { 'paddingTop': 23 })
    }
    // console.log('vaaalue2', this.value)
    const settings = [

      // {\
      //     'slug': 'default',
      //     'label': 'Default Value',
      //     'component': 'input-text',
      //     'type': 'text',
      //     'description': 'Default value for empty fields',
      // },

      {
        slug: 'max',
        label: 'Max Stars',
        component: 'input-text',
        type: 'number',
        min: 3,
        max: 20,
        description: '',
        // 'showIf': []
      },

      {
        slug: 'color',
        label: 'Color',
        component: 'color',
        gradient: false,
        transparent: false,
        preset: 'basic',
        options: ['#ff8800', '#1c5cc6', 'red', 'green'],
        // 'required': true,
        description: '',
      },
      {
        slug: 'showValue',
        label: 'Show Value',
        component: 'checkbox',
        default: false,
        description: '',
      },

    ]
    this.settingsForm = {
      component: 'form',
      children: [...this.commonSettings.children, ...settings],
    } // change in future for better performance            //
    // this.commonSettings.children.push()
  },
  watch: {
    // temp: {
    //   deep: true,
    //   handler(newVal) {
    //     if (!newVal.unit)
    //       return
    //
    //     newVal.map((key, val) => {
    //       if (key !== 'unit') {
    //         return this.addUnit(val, key, newVal.unit)
    //       }
    //     })
    //   }
    // },
  },
  methods: {
    change() {
      if (!this.isDirty) {
        this.isDirty = true
      }
    },

    addUnit(value, modelValue, unitVar) {
      // if (typeof value === 'undefined' || value === '') {
      //   return
      // }
      //

      const unit = this[unitVar] || 'px'
      let output
      if (isNaN(value) || value == '' || this[unitVar] === 'custom') {
        output = value
      } else {
        output = value.toString() + unit
      }

      this.$set(this.value, modelValue, output)
    },

    unitFormatter(value) {
      if (typeof value === 'undefined' || value === '') {
        return
      }

      if (isNaN(value) || this.unit === 'custom') {
        return value
      }

      const unit = this.unit || 'px'
      return value.toString() + unit
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
        <b-form-tags
            :id="`${block.id}-classes`"
            v-model="value.classes"
            placeholder="Enter new tags separated by space"
            remove-on-delete
            separator=" "
            size="sm"
        />
      </b-form-group>

            <dropdown-selector size="xs" variant="danger" v-model="unit" right :options="[
                { value: '', text: ' ' },
                { value: 'block', text: 'Block' },
                { value: 'flex', text: 'Flex' }]"> </dropdown-selector>

      <css-number v-model="test" :units="['px', 'rem', 'em', '']" ></css-number>

      css number: {{test}}
<!--<css-number v-model="test" :units="['px','rem', 'em']" ></css-number>-->
      <b-form-group
          label="Space"
      >
        <div class="margin-box" style="width: 260px; ">
          <div class="d-flex justify-content-between">
            <small class="text-muted input-xs small">Margin</small>

            <b-form-input
                v-model="temp.marginTop" type="number" size="sm"
                placeholder="Top" class="input-xs"

            />
<!--            @input="(val) => addUnit(val, 'marginTop', 'unit')"-->
            <!--            :formatter="unitFormatter"-->
            <!--            lazy-formatter-->
            <div class="input-xs">
              <dropdown-selector
                  v-model="temp.unit" class="float-right" size="xs" variant="dark" right :options="[
                  { value: 's', text: 'px' },
                  { value: 'em', text: 'em' },
                  { value: 'rem', text: 'rem' }]"
              />
            </div>
          </div>

          <div class="d-flex">
            <b-form-input
                v-model="value.marginLeft" type="text" size="sm"
                placeholder="Left" class="input-xs align-self-center"
            />

            <!-- Padding -->
            <div
                class="padding-box align-self-center"
                style="border: 3px solid #bbb;width:150px;border-radius: 10px;padding: 5px; margin:5px; "
            >
              <div class="d-flex justify-content-between">
                <div class="text-muted input-xs bg-grey m22t-1" style="font-size:.6rem">
                  Padding
                </div>
                <b-form-input
                    v-model="value.paddingTop" type="text" size="sm"
                    placeholder="Top" class="input-xs"
                />
                <div class="input-xs"/>
              </div>

              <div class="d-flex justify-content-between">
                <b-form-input
                    v-model="value.paddingLeft" type="text" size="sm"
                    placeholder="Left" class="input-xs"
                />
                <b-form-input
                    v-model="value.paddingRight" type="text" size="sm"
                    placeholder="Right" class="input-xs"
                />
              </div>

              <div class="d-flex justify-content-center">
                <b-form-input
                    v-model="value.paddingBottom" type="text" size="sm"
                    placeholder="Bottom" class="input-xs"
                />
              </div>
            </div>

            <b-form-input
                v-model="value.marginRight" type="text" size="sm"
                placeholder="Right" class="input-xs align-self-center"
            />
          </div>

          <div class="d-flex justify-content-center">
            <b-form-input
                v-model="value.marginBottom" type="text" size="sm"
                placeholder="Bottom" class="input-xs"
            />
          </div>
        </div>
      </b-form-group>
    </div>

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
        ]" size="sm" class="mt-3"
      />
    </b-form-group>

    <pre>{{ css }}</pre>
  </field-wrapper>
</template>

<style>
.input-xs {
  width: 50px;
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
