<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {}
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

  },
  created() {

  },
  methods: {},
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" v-if="ShowIf(block)" :index="index" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    :scope="scope"
  >
    <!--        TODO: Validation | MORE COMPONENT | Tabs | formgroup inline | floating labels -->

    <b-form-group
      :label-for="`${block.id}-html-field`"
      :disabled="block.disabled"
    >
      <client-only>
        <div v-html="block.html" />

        <!--                <runtime-template :template="'<div>' + block.html + '</div>'"></runtime-template> -->
      </client-only>

      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <span-editable name="label" :block="block" :options="options" :editor="false">
          Enter Label
        </span-editable>
        <span v-if="block.required" class="required">*</span>
      </template>

      <!--            :readonly="options.edit" -->
      <template #description>
        <span-editable name="description" :block="block" :options="options" :editor="true">
          Enter Description
        </span-editable>
        <!--                <span class="required" v-if="block.required">*</span> -->
      </template>
    </b-form-group>

    <!--        <template v-slot:menu-item> -->
    <!--            <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                Upload / Replace -->
    <!--            </b-dropdown-item> -->
    <!--        </template> -->
  </field-wrapper>
</template>

<style>

</style>
