<script>
import blockMixin from './blockMixin'

export default {
  mixins: [blockMixin],
  inheritAttrs: true,
  props: {
    // block: {
    //     type: Object,
    //     required: true
    // },
    // parent: {
    //     type: [Object, Array], //array or object with children
    //     required: true
    // },
    // index: {
    //     type: Number,
    //     required: true
    // },
    options: {
      type: Object,
      required: true,
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
    hideFeatures: {
      type: Array,
      default: () => {
        return []
      }, // outside
    },
    type: {
      type: Object,
      // default: () => {
      //     return {}
      // },
    },
    settingsForm: {
      type: Object,
    },
    // scope: {
    //     type: Object,
    //     default: () => {
    //         return {}
    //     }, // outside
    // },
  }, // check this

  data() {
    return {
      footerHover: false,
      showAddFieldPopover: false,
      shortId: false,
      // chosenAsReadOnly: false,
      // chosenAsHidden: false,
    }
  },
  computed: {
    chosenAsHidden: {
      // cache: false,
      set(newVal) {
        if (newVal) {
          if (!this.options.hiddenFields.includes(this.block.id))
            this.options.hiddenFields.push(this.block.id)

          // console.log('set hidden field2' ,this.options.hiddenFields)
        }
        else {
          // this.options.hiddenFields = this.options.hiddenFields.filter((f) => f !== this.block.slug)
          this.options.hiddenFields = this.$helper.removeInArray(this.options.hiddenFields, this.block.id)

          // console.log('remove hidden field2' ,this.options.hiddenFields)
        }
      },
      get() {
        if (Array.isArray(this.options.hiddenFields) && this.options.hiddenFields.length)
          return this.options.hiddenFields.includes(this.block.id)

        return false
      },
    },
    chosenAsReadOnly: {
      // cache: false,
      set(newVal) {
        if (newVal) {
          if (!this.options.readOnlyFields.includes(this.block.id))
            this.options.readOnlyFields.push(this.block.id)

          // console.log('set hidden field2' ,this.options.hiddenFields)
        }
        else {
          // this.options.hiddenFields = this.options.hiddenFields.filter((f) => f !== this.block.slug)
          this.options.readOnlyFields = this.$helper.removeInArray(this.options.readOnlyFields, this.block.id)

          // console.log('remove hidden field2' ,this.options.hiddenFields)
        }
      },
      get() {
        if (Array.isArray(this.options.readOnlyFields) && this.options.readOnlyFields.length)
          return this.options.readOnlyFields.includes(this.block.id)

        return false
      },
    },
  },
  watch: {},
  mounted() {

  },
  created() {

  },
  methods: {
    openFieldEditor() {
      this.$root.$emit('bv::show::modal', `settings-${this.block.id}`)
      this.clickAway()
    },
  },
}
</script>

<template>
  <div
    :id="block.id"
    v-out="clickAway"
    :class="{ 'toranj-hover-field': options.edit && hover && !selected, 'toranj-selected-field': options.edit && selected }"
    style="display: inlin222e-block;position:relative"
    @mouseover="hover = true "
    @mouseleave="hover = false"
    @click.s2top.capt2ure=""
  >
    <div
      v-if="options.edit" class="toranj-edit-field-overlay toranj-edit-field-overlay-hover d-flex justify-content-center align-items-center" :class="[{ invisible: !hover }]"
      @click.stop.capture="openFieldEditor"
    >
      <div class="big d-flex justify-content-center align-items-center">
        <span class="iconify " data-icon="ic:baseline-settings" data-inline="true" />
        <strong> Click to Edit</strong>
      </div>
    </div>

    <div
      v-if="options.choosePermissions"
      class="toranj-edit-field-overlay d-flex justify-content-center align-items-center" :class="{ 'invisible': (!hover && !chosenAsHidden && !chosenAsReadOnly), 'toranj-read-only-hidden-field-overlay': chosenAsReadOnly || chosenAsHidden, 'toranj-edit-field-overlay-hover': hover }"
      @click.stop.capture=""
    >
      <div class="d-flex justify-content-center align-items-center">
        <b-form-checkbox v-if="!chosenAsReadOnly" v-model="chosenAsHidden" name="check-button" size="xs" switch>
          Hide
        </b-form-checkbox>

        <b-form-checkbox v-if="!chosenAsHidden" v-model="chosenAsReadOnly" size="xs" name="check-button" switch>
          ReadOnly
        </b-form-checkbox>
      </div>
    </div>

    <slot />

    <!--        @click.stop="selected=true" -->

    <!--        all options edit here -->
    <template v-if="options.edit">
      <div class="dsht dsht-controls">
        <div
          :class="[{ 'd-f22lex': hover }, { invisible: !hover && !selected }, `toranj-menu-widget left-${leftSlotPos}  justify-co222ntent-between w-12200 p22x-3 d-flex`]"
        >
          <!--                <b-btn class="up-btn" size="sm" @click="Up"> -->
          <!--                    <span class="iconify big" data-icon="bx:bx-up-arrow-alt" data-inline="false"></span> -->
          <!--                </b-btn> -->

          <!--                <b-btn class="up-btn" size="sm" @click="Down"> -->
          <!--                    <span class="iconify big" data-icon="bx:bx-down-arrow-alt" data-inline="false"></span> -->
          <!--                </b-btn> -->

          <b-btn v-if="!hideFeatures.includes('move')" class="widget-drag-handler " size="xs">
            <!--          <span class="iconify" data-icon="ic:twotone-drag-indicator" data-inline="false"></span> -->
            <span class="iconify big " data-icon="bytesize:move" data-inline="false" />
            <!--          <span class="iconify" data-icon="bx:bx-move-vertical" data-inline="false"></span> -->
          </b-btn>

          <!-- not recommended change margin-left to make this work for ouside -->
          <slot name="menu-left" />
        </div>

        <div
          :class="[{ 'd-fle222x': hover }, { invisible: !hover && !selected }, `toranj-menu-widget right-${rightSlotPos} justify-co222ntent-between w-12200 p22x-3 d-flex`]"
        >
          <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal',  'settings-' + block.id)"> -->
          <!--                Settings -->
          <!--            </b-btn> -->
          <!--            z-index-500 for each child not parent -->

          <slot name="menu-right" />

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
              <span class="iconify big" data-icon="fe:elipsis-v" data-inline="false" />
            </template>

            <slot name="menu-item" />

            <b-dropdown-item
              v-if="!hideFeatures.includes('add')"
              @click.prevent="$root.$emit('bv::show::popover', `add-field-footer-${block.id}`)"
            >
              Add
            </b-dropdown-item>

            <b-dropdown-item v-if="!hideFeatures.includes('copy')" @click.prevent="Copy">
              Copy
            </b-dropdown-item>

            <b-dropdown-item v-if="!hideFeatures.includes('paste')" @click.prevent="Paste">
              Paste
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
              @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
            >
              Settings
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
          v-if="footerAdd" class="w-1200 footer-add" :class="[{ footerHover }]"
          @mouseover="footerHover = true"
          @mouseleave="footerHover = false"
        >
          <!--            v-show addButtonhover problem with popup -->
          <div
            class="w-100 text-center footer-add-body" :class="[{ invisible: !footerHover }]"
          >
            <div class="border-div" />

            <button
              :id="`add-field-footer-${block.id}`"
              v-b-tooltip.hover.top.window.ds850="'Add Field Here'"
              class="btn btn-circle-sm btn-secondary"
              style="margin-top:-25px;"
              @click.prevent="$root.$emit('bv::show::popover', `add-field-footer-${block.id}`)"
            >
              <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true" />
            </button>
          </div>
        </div>

        <addFieldPopover
          :target-id="`add-field-footer-${block.id}`" :block="block" :parent="parent"
          :index="index"
        />

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

          <!--                                    <p class=""> -->
          <!--                                        -->
          <!--                                    </p> -->

          <formFields
            v-if="settingsForm" :model="block" :block="settingsForm" :parent="[]" :index="0"
            :options="{ edit: false }" :scope="scope" :type="type"
          />
        </b-modal>
      </div>
    </template>
  </div>
</template>

<style>
.toranj-field .footer-add {
    /*//display: none;*/
    padding-top: 18px;
    width: 30%;
    left: 35%;
}

.toranj-field .footer-add .border-div {
    /*//display: none;*/
    height: 2px;
    border-bottom-width: 2px;
}

.toranj-edit-field-overlay {
    z-index: 400;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    cursor: pointer;
    outline: 0;
    /*//border: 2px dashed #ddd;*/
    /*//border-radius: 12px;*/
}

.toranj-edit-field-overlay-hover {
    //border: 1px solid #ccc;
    background: #eee !important;
    opacity: .75 !important;;
}

.toranj-read-only-hidden-field-overlay {
    /*//border: 1px solid #efefef;*/
    background: #fff;
    opacity: .5;
}

.toranj-edit-field-overlay div {
    /*//display: none;*/
    color: #000;
}

/*//.toranj-edit-field-overlay:hover div {*/
/*//    display: flex;*/
/*//}*/

/*//<!--        same or similar to widget-->*/
/*//.toranj-field {*/
/*//    !*require for parent to use  absolute in children *!*/
/*//    //position: relative;*/
/*//    !*require to make z-index work after drug *!*/
/*//    //transform: none !important;*/
/*//*/
/*//    min-height: 30px;*/
/*//}*/
</style>
