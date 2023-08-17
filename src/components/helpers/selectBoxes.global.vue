<script>
export default {
  props: ['value', 'active-class'],
  // mode: {
  //     type: String,
  // default: 'light'
  // }
  // },

  data() {
    return {
      selected: '', // the index of the selected tab,
    }
  },
  // watch: {
  //     selected(val) {
  //         this.$emit('input', this.selected)
  //     }
  // },
  created() {
    this.selected = this.value
    // this.options = this.$children
  },
  mounted() {
    // this.selectTab(0)
  },
  methods: {
    Select(name) {
      this.selected = (this.selected != name) ? name : '' // unselect
      this.$emit('input', name)
    },
    // selectTab (i) {
    //     this.selectedIndex = i
    //
    //     // loop over all the tabs
    //     this.options.forEach((option, index) => {
    //         option.isActive = (index === i)
    //     })
    // }
  },
}
</script>
<!-- sample usage -->
<!-- <select-boxes active-class="bg-info text-dark" v-model="newPlanId"> -->
<!--    <select-box name="Tab1" class="something" >Hello From Tab 1</select-box> -->
<!--    <select-box name="Tab2">Hello From Tab 2</select-box> -->
<!--    <select-box name="Tab3">Hello From Tab 3</select-box> -->

<!-- </select-boxes> -->
<template>
  <div>
    <!--        {{selected}} -->
    <slot />
  </div>
</template>
