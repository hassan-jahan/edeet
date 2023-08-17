<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],

  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      settingsForm: {},
      newPost: '',
      postOptions: [],
      isBusy: false,
    }
  },
  watch: {

  }, // {
  // edit: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // current: {
  //     type: String,
  //     required: true
  // }
  // },

  created() {
    const settings = [
      {
        slug: 'editable',
        label: 'Can be edited',
        component: 'checkbox',
        description: '',
      },
      {
        slug: 'relationTypeId',
        label: 'Related Type',
        component: 'select-type',
        idField: 'id',
        values: [], // maybe to be reactive
        required: true,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      {
        slug: 'relationTitle',
        label: 'Relation Title',
        component: 'input-text',
        type: 'text',
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      {
        slug: 'relationId',
        label: 'Relation ID',
        component: 'slug',
        type: 'text',
        description: '',
        dependsOn: 'relationTitle',
        maxLength: 8,
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      // relationMode
      {
        slug: 'multiple',
        label: 'Multiple Items',
        component: 'checkbox',
        description: '',
      },
      {
        slug: 'relationReverse',
        label: 'Reverse Relation',
        component: 'checkbox',
        description: '',
      },
      //    is it sub content or just related
      //    two sided or not?
    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] } // change in future for better performance
  },
  mounted() {

  },
  methods: {

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
      <!--            @blur="Validate" -->
      <!--                :invalid-feedback="invalidFeedback" -->
      <!--                :valid-feedback="validFeedback" -->
      <!--                :state="state" -->

      <!--            <div class="mb-1"> -->
      <!--                &lt;!&ndash;                <span-editable name="label" :block="block" :options="options">sds</span-editable>&ndash;&gt; -->
      <!--                <label-editable name="label" :block="block" :options="options" :editor="false"> -->
      <!--                    Enter Label -->
      <!--                </label-editable> -->

      <!--            </div> -->

      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <!--                <span-editable name="label" :block="block" :options="options" :editor="false"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <span v-if="block.required" class="required">*</span>
      </template>

      <post-selector :block="block" :parent="parent" :index="index" :options="options" :model="model" :scope="scope" />

      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>
      <!--            value: -->
      <!--            {{ value }} -->
    </b-form-group>

    <!--        <template v-slot:menu-item> -->
    <!--            <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                Upload / Replace -->
    <!--            </b-dropdown-item> -->
    <!--        </template> -->

    <!--        <template v-slot:menu-right> -->
    <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                <span class="iconify big" data-icon="bx:bx-cloud-upload" data-inline="false"></span> -->
    <!--            </b-btn> -->
    <!--        </template> -->
  </field-wrapper>
</template>

<style>
/*form-control form-control-sm*/
</style>
