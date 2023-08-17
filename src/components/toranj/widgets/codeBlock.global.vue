<script>
// import fMixin from './fMixin'

// import blockMixin from '../toranj/blockMixin'
// import {RuntimeTemplateCompiler} from "vue-runtime-template-compiler"

const iCodeMirror = () => import('@/components/helpers/iCodeMirror')
// import iCodeMirror from "@/components/helpers/iCodeMirror";
// https://github.com/jonwatkins/vue-runtime-template-compiler todo: NOT NEED VUE COMPILE VERSION alias remove from nuxt config VERY BIG DECREASE SIZE WITH REMOVVING BUNDLEED VUE

export default {
  directives: {},
  components: { ICodeMirror: iCodeMirror },
  // mixins: [blockMixin],
  inheritAttrs: false,
  // components: {'runtime-template-new': RuntimeTemplateCompiler},
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      test: '<div><p-editable :block="block" :options="options" name="sdsssssdw">Click above to start coding!</p-editable></div>',
      isCompiled: true,
      timeout: false,
      tempCode: '',
    }
  },
  computed: {},
  watch: {
    'block.html': function (newVal) {
      if (this.timeout)
        clearTimeout(this.timeout)

      this.isCompiled = false

      this.timeout = setTimeout(() => {
        this.isCompiled = true
        // console.log('time')
        // el.click()
      }, 500)
      // el.click()
    },
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
<div class="dsht">
    <div class="text-center p-5">
        <code>Click above to start coding!</code>
    </div>
</div>`)
        // console.log(slots[0].innerHTML)
      } // may have several children
    }

    this.tempCode = this.block.html
  },
  methods: {
    Submit() {
      this.block.html = this.tempCode
      this.$root.$emit('bv::hide::modal', `code-editor-${this.block.id}`)
    },
    Cancel() {
      this.tempCode = this.block.html
      this.$root.$emit('bv::hide::modal', `code-editor-${this.block.id}`)
    },
  },
}
</script>

<template>
  <client-only v-if="!options.edit">
    <!--        <div v-html="block.html"/> -->

    <runtime-template :template="`<div>${block.html}</div>`" />
  </client-only>

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="outside" left-slot-pos="outside"
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
        <runtime-template
          v-if="isCompiled"
          :template="`<div >${block.html}</div>`"
        />
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

      <form @submit.prevent="">
        <ICodeMirror v-model="tempCode" />

        <!--                <b-form-fieldset label=""> -->
        <!--                    <b-form-textarea -->
        <!--                        id="my-code-editor" -->
        <!--                        debounce="500" -->
        <!--                        v-model="block.html" -->
        <!--                        class="w-100" -->
        <!--                        placeholder="Code Here..." -->
        <!--                    /> -->
        <!--                    &lt;!&ndash;{{block.html}}&ndash;&gt; -->
        <!--                </b-form-fieldset> -->

        <div class="d-flex justify-content-between mt-2">
          <div>
            <small>Remove "dsht" class to use your own CSS framework</small>
          </div>
          <div>
            <button
              class="btn btn btn-secondary btn-22sm  "
              @click.prevent="Cancel"
            >
              Cancel
            </button>
            <button
              class="btn btn btn-primary btn-22sm m-2"
              @click.prevent="Submit"
            >
              <span class="iconify big" data-icon="mdi:check" data-inline="true" />

              Save
            </button>
          </div>
        </div>
      </form>
    </b-modal>
  </widget-wrapper>
</template>

<style>

</style>
