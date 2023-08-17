<script>
import blockMixin from './blockMixin'

// import 'quill/dist/quill.bubble.css'

const defaultWidgets = [
    {title: 'Text', block: { component: 'html-tag', html: ' ' }, icon: 'ion:text'},
    {title: 'Image', block: { component: 'image', src: '' }, icon: 'bx:bx-image'},
    {title: 'Button', block: { component: 'button', text: 'Text', type: 'btn' }, icon: 'dashicons:button'}, //BTN List? in row? or both
    {title: 'Small Row', block: { component: 'micro-row', children: [{ component: 'button', text: 'Text', type: 'btn' }]} , icon: 'dashicons:button'},
  {title: 'Custom Code', block: { component: 'code', html: '' }, icon: 'ion:code-slash'},

//    other map, embed, form video, newsletter, more box, blockquote, text effects, etc.
]

export default {
  name: 'Toranj',
  // components: {ICodeMirror},

  // layout: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // options: {
  //     type: String,
  //     required: true
  // }
  mixins: [blockMixin],
  props: ['value'],
  data() {
    return {
      addListOptions: {edit: true},
      render: false,
      key: 0,


      addList: [
        // { component: 'menu', logo: [] },
        {component: 'jumbo'},

        {component: 'cover'},
        {component: 'feature'},
        {component: 'feature', reverse: true},
        {component: 'main', boxed: true, boxColor: '#fff'},
        {component: 'brands'},
        {component: 'cards'},
        {component: 'newsletter'},
        // // ////  {component: 'newsbar'},
        {component: 'team'},
        {component: 'cards', boxed: true, boxColor: '#fff'},
        {component: 'pricing', boxed: true, boxColor: '#fff', cols: 3, specialPlan: 2},
        {component: 'contact'},
        {component: 'form-section'},
        {component: 'footer'},
        // { component: 'footer', mini: true },
        // ///  // { component: 'invoice-section' }, //new-edeet

      ],
      addListUnchanged: [],
      asyncComponentsGallery: [],
      undoStack: [],
      undoIndex: 1,
      ignoreUndoStack: false,
      undoStackSize: 15,
      undoStackTimeout: false,
      // layoout:[],
    }
  },
  computed: {
    layout() {
      return this.value || []
    },
  },
  watch: {
    layout: {
      deep: true,
      handler(newVal, oldValue) {
        console.log('editor changed', oldValue)
        // add to undo
        // this.$emit('input', newVal)
        if (this.undoStackTimeout)
          clearTimeout(this.undoStackTimeout)

        this.undoStackTimeout = setTimeout(() => {
          this.addToUndoStack(newVal)
        }, 2500)
      },
    },
  },
  created() {
    this.addListUnchanged = JSON.parse(JSON.stringify(this.addList)) // used tto generate new IDs
    this.shownAddModal() // load in loading page (because of static prop in modal)
  },
  mounted() {
    // make modals draggable
    if (!Array.isArray(this.options.widgets) || !this.options.widgets.length){
      // this.$set= this.options.widgets
      this.options.widgets = defaultWidgets

    }
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      dragElement(document.getElementById(modalId + '___BV_modal_content_'))
    })
  },
  methods: {
    addToUndoStack(value) {
      if (!value || !Array.isArray(value))
        return

      // this.$withoutWatchers(() => { todo: use this

      if (this.ignoreUndoStack) {
        this.ignoreUndoStack = false
        return
      }

      if (this.undoStack.length >= this.undoStackSize) {
        console.log(this.undoStack.pop())
        console.log('filled stack, one should be empty')
      }

      this.undoStack.unshift(JSON.stringify(value))
    },
    undo() {
      if (!this.undoStack[this.undoIndex])
        return

      this.ignoreUndoStack = true
      const theLayout = JSON.parse(this.undoStack[this.undoIndex])
      Object.assign(this.layout, theLayout)

      this.$emit('input', theLayout)

      this.key++ // not the best way to update the layout works for now (better emit update whever it was changed)

      if (this.undoIndex + 1 < this.undoStack.length)
        this.undoIndex++
      // this.$set('layout', this.layout )
    },
    redo() {
      if (!this.undoStack[this.undoIndex] || this.undoIndex < 1)
        return

      this.undoIndex--
      this.ignoreUndoStack = true
      const theLayout = JSON.parse(this.undoStack[this.undoIndex])
      Object.assign(this.layout, theLayout)
      this.$emit('input', theLayout)
      this.key++ // not the best way to update the layout works for now (better emit update whever it was changed)
    },
    loadAsyncGallery() {
      if (!this.options.edit || !this.$currentApp.settings || !this.$currentApp.settings.componentType)
        return

      this.$axios.get(`types/${this.$currentApp.settings.componentType}/posts/?count=30`).then((res) => {
        if (Array.isArray(res.data) && res.data.length) {
          res.data.forEach((post) => {
            this.asyncComponentsGallery.push({
              component: 'asyncComponent',
              postId: post.id,
              post,
            })
          })

          this.addListUnchanged = JSON.parse(JSON.stringify([...this.asyncComponentsGallery, ...this.addListUnchanged]))
          this.addList = [...this.asyncComponentsGallery, ...this.addList]
          // console.log('unlist alll', this.addListUnchanged)
          // console.log('unlist',this.addListUnchanged[1])
          // IMPortant: shoulnd be done within 10 seconds to render to not change block by its components
        }
      })
    },
    openAddSection() {
      const index = this.layout.length // add next to current compo or at the end
      this.$root.addSectionIndex = index
      this.$root.addSectionParentArray = this.layout

      this.$root.$emit('bv::show::modal', 'add-section')
    },
    AddSection(block) { // next to it
      const clone = JSON.parse(JSON.stringify(block))
      clone.id = `${clone.component}-${this.$helper.randomNumber(1, 999)}`

      console.log('clone', clone)
      console.log('section index', this.$root.addSectionIndex)
      this.$root.addSectionParentArray.splice(this.$root.addSectionIndex, 0, clone)
      this.$root.$emit('bv::hide::modal', 'add-section')

      return false // ? to capture
      // this.layout.push(clone) //shallow or deep
    },
    shownAddModal() {
      this.render = true
      setTimeout(() => {
        this.addListOptions.edit = false
      }, 10000)

      this.loadAsyncGallery()
    },
    // onDrop(dropResult) {
    //   console.log('on drop')
    //   console.log(dropResult)
    //   this.applyDrag(this.layout, dropResult)
    //   console.log(this.layout)
    // }
  },
}

function dragElement(el) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  if (!el || !el.classList.contains('modal-draggable')) {
    return
  }
  let header = el.getElementsByClassName('modal-header')

  if (header.length) {
    // if present, the header is where you move the DIV from:
    header[0].onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    el.style.top = (el.offsetTop - pos2) + 'px'
    el.style.left = (el.offsetLeft - pos1) + 'px'
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}
</script>

<template>
  <div class="">
    <!--             style="margin-top:3rem;" -->

    <!--        <a href="" class=" pt-5" @click.prevent="Undo">undo</a> -->
    <!--        <a href="#" class=" mt-5" @click.prevent="Redo">redoo</a> -->
    <!--        {{ undoIndex }} -->

    <!--        {{ undoStack.length }} -->

    <!--        {{ undoStack }} -->
    <draggable
        v-if="layout && layout.length"
        :key="key"
        v-model="block"
        group="row"
        :disabled="!options.edit"
        handle=".row-drag-handler"
        ghost-class="drop-placeholder"
        draggable=".toranj-section"
    >
      <!--            <div slot="header">add</div> -->

      <component
          :is="getComponent(block)"
          v-for="(block, index) in layout"
          :key="block.id"
          :parent="layout"
          :block="block"
          :model="model"
          :scope="scope"
          :class="`toranj-section toranj-${block.component} ${block.classes00 || ''}`"
          :index="index"
          :options="options"
      />
    </draggable>

    <div v-show="options.edit" class="dsht">
      <div class="text-center m-3" :class="[{ 'p-5': !layout.length }]">
        <div v-if="!layout.length" class="m-2 big text-muted">
          Click below to add your first block to the page.
        </div>
        <button
            class="btn btn btn-success"
            @click.prevent="openAddSection"
        >
          <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true"/>
          Add Block
        </button>
      </div>

      <div v-if="$auth.isStaff() && options.edit" class="m-5">
        <pre class="ltr bg-dark text-white p-3">{{ layout }}</pre>
      </div>
    </div>

    <b-modal
        v-if="options.edit" id="add-section" static title="" :hide-header="false" :hide-footer="true" size="md"
        hide-backdrop
        scrollable content-class="modal-draggable"
        modal-class="dsht no-animation"
    >
      <!--            @shown="shownAddModal" -->

      <div class="d-flex justify-content-between align-items-center mb-3">
        <small>Choose block to add:</small>

        <b-btn class="cursor-hand" size="sm" @click.prevent="AddSection({ component: 'asyncComponent' })">
          <span class="iconify" data-icon="ion:code-slash" data-inline="true"/> Template Block
        </b-btn>

        <b-btn class="cursor-hand" size="sm" @click.prevent="AddSection({ component: 'code-section' })">
          <span class="iconify" data-icon="ion:code-slash" data-inline="true"/> Custom Code
        </b-btn>
      </div>

      <div class="row toranj-add-section">
        <div v-if="addList && addList.length && render" class="col-md-12">
          <!--            <div slot="header">add</div> -->
          <!--                    v-b-tooltip.viewport.hover.ds750="'Add Block Here'" -->
          <div
              v-for="(block, index) in addList" :key="index"
              class="mb-3"
              style="position: relative;zoom:0.6"
          >
            <!--                        @click.stop.capture="AddSection(addListUnchanged[index])" -->
            <!--                        {{addListUnchanged[index]}} -->
            <!--                        {{block}} -->
            <div
                class="toranj-add-section-overlay d-flex justify-content-center align-content-center"
                @click.stop.capture="AddSection(addListUnchanged[index])"
            >
              <div class="bigger">
                <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true"/>
                <strong>Click to Add</strong>
              </div>
            </div>

            <component
                :is="getComponent(block)"

                :key="block.id"
                :parent="addList"
                :block="block"
                :model="model"
                :scope="scope"
                :class="`toranj-section toranj-${block.component} ${block.classes00 || ''}`"
                :index="index"
                :options="addListOptions"
            />
            <!--            <component -->
            <!--              :is="getComponent(block)" -->
            <!--              :key="block.id" -->
            <!--              :parent="addList" -->
            <!--              :block="block" -->
            <!--              :model="model" -->
            <!--              :scope="scope" -->
            <!--              :class="`toranj-section toranj-${block.component} ${block.classes00 || ''}`" -->
            <!--              :index="index" -->
            <!--              :options="addListOptions" -->
            <!--            /> -->
          </div>
        </div>

        <!--                <div class="col-md-6"> -->
        <!--                    <div class="cursor-hand" -->
        <!--                         @click.prevent="AddSection({component: 'cards', boxed: false, boxColor: '#fff', cols: 2})"> -->
        <!--                        <span class="iconify h4" data-icon="mdi:page-layout-header-footer" data-inline="false"></span> -->
        <!--                        2 Cols -->
        <!--                    </div> -->
        <!--                </div> -->
      </div>
    </b-modal>
  </div>
</template>

<style>
.dasht-body {
  /*color: #005dff;*/
  font-family: var(--dasht-main-font);
  font-family: var(--dasht-main-font);
  background: var(--dasht-body-bg);
  color: var(--dasht-body-color);
}

/* fix oerriding css by external css (best way to use a prefixed and also change bootrstrap vue js to use new class but even better is somehow bring controls out of frame! )*/
.dsht-controls *, {
  font-family: sans-serif;
}

/*//Testing: Test: to avoid conflict with other css / we enter what does not included in main bootstrap but revert what by third parties.*/
.dsht .btn:not(.btn-circle-sm), .dsht-controls .btn:not(.btn-circle-sm) {
  width: unset;
  height: unset;
  /*//all: unset;*/
}

/*//copy from computed*/
.dsht .btn, .dsht-conntrols .btn {
  align-items: flex-start;
  appearance: none;
  background-attachment: scroll;
  background-clip: border-box;
  /*//background-color: rgb(233, 236, 239);*/
  /*//background-image: linear-gradient(rgb(234, 236, 238), rgb(233, 236, 239));*/
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat-x: repeat;
  background-repeat-y: no-repeat;
  background-size: auto;
  /*//border-bottom-color: rgb(233, 236, 239);*/
  /*//border-bottom-left-radius: 0px;*/
  /*//border-bottom-right-radius: 0px;*/
  /*//border-bottom-style: solid;*/
  /*//border-bottom-width: 1px;*/
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  /*//border-left-color: rgb(233, 236, 239);*/
  /*//border-left-style: solid;*/
  /*//border-left-width: 1px;*/
  /*//border-right-color: rgb(233, 236, 239);*/
  /*//border-right-style: solid;*/
  /*//border-right-width: 1px;*/
  /*//border-top-color: rgb(233, 236, 239);*/
  /*//border-top-left-radius: 0px;*/
  /*//border-top-right-radius: 0px;*/
  /*//border-top-style: solid;*/
  /*//border-top-width: 1px;*/
  box-sizing: border-box;
  /*//color: rgb(33, 33, 33);*/
  cursor: pointer;
  /*//display: block;*/
  /*//flex-basis: auto;*/
  /*//flex-grow: 1;*/
  /*//flex-shrink: 1;*/
  font-family: sans-serif;
  /*//font-size: 13.6px;*/
  /*//font-stretch: 100%;*/
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  /*//height: 24.6875px;*/
  letter-spacing: 0.1px;
  /*//line-height: 13.6px;*/
  /*//margin-bottom: 0px;*/
  /*//margin-left: 2px;*/
  /*//margin-right: 2px;*/
  /*//margin-top: 0px;*/
  overflow-x: visible;
  overflow-y: visible;
  /*//padding-bottom: 3.2px;*/
  /*//padding-left: 3.2px;*/
  /*//padding-right: 3.2px;*/
  /*//padding-top: 3.2px;*/
  /*//position: relative;*/
  text-align: center;
  text-indent: 0px;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  /*//text-transform: uppercase;*/
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  /*//width: 24.6875px;*/
  word-spacing: 0px;
  writing-mode: horizontal-tb;
  z-index: 101;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-border-image: none;
}

.dasht-body h1, .dasht-body h2, .dasht-body h3, {
  /*color: #005dff;*/
  font-family: var(--dasht-heading-font);
}

.drop-placeholder {
  background: #ccc !important;
  border: 1px dashed #22354a !important;
  /*visibility: hidden;*/

  /*width: 100%;*/
  /*//min-height: 10px !important;*/
  /*//width: 100% !important;;*/
}

.sortable-chosen {
  background: #a39d9d;
}

.sortable-drag {
  background: #628043;
}

.toranj-selected-widget {
  border: 2px dashed #ccc;
}

.toranj-hover-widget {
  border: 1px dashed #ccc;
}

.toranj-selected-field {
  border: 2px dashed #ccc;
}

.toranj-hover-field {
  /*//background: #ccc; doeesn't work*/
}

.toranj-add-section .footer-add {
  display: none;
}

.toranj-add-section-overlay {
  z-index: 2050;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  outline: 0;
  border: 2px dashed #ddd;
  border-radius: 12px;
}

.toranj-add-section-overlay:hover {
  border: 2px solid #666;
  background: #fff;
  opacity: .5;
}

.toranj-add-section-overlay div {
  display: none;
  color: #000;
  justify-content: center;
  align-items: center;
}

.toranj-add-section-overlay:hover div {
  display: flex;
}

.toranj-view {
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}

/*.hover-row {*/
/*box-shadow: inset 0px 11px 8px -10px #CCC, inset 0px -11px 8px -10px #CCC;*/
/*box-shadow:inset 0 0 5px;*/
/*box-shadow: 0 0 0 3px rgba(66,153,225,.5);*/
/*}*/

/*//.ql-align-center {*/
/*//    text-align: center;*/
/*//}*/
/*//*/
/*//.ql-tooltip {*/
/*//    z-index: 10000;*/
/*//}*/

/*.col-drag-handler, .row-drag-handler {*/

/*}*/

/*.toranj-menu-row {*/
/*    position: absolute;*/
/*    right: 0;*/
/*    !*top: 20px; bugggy with drag*!*/
/*    padding-right: 15px;*/
/*    padding-top: 5px;*/
/*    z-index: 100000;*/
/*}*/

/*.toranj-menu-column {*/
/*    position: absolute;*/
/*    left: 20px;*/
/*    top: -25px;*/
/*    padding-right: 15px;*/
/*    z-index: 100000;*/
/*}*/

/*.toranj-menu-widget-left-outside {*/
/*    position: absolute;*/
/*    left: -32px;*/
/*    top: 0;*/
/*    z-index: 500;*/
/*    height: 100%;*/
/*    padding: 0 4px;*/
/*    !*margin-left: -25px;*!*/
/*    !*top: 20px; bugggy with drag*!*/
/*    !*padding-right: 15px;*!*/
/*    !*padding-top: 5px;*!*/
/*    !*z-index: 100;*!*/
/*}*/

/*.toranj-menu-widget-right-outside {*/
/*    position: absolute;*/
/*    right: -32px;*/
/*    top: 0;*/
/*    z-index: 500;*/
/*    height: 100%;*/
/*    padding: 0 4px;*/
/*    !*margin-left: -25px;*!*/
/*    !*top: 20px; bugggy with drag*!*/
/*    !*padding-right: 15px;*!*/
/*    !*padding-top: 5px;*!*/
/*    !*z-index: 100;*!*/
/*}*/
</style>
