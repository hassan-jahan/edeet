<!-- fieldAwesome.vue -->
<script>
// import blockMixin from '../toranj/blockMixin'

export default { // parent can be an array or object with children same as action menus
  inheritAttrs: false,
  // mixins: [fieldMixin],
  props: ['block', 'parent', 'index', 'options', 'model', 'scope'],
  data() {
    return {
      isLoaded: false,
    }
  },
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
    setValues() {
      // console.log('typeList011', this.options)

      // if (!this.options.edit)
      //     return

      let relationList = []
      // let typeList = (!this.options || !this.options.typeList || !this.options.typeList.length) ? false : this.options.typeList

      // if (!typeList) {
      this.$axios.get('/relations').then(
        (res) => {
          relationList = this.$helper.makeDropdownList(res.data, 'relationType', 'relationType')
          // this.options.types = res.data
          this.isLoaded = true
          // NOTE: we use slug fo less problem with duplications links and so
          // this.options.typeList = this.$helper.makeDropdownList(res.data, 'title', 'slug')}
          this.block.values = Array.isArray(this.block.values) && this.block.values.length ? this.block.values : []
          this.$set(this.block, 'values', this.block.values.concat(...relationList))

          // console.log(this.block.values)
        },
      )
      // }
    },
  },

}
</script>

<template>
  <dropdown-block v-if="isLoaded" :block="block" :parent="parent" :index="index" :options="options" :model="model" :scope="scope" />
</template>

<style>

</style>
