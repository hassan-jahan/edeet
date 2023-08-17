<!-- fieldAwesome.vue -->
<script>
import objGet from 'lodash/get'
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin], // parent can be an array or object with children same as action menus
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'model', 'scope'],
  data() {
    return {
      isLoaded: false,
      types: [],
    }
  },

  // watch: { //use change instead
  //     value(newVal) {
  //         setTimeout(() => {
  //             console.log('valude changed ' + newVal)
  //             this.$set(this.scope, this.block.slug + '_data', this.$helper.findOneObjectInArray(this.types, this.block.idField || 'id', newVal))
  //         }, 1000)
  //
  //     }
  // }
  // ,
  mounted() {
    // let typeList = (!this.options || !this.options.typeList) ? [] : this.options.typeList

    this.setValues()
    // this.block =  {
    // 'slug': 'type',
    // 'label': 'Form Type',
    // 'component': 'dropdown',
    // 'values': [{text: 'Simple Custom Form', value: '_custom'}, {
    //     text: '-- Pre-made Form Type --',
    //     value: '',
    //     disabled: true,
    // }].concat(...typeList), //dynamic ...
    // // 'default': '_custom',
    // // 'required': false,
    // // 'description': 'Use pre-made form for current types or choose simple custom form',
    // 'description': 'Enter type ID for a pre-made form or leave it bank to create your own form',
    // },
  },
  methods: {
    change() {
      console.log('value type changed', this.scope)
      console.log('types', this.types, 'val', this.value, 'mmodel', this.model, 'objeget', objGet(this.model, this.block.slug))
      this.$set(this.scope, `${this.block.slug}_data`, this.$helper.findOneObjectInArray(this.types, this.block.idField || 'id', objGet(this.model, this.block.slug)))

      if (!this.isDirty)
        this.isDirty = true
    },
    setValues() {
      console.log('typeList011', this.options)

      // if (!this.options.edit)
      //     return

      let typeList = []
      // let typeList = (!this.options || !this.options.typeList || !this.options.typeList.length) ? false : this.options.typeList

      console.log('typeList', typeList)
      // if (!typeList) {
      this.$axios.get('/types?orderByDesc=id').then(
        (res) => {
          typeList = this.$helper.makeDropdownList(res.data, 'title', this.block.idField || 'id')
          this.options.types = res.data
          this.types = res.data
          this.isLoaded = true
          // NOTE: we use slug fo less problem with duplications links and so
          // this.options.typeList = this.$helper.makeDropdownList(res.data, 'title', 'slug')}
          this.block.values = Array.isArray(this.block.values) && this.block.values.length ? this.block.values : []
          this.$set(this.block, 'values', this.block.values.concat(...typeList))

          console.log('thisvale', this.value)

          if (this.value)
            this.$set(this.scope, `${this.block.slug}_data`, this.$helper.findOneObjectInArray(this.types, this.block.idField || 'id', objGet(this.model, this.block.slug)))

          // console.log(this.block.values)
        },
      )
      // }
    },
  },

}
</script>

<template>
  <dropdown-block
    v-if="isLoaded" :block="block" :parent="parent" :index="index" :options="options" :model="model"
    :scope="scope" @change="change"
  />
</template>

<style>

</style>
