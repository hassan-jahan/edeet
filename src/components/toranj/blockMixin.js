import out from './outDirective'

const ASYNC_TYPES = ['map', 'long-text', 'daterange-fa', 'datepicker', 'datepicker-fa', 'daterange']
// import {directive as onClickaway} from 'vue-clickaway'

export default {
  props: ['block', 'parent', 'index', 'options', 'model', 'scope'], // parent can be an array or object with children same as action menus

  // props: ["vfg", "model", "schema", "formOptions", "disabled", 'index', 'errors', 'earray'],
  directives: {
    out,
  },
  data() {
    return {
      selected: false,
      hover: false,
      element: false,

    }
  },
  created() {
    this.$root.$on('deselectAll', (action) => {
      this.selected = false
    })
  },
  mounted() {
    // add id if not foound doesn't work block is empty
    // if (this.block && !this.block.id){
    //     this.block.id = this.block.component + '-' + this.$helper.randomNumber(1, 999)
    // }
  },

  computed: {
    // value: {}
    bgSection() {
      // console.log('bg section caluc', this.block)
      let bg = this.block.bg || ''
      const bgImg = this.block.bgImg || ''

      if (!bg && !bgImg)
        return ''
      else if (!bgImg)
        return `background: ${bg};`

      // do not mix these things at this moment becuase there my be conflict with gradients
      if (!bg.startsWith('#') || !bg.startsWith('rgb') || !bg.startsWith('hsl') || !bg.startsWith('hwb'))
        bg = ''// disable bg for gradient to avoid conflict still cause problem with color names like 'red' and 'white'

      return `background: ${bg} url('${bgImg}') no-repeat center center;background-size: cover;`
    },
  },

  methods: {
    // getEl () {
    //     //todo: remove this
    //     // console.log(this.$options._componentTag)
    //     // console.log(this.$el)
    //     //in case to use block mixin directly which is not usable when we use wrapper
    //     // if (['section-wrapper', 'widget-wrapper'].includes(this.$options._componentTag)) {
    //     //     return this.$el.parentNode
    //     // } else {
    //         return this.$el
    //    // }
    // },
    Select(e) {
      if (!this.options || !this.options.edit)
        return

      // useful for slot/repeater multiple select only
      this.$root.$emit('deselectAll', 'someAction') // you can also remove stop from @click.stop=Select

      // if (this.block.component == 'slot') {
      //     return
      // }

      this.selected = true
      // console.log('select')
      window.addEventListener('keydown', this.shortKeys)
    },
    shortKeys(e) {
      // console.log(e)
      if (e && e.key == 'Delete')
        this.Delete()

      // if itself or its parent is not contenteditable or so
      // if (e && e.key=='Backspace') {
      //     this.Delete()
      // }
    },
    getParentArray() {
      if (this.parent && this.parent.children && this.parent.children.length) {
        return this.parent.children
        // console.log('children from parent')
      }
      else if (Array.isArray(this.parent)) {
        return this.parent
      }
    },
    clickAway(e) {
      if (!this.options || !this.options.edit)
        return

      this.selected = false
      this.showAddPopover = false
      // this.showAddFieldPopover = false
      // console.log('clicaway')
      // console.log(e)
      this.$root.$emit('bv::hide::popover')
      window.removeEventListener('keydown', this.shortKeys)
    },
    Cut() {
      this.Copy()
      this.Delete(false)
    },
    Copy() {
      // this.copyToClipboard(JSON.stringify(this.block))
      localStorage.setItem('toranjClipboard', JSON.stringify(this.block))
      localStorage.setItem('toranjClipboardFreshness', Date.now().toString())
    },
    OpenSettings() {
      this.$root.$emit('bv::show::modal', `settings-${this.block.id}`)
    },
    Paste(e) {
      // todo: catch keywords event ctrl+v cmd+v ctrl+c
      // todo: add as child not neighborhood
      const clipboard = localStorage.getItem('toranjClipboard')
      if (!clipboard) {
        this.$toast('First Copy or Cut something.', 'warning')
        return
      }
      let block = JSON.parse(localStorage.getItem('toranjClipboard'))
      const toranjClipboardDate = parseInt(localStorage.getItem('toranjClipboardFreshness'))

      block = this.objectIdGenerator(block)

      if (toranjClipboardDate + (60 * 60 * 1000) < Date.now()) { // 60 min
        localStorage.removeItem('toranjClipboard')
        localStorage.removeItem('toranjClipboardDate')
        console.log('Clipboard is expired')
        return
      }

      if (block && block.component)
        this.Add(block)
      else
        alert('Paste is not supported for this object') // todo: add text and other

      // not works because of security reason require permissions
      // console.log('e')
      // console.log(e)
      // document.execCommand("paste");
      // const clipData = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData
      // console.log(clipData)
      // const block = JSON.parse(clipData.getData('Text'))
    },
    Delete(ask = true) {
      if (ask) {
        if (!confirm('Are you sure?'))
          return
      }

      this.getParentArray().splice(this.index, 1)
    },
    openAddWidget() {
      this.$root.$emit('bv::show::popover', this.block.id)
    },

    // openAddField () { //also change to main toranj component
    //     this.$root.addFieldBlockId = this.block.id
    //     this.$root.addFieldIndex = this.index
    //     this.$root.addFieldParentArray = this.parent
    //     this.$root.$emit('bv::show::popover', this.block.id)
    // },

    openAddSection() { // also change to main toranj component
      let parentArray, index
      // if (this.parent && this.parent.children && this.parent.children.length) {
      //     parentArray = this.parent.children
      // } else if (Array.isArray(this.parent)) {
      //     parentArray = this.parent
      // }
      parentArray = this.getParentArray()

      index = (typeof this.index !== 'undefined') ? this.index + 1 : parentArray.length // add next to current compo or at the end
      this.$root.addSectionIndex = index
      this.$root.addSectionParentArray = parentArray

      this.$root.$emit('bv::show::modal', 'add-section')
    },
    Add(block) { // next to it
      let clone = JSON.parse(JSON.stringify(block))
      // clone.id = clone.component + '-' + this.$helper.randomNumber(1, 999) //require
      // clone.id = this.idGenerator(clone)
      clone = this.objectIdGenerator(clone) // or objectId?

      let parentArray, index
      // if (this.parent && this.parent.children && this.parent.children.length) {
      //     parentArray = this.parent.children
      // } else if (Array.isArray(this.parent)) {
      //     parentArray = this.parent
      // }
      parentArray = this.getParentArray()

      index = (typeof this.index !== 'undefined') ? this.index + 1 : parentArray.length // add next to current compo or at the end
      // console.log(clone)
      parentArray.splice(index, 0, clone)
      // console.log('parentArray', parentArray)

      setTimeout(()=>{
        this.clickAway()
        this.showAddPopover = false //close popover
      }, 300)


    },
    idGenerator(block) {
      if (this.shortId)
        return this.$helper.randomString(6) // first letter should be letter?
      return `${block.component}_${this.$helper.randomString(4).replaceAll('-', '_')}`
    },
    objectIdGenerator(block) { // used for duplicate and paste but not initial editable and add
      if (block instanceof Object) {
        if (!block.id)
          block.id = this.idGenerator(block)

        Object.keys(block).forEach((key, i) => {
          if (key === 'id' && block.component) {
            block.id = this.idGenerator(block)
          }
          else if (key === 'slug' && block.component) {
            block.slug = `__${this.idGenerator(block)}` // __ means it is an inital slug so we can changge it after changing label  __ may cause problem with meta should be removed from slug
          }
          else if (Array.isArray(block[key]) && block[key].length) {
            block[key].forEach((item, index) => {
              block[key][index] = this.objectIdGenerator(block[key][index])
            })
          }
          else if (block[key] instanceof Object) {
            block[key] = this.objectIdGenerator(block[key])
          }
        })
      }
      return block
    },

    Duplicate() {
      let clone = JSON.parse(JSON.stringify(this.block))
      clone = this.objectIdGenerator(clone)

      // clone.id = clone.component + '-' + this.$helper.randomNumber(1, 999)

      // check type as widget or row with children or columns?
      // or make test if it is a an array?
      // or change it to default as array and enter as children then what about attributes from parent
      // or make a block called type editable with children
      // let parentArray = this.getParentArray()

      // if (this.parent && this.parent.children && this.parent.children.length) {
      //     parentArray = this.parent.children
      //     console.log('children from parent')
      // } else if (Array.isArray(this.parent)) {
      //     parentArray = this.parent
      // }

      // console.log(parentArray)
      this.getParentArray().splice(this.index + 1, 0, clone)
    },

    Up() {
      // let clone = JSON.parse(JSON.stringify(this.block))
      this.element = this.$el

      const parentArray = this.getParentArray()

      if (this.index - 1 >= 0) {
        parentArray.splice(this.index, 1)
        parentArray.splice(this.index - 1, 0, this.block)

        console.log('this.element.offsetHeight')
        console.log(this.element.offsetHeight)

        // check when no scroll!!
        setTimeout(() => {
          window.scrollBy(0, -this.element.offsetHeight)
        }, 150)
      }
    },

    Down() {
      // let clone = JSON.parse(JSON.stringify(this.block))
      this.element = this.$el

      const parentArray = this.getParentArray()
      // if (this.parent && this.parent.children && this.parent.children.length) {
      //     parentArray = this.parent.children
      // } else if (Array.isArray(this.parent)) {
      //     parentArray = this.parent
      // }

      if (parentArray.length >= this.index + 2) { // todo: make it computed property is the last
        parentArray.splice(this.index, 1)
        parentArray.splice(this.index + 1, 0, this.block)
        // check when no scroll!!
        console.log('this.element.offsetHeight')
        console.log(this.element.offsetHeight)
        setTimeout(() => {
          window.scrollBy(0, +this.element.offsetHeight)
        }, 150)
      }
    },
    MouseOver() {
      if (!this.options.edit)
        return

      // console.log('hover pare', this.$parent.hover)
      this.hover = true
    },
    getComponent(block) {
      // this.block is not available for root layout (toranj)
      if (!block) {
        console.log('not found block')
        console.log(block)
        return
      }

      if (!block.id)
        block.id = this.idGenerator(block)

      const name = `${block.component}-block`
      const fileName = name // camelcase

      if (ASYNC_TYPES.includes(block.component))
        return () => this.asyncComponent(fileName)
      else
        return name
    },

    applyDrag(arr, dragResult) {
      console.log(dragResult)
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null)
        return

      // const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null)
        itemToAdd = arr.splice(removedIndex, 1)[0]

      if (addedIndex !== null)
        arr.splice(addedIndex, 0, itemToAdd)
    },

    copyToClipboard(str) {
      const el = document.createElement('textarea') // Create a <textarea> element
      el.value = str // Set its value to the string that you want copied
      el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
      el.style.position = 'absolute'
      el.style.left = '-9999px' // Move outside the screen to make it invisible
      document.body.appendChild(el) // Append the <textarea> element to the HTML document
      const selected
                = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
                  ? document.getSelection().getRangeAt(0) // Store selection if found
                  : false // Mark as false to know no selection existed before
      el.select() // Select the <textarea> content
      document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el) // Remove the <textarea> element
      if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
      }
    },

    asyncComponent(name) {
      // return {
      //   component: import(`@/components/fields/${name}.vue` /* webpackChunkName: "components/text" */),
      //   error: {
      //     template: '<div>Error in Loading, Reload page.</div>'
      //   },
      //   loading: {
      //     template: '<div>Loading...</div>'
      //   },
      //   // Delay before showing the loading component. Default: 200ms.
      //   delay: 100,
      //   // The error component will be displayed if a timeout is
      //   // provided and exceeded. Default: Infinity.
      //   timeout: 5000
      // }
    },

    // getFieldID(schema, unique = false) {
    //     // const idPrefix = objGet(this.formOptions, "fieldIdPrefix", "");
    //     // return slugifyFormID(schema, idPrefix) + (unique ? "-" + uniqueId() : "");
    //     return 'field-' + this.schema.model.replace('.', '_')
    //
    // },

    // getFieldClasses() {
    //     return objGet(this.schema, "fieldClasses", []);
    // },
  },
  // directives: {
  //     attributes: {
  //         // bind: attributesDirective,
  //         // updated: attributesDirective,
  //         // componentUpdated: attributesDirective
  //     }
  // },
}
