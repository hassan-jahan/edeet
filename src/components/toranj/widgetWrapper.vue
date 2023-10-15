<script>
import blockMixin from './blockMixin'

export default {
  mixins: [blockMixin],
  inheritAttrs: false,
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
    tagName: {
      type: String,
      default: 'div', // outside
    },
    footerAdd: {
      type: Boolean,
      default: true,
    },
    rightSlotPos: {
      type: String,
      default: 'outside', // outside
    },
    leftSlotPos: {
      type: String,
      default: 'outside', // outside
    },
    topSlotPos: {
      type: String,
      default: 'outside', // none or anyOtherthing not inside
    },
    hideFeatures: {
      type: Array,
      default: () => {
        return []
      }, // outside
    },
    settingsForm: {
      type: Object,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    movable: {
      type: Boolean,
      default: true,
    },
  }, // check this

  data() {
    return {
      footerHover: false,
      showAddPopover: false,
    }
  },
  watch: {
    // Fix a zIndex issue with translate3d in slots  (hover-up animation in cards to be exact) currently only for slot widgets
    hover(newVal) {
      // console.log(this.$parent, 'zon0')
      // console.log(this.$parent.moreZIndex, 'zon')
      // if (typeof this.$parent.moreZIndex !== 'undefined')
      //     this.$parent.moreZIndex = newVal
    },

  },

  created() {
  },
}
</script>

<template>
  <div
      :is="tagName"
      :id="block.id"
      v-out="clickAway"
      :class="{ 'toranj-hover-widget': options.edit && hover && !selected && selectable, 'toranj-selected-widget': options.edit && selected && selectable }"
      style="display: inlin22e-block;position:relative"
      @mouseover.stop="MouseOver"
      @mousel22eave="hover = false"
      @mouseout="hover = false"
      @click.stop="Select"
  >
    <slot/>

    <!--        all options edit here -->
    <template v-if="options.edit">
      <div class="dsht dsht-controls">
        <div
            v-if="topSlotPos != 'none'"
            :class="[{ 'd-f22lex': hover }, { invisible: !hover && !selected }, 'toranj-menu-widget top-outside' + '  justify-co222ntent-between w-12200 p22x-3 d-flex']"
        >
          <slot name="menu-top"/>
        </div>

        <div
            v-if="leftSlotPos != 'none'"
            :class="[{ 'd-f22lex': hover }, { invisible: !hover && !selected }, `toranj-menu-widget left-${leftSlotPos}  justify-co222ntent-between w-12200 p22x-3 d-flex`]"
        >
          <!--                <b-btn class="up-btn" size="sm" @click="Up"> -->
          <!--                    <span class="iconify big" data-icon="bx:bx-up-arrow-alt" data-inline="false"></span> -->
          <!--                </b-btn> -->

          <!--                <b-btn class="up-btn" size="sm" @click="Down"> -->
          <!--                    <span class="iconify big" data-icon="bx:bx-down-arrow-alt" data-inline="false"></span> -->
          <!--                </b-btn> -->

          <!-- todo: fix move and enable it -->
          <b-btn v-if="movable" class="widget-drag-handler " size="xs">
            <!--          <span class="iconify" data-icon="ic:twotone-drag-indicator" data-inline="false"></span> -->
            <span class="iconify big " data-icon="bytesize:move" data-inline="false"/>
            <!--          <span class="iconify" data-icon="bx:bx-move-vertical" data-inline="false"></span> -->
          </b-btn>

          <!-- not recommended change margin-left to make this work for ouside -->
          <slot name="menu-left"/>
        </div>

        <div
            v-if="rightSlotPos != 'none'"
            :class="[{ 'd-fle222x': hover }, { invisible: !hover && !selected }, `toranj-menu-widget right-${rightSlotPos} justify-co222ntent-between w-12200 p22x-3 d-flex`]"
        >
          <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal',  'settings-' + block.id)"> -->
          <!--                Settings -->
          <!--            </b-btn> -->
          <!--            z-index-500 for each child not parent -->

          <slot name="menu-right"/>

          <b-dropdown
              :key="block.id"
              size="xs"
              variant="secondary"
              right
              lazy
              boundary="window"
          >
            <template #button-content>
              <!-- our own slot! -->
              <span class="iconify big" data-icon="fe:elipsis-v" data-inline="false"/>
            </template>

            <slot name="menu-item"/>

            <b-dropdown-item v-if="!hideFeatures.includes('add')" @click.prevent="openAddWidget">
              Add
            </b-dropdown-item>

            <!--                <b-dropdown-text class="px-1" v-if="!hideFeatures.includes('order')"> -->
            <!--                    <div class="d-flex justify-content-between "> -->
            <!--                        <button class="btn-secondary btn btn-22block btn-sm w-50" @click.prevent="Up"> -->
            <!--                            <span class="iconify big" data-icon="bx:bx-up-arrow-alt" data-inline="false"></span> -->
            <!--                        </button> -->
            <!--                        <button class="btn-secondary btn btn-b22lock btn-sm w-50" @click.prevent="Down"> -->
            <!--                            <span class="iconify big" data-icon="bx:bx-down-arrow-alt" data-inline="false"></span> -->
            <!--                        </button> -->
            <!--                    </div> -->
            <!--                </b-dropdown-text> -->

            <b-dropdown-item v-if="!hideFeatures.includes('duplicate')" @click="Duplicate">
              Duplicate
            </b-dropdown-item>

            <b-dropdown-item v-if="!hideFeatures.includes('copy')" @click.prevent="Copy">
              Copy
            </b-dropdown-item>

            <b-dropdown-item v-if="!hideFeatures.includes('paste')" @click.prevent="Paste">
              Paste
            </b-dropdown-item>
            <!--                    <b-dropdown-item @click="Up"> -->
            <!--                        Up -->
            <!--                    </b-dropdown-item> -->
            <!--                    <b-dropdown-item @click="Down"> -->
            <!--                        Down -->
            <!--                    </b-dropdown-item> -->

            <b-dropdown-item v-if="!hideFeatures.includes('delete')" @click="Delete">
              Delete
            </b-dropdown-item>

            <!--            @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"-->
            <b-dropdown-item
                v-if="!hideFeatures.includes('settings')"
                v-b-toggle="`settings-${block.id}`"
            >
              Settings
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
            v-if="footerAdd" class="w-12200 footer-add" :class="[{ footerHover }]"
            @mouseover="footerHover = true"
            @mouseleave="footerHover = false"
        >
          <!--            v-show addButtonhover problem with popup -->
          <div
              class="w-100 text-center footer-add-body" :class="[{ invisible: !footerHover }]"
          >
            <div class="border-div"/>

            <button
                v-b-tooltip.hover.top.window.ds850="'Add Block Here'"
                class="btn btn-circle-sm btn-secondary"
                style="margin-top:-25px;"
                @click.prevent="openAddWidget"
            >
              <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true"/>
            </button>
          </div>
        </div>

        <b-popover
            v-if="!hideFeatures.includes('add')"
            :ref="`addTo${block.id}` "
            v-model:show="showAddPopover"
            :target="block.id"
            triggers="manual"
            placement="bottom"
            custom-class="p-0-popover dsht"
        >
          <!--          <div class="list-unstyled"> -->
          <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
          <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
          <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
          <!--          </div> -->


          <b-list-group flash style="max-height: 180px;min-width: 180px;overflow-y: scroll;">
            <b-list-group-item
                v-for="(widget, index) in options.widgets"
                :key="widget.title "
                v-b-tooltip.hover.right.viewport.html.ds500="'Add it to the page'" href="#" class="px-3"
                @click="Add(widget.block)"
            >
              <span class="iconify" :data-icon="widget.icon " data-inline="true"/> {{ widget.title }}
            </b-list-group-item>
          </b-list-group>
        </b-popover>

        <b-modal
            v-if="!hideFeatures.includes('settings')" :id="`settings-${block.id}` " title=""
            :hide-header="false"
            :hide-footer="true" size="sm" hide-backdrop
            content-class="modal-draggable"
            modal-class="dsht no-animation"
            scrollable
        >
          <div title="CSS ID" class="text-mute small text-right">
            #{{ block.id }}
          </div>

          <!--                todo: set opacity 0.95 by class / style not work -->
          <!--                                    <p class=""> -->
          <!--                                        -->
          <!--                                    </p> -->
          <form @submit.prevent="">
            <formFields
                v-if="settingsForm" :model="block" :block="settingsForm" :parent="[]" :index="0"
                :options="{ edit: false }"
            />
          </form>
        </b-modal>

        <b-sidebar
            v-if="!hideFeatures.includes('settings')"
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


          <div title="CSS ID" class="text-mute small text-right">
            #{{ block.id }}
          </div>

          <!--                todo: set opacity 0.95 by class / style not work -->
          <!--                                    <p class=""> -->
          <!--                                        -->
          <!--                                    </p> -->
          <form @submit.prevent="">
            <formFields
                v-if="settingsForm" :model="block" :block="settingsForm" :parent="[]" :index="0"
                :options="{ edit: false }"
            />
          </form>

        </b-sidebar>

      </div>
    </template>
  </div>
</template>

<style>
.toranj-widget {
  /*require for parent to use  absolute in children */
  /*//position: relative;*/
  /*require to make z-index work after drug */
  /*//transform: none !important;*/

  min-height: 30px;
}

/*//.toranj-widget {*/
/*//    z-index: 100;*/
/*//}*/
/*//*/
/*//.toranj-more-z-index {*/
/*//    z-index: 100*/
/*//}*/

.toranj-menu-widget.right-outside {
  left: 100%;
  padding-bottom: 8px;

}

.toranj-menu-widget.left-outside {
  left: 0;
  margin-left: -32px; /* only for one sm button */
  padding-bottom: 8px;

}

.toranj-menu-widget.right-inside {
  right: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}

.toranj-menu-widget.left-inside {
  left: 0;
  padding-top: 4px;
  padding-bottom: 4px;

}

.toranj-menu-widget.top-outside {
  right: 0;
  padding-top: 4px;
  padding-bottom: 4px;
  top: -30px;

}

.toranj-menu-widget {
  position: absolute;
  top: 0;
  /*z-index: 500; cause of lots of problem*/
  z-index: 550;

  /*height: 100%;*/
  padding-left: 4px;
  padding-left: 4px;
}

/* workds correctly, no need to add dropdown */
.toranj-menu-widget .btn {
  position: relative;
  z-index: 101;
  /*    or z-index: 500*/
  margin: 0 2px;

}

/* Footer add */
.toranj-widget .footer-add {
  position: absolute;
  left: 25%;
  width: 50%;
  bottom: -5px;
  height: 10px;
  padding-top: 5px;
  z-index: 500;
}

.toranj-widget .footer-add-body {
  height: 5px;
  position: relative;
}

.toranj-widget .border-div {
  border-bottom: 1px dashed #c3c3c3;
  height: 1px;
  width: 50%;
  min-width: 50px;
  max-with: 300px;
  margin: 0 auto;
}

.toranj-widget .footer-add .btn {
  margin-top: -25px;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
</style>
