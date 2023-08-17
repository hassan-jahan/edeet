<script>
import Vue from 'vue'
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  // name: 'conditions',
  props: {
    type: {
      type: Object,
    }, // todo: get type from this.options or global
    // value: {},
  },
  data() {
    return {
      newFilter: {},
      activeTab: 'simple',
      formula: '',

      // type: {},
    }
  },
  computed: {
    filterOperations() {
      return [
        { text: 'equal to', value: 'eq' },

        { text: 'greater than', value: 'gt' },
        { text: 'less than', value: 'lt' },
        { text: 'not equal to', value: 'neq' },
        //    has gte in startes with contain
      ]
    },
    filterFields() {
      if (!Array.isArray(this.type.postFields))
        return []

      const filterFields = []
      filterFields.push({ text: '- Column -', value: '' })

      this.type.postFields.forEach((field, i) => {
        if (field.component == 'relation' && !field.editable)
          return

        if (typeof field.showIf == 'undefined' || field.showIf) {
          filterFields.push({
            text: Vue.options.filters.slice(field.label, 0, 15),
            value: field.slug,
          })
        }
      })

      return filterFields
    },
  },
  mounted() {
    this.formula = this.value

    // this.type = this.options.type
  },
  methods: {
    changeFormula() {
      this.value = this.formula
    },
    addNewFilter() {
      if (!this.value || !Array.isArray(this.value))
        this.value = []

      this.value.push({ ...this.newFilter, field: undefined })
      this.newFilter = { op: '', slug: '', value: '' }
      // this.$root.$emit('bv::refresh::table', this.type.slug + '-table')
    },
    removeFilter(index) {
      this.value.splice(index, 1)
      // this.$root.$emit('bv::refresh::table', this.type.slug + '-table')
    },
  },

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
    <b-form-group
      v-if="type && type.id"
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <b-dropdown
        :key=" block.id "
        class="mx-1 "
        size="sm"
        variant="secondary"
        boundary="window"
        bottom
        :dropleft="block.dropLeft"
        :right="block.right"
      >
        <template #button-content>
          <span
            v-b-tooltip.ds500="'value'" class="iconify bigger"
            data-icon="ant-design:search-outlined"
            data-inline="false"
          />
          <!--                        ci:search-small  ant-design:filter-outlined  bx:filter-alt -->
          {{ block.label }}
          <span v-if="value" class="badge badge-warning badge-outline rounded" />
        </template>

        <!--                <b-tabs content-class="m-3" fill lazy v-model="tabIndex" small pills > -->
        <!--                    <b-tab title="Simple"> -->

        <!--                    </b-tab> -->

        <!--                    <b-tab title="Formula"> -->
        <form action="" class="p-3">
          <b-form-fieldset label="">
            <b-form-textarea
              v-model="formula"
              placeholder="Formula"
              :rows="3"
              spellcheck="true"
              @change="changeFormula"
            />
          </b-form-fieldset>
        </form>
        <!--                    </b-tab> -->
        <!--                </b-tabs> -->
      </b-dropdown>

      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>
    </b-form-group>
  </field-wrapper>
</template>
