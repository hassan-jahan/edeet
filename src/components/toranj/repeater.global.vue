<template>

  <!--    <widget-wrapper :block="block" :parent="[]" :index="index" :options="options" :footer-add="false"-->
  <!--                    right-slot-pos="outside" left-slot-pos="outside"-->
  <!--                    :hide-features="[]"-->
  <!--                    :settings-form="{}"-->
  <!--                    style=""-->
  <!--    >-->

  <div>
<!--    {{ theOptions.edit }} - {{theBlock[name].length}} {{theBlock[name]}}-->
    <draggable
        v-if="theBlock[name] && theBlock[name].length"

        v-model="theBlock[name]"

        group="repeater"
        :class="'toranj-' + name"
        :disabled="!theOptions.edit"
        handle=".widget-drag-handler"
        ghost-class="drop-placeholder"
        tag="div"
    >
      <component
          :is="getComponent(list)"
          v-for="(list, index) in theBlock[name]"
          :key="list.id"
          :block="list"
          :model="model"
          :scope="scope"
          :parent="theBlock[name]"
          :class="'toranj-widget toranj-' + list.component + ' ' + itemClasses +' ' + (list.classes || '')"
          :index="index"
          :options="theOptions"
          :attrs="(index==0) ? $attrs: ''"
      >
        <!--  used only to get default for the first item can also add an if index==0-->
        <slot/>

      </component>

      <div v-if="theOptions.edit && repeatDefault > 1" slot="footer" class="toranj-placeholder-widget px-3 py-1">
        <button
            class="btn btn-circle-sm btn-secondary d-block "
            style="margin-top:0px;"
            v-b-tooltip.hover.top.window.ds850="'Add Block'"
            @click="DuplicateFirstChild"
        >
          <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true"></span>
        </button>
      </div>

    </draggable>

    <div v-else-if="theOptions.edit"><i>Empty section. Delete it and add the section again!</i></div>

    <!--        <template v-slot:menu-right>-->
    <!--            <b-btn size="xs" :class="{'active': block.link}"-->
    <!--                   @click.prevent="$root.$emit('bv::show::modal', 'linker-'+block.id)">-->
    <!--                <span class="iconify big" data-icon="bx:bx-link" data-inline="false"></span>-->
    <!--            </b-btn>-->
    <!--        </template>-->

  </div>
  <!--    </widget-wrapper>-->
</template>

<script>
import blockMixin from './blockMixin'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin], //ONLY for getComponent don't use other methods because of theblock and block differs
  //todo in future remove the.block for editable or get it from parent
  props: {
    name: {
      type: String,
      required: true
    },
    itemClasses: {
      type: String,
    },
    repeatDefault: {
      type: Number,
      default: 1,
    }
  },

  data() {
    return {
      // theBlock: {},
      // theOptions: {},
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
      }
    }
  }
  ,
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
        return this.$parent.block //or this.parent[index]
    }
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

  }
  ,
  created() {
    let defaultComponent

    if (!this.name) {
      console.log('No name is provided for options of repeater ', this.block)
      // name = this.block.component + '-' + this.$helper.randomString(4)
      // this.block[name] = []
    }

    if (this.theBlock && this.$helper.isEmptyObject(this.theBlock[this.name]) && !Array.isArray(this.theBlock[this.name])) { //not defined? build default. to reset to default just remove name from object to make empty list meas to add 'add section'
      this.$set(this.theBlock, this.name, []) //make it a reactive empty array

      defaultComponent = {
        component: 'slot',
      }

      //slot for section or slot for field

      if (defaultComponent) {
        //can be just a simpler loop but for now we prefer to be similar to editable system
        let id = defaultComponent.component + '-' + this.$helper.randomString(4)
        this.theBlock[this.name].push({id: id, ...defaultComponent})

        for (let i = 0; i < this.repeatDefault - 1; i++) {
          id = defaultComponent.component + '-' + this.$helper.randomString(4)
          // defaultComponent = id
          this.theBlock[this.name].push({...this.theBlock[this.name][0], id: id})
        }

        //performance todo to use slot directly
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


//check if exists or use HTML!
//             this.$slots.default.forEach(slot=>{
//                 this.$slots.default[0]
//             })
//             this.value = this.$slots.default[0].text  //bug may have several children?
//             this.value = this.$el.getElementsByClassName("slot-wrapper")[0].innerHTML //bug may have several children?

    // console.log(this.$slots.default)
    // this.value = this.current

  }
  ,
  methods: {
    DuplicateFirstChild() {
      if (!this.theBlock[this.name] || !Array.isArray(this.theBlock[this.name])) {
        console.log('There is nothing to add. Delete the block and add it with default box')
        return
      }

      let clone = JSON.parse(JSON.stringify(this.theBlock[this.name][0]))
      clone = this.objectIdGenerator(clone)

      // clone.id = clone.component + '-' + this.$helper.randomNumber(1, 999)
      this.theBlock[this.name].push(clone)
    }

  }
}
</script>
