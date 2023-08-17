<script>
import blockMixin from '../blockMixin'

export default {
  mixins: [blockMixin], // only for getComponent (blocks are different)
  inheritAttrs: true,
  props: { // no layout no parent
    name: {
      type: String,
      required: true, // we can generate name but when load another name will be generated and we loss data. We can use some kind of hash to to find a name based on code but slot code should be unique so the name is usless currently
    },
    tagName: {
      type: String,
      default: 'div',
    },
    itemClasses: {
      type: String,
    },
    repeatDefault: {
      type: Number,
      default: 1,
    },

  },
  data() {
    return {
      footerHover: true,
      emptyAddWidgetId: '',
      // theBlock: {},
      // theOptions: {},
    }
  },
  computed: {
    theOptions() {
      if (this.options)
        return this.options
      else
        return this.$parent.options
    },

    theBlock() {
      if (this.block)
        return this.block
      else
        return this.$parent.block // or this.parent[index]
    },

    theScope() {
      if (this.scope)
        return this.scope
      else
        return this.$parent.scope // or this.parent[index]
    },

    theModel() {
      if (this.model)
        return this.model
      else
        return this.$parent.model // or this.parent[index]
    },
  },
  created() {
    // console.log('theblock ', this.theBlock)

    // if (!this.block)
    // console.log('parent', this.$parent , this.$parent.block.component)

    this.emptyAddWidgetId = `empty-${this.$helper.randomString(5)}`
    // console.log('slots : ' + this.theBlock.component)
    // console.log(this.$slots.default) //[0]elm is not acceibledon't know why
    // console.log(this.$slots.default[0].data)
    // console.log(this.$slots.default[0].tag)
    // console.log(this.$slots.default[0].children[0].tag)

    let mainSlot = { data: { attrs: {} } }
    let mainSlotChild = { data: { attrs: {} } } // child for a > img or
    let defaultComponent

    if (!this.$slots.default)
      return

    mainSlot = this.$slots.default[0] // incudes: data :{staticClass, attrs and staticStyle}

    let mainAttrs = {}
    if (mainSlot.data && mainSlot.data.attrs)
      mainAttrs = mainSlot.data.attrs // todo: do this for child and static class and maybe tag? to avoid default problem and undefined attrs

    if (!mainSlot.data)
      mainSlot.data = {}
    if (!mainSlot.data.attrs)
      mainSlot.data.attrs = {}

    if (mainSlot.children && mainSlot.children.length) {
      // mainSlotChild = Object.assign(this.$slots.default[0].children[0], mainSlotChild )
      mainSlotChild = this.$slots.default[0].children[0]
      if (!mainSlotChild.data)
        mainSlotChild.data = {}
      if (!mainSlotChild.data.attrs)
        mainSlotChild.data.attrs = {}
    }

    let id = ''
    // this.name = this.name
    if (!this.name)
      console.log('No name is provided for options of following block', this.theBlock)
    // let timeout = setTimeout(() => {
    //     clearTimeout(timeout) //better to use beforeDestroy to clear timeoute but it's ok for 1sec
    //     alert('No name is provided for this editable component: ' + this.theBlock.component)
    // }, 5000)
    // this.name = this.theBlock.component + '-' + this.$helper.randomString(4)
    // this.block[name] = []

    if (this.theBlock && this.$helper.isEmptyObject(this.theBlock[this.name]) && !Array.isArray(this.theBlock[this.name])) { // not defined? build default. to reset to default just remove name from object to make empty list meas to add 'add section'
      this.$set(this.theBlock, this.name, []) // make it a reactive empty array

      if (mainSlot.tag == 'img') {
        // console.log('this is img')
        // console.log(mainSlot.data)
        defaultComponent = {
          id,
          component: 'image',
          src: mainSlot.data.attrs.src || '',
          width: mainSlot.data.attrs.width || '',
          height: mainSlot.data.attrs.height || '',
          imgClass: mainSlot.data.staticClass || '',
        }
        // or ...attrs?
      }

      if (mainSlot.tag == 'a' && mainSlotChild.tag == 'img') {
        defaultComponent = {
          component: 'image',
          src: mainSlotChild.data.attrs.src || '',
          width: mainSlotChild.data.attrs.width || '',
          height: mainSlotChild.data.attrs.height || '',
          imgClass: mainSlotChild.data.staticClass || '',

          link: mainSlot.data.attrs.href || '',
          linkClass: mainSlot.data.staticClass || '',
        }
      }
      else if (mainSlot.tag == 'a' || mainSlot.tag == 'button') {
        // console.log('mainSlot',mainSlot)
        defaultComponent = {
          component: 'button',
          // link: mainAttrs.href || '',

          type: mainSlot.data.staticClass ? mainSlot.data.staticClass.includes('btn') ? 'btn' : 'link' : '',
          text: mainSlotChild.text || '',
          link: mainSlot.data.attrs.href || '',
          classes: mainSlot.data.staticClass || '',
        }
      }

      if (mainSlot.tag == 'li' && mainSlotChild.tag == 'a') {
        console.log('hausd', mainSlotChild)

        const mainSlotChildChild = mainSlotChild.children && mainSlotChild.children.length ? mainSlotChild.children[0] : {}

        defaultComponent = {
          component: 'button',
          text: mainSlotChildChild.text || '',
          isLi: 1,
          link: mainSlotChild.data.attrs.href || '',
          classes: mainSlotChild.data.staticClass || '',
          liClasses: mainSlot.data.staticClass || '',
        }
      }

      if (mainSlot.tag == 'svg' || (mainSlot.data && mainSlot.data.staticClass && (mainSlot.data.staticClass.includes('icon') || mainSlot.data.staticClass.includes('iconify')))) {
        // console.log('mainSlot')
        // console.log(mainSlot)
        defaultComponent = {
          id,
          component: 'svg',

          // imgClass: mainSlot.data.staticClass || '',
        }
        // or ...attrs?
      }

      if (!defaultComponent) { // p h1 h2 etc. editor for anything else
        defaultComponent = {
          component: 'html-tag',
          html: '', // produce default from in their own system || in future you may create it from here
          useDefault: true, // not necessary now for others because there is no default slot for them
        }
      }

      if (defaultComponent) {
        id = `${defaultComponent.component}-${this.$helper.randomString(4)}`
        this.theBlock[this.name].push({ id, ...defaultComponent })

        // performance todo to use slot directly
        setTimeout(() => { // wait to first slot be initilized by html editor or so we can copy its theBlock content!
          for (let i = 0; i < this.repeatDefault - 1; i++) {
            id = `${defaultComponent.component}-${this.$helper.randomString(4)}`
            // defaultComponent = id
            this.theBlock[this.name].push({ ...this.theBlock[this.name][0], id })
          }
        }, 250)
      }

      // const tag = this.$options._componentTag.replace('-editable', '') //img-ediablt
      // switch (tag) {
      //     case 'img' :
      //         id = 'image-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'image',
      //             src: this.$attrs.src || '',
      //             width: this.$attrs.width || '',
      //             height: this.$attrs.height || '',
      //         })
      //         break
      //     case 'form' :
      //         id = 'form-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'form',
      //             action: this.$attrs.action || '',
      //             method: this.$attrs.method || ''
      //         })
      //         break
      //     case 'h1' :
      //     case 'h2' :
      //     case 'h3' :
      //     case 'h4' :
      //     case 'h5' :
      //     case 'h6' :
      //         id = 'html-' + this.$helper.randomString(4)
      //
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'html-tag',
      //             tag: tag,
      //             text: '', //essetnital for reactivity
      //             html: '' //produce default from slots
      //         })
      //         break
      //     case 'p' :
      //         id = 'p-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'html-tag',
      //             tag: tag,
      //             text: '', //essetnital for reactivity
      //             html: '' //produce default from slots
      //         })
      //         break
      //     case 'button' :
      //         id = 'button-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'button',
      //             tag: 'button',
      //             text: '', //essetnital for reactivity
      //             html: '' //produce default from slots
      //         })
      //         break
      //
      //     case 'span' :
      //         id = 'span-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'line',
      //             tag: 'span',
      //             text: '', //essetnital for reactivity
      //             html: '' //produce default from slots
      //         })
      //         break
      //     case 'a' :
      //         id = 'line-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'line',
      //             text: '', //essetnital for reactivity
      //             tag: 'a',
      //             html: '' //produce default from slots
      //         })
      //         break
      //     case 'ul' :
      //         id = 'ul-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'html-tag',
      //             text: '', //essetnital for reactivity
      //             tag: 'ul',
      //             html: '' //produce default from slots
      //         })
      //         break
      //     default :
      //         id = 'htmlonly-' + this.$helper.randomString(4)
      //         this.theBlock[name].push({
      //             id: id,
      //             component: 'html-tag',
      //             text: '', //essetnital for reactivity
      //             tag: 'html-only',
      //             html: '' //produce default from slots
      //         })
      //         break
      // }
    } // else nothing!

    // console.log(this.component)
    // alert(this._name)
    // alert(this.component)
  },
  // mounted() {
  // },
  methods: {
    DuplicateFirstChild() {
      if (!this.theBlock[this.name] || !Array.isArray(this.theBlock[this.name])) {
        console.log('There is nothing to add. Delete the block and add it with default box')
        return
      }

      let clone = JSON.parse(JSON.stringify(this.block[this.name][0]))
      clone = this.objectIdGenerator(clone)

      // clone.id = clone.component + '-' + this.$helper.randomNumber(1, 999)
      this.theBlock[this.name].push(clone)
    },
  },
}
</script>

<template>
  <div
    :is="tagName"
    v-if="Array.isArray(theBlock[name]) && !theBlock[name].length && theOptions.edit"
    class=""
    style=""
  >
    <widget-wrapper
      :block="{ id: emptyAddWidgetId, component: 'empty-add' }" :parent="theBlock[name]" :index="0"
      :options="theOptions" :footer-add="false"
      right-slot-pos="none" left-slot-pos="none"
      :hide-features="[]"
      :settings-form="{}"
      class="toranj-placeholder-widget"
    >
      <!--           todo: hide like footer add / change positin to absoulute or so to remove height -->

      <button
        v-b-tooltip.hover.top.window.ds850="'Add Block Here'"
        class="btn btn-circle-sm btn-secondary "
        style="margin-top:0px;"
        @click.prevent="$root.$emit('bv::show::popover', emptyAddWidgetId)"
      >
        <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true" />
      </button>
      <!--            <a href="#" @click.prevent="$root.$emit('bv::show::popover', 'empty')">ss</a> -->
      <!--            JUST Empty to make open popover work -->
    </widget-wrapper>

    <!-- IMPORTANTT NOTE: BELOW IS EMPTY DO NOTHING JUST A PLACEHOLDER FOR DROPPED ITEMS -->
    <draggable
      v-model="theBlock[name]"
      if="theBlock[name]"
      group="widget"
      :class="`toranj-${name}`"
      :disabled="!theOptions.edit"
      handle=".widget-drag-handler"
      ghost-class="drop-placeholder"
    >
      <!--            :attr2222s="$attrs" -->
      <component
        :is="getComponent(widget)"
        v-for="(widget, index) in theBlock[name]"
        :key="widget.id"
        :block="widget"
        :model="theModel"
        :scope="theScope"
        :parent="theBlock[name]"
        :class="`toranj-widget toranj-${widget.component} ${widget.classes00 || ''}`"
        :index="index"
        :options="theOptions"
      >
        <!--  used only to get default for the first item can also add an if index==0 -->
        <slot v-if="index == 0" class="slot-wrapper" style="display: none" />
      </component>
    </draggable>
  </div>

  <draggable
    v-else-if="theBlock[name] && theBlock[name].length"
    v-model="theBlock[name]"
    group="widget"
    :class="`toranj-${name}`"
    :disabled="!theOptions.edit"
    handle=".widget-drag-handler"
    ghost-class="drop-placeholder"
    :tag="tagName"
  >
    <!--        :attr2222s="$attrs" -->

    <component
      :is="getComponent(widget)"
      v-for="(widget, index) in theBlock[name]"
      :key="widget.id"
      :block="widget"
      :model="theModel"
      :scope="theScope"
      :parent="theBlock[name]"
      :class="`toranj-widget toranj-${widget.component} ${itemClasses} ${widget.classes00 || ''}`"
      :index="index"
      :options="theOptions"
    >
      <!--  used only to get default for the first item can also add an if index==0 -->
      <slot v-if="index == 0" class="slot-wrapper" style="display: none" />
      <!--            <slot v-if="code" class="slot-wrapqper" style="diqqqsplay: none"/> -->
    </component>

    <div v-if="theOptions.edit && repeatDefault > 1" slot="footer" class="toranj-placeholder-widget px-3 py-1">
      <button
        v-b-tooltip.hover.top.window.ds850="'Add Block'"
        class="btn btn-circle-sm btn-secondary d-block "
        style="margin-top:0px;"
        @click="DuplicateFirstChild"
      >
        <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true" />
      </button>
    </div>
  </draggable>

  <!--    Empty section is not require for editable people can add widgets here -->
</template>

<style>
.toranj-placeholder-widget {
    opacity: .6;
    text-align: center;
    min-height: 12px;
    min-width: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*padding: 3px 25px;*/
    /*position: absolute;*/
}

.toranj-placeholder-widget:hover .btn {
    display: block;
}

.toranj-placeholder-widget .btn {
    /*can be override by d-block*/
    display: none;
}
</style>
