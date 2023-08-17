<script>
// import fMixin from './fMixin'

// import blockMixin from '../toranj/blockMixin'
// import {RuntimeTemplateCompiler} from "vue-runtime-template-compiler"

import Vuep from 'vuep'
import 'vuep/dist/vuep.css'

// const iCodeMirror = () => import('@/components/helpers/iCodeMirror')

export default {
  directives: {},
  components: { Vuep },
  // mixins: [blockMixin],
  inheritAttrs: false,
  // components: {'runtime-template-new': RuntimeTemplateCompiler},
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {

    }
  },
  computed: {},
  watch: {

    // 'options.edit' (newVal) { //require for reactivity
    //     if (newVal) {
    //         this.inputContent = this.addWrapper(this.block.html)
    //     }
    // }
  },
  created() {
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html
    if (!this.block.html) {
      const slots = this.$el.getElementsByClassName('slot-wrapper')

      const slotVue = (this.$slots.default) ? this.$slots.default[0] : ''
      // console.log('slotVue')
      // console.log(slotVue)
      // console.log(slots[0].innerHTML)
      // console.log(slots[0])

      if (slots && slots.length) {
        // this.block.html =slots[0].innerHTML || '<div class="pt-5"><p><code>Click above to start coding!</code></p></div>'
        this.$set(this.block, 'html', slots[0].innerHTML || `
<div class="text-center p-5">
    <p>
        <code>Click above to start coding!</code>
    </p>
</div>`)
        // console.log(slots[0].innerHTML)
      } // may have several children
    }
  },
  methods: {},
}
</script>

<template>
  <client-only v-if="!options.edit">
    <!--        <div v-html="block.html"/> -->

    <runtime-template :template="`<div>${block.html}</div>`" />
  </client-only>

  <section-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="inside" left-slot-pos="inside"
    :hide-features="['settings']"
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
      <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal', `code-editor-${block.id}`)">
        <span class="iconify" data-icon="ion:code-slash" data-inline="true" /> Code
      </b-btn>
    </template>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->

    <template>
      <client-only>
        <!-- value -->
        <!--                <v-runtime-template :template="block.html"></v-runtime-template> -->
        <!--        avoid root problem with div  -->

        <!--               dbclick doesn't work! add this somewhere: @dbclick.prevent="$root.$emit('bv::show::modal', 'code-editor-'+block.id)" -->
        <!--                <runtime-template v-if="isCompiled" -->
        <!--                                  :template="`<div >` + block.html + '</div>'"></runtime-template> -->
        <!--                <renderer template='<div><p-editable :block="block" :options="options" name="sdsssssdw">Click above to start coding!</p-editable></div>' ></renderer> -->
        <!--                above doesn't work with variables or ' " only ` -->

        <!--                <renderer :template="block.html" ></renderer> -->
        <!--                {{block.html}} -->
        <!--                <div v-html="block.html"/> -->
      </client-only>
    </template>

    <b-modal
      :id="`code-editor-${block.id}` " title="" :hide-header="false" :hide-footer="true" size="lg"
      hide-backdrop
      content-class="modal-draggable"
      modal-class="dsht no-animation"
    >
      <!--                                    <p class=""> -->
      <!--                                        -->
      <!--                                    </p> -->
      <Vuep :template="block.html" />
    </b-modal>
  </section-wrapper>
</template>

<style>

</style>
