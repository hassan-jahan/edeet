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

    // this.type = this.options.type
  },
  methods: {
    changeFormula() {

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
          <span v-if="value && value.length" class="badge badge-warning badge-outline rounded">{{ value.length }}</span>
        </template>

        <!--                <b-tabs content-class="m-3" fill lazy v-model="tabIndex" small pills > -->
        <!--                    <b-tab title="Simple"> -->
        <form
          class="d-flex justify-content-between p-3" style="min-width:320px;"
          @submit.prevent="addNewFilter"
        >
          <b-form-select
            v-model="newFilter.slug" :options="filterFields" size="sm"
            :required="true"
            dir="auto"

            @change="(val) => newFilter.field = $helper.findOneObjectInArray(type.postFields, 'slug', val)"
          />

          <b-form-select
            v-model="newFilter.op" :options="filterOperations" size="sm"
            :required="true"
            dir="auto"

            style="max-width: 65px;"
          />

          <b-form-input
            v-model="newFilter.value" size="sm" :required="true"
            dir="auto"
          />

          <b-btn
            v-b-tooltip.hover.ds500="'Remove Filter'" type="submit" size="xs" variant="outline-success"
            class=""
          >
            <span class="iconify bi2g" data-icon="dashicons:plus-alt2" data-inline="true" />
          </b-btn>
        </form>

        <div
          v-for="(filter, index) in value"
          :key="filter.slug" class="dropdown-item px-3 d-flex al22ign-items-center jus22tify-content-between"
        >
          <b-form-select
            v-model="filter.slug" :options="filterFields" size="sm"
            :required="true"
            dir="auto"
            @change="(val) => newFilter.field = $helper.findOneObjectInArray(type.postFields, 'slug', val)"
          />

          <b-form-select
            v-model="filter.op" :options="filterOperations" size="sm"
            :required="true"
            dir="auto"
            style="max-width: 65px;"
          />

          <b-form-input
            v-model="filter.value" size="sm" :required="true"
            dir="auto"
            debounce="1000"
          />

          <b-btn size="xs" variant="outline-danger" class="" @click="removeFilter">
            <span class="iconify bi2g" data-icon="dashicons:minus" data-inline="true" />
          </b-btn>
        </div>
        <!--                    </b-tab> -->

        <!--                    <b-tab title="Formula"> -->
        <!--                        <b-form-fieldset label="Formula"> -->
        <!--                            <b-form-textarea -->
        <!--                                -->
        <!--                                v-model="formula" -->
        <!--                                :rows="3" -->
        <!--                                spellcheck="true" -->
        <!--                                @change="changeFormula" -->
        <!--                            /> -->
        <!--                        </b-form-fieldset> -->
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
