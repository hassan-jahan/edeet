<script>
import blockMixin from './blockMixin'

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
    type: {
      type: Object,
      required: false,
    },

    footerAdd: {
      type: Boolean,
      default: true,
    },
    rightSlotPos: {
      type: String,
      default: 'inside', // outside
    },
    leftSlotPos: {
      type: String,
      default: 'inside', // outside
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
    scope: {
      type: Object,
      default: () => {
        return {}
      }, // outside
    },
  }, // check this

  data() {
    return {
      footerHover: false,
      showAddActionPopover: false,
      shortId: true,
      settingsFormOptions: { edit: false },
    }
  },

  mounted() {
    this.settingsFormOptions = { ...this.options, edit: false }
  },
  created() {

  },
  methods: {
    openActionEditor() {
      this.$root.$emit('bv::show::modal', `settings-${this.block.id}`)
      this.clickAway()
    },
  },
}
</script>

<template>
  <div
    :id="block.id"
    v-out="clickAway" class="cursor-hand bg-secondary"
    :class="{ 'toranj-hover-action': options.edit && hover && !selected, 'toranj-selected-action': options.edit && selected }"
    style="display: inlin222e-block;position:relative"
    @mouseover="hover = true "
    @mouseleave="hover = false"
  >
    <!--        <div v-if="options.edit" class="toranj-edit-status-overlay d-flex justify-content-center align-content-center" -->
    <!--             @click.stop.capture="openStatusEditor" -->
    <!--        > -->
    <!--            <div class="big"> -->
    <!--                <span class="iconify " data-icon="ic:baseline-settings" data-inline="true"></span> -->
    <!--                <strong>Click to Edit</strong> -->
    <!--            </div> -->
    <!--        </div> -->
    <div class="p-3 mt-2n2" @click="openActionEditor">
      <!--            <b-checkbox -->
      <!--                class="mr-2 text-muted smal22l d-inline22-block" -->
      <!--                switch inline v-model="block.disabled" -->
      <!--                @click.stop.native -->
      <!--            > -->
      <!--                <slot/> -->
      <!--            </b-checkbox> -->
      <div class="">
        <slot />
      </div>
    </div>
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
            variant="outline-dark"
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
              @click.prevent="$root.$emit('bv::show::popover', `add-action-footer-${block.id}`)"
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
              :id="`add-action-footer-${block.id}`"
              v-b-tooltip.hover.top.window.ds850="'Add Action Here'"
              class="btn btn-circle-sm btn-secondary"
              style="margin-top:-25px;"
              @click.prevent="$root.$emit('bv::show::popover', `add-action-footer-${block.id}`)"
            >
              <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true" />
            </button>
          </div>
        </div>

        <addActionPopover
          :target-id="`add-action-footer-${block.id}`" :block="block" :parent="parent"
          :index="index"
        />

        <b-modal
          v-if="!hideFeatures.includes('settings')" :id="`settings-${block.id}` " title=""
          :hide-header="false"
          :hide-footer="true" size="md" hide-backdrop
          content-class="modal-draggable"
          modal-class="dsht no-animation"
          scrollable
          lazy
        >
          <div class="d-flex justify-content-between">
            <b-checkbox
              v-model="block.disabled"
              class="mr-2 text-muted small" switch inline
            >
              Disable
            </b-checkbox>

            <div>
              <span title="ID" class="text-mute small mx-2 tex2t-right d-inline-block">
                #{{ block.id }}
              </span>

              <formFields
                class="mt-0 d-inline-block" :model="block" :block="{
                  id: `form-conditions${block.id}`,
                  children: [{
                    slug: 'conditions',
                    label: 'If Conditions',
                    component: 'conditions-formula',
                    dropLeft: false,
                    right: true,
                    size: 'sm',

                    // 'required': true,
                    // 'description': 'Only apply this stage on certain conditions',
                    // 'showIf': '!disabled'
                  }],
                }" :parent="[]" :index="0"
                :options="settingsFormOptions" :type="type" :scope="scope"
              />
            </div>
          </div>

          <!--                                    <p class=""> -->
          <!--                                        -->
          <!--                                    </p> -->

          <formFields
            v-if="settingsForm && !block.disabled" class="mt-4" :model="block" :block="settingsForm"
            :parent="[]" :index="0"
            :options="settingsFormOptions" :type="type" :scope="scope"
          />
        </b-modal>
      </div>
    </template>
  </div>
</template>

<style>
.toranj-action {
    margin-bottom: 20px;
    border: 1px transparent solid;
    /*//background: #ccc;*/
    /*//border-radius: 15px;*/
    /*////padding: 1rem;*/
    /*//margin:0.5rem;*/
}

.toranj-hover-action {
    border: 1px solid #ccc;
}

.toranj-action .footer-add {
    /*//display: none;*/
    /*//padding-top: 18px;*/
    /*//width: 30%;*/
    /*//left: 35%;*/
    position: absolute;
    /*//left: 0;*/
    /*//width: 100%;*/
    left: 33%;
    width: 33%;
    /*width: 80%; !*  left to make space for buttons and avoid z-index problem with drop down for empty code block *!*/
    bottom: -22px;
    height: 20px;
    padding-top: 8px;
    z-index: 500;
}

.toranj-action .footer-add-body {
    height: 10px;
    position: relative;
}

.toranj-action .border-div {
    border-bottom: 1px dashed #c1c1c1;
    height: 3px;
    max-width: 300px;
    margin: 0 auto;
}

.toranj-action .footer-add .btn {
    margin-top: -25px;
    width: 22px;
    height: 22px;
    line-height: 22px;
}

/*//.toranj-status .footer-add .border-div {*/
/*//    //display: none;*/
/*//    height: 2px;*/
/*//    border-bottom-width: 2px;*/
/*//}*/

.toranj-edit-action-overlay {
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

.toranj-edit-action-overlay:hover {
    /*//border: 2px solid #666;*/
    background: #eee;
    opacity: .4;
}

.toranj-edit-action-overlay div {
    display: none;
    color: #000;
    justify-content: center;
    align-items: center;
}

.toranj-edit-action-overlay:hover div {
    display: flex;
}

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
