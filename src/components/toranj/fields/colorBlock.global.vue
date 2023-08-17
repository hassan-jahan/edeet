<!-- fieldAwesome.vue -->
<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'
const gradients = [ // gredient hunt
  'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );',
  'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
  'linear-gradient( 90.6deg,  rgba(59,158,255,1) -1.2%, rgba(246,135,255,1) 91.6% )',
]

const presets = {
  basic: [
    '#1FBC9C',
    '#1CA085',
    '#2ECC70',
    '#27AF60',
    '#3398DB',
    '#2980B9',
    '#A463BF',
    '#8E43AD',
    '#3D556E',
    '#222F3D',
    '#F2C511',
    '#F39C19',
    '#E84B3C',
    '#C0382B',
    '#DDE6E8',
    '#BDC3C8',
    '#FFFFFF',
  ],
  text: [
    '#CC0001',
    '#E36101',
    '#FFCC00',
    '#009900',
    '#0066CB',
    '#000000',
    '#FFFFFF',
  ],
  material: [ // 18
    '#F44336',
    '#E91E63',
    // '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    // '#FFEB3B',
    '#FFC107',
    '#FF9800',
    // '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#333333',
    '#FFFFFF',
  ],
  dark: [
    '#D32F2F',
    '#C2185B',
    '#7B1FA2',
    '#512DA8',
    '#303F9F',
    '#1976D2',
    '#0288D1',
    '#0097A7',
    '#00796B',
    '#388E3C',
    '#689F38',
    '#AFB42B',
    '#FBC02D',
    '#FFA000',
    '#F57C00',
    '#E64A19',
    '#5D4037',
    '#616161',
    '#455A64',
  ],
  light: [
    '#EF9A9A',
    '#F48FB1',
    '#CE93D8',
    '#B39DDB',
    '#9FA8DA',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#80CBC4',
    '#A5D6A7',
    '#C5E1A5',
    '#E6EE9C',
    '#FFF59D',
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#BCAAA4',
    '#EEEEEE',
    '#B0BEC5',
  ],
}

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      colors: [],
      gradients,
    }
  },
  created() {
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
    this.settingsForm.children.push(
      {
        slug: 'gradient',
        label: 'Gradient',
        component: 'checkbox',
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: 'Gradient (For background only)',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      {
        slug: 'transparent',
        label: 'Transparent',
        component: 'checkbox',
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: 'Transparent (For background only)',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      {
        slug: 'options',
        label: 'Suggested Colors',
        component: 'textarea-array',
        required: false,
        rows: 5,
        description: 'One per line',
        placeholder: '#ff9900\ngreen',
      },
    )

    if (Array.isArray(this.block.preset) && this.block.preset.length)
      this.colors = this.block.preset
    else if (this.block.preset && typeof this.block.preset === 'string') // basic / material / text / dark / light
      this.colors = this.colors.concat(presets[this.block.preset])
    else
      this.colors = this.colors.concat(presets.material)

    // todo: transparent or default?
    if (this.block.transparent)
      this.colors.unshift('transparent')

    //      hideNoneSelectedText
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
    <b-form-group
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <span-editable name="label" :block="block" :options="options" :editor="false">
          Enter Label
        </span-editable>
        <span v-if="block.required" class="required">*</span>
      </template>

      <div class="d-flex">
        <b-dropdown
          v-if="block.preset != 'none' "
          :key="`${block.id}-color`"
          :ref="`${block.id}-color`"
          class="color-box m-1 "
          size="md"
          variant="default"
          bou2ndary="window"
          :style="value && value != 'transparent' ? `background:${value} !important` : ''"
          bottom
        >
          <template #button-content>
            <!--                                                <span class="iconify text-white" -->
            <!--                                                      data-icon="ic:baseline-keyboard-arrow-down" -->
            <!--                                                      data-inline="true"></span> -->
            <!--                        fe:elipsis-v -->

            <!--                        maybe use two box one for current color with square shape and one in the last suggestion with 3 dots for more -->
            <span
              class="iconify text-wh22ite bigger" style=""
              data-icon="ic:baseline-keyboard-arrow-down"
              data-inline="true"
            />
          </template>

          <select-boxes
            v-model="value" class="d-flex flex-wrap px-1 color-box-wrapper"
            active-class="color-box-active"
          >
            <select-box
              v-for="(color, i) in colors" :key="`${i}-color`" :name="color"
              class="color-box m-1"
              :style="color && color != 'transparent' ? `background:${color} !important` : ''"
              @click.native="$refs[`${block.id}-color`].hide(true)"
            />

            <!-- use debounce="300" with b-form-input and fix additional form-control class -->
            <input
              v-model="value" type="color" class="color-box m-1 p-1"
              style="opacity: .9;border:1px dashed #cfcfcf;background:#fff"
            >

            <template v-if="block.gradient">
              <div class="w-100 my-2" style="border-top:solid #ddd 1px" />
              <select-box
                v-for="(color, i) in gradients" :key="`${i}-gradient`" :name="color"
                class="color-box m-1"
                :style="color && color != 'transparent' ? `background:${color} !important` : ''"
                @click.native="$refs[`${block.id}-color`].hide(true)"
              />
            </template>
          </select-boxes>
        </b-dropdown>

        <select-boxes
          v-if="block.options" v-model="value"
          class="d-flex flex-wrap px-1 color-box-wrapper mx-2" active-class="color-box-active"
        >
          <select-box
            v-for="(option, i) in block.options" :key="`${i}-option`" :name="option"
            class="color-box m-1 cursor-hand" :style="`background:${option}`"
            @click.native="$refs[`${block.id}-color`].hide(true)"
          />
        </select-boxes>
      </div>
    </b-form-group>
  </field-wrapper>
</template>

<style>
.color-box {
    width: 32px;
    height: 32px;
    box-shadow: inset 0 0 1px #aaa;
    border-radius: 50%;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 45'><line opacity='0.75' stroke='%23bf0000' y2='0' x2='0' y1='100' x1='100' stroke-width='3' fill='none'/></svg>");
    background-size: cover;
    background-repeat: no-repeat;
}

/*//background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 43'><path class='color' d='M 55.584673,43.175632 36.75281,22.967243 0,43.175632 40.42403,0 59.71135,20.208389 96,0 Z' /></svg>");*/

.color-box:not(.dropdown):not(.color-box-active):hover {
    /*//opacity: .8;*/
    cursor: pointer;
    box-shadow: inset 0 0 2px #666;
}

.color-box .btn {
    color: #E9E9E9;
    /*//margin-top: -5px;*/
    /*//margin-left: -7px;*/
    margin-top: 0px;
    margin-left: -8px;
}

.color-box-wrapper {
    width: 13rem;
/*//instead 10 default*/
}

.color-box-active {
    border: 2px solid #444;
    /*//box-shadow: inset 0 0 4px #000;*/

    /*//content: '';*/
    /*//width: 100%;*/
    /*//height: 100%;*/
    /*//opacity: 0;*/
    /*//z-index: 4;*/
    /*//position: absolute;*/
    /*//transform: scale(0);*/
    /*//background-size: 50%;*/
    /*//background-image: url("https://webdevtrick.com/demos/checkmark.svg");*/
    /*//background-repeat: no-repeat;*/
    /*//background-position: center;*/
    /*//transition-delay: 0.2s !important;*/
    /*//transition: all 0.25s cubic-bezier(0, 1.05, 0.72, 1.07);*/

}

.transparent-symbol-line {
    transform: rotate(45deg);
    top: 50%;
    position: relative;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(to top right, transparent 0, transparent calc(50% - 2.4px), #de080a 50%, transparent calc(50% + 2.4px), transparent)
}
</style>
