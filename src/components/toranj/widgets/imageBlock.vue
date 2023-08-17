<script>
// import fMixin from './fMixin'
import blockMixin from '../blockMixin'
import defaultImg from './../../../assets/img/placeholder.svg'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin],
  props: ['src',
    // 'width', 'height'
  ],
  data() {
    return {
      popoverShow: false,
      defaultSrc: defaultImg,
      imgWidth: '',
      imgHeight: '',
      prevX: 0,
      prevY: 0,
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'alt',
            label: 'Alt Text',
            component: 'input-text',
            description: 'Describe image. Useful for SEO',
          },
          {
            slug: 'border',
            label: 'Border',
            component: 'select',
            size: 'sm',
            values: [{
              text: 'Box',
              value: '',
            }, {
              text: 'Rounded',
              value: 'rounded',
            }, {
              text: 'Thumb',
              value: 'img-thumbnail',
            }, {
              text: 'Circle',
              value: 'rounded-circle',
            }],
            // 'default': 'info', //todo: foreach map for each block and its settings field
            description: '',
            // 'buttons': true,
            // 'size': 'sm',
            // 'stacked': true,

          },

          {
            slug: 'width',
            label: 'Width',
            component: 'input-text',
            append: 'px',
            description: 'Leave blank for default',
          },
          {
            slug: 'height',
            label: 'Height',
            component: 'input-text',
            append: 'px',
            description: 'Leave blank for default',
          },

          {
            slug: 'align',
            label: 'Align',
            component: 'select',
            size: 'sm',
            values: [{
              // text: 'left',
              value: 'left',
              html: '<span class="iconify" data-icon="ant-design:align-left-outlined" data-inline="false"></span>',
            }, {
              // text: 'center',
              value: 'center',
              html: '<span class="iconify" data-icon="ant-design:align-center-outlined" data-inline="false"></span>',

            }, {
              // text: 'right',
              value: 'right',
              html: '<span class="iconify" data-icon="ant-design:align-right-outlined" data-inline="false"></span>',

            }, {
              value: '',
              html: '<span class="iconify" data-icon="ant-design:close-circle-outlined" data-inline="false"></span>',
            }],
            // 'default': 'info', //todo: foreach map for each block and its settings field
            description: '',
            // 'buttons': true,
            // 'size': 'sm',
            // 'stacked': true,

          },

          {
            slug: 'imgClass',
            label: 'Image CSS Class',
            component: 'input-text',
            append: '',
            description: 'May override other settings. Remove and try again.',

          },

        ],
      },
    }
  },
  computed: {
    imgClass() {
      return `dasht-img ${this.block.imgClass} ${this.block.border ? this.block.border : ''} `
    },
    imgStyle() {
      return `${this.imgWidth ? `width:${this.imgWidth}px` : ''}; ${this.imgHeight ? `height:${this.imgHeight}px` : ''}; ${this.defaultSrc == this.block.src ? 'max-width:400px;' : ''}`
    },
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
  watch: {
    'block.width': function (val) {
      this.imgWidth = val
    },
    'block.height': function (val) {
      this.imgHeight = val
    },

  },
  mounted() {

  },
  created() {
    if (!this.block.src)
      this.$set(this.block, 'src', this.src ? this.src : this.defaultSrc)
    // this.$set(this.block, 'width', 200)
    // default

    if (this.block.width)
      this.imgWidth = this.block.width

    // else if (this.width)
    //     this.imgWidth = this.width

    if (this.block.height)
      this.imgHeight = this.block.height

    // else if (this.height)
    //     this.imgWidth = this.height

    // check if exists or use HTML!
    //             this.$slots.default.forEach(slot=>{
    //                 this.$slots.default[0]
    //             })
    //             this.value = this.$slots.default[0].text  //bug may have several children?
    //             this.value = this.$el.getElementsByClassName("slot-wrapper")[0].innerHTML //bug may have several children?

    // console.log(this.$slots.default)
    // this.value = this.current
  },
  methods: {
    uploaded(val) {
      console.log(val)

      // this.block.src =
      this.$set(this.block, 'src', this.$options.filters.cdnURL(val))
      // console.log('uploaded run')
      // this.imgWidth = ''
      // this.imgHeight = ''
      // delete this.block.width
      // delete this.block.height
      this.$root.$emit('bv::hide::popover', `upload-popover-${this.block.id}`)
    },
    initialiseResize(e) {
      window.addEventListener('mousemove', this.startResizing, false)
      window.addEventListener('mouseup', this.stopResizing, false)
    },

    startResizing(e) {
      // console.log('deltea',   e.clientX - this.prevX  , e.movementX )

      if (!this.prevX) { // for the first time
        console.log('first x')

        this.imgWidth = e.clientX - this.$refs.img.getBoundingClientRect().left + window.scrollX
      }
      else { // just add x delta to avoid problem with right-align image
        this.imgWidth += e.clientX - this.prevX // alternative and more compatible way instead e.movementX
      }

      if (!this.prevY) { // for first time
        console.log('first y')
        this.imgHeight = e.clientY - this.$refs.img.getBoundingClientRect().top + window.scrollY
      }
      else { // just add x delta to avoid problem with right-align image
        this.imgHeight += e.clientY - this.prevY // alternative and more compatible way instead e.movementX
      }

      this.prevX = e.clientX
      this.prevY = e.clientY

      // no less than 32
      this.imgWidth = (this.imgWidth < 32) ? 32 : this.imgWidth
      this.imgHeight = (this.imgHeight < 32) ? 32 : this.imgHeight
    },

    stopResizing(e) {
      window.removeEventListener('mousemove', this.startResizing, false)
      window.removeEventListener('mouseup', this.stopResizing, false)
      this.prevX = 0
      // console.log('stopped')
      this.$set(this.block, 'width', this.imgWidth)
      this.$set(this.block, 'height', this.imgHeight)
      // console.log(this.imgWidth)
      // console.log(this.block)
    },

    onClose() {
      this.$root.$emit('bv::hide::popover', `upload-popover-${this.block.id}`)

      // this.popoverShow = false
    },
    onOk() {

    },
    onShow() {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      // this.focusRef(this.$refs.input1)
    },
    onShown() {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      // this.focusRef(this.$refs.input1)
    },
    onHidden() {
      // Called just after the popover has finished hiding
      // Bring focus back to the button
      // this.focusRef(this.$refs.button)
    },
    // focusRef(ref) {
    //     // Some references may be a component, functional component, or plain element
    //     // This handles that check before focusing, assuming a `focus()` method exists
    //     // We do this in a double `$nextTick()` to ensure components have
    //     // updated & popover positioned first
    //     this.$nextTick(() => {
    //         this.$nextTick(() => {
    //             ;(ref.$el || ref).focus()
    //         })
    //     })
    // }
    // updateModel(v){
    //     console.log(v)
    //     this.tempModel= v.target.outerText
    // }

  },
}
</script>

<template>
  <img
    v-if="!options.edit && !block.link && !block.align"
    :src="block.src"
    :class="imgClass"
    :alt="block.alt"
    :style="imgStyle"
    v-bind="$attrs"
  >

  <div
    v-else-if="!options.edit && !block.link && block.align" class="toranj-img-wrapper"
    :style="`${block.align ? `text-align:${block.align}` : ''}`"
  >
    <img
      :src="block.src"
      :class="imgClass"
      :alt="block.alt"
      :style="imgStyle"
      v-bind="$attrs"
    >
  </div>

  <!--    todo: settings alt / lazy / responsive / rounded / border / class / size width height / inline / block / -->
  <app-link
    v-else-if="!options.edit && block.link && !block.align"
    :to="block.link"
    :class="block.linkClass"
  >
    <img
      :class="imgClass"
      :src="block.src"
      :alt="block.alt"
      :style="imgStyle"
      v-bind="$attrs"
    >
  </app-link>

  <div
    v-else-if="!options.edit && block.link && block.align"
    class="toranj-img-wrapper" :style="`${block.align ? `text-align:${block.align}` : ''}`"
  >
    <app-link
      :to="block.link"
      :class="block.linkClass"
    >
      <img
        :class="imgClass"
        :src="block.src"
        :alt="block.alt"
        :style="imgStyle"
        v-bind="$attrs"
      >
    </app-link>
  </div>

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options"
    :footer-add="parent.length > 1"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :style="`color:red; ${block.link ? 'display:block;' : ''} ${block.align ? `text-align:${block.align}` : ''}`"
    :settings-form="settingsForm"
    :tag-name="block.link ? 'a' : 'div'"
    :class="block.linkClass"
  >
    <!--        todo: tagname a jump scroller to the nedd because of change in component remove it (which has little effect on logo.a ing{}) -->
    <!--        todo: position: relative; display:inline-block;  add it as option or not? -->

    <!--      resize image  https://jsfiddle.net/niranjan94/w8k1ffju/?utm_source=website&utm_medium=embed&utm_campaign=w8k1ffju -->
    <img
      v-bind="$attrs"
      :id="`upload-popover-${block.id}`"
      ref="img"
      v-b-tooltip.hover.top.ds200="'Click to change'"
      :src="block.src"
      :class="`cursor-hand click-away-exception ${imgClass}`"
      :style="`${imgWidth ? `width:${imgWidth}px` : ''}; ${imgHeight ? `height:${imgHeight}px` : ''}; ${defaultSrc == block.src ? 'max-width:400px;' : ''} `"
      @click="$root.$emit('bv::show::popover', `upload-popover-${block.id}`)"
    >

    <!--        <div ref="resizeHandler" id="resize" @mousedown="initialiseResize"> -->
    <!--            <span class="iconify" data-icon="vaadin:handle-corner" data-inline="false"></span> -->
    <!--        </div> -->

    <!--        <b-form-input class="d-block" type="range" v-model="width" min="50" max="150"></b-form-input> -->

    <template #menu-item>
      <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', `upload-popover-${block.id}`)">
        Upload / Replace
      </b-dropdown-item>
    </template>

    <template #menu-right>
      <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
      <!--                <span class="iconify big" data-icon="bx:bx-cloud-upload" data-inline="false"></span> -->
      <!--            </b-btn> -->

      <b-btn
        size="xs" :class="{ active: block.link }"
        @click.prevent="$root.$emit('bv::show::modal', `linker-${block.id}`)"
      >
        <span class="iconify big" data-icon="bx:bx-link" data-inline="false" />
      </b-btn>
    </template>

    <!-- Our popover title and content render container -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <!--            :show.sync="popoverShow" -->

    <!--        <b-popover -->
    <!--            target="menu" -->
    <!--            triggers="hover" -->
    <!--            placement="top" -->
    <!--            container="my-container" -->
    <!--            ref="popover2" -->

    <!--        > -->
    <!--            <template v-slot:title> -->
    <!--                &lt;!&ndash;<b-button @click="onClose" class="close" aria-label="Close">&ndash;&gt; -->
    <!--                &lt;!&ndash;<span class="d-inline-block" aria-hidden="true">&times;</span>&ndash;&gt; -->
    <!--                &lt;!&ndash;</b-button>&ndash;&gt; -->
    <!--                &lt;!&ndash;Interactive Content&ndash;&gt; -->
    <!-- sdsd -->
    <!--            </template> -->

    <!--            <b-btn class="widget-drag-handler" size="sm" @click="$root.$emit('bv::hide::popover', 'menu') -->
    <!-- ">close</b-btn> -->
    <!--            <b-btn class="widget-drag-handler" size="sm">Move</b-btn> -->
    <!--        </b-popover> -->
    <b-popover
      ref="popover"
      v-model:show="popoverShow"
      :target="`upload-popover-${block.id}`"
      placement="left"
      container="my-container"
      triggers="manual"
      custom-class="p-0-popover  dsht"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template #title>
        <!-- <b-button @click="onClose" class="close" aria-label="Close"> -->
        <!-- <span class="d-inline-block" aria-hidden="true">&times;</span> -->
        <!-- </b-button> -->
        <!-- Interactive Content -->
      </template>

      <!-- <div> -->
      <b-btn-close
        class="mb-1 mr-1"
        size="xs"
        variant="secondary"
        @click="onClose"
      />

      <i-upload-zone
        class=" m-1 "
        url="/files/attach/upload"
        btn-class="btn btn-sm btn-info rounded-4"
        :validate-types="['image/png', 'image/jpg', 'image/jpeg', 'image/gif']"
        @update:files="uploaded"
      >
        <!--                val => $set(block,src,$options.filters.cdnURL(val)) -->
        Choose File
      </i-upload-zone>

      <!-- <b-button @click="onOk" size="sm" variant="primary">Ok</b-button> -->
      <!-- </div> -->
    </b-popover>

    <linkerModal :block="block" :show-text="false" :scope="scope" />
  </widget-wrapper>
</template>

<style>
.dasht-img {
    min-width: 48px;
}

/*.dsht {*/
    .dsht #resize {
        position: absolute;
        /*background-color: transparent;*/
        color: #888;
        width: 15px;
        height: 15px;
        /*cursor: se-resize;*/
        cursor: nwse-resize;
        right: 0px;
        bottom: 0px;
        text-align: center;
        z-index: 1000;
        /*display: flex;*/
        /*justify-content: flex-end;*/
        /*align-items: flex-end;*/
    }

    .dsht #resize:hover {
        color: var(--primary);
    }
/*}*/
</style>
