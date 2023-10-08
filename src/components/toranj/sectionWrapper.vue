<script>
import blockMixin from './blockMixin'

// import vendorCSS from '@/assets/css/vendors.scss'
// console.log('vendorrr', vendorCSS)

const sheet = new CSSStyleSheet()
const sheet1 = new CSSStyleSheet()
const sheet2 = new CSSStyleSheet()
const sheet3 = new CSSStyleSheet()
// sheet.replaceSync(styleText)
//
// sheet1.replaceSync(bootstrap)
// sheet2.replaceSync(bootstrapVue)
// sheet3.replaceSync(controllers)
const shadowStyles = [sheet, sheet1, sheet2, sheet3]


export default {
  mixins: [blockMixin],
  inheritAttrs: true,
  props: {
    block: {
      type: Object,
      required: true,
    },
    parent: {
      type: [Object, Array], // array or object with children
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },

    footerAdd: {
      type: Boolean,
      default: true,
    },

    hideFeatures: {
      type: Array,
      default: () => {
        []
      }, // outside copy paste not need for current section maybe for multiple page
    },
    settingsForm: {
      type: Object,
    },
  },

  data() {
    return {
      footerHover: false,
      shadowStyles: shadowStyles,
      advancedSettingsForm: {
        component: 'form',
        children: [
          // {
          //     'slug': 'transparent',
          //     'label': 'Transparent',
          //     'component': 'checkbox',
          //     // 'required': true,
          //     'description': 'Transparent',
          // },
          {
            slug: '_style',
            label: 'Style',
            component: 'style',
          },
            ]
      },
    }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<template>
  <div
      :id="block.id"
      :class="{ 'hover-section': hover, 'border22': hover }"
      :style="`${bgSection} ${block.color ? `;color:${block.color}` : ''}; `"
      @mouseover="(options.edit) ? hover = true : ''"
      @mouse22leave="hover = false"

      @mouseout="hover = false"
  >
    <!-- todo: how to show above menu access hover selected or not? -->
    <slot/>

    <component is="style" v-if="block.hasCustomCss">
      {{ block.customCss }}
    </component>

    <!--        all options edit here -->
    <template v-if="options.edit">
<!--      <shadow-root :adopted-styles="shadowStyles">-->
<!--&lt;!&ndash;         all section and hover styles should be rewritten (..section-wrrapper ) all scoped css should be separated or somehow we need to create a style by vite and use it only and &ndash;&gt;-->
<!--        <div :class="{ 'hover-section': hover, 'border22': hover, 'toranj-section': true }">-->
          <div class="dsht dsht-controls">

            <!--                    <component is="style"> -->
            <!--                        @import '.css -->
            <!--                    </component> -->
            <div
                class="toranj-menu-section top-outside  justify-co222ntent-between w-12200 p22x-3 d-flex"
                :class="[{ 'd-flex': hover }, { invisible: !hover }]"
            >
              <!--            :class="[{'d-flex': hover}, {'d-none': !hover}, 'toranj-menu-section justify-content-between w-100 px-3']" -->
              <slot name="menu-top"/>
            </div>

            <div
                class="toranj-menu-section left-inside  justify-co222ntent-between w-12200 p22x-3 d-flex"
                :class="[{ 'd-flex': hover }, { invisible: !hover }]"
            >
              <!--            :class="[{'d-flex': hover}, {'d-none': !hover}, 'toranj-menu-section justify-content-between w-100 px-3']" -->

              <b-btn
                  v-if="!hideFeatures.includes('up')" v-b-tooltip.hover.top.ds400="'Move Upwards'" class="up-btn"
                  size="sm"
                  @click="Up"
              >
                <span class="iconify big" data-icon="bx:bx-up-arrow-alt" data-inline="false"/>
              </b-btn>

              <b-btn
                  v-if="!hideFeatures.includes('down')" v-b-tooltip.hover.top.ds400="'Move Downwards'" class="up-btn"
                  size="sm"
                  @click="Down"
              >
                <span class="iconify big" data-icon="bx:bx-down-arrow-alt" data-inline="false"/>
              </b-btn>

              <!--                    <b-btn v-if="!hideFeatures.includes('move')" class="row-drag-handler" size="sm" v-b-tooltip.hover.top.ds500="'Move'"> -->
              <!--                        &lt;!&ndash;          <span class="iconify" data-icon="ic:twotone-drag-indicator" data-inline="false"></span>&ndash;&gt; -->
              <!--                        <span class="iconify big" data-icon="bytesize:move" data-inline="false"></span> -->
              <!--                        &lt;!&ndash;          <span class="iconify" data-icon="bx:bx-move-vertical" data-inline="false"></span>&ndash;&gt; -->
              <!--                    </b-btn> -->

              <!-- not recommended change margin-left to make this work for ouside -->
              <slot name="menu-left"/>
            </div>

            <div
                class="toranj-menu-section right-inside justify-co222ntent-between w-12200 p22x-3 d-flex"
                :class="[{ 'd-flex': hover }, { invisible: !hover }]"
            >
              <slot name="menu-right"/>

              <b-btn
                  v-if="!hideFeatures.includes('settings')" size="sm"
                  @click222.prevent="OpenSettings()"
                  v-b-toggle="`settings-${block.id}`"
              >
                <span class="iconify" data-icon="ic:baseline-settings" data-inline="true"/>
              </b-btn>
              <b-dropdown
                  :key="block.id"
                  size="sm"
                  variant="secondary"
                  laz2y
                  right
                  bou2ndary="window"
              >
                <template #button-content>
                  <!-- our own slot! -->
                  <span class="iconify big" data-icon="fe:elipsis-v" data-inline="false"/>
                </template>

                <b-dropdown-item v-if="!hideFeatures.includes('add')" @click.prevent="openAddSection">
                  Add
                </b-dropdown-item>

                <b-dropdown-text v-if="!hideFeatures.includes('up') && !hideFeatures.includes('down')">
                  <!--                        or w-100 -->
                  <div class="d-flex justify-content-between">
                    <button
                        v-if="!hideFeatures.includes('up')"
                        v-b-tooltip.hover.top.ds500="'Move Upwards'"
                        class="btn-secondary btn btn-22block btn-sm w-50" @click.prevent="Up"
                    >
                      <span class="iconify big" data-icon="bx:bx-up-arrow-alt" data-inline="false"/>
                    </button>
                    <button
                        v-if="!hideFeatures.includes('down')"
                        v-b-tooltip.hover.top.ds500="'Move Downwards'"
                        class="btn-secondary btn btn-b22lock btn-sm w-50" @click.prevent="Down"
                    >
                  <span
                      class="iconify big" data-icon="bx:bx-down-arrow-alt"
                      data-inline="false"
                  />
                    </button>
                  </div>
                </b-dropdown-text>

                <b-dropdown-item v-if="!hideFeatures.includes('duplicate')" @click="Duplicate">
                  Duplicate
                </b-dropdown-item>

                <b-dropdown-item v-if="!hideFeatures.includes('copy')" @click.prevent="Copy">
                  Copy
                </b-dropdown-item>

                <b-dropdown-item v-if="!hideFeatures.includes('paste')" @click.prevent="Paste">
                  Paste
                </b-dropdown-item>

                <b-dropdown-item v-if="!hideFeatures.includes('delete')" @click="Delete">
                  Delete
                </b-dropdown-item>

                <!--                    <b-dropdown-item @click="Up"> -->
                <!--                        Up -->
                <!--                    </b-dropdown-item> -->
                <!--                    <b-dropdown-item @click="Down"> -->
                <!--                        Down -->
                <!--                    </b-dropdown-item> -->
                <b-dropdown-item
                    v-if="!hideFeatures.includes('settings')"
                    @click.prevent="OpenSettings()"
                >
                  Settings
                </b-dropdown-item>
              </b-dropdown>
            </div>

            <div
                v-if="footerAdd" class="w-102220 footer-add" :class="[{ footerHover }]"
                @mouseover="footerHover = true"
                @mouseleave="footerHover = false"
            >
              <!--            v-show addButtonhover problem with popup -->
              <div class="w-100 text-center footer-add-body" :class="[{ invisible: !footerHover }]">
                <div class="border-div"/>

                <button
                    v-b-tooltip.hover.bottom.window.ds750="'Add Block Here'"
                    class="btn btn-circle-sm btn-success"
                    style=""
                    @click.prevent="openAddSection"
                >
                  <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true"/>
                </button>
              </div>
            </div>

            <b-modal
                :id="`settings-${block.id}` " title="" :hide-header="false"
                :hide-footer="true"
                size="sm" hide-backdrop
                content-class="modal-draggable"
                modal-class="dsht no-animation"
                scrollable
            >
<!--              <shadow-root :adopted-styles="shadowStyles">-->
                <div title="CSS ID" class="text-mute small text-right">
                  #{{ block.id }}
                </div>

                <!--                                    <p class=""> -->
                <!--                                        -->
                <!--                                    </p> -->
                <!--                <b-form-input -->
                <!--                    v-model="block.field" -->
                <!--                    class="w-100" -->
                <!--                    placeholder="Page Title" -->
                <!--                    required -->
                <!--                    autofocus -->

                <!--                /> -->
                <form @submit.prevent="">
                  <formFields
                      v-if="settingsForm" :model="block" :block="settingsForm" :parent="[]" :index="0"
                      :options="{ edit: false }"
                  />
                </form>
<!--              </shadow-root>-->
            </b-modal>

<!--            backdrop-variant bg-variant  width="270px"-->
            <b-sidebar
                :id="`settings-${block.id}` " title="" :hide-header="false"
                :hide-footer="true"
                size="sm"
                backdrop
                backdrop-variant=""
                width="310px"
                right
                shadow
                lazy
                sidebar-class="p-2"
                body-class="dsht p-2"
            >
<!--              <shadow-root :adopted-styles="shadowStyles">-->


                <!--                                    <p class=""> -->
                <!--                                        -->
                <!--                                    </p> -->
                <!--                <b-form-input -->
                <!--                    v-model="block.field" -->
                <!--                    class="w-100" -->
                <!--                    placeholder="Page Title" -->
                <!--                    required -->
                <!--                    autofocus -->

                <!--                /> -->
                <form @submit.prevent="">
                  <b-tabs no-body justified sma22ll content-class="mt-0"  small  >
                    <b-tab v-if="settingsForm" title="General" active>

                      <formFields
                          :model="block" :block="settingsForm" :parent="[]" :index="0"
                          :options="{ edit: false }"
                      />
                    </b-tab>

                    <b-tab title="Advanced">
                      <div title="CSS ID" class="text-mute small text-right mt-2">
                        #{{ block.id }}
                      </div>

                      <formFields
                          :model="block" :block="advancedSettingsForm" :parent="[]" :index="0"
                          :options="{ edit: false }"
                      />
                    </b-tab>
                  </b-tabs>
                </form>
<!--              </shadow-root>-->
            </b-sidebar>

          </div>
<!--        </div>-->
<!--      </shadow-root>-->
    </template>
  </div>
</template>

<style>
.toranj-section {
    /*require for parent to use  absolute in children */
    position: relative;
    /*require to make z-index work after drug */
    transform: none !important;
    min-height: 40px;
}

.toranj-section .hover-section {
    box-shadow: inset 0px 11px 8px -10px #CCC, inset 0px -11px 8px -10px #CCC;
    /*box-shadow:inset 0 0 5px;*/
    /*box-shadow: 0 0 0 3px rgba(66,153,225,.5);*/
}

.toranj-menu-section {
    position: absolute;
    top: 0;
    padding-left: 14px;
    padding-left: 14px;
    //z-index: 550;  /* not sure about result */

}

/* workds correctly, no need to add dropdown */
.toranj-menu-section .btn, .toranj-menu-section .dropdown {
    position: relative;
    /*z-index: 101; not sure why*/
    z-index: 550;
    margin: 0 2px;
    /*    or z-index: 500*/
}

.toranj-menu-section.top-outside {
    right: 0;
    top: -40px;
    padding-right: 4px;
    padding-bottom: 8px;
}

.toranj-menu-section.right-inside {
    right: 0;
    padding-top: 14px;
    padding-bottom: 14px;
}

.toranj-menu-section.left-inside {
    left: 0;
    padding-top: 14px;
    padding-bottom: 14px;
}

/* Footer add */
.toranj-section .footer-add {
    position: absolute;
    //left: 0;
    //width: 100%;
    left: 25%;
    width: 50%;
    /*width: 80%; !*  left to make space for buttons and avoid z-index problem with drop down for empty code block *!*/
    bottom: -10px;
    height: 20px;
    padding-top: 8px;
    z-index: 500;

}

.toranj-section .footer-add-body {
    height: 10px;
    position: relative;
}

.toranj-section .border-div {
    border-bottom: 3px dashed #c1c1c1;
    height: 3px;
    max-width: 300px;
    margin: 0 auto;
}

.toranj-section .footer-add .btn {
    margin-top: -25px;
    width: 22px;
    height: 22px;
    line-height: 22px;
}
</style>
