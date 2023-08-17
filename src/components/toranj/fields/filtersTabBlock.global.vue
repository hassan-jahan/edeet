<script>
import fieldMixin from '../fieldMixin'

import filtersTab from '../../helpers/filtersTab.vue'

export default {
  components: { FiltersTab: filtersTab },
  mixins: [fieldMixin],

  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      // usernameOrId: '',
      // isBusy: false,
    }
  },
  watch: {},

  created() {
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
  },
  mounted() {
    if (!Array.isArray(this.value))
      this.value = []
  },
  methods: {

    change(newVal) {
      // doesn't work mayeb we need to watch value (deep)
      if (!this.isDirty) // todo: NOT  tested for all components. For default (with formula) that can be change
        this.isDirty = true
    },
  },
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" :index="index" v-if="ShowIf(block)" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    :settings-form="settingsForm"
    :scope="scope"
  >
    <!--        TODO: Validation | MORE COMPONENT | Tabs | formgroup inline | floating labels -->

    <div v-if="isView" class="form-group toranj-view">
      <div v-if="showViewLabels" class="toranj-label">
        {{ block.label }}:
      </div>

      {{ value }}
    </div>

    <b-form-group
      v-else
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <!--                <span-editable name="label" :block="block" :options="options" :editor="false"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <span v-if="block.required" class="required">*</span>
      </template>

      {{ value }}v
      <FiltersTab :filters="value" :type="block.type" />

      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>

      {{ value }}
    </b-form-group>
  </field-wrapper>
</template>

<style>
/*form-control form-control-sm*/
</style>
