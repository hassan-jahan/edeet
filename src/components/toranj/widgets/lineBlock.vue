<script>
import blockMixin from '../blockMixin'

const iQuill = () => import('../../helpers/iQuill.vue')

export default {
  components: { IQuill: iQuill },

  mixins: [blockMixin],
  props: {
    // tag: {
    //   type: String,
    //   default: 'div'
    // },
  },
  // inheritAttrs: false,

  data() {
    return {}
  },
  mounted() { // it's ok no problem with created SSR
    // this.$nextTick(() => console.log(this.$refs.done)
    if (!this.block.text) { // default
      // this way works with input instead of blue and cursor change
      if (Array.isArray(this.$slots.default) && this.$slots.default.length)
        this.block.text = this.$slots.default[0].text.trim() // remove \n \t from first and end at least in the beginning
      // this.$refs.editableBox.innerText = this.$slots.default[0].text.trim()
    }
    // else {
    // this.$nextTick(function () {
    //   this.$refs.editableBox.innerText = this.block.text
    // })
    // this.$refs.editableBox.innerText = this.block.text
    // }
    // console.log('this.block.text')
    // console.log(this.block.text)
    // this.$slots.default.forEach(slot => {
    //                 this.$slots.default[0]
    //             })
    // //todo: use id not class
    // const slots = this.$el.getElementsByClassName('slot-wrapper')
    // if (slots && slots.length) {
    //   this.block.html = slots[0].innerHTML
    //   console.log(slots[0].innerHTML)
    // } //bug may have several children?
    // }

    //       console.log('this.$slots')
    // //check if exists or use HTML!
    // //             this.$slots.default.forEach(slot=>{
    // //                 this.$slots.default[0]
    // //             })
    // //             this.value = this.$slots.default[0].text   //bug may have several children?
    //       console.log(this.$el.innerHTML)
    //       console.log(this.$el.outerHTML)
  },
  methods: {
    update(event) {
      // this.$set(this.block, 'text', event.target.innerText)
      this.block.text = event.target.innerText
      // this.this.$emit('update', event.target.innerText)
    },
    setValue() {
      if (!this.block.text) { // default
        // this way works with input instead of blue and cursor change
        if (Array.isArray(this.$slots.default) && this.$slots.default.length) {
          this.block.text = this.$slots.default[0].text.trim() // remove \n \t from first and end at least in the beginning
          // this.$nextTick(function () {
          this.$refs.editableBox.innerText = this.$slots.default[0].text.trim()
          // })
        }
      }
      else {
        // this.$nextTick(function () {
        this.$refs.editableBox.innerText = this.block.text
        // })
        // this.$refs.editableBox.innerText = this.block.text
      }
    },
  },
}
</script>

<template>
  <!--    <widget-wrapper :block="block" :parent="parent" :index="index" :options="options" :footer-add="false" -->
  <!--                    right-slot-pos="outside" left-slot-pos="outside" -->
  <!--                    :hide-features="[]" -->
  <!--                    style="position: relative; display:inline-block;" -->
  <!--    > -->
  <simpleEditable
    name="text" :block="block" :options="options" :tag="block.tag"
    :editor="false"
  />
  <!--    </widget-wrapper> -->
</template>

<style>
    [contenteditable]:focus {
        outline: none;
    }
</style>
