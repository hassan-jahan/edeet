<script>
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
  computed: {},
  mounted() {

    // this.type = this.options.type
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
    <b-form-group
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
      >
        <template #button-content>
          <span
            v-b-tooltip.ds500="'value'" class="iconify bigger"
            data-icon="ant-design:search-outlined"
            data-inline="false"
          />
          <!--                        ci:search-small  ant-design:filter-outlined  bx:filter-alt -->
          {{ block.label }}
          <span v-if="value && value.length" class="badge badge-warning badge-outline rounded" />
        </template>

        <!--                <b-tabs content-class="m-3" fill lazy v-model="tabIndex" small pills > -->
        <!--                    <b-tab title="Simple"> -->
        <form class="d-flex p-3" style="">
          <b-form-fieldset label="Formula">
            <b-form-textarea
              v-model="value"
              :rows="3"
              spellcheck="true"
            />
            <!--                        <template slot="description"> -->
            <!--                            e.g. aFieldSlug > 10 -->
            <!--                        </template> -->
          </b-form-fieldset>
        </form>

        <!--                        <div class="dropdown-item px-3 d-flex al22ign-items-center jus22tify-content-between" -->
        <!--                             v-for="(filter, index) in value" :key="filter.slug" -->
        <!--                        > -->

        <!--                            <b-form-select v-model="filter.slug" :options="filterFields" size="sm" -->
        <!--                                           :required="true" -->
        <!--                                           dir="auto" -->
        <!--                                           @change="(val) => newFilter.field = $helper.findOneObjectInArray(type.postFields, 'slug', val)" -->
        <!--                            > -->
        <!--                            </b-form-select> -->

        <!--                            <b-form-select v-model="filter.op" :options="filterOperations" size="sm" -->
        <!--                                           :required="true" -->
        <!--                                           dir="auto" -->
        <!--                                           style="max-width: 65px;" -->

        <!--                            > -->
        <!--                            </b-form-select> -->

        <!--                            <b-form-input v-model="filter.value" size="sm" :required="true" -->
        <!--                                          dir="auto" -->
        <!--                                          debounce="1000" -->
        <!--                            ></b-form-input> -->

        <!--                            <b-btn @click="removeFilter" size="xs" variant="outline-danger" class=""> -->
        <!--                                <span class="iconify bi2g" data-icon="dashicons:minus" data-inline="true"></span> -->
        <!--                            </b-btn> -->

        <!--                        </div> -->
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
