<script>
export default {
  props: ['name'],

  data() {
    return {
      // isActive: false
    }
  },
  created() {

  },
  methods: {
    // Select(){
    //     this.$parent.selected=this.name
    // }
  },
}
</script>

<template>
  <div :class="$parent.selected == name ? $parent.activeClass : ''" @click="$parent.Select(name)">
    <slot />
  </div>
</template>
