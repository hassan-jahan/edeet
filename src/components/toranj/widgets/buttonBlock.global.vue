<script>
// import fMixin from './fMixin'
import blockMixin from '../blockMixin'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin],
  // props: ['src'],
  data() {
    return {
      // style: {
      //     'color': this.block.color,
      //     'background': this.block.bg,
      //     '--btnColor': this.block.color || '#fff' ,
      //     '--btnBg': this.block.bg || '#ff9900' ,
      // },
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'text',
            label: 'Text',
            component: 'input-text',
            required: true,
            description: '',
          },

          {
            slug: 'type',
            label: 'Type',
            component: 'select',
            block: true,
            values: [{ text: 'Link', value: 'link' }, { text: 'Button', value: 'btn' }],
          },

          {
            slug: 'size',
            label: 'Size',
            component: 'select',
            values: [{ text: 'Small', value: 'sm' }, { text: 'Medium', value: 'md' }, {
              text: 'Large',
              value: 'lg',
            }],
            // 'default': 'info', //todo: foreach map for each block and its settings field
            description: '',
            size: 'sm',
            showIf: { slug: 'type', value: 'btn' },
            // 'stacked': true,

          },

          {
            slug: 'align',
            label: 'Align',
            component: 'select',
            size: 'sm',
            values: [{
              // text: 'left',
              value: '',
              html: '<div class="close">-</div>',
            }, {
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

          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: [
              '#A463BF',
              'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
              'linear-gradient( 90.6deg,  rgba(59,158,255,1) -1.2%, rgba(246,135,255,1) 91.6% )',
            ],
            // 'required': true,
            description: '',
            showIf: [
              { slug: 'type', value: 'btn' },
              { slug: 'outline', value: false },
            ],

          },

          {
            slug: 'color',
            label: 'Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],
            description: '',
            showIf: { slug: 'type', value: 'btn' },

          },
          {
            slug: 'outline',
            label: 'Outline',
            component: 'checkbox',
            description: '',
            showIf: { slug: 'type', value: 'btn' },

          },
          {
            slug: 'rounded',
            label: 'Rounded',
            component: 'checkbox',
            description: '',
            showIf: { slug: 'type', value: 'btn' },

          },
          {
            slug: 'classes',
            label: 'Classes',
            component: 'input-text',
            // 'required': true,
            // 'values': [2, 3, 4],
            description: '',
          },
          // { //done by default not by settings
          //     'slug': 'isLi',
          //     'label': 'Is List?',
          //     'component': 'checkbox',
          //     'description': '',
          // },
          {
            slug: 'liClasses',
            label: 'List Classes',
            component: 'input-text',
            // 'required': true,
            // 'values': [2, 3, 4],
            description: '',
            showIf: { slug: 'isLi', value: true },

          },

        ],
      },
    }
  },
  computed: {
    btnClasses() {
      // console.log('computed', this.attrs)
      // ${(this.attrs && this.attrs.defaultClass) ? this.attrs.defaultClass : ''}
      return `btn btn-info dasht-btn d-inline-block ${(this.block.outline) ? 'dasht-btn-outline' : ''} ${this.block.rounded ? 'rounded-pill' : ''} ${this.block.size ? `btn-${this.block.size}` : ''}  `
    },

    btnStyles() {
      if (this.block.outline) // just to update cache when outline was change and color value was changed
        return `--btnColor: ${this.block.color || '#eee'};--btnBg: ${this.block.bg || '#411ccb'};`
      else
        return `--btnColor: ${this.block.color || '#eee'};  --btnBg: ${this.block.bg || '#411ccb'};`
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
    'block.outline': function (newVal, oldVal) {
      if (newVal)
        this.block.color = '#ec3131'
    },
  },
  mounted() {

  },
  created() {
    // console.log('this.attrs2')
    // console.log(this.attrs)

    if (!this.block.text)
      this.block.text = this.text // default

    // check if exists or use HTML!
    //             this.$slots.default.forEach(slot=>{
    //                 this.$slots.default[0]
    //             })
    //             this.value = this.$slots.default[0].text  //bug may have several children?
    //             this.value = this.$el.getElementsByClassName("slot-wrapper")[0].innerHTML //bug may have several children?

    // console.log(this.$slots.default)
    // this.value = this.current
  },
  methods: {},
}
</script>

<template>
  <div
    v-if="block.align && !options.edit" class="toranj-btn-wrapper"
    :style="`${block.align ? `text-align:${block.align}` : ''}`"
  >
    <app-link
      v-if="!options.edit && !block.isLi"
      :to="block.link"
      v-bind="$attrs"
      :class="`${block.type == 'btn' ? btnClasses : ''} ${block.classes} cursor-hand `"
      :style="btnStyles"
    >
      {{ block.text }}
    </app-link>

    <li v-else-if="!options.edit && block.isLi" :class="block.liClasses">
      <app-link
        :to="block.link"
        v-bind="$attrs"
        :class="`${block.type == 'btn' ? btnClasses : ''} ${block.classes} cursor-hand`"
        :style="btnStyles"
      >
        {{ block.text }}
      </app-link>
    </li>
  </div>

  <app-link
    v-else-if="!options.edit && !block.align && !block.isLi"
    :to="block.link"
    v-bind="$attrs"
    :class="`${block.type == 'btn' ? btnClasses : ''} ${block.classes} cursor-hand `"
    :style="btnStyles"
  >
    {{ block.text }}
  </app-link>

  <li v-else-if="!options.edit && !block.align && block.isLi " :class="block.liClasses">
    <app-link
      :to="block.link"
      v-bind="$attrs"
      :class="`${block.type == 'btn' ? btnClasses : ''} ${block.classes} cursor-hand`"
      :style="btnStyles"
    >
      {{ block.text }}
    </app-link>
  </li>
  <!--    todo: settings alt / lazy / responsive / rounded / border / class / size width height / inline / block / -->

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :settings-form="settingsForm"
    :style="`pos22ition: rela22tive; display:inl2ine-block;${block.align ? `text-align:${block.align}` : ''}`"
    :tag-name="block.isLi ? 'li' : 'div'"
    :class="block.isLi ? block.liClasses : ''"
  >
    <!--        style="position: relative; display:inline-block;" -->
    <!-- todo: the first one should be inline but other should be div? or better check if it's inline or not if it's then do the same with the first ? -->
    <a
      v-b-tooltip.hover.top.ds700="block.link && block.link != '#' ? block.link : 'Click to change'"
      href.prevent="#"
      :class="`${block.type == 'btn' ? btnClasses : ''} ${block.classes} cursor-hand`"
      :style="btnStyles"
      v-bind="$attrs"
      @click.prevent="$root.$emit('bv::show::modal', `linker-${block.id}`)"
    >
      {{ block.text }}
    </a>

    <!--        <img -->
    <!--            :src="block.src || src" -->
    <!--            v-bind="$attrs" -->
    <!--            :id="'upload-popover-'+block.id" -->
    <!--            class="cursor-hand" -->
    <!--            :style="'width:' + width +'px;height:'+height+'px;' " -->
    <!--            v-b-tooltip.hover.top.ds200="'Click to change'" -->
    <!--            ref="img" -->
    <!--            @click="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)" -->
    <!--        > -->

    <template #menu-right>
      <b-btn
        size="xs" :class="{ active: block.link }"
        @click.prevent="$root.$emit('bv::show::modal', `linker-${block.id}`)"
      >
        <span class="iconify big" data-icon="bx:bx-link" data-inline="false" />
      </b-btn>
    </template>

    <linkerModal :block="block" :show-text="true" :options="options" :scope="scope" />
  </widget-wrapper>
</template>

<style>
.dasht-btn {
    color: var(--btnColor) !important;
/*//default*/
    background: var(--btnBg) !important;
    /*//border-color: transparent !important;*/
    border: none !important;
}

.dasht-btn-outline {
    color: var(--btnColor) !important;
/*//default*/
    border-color: var(--btnColor) !important;
    background: transparent !important;
/*//default*/
    border: 2px solid !important;
}

.dasht-btn-outline:hover {
    color: #fff !important;
/*//default*/
    border-color: var(--btnColor) !important;
    background: var(--btnColor) !important;
/*//default*/
}

.dasht-btn:hover {
    /*//opacity: 0.75;*/
    /*//filter: brightness(1.12) drop-shadow(16px 16px 20px #ccc) contrast(120%); //not for  ie 11*/
    filter: brightness(1.2) contrast(70%);
/*//not for  ie 11*/
    /*//-webkit-filter: brightness(1.12);*/
    /*//--link-color-dark: hsl(var(--link-color-h), var(--link-color-s), calc(var(--link-color-l) * .9));*/

    /*//hsla(var(--link-color-hsl), .1)*/
}
</style>
