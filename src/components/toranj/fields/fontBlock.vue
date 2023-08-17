<!-- fieldAwesome.vue -->
<script>
import fontLoader from 'webfontloader'
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

// https://fonts.googleapis.com/css?family=Droid+Sans

const googleBasic = ['Open Sans', 'Roboto', 'Droid Sans', 'Droid Serif', 'Noto Sans', 'Noto Serif', 'Roboto Slab']
const googleModern = ['Open Sans Condensed', 'Raleway', 'Roboto Slab', 'Quicksand', 'Dosis', 'Varela Round', 'Indie Flower', 'Architects Daughter', 'Comfortaa', 'Yanone Kaffeesatz', 'Nunito', 'Hind Madurai', 'Varela Round', 'Balsamiq Sans', 'Courgette']

//
// Almarai
// cairo
// lalezar
// baloo bhaijaan

function addFamily(fontSet) {
  return fontSet.map((name) => {
    return { family: name }
  })
}

const presets = {
  local: [
    {
      title: 'Arial',
      family: 'Arial,Helvetica,sans-serif',
      type: 'local',
    },
    {
      title: 'Courier New',
      family: 'Courier New,Courier,monospace',
      type: 'local',
    },
    {
      title: 'Times New Roman',
      family: 'Times New Roman,Times,serif',
      type: 'local',
    },
    {
      title: 'Verdana',
      family: 'Verdana, Tahoma, sans-serif',
      type: 'local',
    },
  ],
  persian: [
    {
      family: 'Sahel',
      url: ['https://v1.fontapi.ir/css/Sahel'],
      title: 'Sahel | ساحل',
      type: 'custom',

    },
    {
      family: 'Shabnam',
      url: ['https://v1.fontapi.ir/css/Shabnam'],
      type: 'custom',
      title: 'Shabnam | شبنم',
    },
    {
      family: 'Vazir',
      url: ['https://v1.fontapi.ir/css/Vazir'],
      type: 'custom',
      title: 'Vazir | وزیر',
    },
    {
      family: 'Vazir Code',
      url: ['https://v1.fontapi.ir/css/VazirCode'],
      type: 'custom',
      title: 'VazirCode | وزیرکد',
    },
    {
      family: 'Tanha',
      url: ['https://v1.fontapi.ir/css/Tanha'],
      type: 'custom',
      title: 'Tanha | تنها',
    },
    {
      family: 'Estedad',
      url: ['https://v1.fontapi.ir/css/Estedad'],
      type: 'custom',
      title: 'Estedad | استداد',
    },
    {
      family: 'Mikhak',
      url: ['https://v1.fontapi.ir/css/Mikhak'],
      type: 'custom',
      title: 'Mikhak | میخک',
    },
    {
      family: 'Almarai',
      type: 'google',
      title: 'Almarai | المراي',
    },
    {
      family: 'Lalezar',
      url: ['https://v1.fontapi.ir/css/Lalezar'],
      type: 'custom',
      title: 'Lalezar | لاله‌زار',
    },
    {
      family: 'Cairo',
      type: 'google',
      title: 'Cairo | کایرو',
    },
    {
      family: 'Baloo Bhaijaan',
      type: 'google',
      title: 'Baloo Bhaijaan | بالوهاجان',
    },
  ],
  googleBasic: addFamily(googleBasic),
  googleModern: addFamily(googleModern),
}

// console.log(presets)

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      fonts: [],
    }
  },
  created() {
    if (Array.isArray(this.block.preset) && this.block.preset.length)
      this.fonts = this.block.preset
    else if (this.block.preset && typeof this.block.preset === 'string') // basic / material / text / dark / light
      this.fonts = this.fonts.concat(presets[this.block.preset])
    else
      this.fonts = presets.local.concat(presets.persian).concat(presets.googleBasic).concat(presets.googleModern)

    // this.fonts = this.fonts.concat(presets.default)//default

    // console.log('fonts', this.fonts)
    //      hideNoneSelectedText
  },
  methods: {
    loadFont(font, textOnly = false) {
      if (!font.type) // default type
        font.type = 'google'

      if (font.type == 'local')
        return

      const loaderConfig = {}
      loaderConfig[font.type] = { families: [font.family], ...font } // URL to URLS / Family to Families

      if (font.url)
        loaderConfig[font.type].urls = [font.url]

      if (textOnly && font.type == 'google')
        loaderConfig[font.type].text = (font.title || font.family).toString().replaceAll(' ', '')

      console.log(loaderConfig)
      fontLoader.load(loaderConfig)
    },
  },
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" v-if="ShowIf(block)" :index="index" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
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
          :key="`${block.id}-font`"
          :ref="`${block.id}-font`"
          class="m-0 "
          size="sm"
          variant="secondary"
          bou2ndary="window"
          bottom
        >
          <template #button-content>
            {{ (value && (value.title || value.family)) || block.placeholder || 'Choose Font' }}

            <span
              class="iconify text-wh22ite bigger" style=""
              data-icon="ic:baseline-keyboard-arrow-down"
              data-inline="true"
            />
          </template>

          <select-boxes
            v-model="value" class="d-f22lex flex-w22rap px-1 font-box-wrapper"
            active-class="font-box-active"
          >
            <select-box
              key="default-font" :name="{}"
              class="font-box m-1 p-1 "
              @click.native="$refs[`${block.id}-font`].hide(true)"
            >
              {{ block.placeholder || 'Choose Font' }}
            </select-box>

            <select-box
              v-for="(font, i) in fonts" :key="`${i}-font`" v-b-visible.once.350="isVisible => isVisible ? $helper.loadFont(font, true) : ''"
              :name="font" class="font-box m-1 p-1 "
              :style="`font-family: ${font.family};`"
              @click.native="$refs[`${block.id}-font`].hide(true)"
            >
              {{ font.title || font.family }}
            </select-box>

            <!-- use debounce="300" with b-form-input and fix additional form-control class -->

            <!--                        <template v-if="block.gradient"> -->
            <!--                            <div class="w-100 my-2" style="border-top:solid #ddd 1px"></div> -->
            <!--                            <select-box v-for="(color, i) in gradients" :name="color" :key="i+'-gradient'" -->
            <!--                                        class="color-box m-1" -->
            <!--                                        :style="color && color!='transparent' ? 'background:'+ color +' !important': ''" -->
            <!--                            ></select-box> -->
            <!--                        </template> -->
          </select-boxes>
        </b-dropdown>
      </div>

      <template #description>
        <span-editable name="description" :block="block" :options="options" :editor="true">
          Enter Description
        </span-editable>
        <!--                <span class="required" v-if="block.required">*</span> -->
      </template>
    </b-form-group>
  </field-wrapper>
</template>

<style>
.font-box {
    /*//border: 1px solid #ccc;*/
    font-size: 18px;
}

/*//background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 43'><path class='color' d='M 55.584673,43.175632 36.75281,22.967243 0,43.175632 40.42403,0 59.71135,20.208389 96,0 Z' /></svg>");*/

.font-box:not(.dropdown):not(.font-box-active):hover {
    /*//opacity: .8;*/
    cursor: pointer;
    box-shadow: inset 0 0 2px #666;
}

.font-box .btn {
    color: #E9E9E9;
    /*//margin-top: -5px;*/
    /*//margin-left: -7px;*/
    margin-top: 0px;
    margin-left: -8px;
}

.font-box-wrapper {
    width: 14rem;
/*//instead 10 default*/
    max-height: 300px;
    overflow-y: scroll;
}

.font-box-active {
    /*//border: 2px solid #444;*/
    background: #0d47a1;
    color: #fff;
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

.font-box .dropdown-menu.show {

}
</style>
