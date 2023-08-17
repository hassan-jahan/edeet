<script>
// import fMixin from './fMixin'

// import blockMixin from '../toranj/blockMixin'
// import {RuntimeTemplateCompiler} from "vue-runtime-template-compiler"

// import iCodeMirror from "@/components/helpers/iCodeMirror";
// https://github.com/jonwatkins/vue-runtime-template-compiler todo: NOT NEED VUE COMPILE VERSION alias remove from nuxt config VERY BIG DECREASE SIZE WITH REMOVVING BUNDLEED VUE

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  // components: {iCodeMirror},
  // components: {'runtime-template-new': RuntimeTemplateCompiler},
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      moreZIndex: true,
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'classes',
            label: 'Classes',
            component: 'input-text',
            // 'required': true,
            // 'values': [2, 3, 4],
            description: '',
          },
        ],
      },
    }
  },

  watch: {

  },
  created() {
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html
    // if (!this.block.html) {
    //     const slots = this.$el.getElementsByClassName('slot-wrapper')
    //
    //     const slotVue =  (this.$slots.default) ? this.$slots.default[0] : ''
    //     console.log('slotVue')
    //     console.log(slotVue)
    //     console.log(slots[0].innerHTML)
    //     console.log(slots[0])
    //
    //     if (slots && slots.length) {
    //         // this.block.html =slots[0].innerHTML || '<div class="pt-5"><p><code>Click above to start coding!</code></p></div>'
    //        // this.$set(this.block, 'html', slots[0].innerHTML || '<div class="pt-5"><p><code>Click above to start coding!</code></p></div>')
    //         // console.log(slots[0].innerHTML)
    //     } // may have several children
    // }

  },
  methods: {},
}
</script>

<template>
<!--  <client-only  >-->
    <!--        <div v-html="block.html"/> -->
    <div v-if="!options.edit">
      <slot />
    </div>
<!--  </client-only>-->

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="['add']"
    :settings-form="settingsForm"
    :class="{ 'toranj-more-22z-index': moreZIndex }"
  >
    <slot />
    <!--        only to get default -->
  </widget-wrapper>
</template>

<style>

</style>
