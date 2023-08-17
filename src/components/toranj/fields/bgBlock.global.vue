<!-- fieldAwesome.vue -->
<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      bgs: [],
      customForm: [
        {
          slug: 'customBg',
          label: 'Custom Bg',
          component: 'textarea',
          required: false,
          description: '',
          // "showIf": {"slug": "settings.noIndex", "op": "neq", "value": true},
          // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
        },

      ],

    }
  },
  created() {
    if (Array.isArray(this.block.preset) && this.block.preset.length)
      this.bgs = this.block.preset

    //      hideNoneSelectedText
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
          :key="`${block.id}-bg`"
          :ref="`${block.id}-bg`"
          class="bg-box m-1 "
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
            v-model="value" class="d-flex flex-wrap px-1 bg-box-wrapper"
            active-class="bg-box-active"
          >
            <select-box
              v-for="(bg, i) in bgs" :key="`${i}-bg`" :name="bg"
              class="bg-box m-1"
              :style="bg && bg != 'transparent' ? `background:${bg} !important` : ''"
              @click.native="$refs[`${block.id}-bg`].hide(true)"
            />

            <!-- use debounce="300" with b-form-input and fix additional form-control class -->
            <!--                        <input type="color" v-model="value" class="color-box m-1 p-1" -->
            <!--                               style="opacity: .9;border:1px dashed #cfcfcf;background:#fff"/> -->

            <template v-if="block.custom">
              <!--                            <div class="w-100 my-2" style="border-top:solid #ddd 1px"></div> -->

              <div class="m-1 p-1 bg-box-form">
                <formFields
                  class="toranj-section" :model="block"
                  :block="{ id: `bg-custom-${block.id}`, children: customForm }"
                  :parent="[]" :index="0" :options="{ edit: false }" :scope="{}"
                />
              </div>
            </template>
          </select-boxes>
        </b-dropdown>

        <select-boxes
          v-if="block.options" v-model="value"
          class="d-flex flex-wrap px-1 bg-box-wrapper mx-2" active-class="bg-box-active"
        >
          <select-box
            v-for="(option, i) in block.options" :key="`${i}-option`" :name="option"
            class="bg-box m-1 cursor-hand" :style="`background:${option}`"
            @click.native="$refs[`${block.id}-bg`].hide(true)"
          />
        </select-boxes>
      </div>
    </b-form-group>
  </field-wrapper>
</template>

<style>
.bg-box {
    width: 32px;
    height: 32px;
    box-shadow: inset 0 0 1px #aaa;
    border-radius: 50%;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 45'><line opacity='0.75' stroke='%23bf0000' y2='0' x2='0' y1='100' x1='100' stroke-width='3' fill='none'/></svg>");
    background-size: cover;
    background-repeat: no-repeat;
}

/*//background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 43'><path class='color' d='M 55.584673,43.175632 36.75281,22.967243 0,43.175632 40.42403,0 59.71135,20.208389 96,0 Z' /></svg>");*/

.bg-box:not(.dropdown):not(.bg-box-active):hover {
    /*//opacity: .8;*/
    cursor: pointer;
    box-shadow: inset 0 0 2px #666;
}

/*//.bg-box .btn{*/
/*//    color: #E9E9E9;*/
/*//    //margin-top: -5px;*/
/*//    //margin-left: -7px;*/
/*//    margin-top: 0px;*/
/*//    margin-left: -8px;*/
/*//}*/
.bg-box-wrapper {
    width: 13rem;
/*//instead 10 default*/
}

.bg-box-active {
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
