<!-- fieldAwesome.vue -->
<script>
// import blockMixin from '../toranj/blockMixin'

export default { // parent can be an array or object with children same as action menus
  inheritAttrs: false,
  // mixins: [fieldMixin],
  props: ['block', 'parent', 'index', 'options', 'model', 'scope'],
  data() {
    return {}
  },
  created() {

    //      hideNoneSelectedText
  },
}
</script>

<template>
  <radio-block
    v-if="block.values && block.values.length <= 4 " :block="block" :parent="parent" :index="index"
    :options="options" :model="model" :scope="scope"
  />

  <dropdown-block v-else :block="block" :parent="parent" :index="index" :options="options" :model="model" :scope="scope" />
</template>

<style>

</style>
