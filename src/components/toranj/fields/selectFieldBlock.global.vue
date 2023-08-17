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
      removeWatch: '',
      removeWatch2: '',

    }
  },

  watch: {
    scope(newVal) {
      this.setValues()
    },
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

    if (this.block.dependsOn) {
      this.removeWatch = this.$watch(`model.${this.block.dependsOn}`, function (newVal, oldValue) {
        this.setValues()
      }, { deep: false })

      this.removeWatch2 = this.$watch(`scope.${this.block.dependsOn}`, function (newVal, oldValue) {
        this.setValues()
      }, { deep: false })
    }
  },
  beforeUnmount() {
    if (this.block.dependsOn) {
      this.removeWatch()
      this.removeWatch2()
    }
    console.log('watcher removed for slug')
  },
  methods: {
    change() {
      // console.log('value type changed', this.scope,)
      // console.log('types', this.types, 'val', this.value, 'mmodel', this.model, 'objeget', objGet(this.model, this.block.slug))
      // this.$set(this.scope, this.block.slug + '_data', this.$helper.findOneObjectInArray(this.types, this.block.idField || 'id', objGet(this.model, this.block.slug)))

      if (!this.isDirty)
        this.isDirty = true
    },
    setValues() {
      let typeIdOrSlug = ''
      if (this.block.typeIdOrSlug)
        typeIdOrSlug = this.block.typeIdOrSlug

      // console.log('set values select field', typeIdOrSlug, this.block, objGet(this.scope, this.block.dependsOn))
      console.log('set333', this.scope, this.block.dependsOn, objGet(this.scope, this.block.dependsOn))
      console.log('set333', this.scope, this.block.dependsOn, this.calculate(this.block.dependsOn), this.calculate(this.block.dependsOn, true))
      console.log('set333 slug', this.scope, this.block.dependsOn, this.calculate('slug'), this.calculate('slug', true))
      // console.log('set33344', objGet(this.scope, 'test.id'))
      // console.log('set33344', objGet(this.scope, 'test'))

      // depends on means slug model of typeid or scope field

      if (!typeIdOrSlug && this.block.dependsOn) {
        const typeIdOrSlugOrpostFields = this.calculate(this.block.dependsOn)
        if (Array.isArray(typeIdOrSlugOrpostFields))
          this.block.values = typeIdOrSlugOrpostFields // faster
        else
          typeIdOrSlug = typeIdOrSlugOrpostFields
      }
      console.log('set values select field444', typeIdOrSlug, this.block, this.calculate(this.block.dependsOn), this.calculate(this.block.dependsOn, true))

      if (typeIdOrSlug) {
        this.$axios.get(`/types/${typeIdOrSlug}`).then(
          (res) => {
            this.block.values = this.$helper.makeDropdownList(res.data.postFields, 'label', this.block.idField || 'slug')
            this.isLoaded = true
          },
        )
      }
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
