<script>
// import fMixin from './fMixin'
import blockMixin from '../blockMixin'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin],
  // props: ['src'],
  data() {
    return {
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
            slug: 'variant',
            label: 'Color',
            component: 'select',
            values: ['primary', 'secondary', 'info', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
            default: 'info', // todo: foreach map for each block and its settings field
            required: true,
            description: '',
            // 'buttons': true,
            // 'size': 'sm',
            // 'stacked': true,

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
            // 'stacked': true,

          },
          {
            slug: 'outline',
            label: 'Outline',
            component: 'checkbox',
            description: '',
          },
          {
            slug: 'rounded',
            label: 'Rounded',
            component: 'checkbox',
            description: '',
          },

        ],
      },
    }
  },
  computed: {
    btnClasses() {
      // console.log('computed', this.attrs)
      return `dasht-btn ${(this.attrs && this.attrs.defaultClass) ? this.attrs.defaultClass : ''} btn btn-${(this.block.outline) ? 'outline-' : ''}${this.block.variant} ${this.block.rounded ? 'rounded-pill' : ''} ${this.block.size ? `btn-${this.block.size}` : ''} my-2 `
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
  <app-link
    v-if="!options.edit"
    :to="block.link"
    v-bind="$attrs"
    :class="btnClasses "
  >
    {{ block.text }}
  </app-link>

  <!--    todo: settings alt / lazy / responsive / rounded / border / class / size width height / inline / block / -->

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :settings-form="settingsForm"
    style="position: relative; display:inline-block;"
  >
    <!--        style="position: relative; display:inline-block;" -->
    <!-- todo: the first one should be inline but other should be div? or better check if it's inline or not if it's then do the same with the first ? -->
    <a
      v-b-tooltip.hover.top.ds700="block.link ? block.link : 'Click to change'"
      href.prevent="#"
      :class="`cursor-hand ${btnClasses}`"
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

</style>
