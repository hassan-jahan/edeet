<script>
// import fMixin from './fMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      settingsForm: {
        component: 'form',
        children: [

          {
            slug: 'choose',
            component: 'html-field',
            html: '<a href="https://iconify.design/icon-sets/" target="_blank" class="btn btn-primary btn-sm">Choose Icon</a><p class="text-danger">Copy HTML from box and paste it below</p>',
            // 'required': true,
            description: '',
            la2bel: 'Copy HTML from box and paste it below',
          },
          {
            slug: 'html',
            label: 'HTML/SVG Code',
            component: 'textarea',
            // 'required': true,

            required: false,
            // 'showIf': {'slug': 'settings.noIndex', 'value': false},
            description: 'Paste HTML code here',
          },
          // {
          //     'slug': 'bg',
          //     'label': 'Background Color',
          //     'component': 'color',
          //     'gradient': true,
          //     'transparent': true,
          //     'preset': 'basic',
          //     'options': ['#ccc', 'red', '#ff88cc'],
          //     // 'required': true,
          //     'description': '',
          // },

          {
            slug: 'color',
            label: 'Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],

            description: '',
          },
          {
            slug: 'size',
            label: 'Size',
            component: 'input-text',
            append: 'px',
            description: '',
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
              text: 'center',
              value: 'center',
              html: '<span class="iconify" data-icon="ant-design:align-center-outlined" data-inline="false"></span>',

            }, {
              // text: 'right',
              value: 'right',
              html: '<span class="iconify" data-icon="ant-design:align-right-outlined" data-inline="false"></span>',

            }],
            // 'default': 'info', //todo: foreach map for each block and its settings field
            description: '',
            // 'buttons': true,
            // 'size': 'sm',
            // 'stacked': true,

          },
        ],
      },

    }
  },
  computed: {
    theStyle() {
      return `${this.block.color ? `color:${this.block.color}` : ''}; ${this.block.size ? `font-size:${this.block.size}px` : ''}; ${this.block.align ? `text-align:${this.block.align}` : ''}`
    },
  },
  watch: {
    'block.html': function (newVal) {
      // console.log(newVal)
    },
    // 'options.edit' (newVal) { //require for reactivity
    //     if (newVal) {
    //         this.inputContent = this.addWrapper(this.block.html)
    //     }
    // }
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html
    if (!this.block.html && this.$el?.getElementsByClassName) {
      const slots = this.$el?.getElementsByClassName('slot-wrapper')
      if (slots && slots.length) {
        // this.block.html = slots[0].innerHTML || '<div><code>Click above to start coding!</code></div>'
        this.$set(this.block, 'html', slots[0].innerHTML || '<div class="pt-2"><p><code>Click above to start coding!</code></p></div>')

        // console.log(slots[0].innerHTML)
      } // may have several children
    }
  },
  methods: {},
}
</script>

<template>
  <client-only v-if="!options.edit && !block.link">
    <div :style="theStyle" v-html="block.html" />
  </client-only>

  <app-link
    v-else-if="!options.edit && block.link"
    :to="block.link"
    :style="theStyle" v-html="block.html"
  >
    <!--        <div /> -->
  </app-link>

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]" :settings-form="settingsForm"
  >
    <!--        only to get default -->
    <div
      v-if="!block.html"
      class="slot-wrapper"
      style="display: none"
    >
      <!--            maybe good for -->
      <!--            <component :is="block.tag" v-bind="$attrs"> -->
      <slot />
      <!--            </component> -->
    </div>

    <template #menu-right>
      <b-btn
        size="xs" :class="{ active: block.link }"
        @click.prevent="$root.$emit('bv::show::modal', `linker-${block.id}`)"
      >
        <span class="iconify big" data-icon="bx:bx-link" data-inline="false" />
      </b-btn>
    </template>

    <template>
      <client-only>
        <div :style="theStyle" class="cursor-hand" @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)" v-html="block.html" />
      </client-only>
    </template>

    <linkerModal :block="block" :show-text="false" :scope="scope" />
  </widget-wrapper>
</template>

<style>

</style>
