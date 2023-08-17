<script>
// import Vue from "vue";

export default {
  name: 'FiltersTab',
  props: {
    type: {},
    filters: [],
  },
  data() {
    return {
      newFilter: {
        op: 'eq',
        // slug: this.type.postFields && this.type.postFields[0] && this.type.postFields[0].slug ? this.type.postFields[0].slug : ''
        slug: this.type.postFields && this.type.postFields[0] && this.type.postFields[0].slug ? this.type.postFields[0].slug : '',
      },
    }
  },
  computed: {
    filterOperations() {
      return [
        { text: '- Operation -', value: '' }, // or null
        { text: 'Equal', value: 'eq' },
        { text: 'One of', value: 'in' },
        { text: 'Greater', value: 'gt' },
        { text: 'Less', value: 'lt' },
        { text: 'Greater equal', value: 'gte' },
        { text: 'Less equal', value: 'lte' },
        { text: 'Not equal', value: 'neq' },
        { text: 'Start', value: 'start' },
        { text: 'Contain', value: 'like' },
        { text: 'End', value: 'end' },
        { text: 'null', value: 'isnull' },
        { text: 'Not null', value: 'notnull' },
        //    has gte in startes with contain
      ]
    },
    filterFields() {
      // teardown bug occure here
      if (!Array.isArray(this.type.postFields))
        return []

      const filterFields = []
      filterFields.push({ text: '- Column -', value: '' })

      this.type.postFields.forEach((field, i) => {
        if (field.component == 'relation' && !field.editable)
          return

        if (typeof field.showIf == 'undefined' || field.showIf) {
          filterFields.push({
            text: this.$options.filters.slice(field.label, 0, 15),
            value: field.slug,
          })
        }
      })

      return filterFields
    },
  },
  methods: {
    addNewFilter() {
      if (!Array.isArray(this.filters))
        this.filters = []

      this.filters.push(this.newFilter)
      this.newFilter = { op: 'eq', slug: '', value: '' }
      // this.$root.$emit('bv::refresh::table', this.type.slug + '-table')
    },
    removeFilter(index) {
      this.filters.splice(index, 1)
      // this.$root.$emit('bv::refresh::table', this.type.slug + '-table')
    },
  },

}
</script>

<template>
  <b-dropdown
    key=" filter-list"
    class="mx-1 "
    size="sm"
    variant="secondary"
    bou2ndary="window"
    bottom
    toggle-class="no-border-bottom-radius"
    lazy
  >
    <template #button-content>
      <span
        v-b-tooltip.ds500="'Filters'" class="iconify bigger"
        data-icon="ant-design:search-outlined"
        data-inline="false"
      />
      <!--                        ci:search-small  ant-design:filter-outlined  bx:filter-alt -->
      Filters
      <span v-if="filters && filters.length" class="badge badge-warning badge-outline rounded">{{ filters.length }}</span>
    </template>

    {{ filters }}
    <div class="p-3">
      <form
        class="d-flex justify-content-between " style="min-width:360px;"
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

        <!--                v-b-tooltip.hover.ds500="'Add Filter'" -->
        <b-btn v-b-tooltip.hover.ds500="'Add Filter'" type="submit" size="xs" variant="outline-success" class="">
          <span class="iconify bi2g" data-icon="dashicons:plus-alt2" data-inline="true" />
        </b-btn>
      </form>
      <div v-if="newFilter.slug" class="text-muted small text-right px-4">
        <small v-if="newFilter.op == 'in'">Separate with ,</small>
        <small v-if="newFilter.op == 'eq'">Case Sensitive</small>
      </div>
    </div>

    <div
      v-for="(filter, index) in filters"
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
  </b-dropdown>
</template>
