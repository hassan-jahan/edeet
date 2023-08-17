<script>
// import fMixin from './fMixin'

// import blockMixin from '../blockMixin'

// const iQuill = () => import('../../helpers/iQuill.vue')
const iSunEditor = () => import('./../../helpers/iSunEditor.vue')

export default {
  components: { ISunEditor: iSunEditor },

  directives: {
    //   shouldBeHtml: {
    //     // bind(el, binding, vnode) {
    //     //   only el is writable
    //     // el.outerHTML = vnode
    //     // }
    //     // bind(binding) {
    //     //   console.log('my directive2')
    //     //   console.log(binding)
    //     //   if (binding.value) {
    //     //     console.log('Set to true')
    //     //   }
    //     // }
    //   }
  },
  // mixins: [fieldMixin],
  inheritAttrs: true,
  props: ['block', 'parent', 'index', 'options', 'scope', 'model'], // parent can be an array or object with children same as action menus
  data() {
    return {
      // emptyWithStyle: '',
      defaultSlot: '',

      // calculatedValue: '',
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'useFormula',
            label: 'Enable Autofill',
            component: 'checkbox',
            default: false,
            // 'required': true,
            description: '',
          },
          {
            slug: 'formula',
            label: 'Dynamic Data',
            component: 'input-text',
            // 'required': true,
            type: 'text',
            description: 'Enter variable from the scope',
            // "showIf": {"slug": "useFormula", op: 'eq', "value": true},

          },
        ],
      },
    }
  },
  computed: {
    // calculatedValue() {
    //     console.log('this.scope', this.scope, this.block.formula)
    //     console.log('final cal', objGet(this.scope, this.block.formula))
    //     if (this.block.formula)
    //         if (this.block.formula.toString().startsWith('this.'))
    //            return objGet(this.model, this.block.formula)
    //         else
    //             return objGet(this.scope, this.block.formula)
    //     return ''
    // }
  },
  watch: {

    'scope': { // copy from fieldmixin
      deep: true,
      handler(newVal) {
        console.log('scope changed')
        this.calculateHTMLLive()
      },
    },
    'model': { // copied from fieldmixin
      deep: true,
      handler(newVal) {
        console.log('model changed')
        // performance: make this func bounced!
        this.calculateHTMLLive()
      },
    },

    'block.html': function (newVal, oldVal) {
      // remove all these for performance in future

      // storeDefaultStyle: This mean user can not easily delete something class and something style in following code unless he or she is too fast:
      // <editable><h3 class="something" style="somthing">Hey</h3></editable>

      // IMPORTANT NOTE: HERE You make decision to use defaultstyle or not and more importantly use which default style first slot just here or old primart slot before move. Note that mounted run after each move so you should use firstDefaultStyle for first time to store primary default slot (you may have one that moved and one that has not been moved)

      // todo: check this one!
      // if (newVal != this.calculatedValue) {
      //     this.block.useFormula = false
      // }

      const storeDefaultStyle = this.block.useDefault && (!this.options || !this.options.storeDefaultStyle)
      // console.log('this.emptyWithStyle', this.block.emptyWithStyle)
      // console.log('this.storeDefaultStyle', this.options.storeDefaultStyle)
      if (newVal && storeDefaultStyle && this.block.emptyWithStyle) {
        const node = this.$helper.htmlToElements(newVal)
        // console.log('node.innerText', node[0].innerText)

        if (node.length == 1 && true) { // no extra wrapper or is text only
          // check if there is class or style and not image or button
          // or check if default class is not there
          if (!node[0].textContent && !node[0].innerText && node[0].innerHTML !== '') {
            // if (node[0].tagName && !node[0].tagName.includes(('IMG', 'BUTTON', 'DIV'))) {
            //     console.log('tag', node[0].tagName)

            // alert('Are you sure to remove default style?')
            // if (this.$refs['sunEditor'])
            this.$refs.sunEditor.updateEditor(this.block.emptyWithStyle)

            // this.$set(this.block, 'html',this.block.emptyWithStyle )

            // }
          }
          // && node[0].innerHTML !== '<br>'//
          //    with next back it will be removed
          // }else if (this.block.emptyWithStyle){
          //     console.log('show with html', this.block.emptyWithStyle)
          //     this.block.html = this.block.emptyWithStyle
          //
          // }
        }
      }
    },
    'block.useFormula': function (newVal, oldVal) {
      if (newVal) {
        // this.block.html = this.options.test
        this.calculateHTMLLive()
      }
    },
  },

  created() {
    // from fiieldmixin with small changes
    if ((typeof this.block.html === 'undefined' || this.block.html === null)) { // testing to enable object value work without certain defination slug means its kind of form element (another way to do this is doing it only for that specific component that needs object value)
      // if (this.schema.default && !this.options.edit) //do not show default on edit page
      //     this.block.html = this.schema.default //simple static value

      this.calculateHTMLLive()
    }
  },
  mounted() { // it's ok no problem with created SSR
    // console.log('autofill', this.block.useFormula,  this.block.formula,   this.block.html)

    // console.log('mounted again! after move'
    // if (this.block.useFormula) {
    //     this.calculate()
    //     this.block.html = this.calculatedValue
    //
    //     if (this.$refs['sunEditor'])
    //         this.$refs['sunEditor'].updateEditor(this.block.html)
    // }

    // console.log(this.block.useFormula, this.block.formula, this.block.html)

    if (this.block.useDefault) {
      this.defaultSlot = this.getDefaultSlot()

      if (!this.block.html)
        this.block.html = this.defaultSlot

      if (this.defaultSlot)
        this.block.emptyWithStyle = this.getEmptyWithStyle(this.defaultSlot)

      // emptywithstyle will be in block

      // console.log('getempty',this.block.emptyWithStyle )
    }
  },
  methods: {

    // calculate() {
    //     console.log('this.scope, this.block, objGet(this.scope, this.block.formula)')
    //     console.log(this.scope, this.block, objGet(this.scope, this.block.formula))
    //
    //     if (this.block.formula)
    //         if (this.block.formula.toString().startsWith('this.'))
    //             this.calculatedValue = objGet(this.model, this.block.formula)
    //         else
    //             this.calculatedValue = objGet(this.scope, this.block.formula)
    // },
    calculateHTMLLive() {
      // performance: make this func bounced!

      if (this.block.useFormula && this.block.formula) {
        this.block.html = this.$helper.evaluate(this.block.formula, false, this.model, this.scope) // set this.Value

        // console.log(this.value)
        // this.calculate(this.block.formula) // if there is formula / and it is prirotized to default
        // this.block.html = this.value
        if (this.$refs.sunEditor)
          this.$refs.sunEditor.updateEditor(this.block.html)
      }
    },
    getDefaultSlot() {
      const slots = this.$el.getElementsByClassName('slot-wrapper')
      // console.log('this el', this.$el)
      // console.log('no slot', slots)

      if (slots && slots.length)
        return slots[0].innerHTML

      return false
    },
    getEmptyWithStyle(slot) {
      const nodes = this.$helper.htmlToElements(slot)
      // todo: has extra div or is text only?
      // console.log( nodes[0].children)
      if (!nodes.length || nodes[0].nodeName == '#text' || nodes[0].children.length)
        return false

      const node = nodes[0]

      // console.log('func node.innerHTML', node.innerHTML)
      // console.log('func node.onnerHTML', node.outerHTML)
      // console.log('func node.tagName', node.tagName)
      // console.log('func node.tagName', node.childNodes.length)

      // check if there is class or style and not image or button
      // !node.textContent && !node.innerText && node.innerHTML !== ""
      if (node.classList.length || (node.style && node.style[0])) { // has default style or class
        if (node.tagName && !node.tagName.includes(('IMG', 'BUTTON'))) { // 'DIV'
          node.innerHTML = '<br>'
          return node.outerHTML
        }
      }
      return false

      // node.textContent = 's'
      // console.log('node', node)
      // console.log('emptyWithStyle', node.outerHTML)
      // alert('Are you sure to remove default style?'
    }
    ,
    // addWrapper(content) {
    //     //if entire block is in a block other than main block change main block h4 main changed to h2 so no need to h4
    //     let nodeList = this.$helper.htmlToElements(content)
    //     console.log('adding wrapper')
    //     // console.log(nodeList)
    //
    //     if (nodeList.length == 1) { //no wrapper or is text only
    //         if (!nodeList[0].innerHTML) { //text only{
    //             content = `<${this.block.tag} salam="1" class="${this.attrs && this.attrs['init-class'] ? this.attrs['init-class'] : ''}" >${content}</${this.block.tag}>`
    //         } else if (nodeList[0].tagName && this.block.tag && nodeList[0].tagName.toLowerCase() != this.block.tag.toLowerCase()) {
    //             content = `<${this.block.tag} salam="2"  class="${this.attrs && this.attrs['init-class'] ? this.attrs['init-class'] : ''}">${content}</${this.block.tag}>` // add class and attrs or not!!? with inheritAttrs
    //         }
    //
    //     }
    //     return content
    //
    // }
    // ,
    // removeWrapper(content) {
    //     //if entire block is in a block other than main block change main block h4 main changed to h2 so no need to h4
    //     let nodeList = this.$helper.htmlToElements(content)
    //     if (!nodeList || !nodeList.length)
    //         return
    //
    //     console.log('remove wrapper')
    //     const tagName = nodeList[0].tagName
    //     if (nodeList.length == 1 && nodeList[0].innerHTML) { //has wrapper and not text
    //         // console.log(nodeList[0])
    //         // if (nodeList[0].tagName.toLowerCase() != this.block.tag.toLowerCase()) {
    //         this.block.tag = nodeList[0].tagName
    //         content = nodeList[0].innerHTML
    //         // }
    //     }
    //
    //     if (nodeList.length > 1) {
    //         this.block.tag = 'div'
    //     }
    //
    //     return content
    // }
  },
}
</script>

<template>
  <div
    v-if="!options.edit"
    dir="auto"
    v-html="block.html"
  />

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options"
    :footer-add="parent.length > 1"
    right-slot-pos="outside" left-slot-pos="outside" :hide-features="['sett22ings']"
    :settings-form="settingsForm"
  >
    <!--  only to get default -->
    <div v-if="!defaultSlot" class="slot-wrapper" style="display: none">
      <!--            maybe good for -->
      <!--            <component :is="block.tag" v-bind="$attrs"> -->

      <slot />
      <!--            </component> -->
    </div>

    <!--               <template v-slot:menu-right> -->
    <!--                   <b-btn size="xs">TS -->
    <!--                   </b-btn> -->
    <!--               </template> -->

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->

    <template #menu-top>
      <b-btn
        v-if="block.useFormula" class="rounded" variant="dark" size="xs"
        @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
      >
        Auto
      </b-btn>
    </template>

    <!-- todo: remove if there is two tag inside <h4><h4> -->
    <template>
      <client-only>
        <!-- value -->
        <ISunEditor ref="sunEditor" v-model="block.html" />
        <!--                <i-quill -->
        <!--                    :content="inputContent" -->
        <!--                    :options="{theme: 'bubble',placeholder: 'Type somthing...', modules: {toolbar: [['bold', 'italic', 'underline', 'strike'], -->
        <!--                                                                                          [{ 'list': 'ordered'}, { 'list': 'bullet' }], -->
        <!--                                                                                          [{ 'header': [1, 2, 3, 4, 5, 6,false] }], -->
        <!--                                                                                          [{ 'color': [] }, { 'background': [] }], -->
        <!--                                                                                          [{ 'font': [] }], -->
        <!--                                                                                          [{ 'align': [] }], -->
        <!--                                                                                          ['link', 'image'], -->
        <!--                                                                                          ['clean']]}}" -->
        <!--                    :class="(attrs && attrs.defaultClass) ? attrs.defaultClass : ''" -->
        <!--                    @edit="val => block.html = removeWrapper(val)" -->
        <!--                /> -->
      </client-only>
    </template>
  </widget-wrapper>
</template>

<style>

</style>
