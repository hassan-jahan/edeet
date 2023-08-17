<script>
// import fMixin from './fMixin'
import blockMixin from '../blockMixin'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    itemClasses: {
      type: String,
    },
    repeatDefault: {
      type: Number,
      default: 3,
    },
  },

  data() {
    return {
      settingsForm: {
        // component: 'form', children: [
        //     {
        //         'slug': 'text',
        //         'label': 'Text',
        //         'component': 'input-text',
        //         'required': true,
        //         'description': '',
        //     },
        //     {
        //         'slug': 'variant',
        //         'label': 'Color',
        //         'component': 'select',
        //         'values': ['primary', 'secondary', 'info', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
        //         'default': 'info', //todo: foreach map for each block and its settings field
        //         'required': true,
        //         'description': '',
        //         // 'buttons': true,
        //         // 'size': 'sm',
        //         // 'stacked': true,
        //
        //     },
        //     {
        //         'slug': 'size',
        //         'label': 'Size',
        //         'component': 'select',
        //         'values': [{text: 'Small', value: 'sm'}, {text: 'Medium', value: 'md'}, {
        //             text: 'Large',
        //             value: 'lg'
        //         }],
        //         // 'default': 'info', //todo: foreach map for each block and its settings field
        //         'description': '',
        //         'size': 'sm',
        //         // 'stacked': true,
        //
        //     },
        //     {
        //         'slug': 'outline',
        //         'label': 'Outline',
        //         'component': 'checkbox',
        //         'description': '',
        //     },
        //     {
        //         'slug': 'rounded',
        //         'label': 'Rounded',
        //         'component': 'checkbox',
        //         'description': '',
        //     },
        //
        // ]
      },
    }
  },
  computed: {},
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
    let defaultComponent
    // let name = this.name
    if (!this.name)
      console.log('No name is provided for options of repeater ', this.block)
    // name = this.block.component + '-' + this.$helper.randomString(4)
    // this.block[name] = []

    //
    if (this.block && this.$helper.isEmptyObject(this.block[this.name]) && !Array.isArray(this.block[this.name])) { // not defined? build default. to reset to default just remove name from object to make empty list meas to add 'add section'
      this.$set(this.block, this.name, []) // make it a reactive empty array

      defaultComponent = {
        component: 'slot-box',
      }

      // slot for section or slot for field

      if (defaultComponent) {
        // can be just a simpler loop but for now we prefer to be similar to editable system
        let id = `${defaultComponent.component}-${this.$helper.randomString(4)}`
        this.block[this.name].push({ id, ...defaultComponent })

        for (let i = 0; i < this.repeatDefault - 1; i++) {
          id = `${defaultComponent.component}-${this.$helper.randomString(4)}`
          // defaultComponent = id
          this.block[this.name].push({ ...this.block[this.name][0], id })
        }
        // performance todo to use slot directly
        // setTimeout(() => { //wait to first slot be initilized by html editor or so we can copy its block content!
        //     for (let i = 0; i < this.repeatDefault - 1; i++) {
        //         id = defaultComponent.component + '-' + this.$helper.randomString(4)
        //         // defaultComponent = id
        //         this.block[this.name].push({...this.block[name][0], id: id})
        //
        //     }
        // }, 250)
      }
    }

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
  <!--    <widget-wrapper :block="block" :parent="[]" :index="index" :options="options" :footer-add="false" -->
  <!--                    right-slot-pos="outside" left-slot-pos="outside" -->
  <!--                    :hide-features="[]" -->
  <!--                    :settings-form="{}" -->
  <!--                    style="" -->
  <!--    > -->
  <draggable
    v-if="block[name] && block[name].length"

    v-model="block[name]"

    group="repeater"
    :class="`toranj-${name}`"
    :disabled="!options.edit"
    handle=".widget-drag-handler"
    ghost-class="drop-placeholder"
  >
    <component
      :is="getComponent(list)"
      v-for="(list, index) in block[name]"
      :key="list.id"
      :block="list"
      :model="model"
      :scope="scope"
      :parent="block[name]"
      :class="`toranj-widget toranj-${list.component} ${itemClasses} ${list.classes || ''}`"
      :index="index"
      :options="options"
      :attrs="(index == 0) ? $attrs : ''"
    >
      <!--  used only to get default for the first item can also add an if index==0 -->
      <slot />
    </component>
  </draggable>

  <!--        <template v-slot:menu-right> -->
  <!--            <b-btn size="xs" :class="{'active': block.link}" -->
  <!--                   @click.prevent="$root.$emit('bv::show::modal', 'linker-'+block.id)"> -->
  <!--                <span class="iconify big" data-icon="bx:bx-link" data-inline="false"></span> -->
  <!--            </b-btn> -->
  <!--        </template> -->

<!--    </widget-wrapper> -->
</template>

<style>

</style>
