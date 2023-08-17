<script>
// import fieldMixin from '../toranj/fieldMixin'
// import blockMixin from '../toranj/blockMixin'
// const iQuill = () => import('../../helpers/iQuill.vue')

export default {
  // components: {iQuill},
  // mixins: [fieldMixin],
  // name: 'inlineTextBlock',
  // <!-- todo: better type defination for all property -->
  // <!--editor can be either boolean string or object&ndash;&gt;-->
  props: ['name', 'block', 'options', 'tag', 'editor'],
  data() {
    return {
      tagName: 'div',
      editorOptions: {
        theme: 'bubble',
        placeholder: 'TYPE',
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean']],
        },
      },
    }
  },
  created() {
    // this.tag = this.tag || 'div'
    // console.log('editor', this.editor)

    if (!this.tag)
      this.tagName = this.$options._componentTag.replace('-editable', '')// img-ediablt
    else
      this.tagName = this.tag

    if (this.editor && typeof this.editor === 'object')
      this.editorOptions = this.editor // customization
  },
  mounted() {
    // this.$nextTick(() => console.log(this.$refs.done)
    // todo: should be checked to also not be undefined and null  && this.block[this.name] !== undefined
    if (!this.block || (!this.block.hasOwnProperty(this.name))) { // default
      // console.log('no block or noo name so default')
      this.$set(this.block, this.name, '')
      // this way works with input instead of blue and cursor change
      if (Array.isArray(this.$slots.default) && this.$slots.default.length) {
        // this.block[this.name] = this.$slots.default[0].text.trim() //remove \n \t from first and end at least in the beginning
        this.$set(this.block, this.name, this.$slots.default[0].text.trim())
        // console.log('no nono notno')
        // this.$refs.editableBox.innerText = this.$slots.default[0].text.trim()
      }
    }
  },
  methods: {
    Update(eventOrValue) {
      // this.$set(this.block, 'text', event.target.innerText)
      // console.log('updateeditor',this.editor)
      // console.log(eventOrValue)
      let val
      if (!this.editor)
        val = eventOrValue.target.innerText // event
      // console.log('no editor ', val)
      else
        val = eventOrValue // value
      // console.log(' val editor ', val)

      this.$set(this.block, this.name, val)
      this.$emit('update', val) // hook
    },
  },
}
</script>

<template>
  <component
    :is="tagName"
    v-if="!options.edit && editor" key="editor"
    v-html="block[name]"
  />

  <component
    :is="tagName"
    v-else-if="!options.edit && !editor"
    key="not-editor"
  >
    {{ block[name] }}
  </component>

  <component
    :is="tagName"
    v-else-if="options.edit && !editor"
    key="edit-not-editor"
    :contenteditable="true"
    @blur="Update"
  >
    <!--        @blur="$emit('edit', e.target.innerText)" -->
    {{ block[name] }}
  </component>

  <component
    :is="tagName"
    v-else-if="options.edit && editor"
    key="edit-editor"
  >
    <!--        <i-quill -->
    <!--            :content="'hey'" -->
    <!--            :options="editorOptions" -->
    <!--            @edit="Update" -->
    <!--        > -->
    <!--        </i-quill> -->

    <!--        i sun editor is not tested -->
    <client-only>
      <i-sun-editor ref="sunEditor" :value="block[name]" @input="Update" />
    </client-only>
  </component>
</template>

<style scoped>
[contenteditable="true"]:focus {
    outline: none;

}

[contenteditable="true"] {
    cursor: text;
}

[contenteditable="true"]:hover {
    box-shadow: inset 1px -1px 1px #ddd;
}
</style>
