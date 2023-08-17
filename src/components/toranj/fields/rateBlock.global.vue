<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['type'], //for testing
  inheritAttrs: false,

  data() {
    return {
      settingsForm: {},
    }
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
    // console.log('scccope', this.scope)
    const settings = [

      // {
      //     'slug': 'default',
      //     'label': 'Default Value',
      //     'component': 'input-text',
      //     'type': 'text',
      //     'description': 'Default value for empty fields',
      // },

      {
        slug: 'max',
        label: 'Max Stars',
        component: 'input-text',
        type: 'number',
        min: 3,
        max: 20,
        description: '',
        // 'showIf': []
      },

      {
        slug: 'color',
        label: 'Color',
        component: 'color',
        gradient: false,
        transparent: false,
        preset: 'basic',
        options: ['#ff8800', '#1c5cc6', 'red', 'green'],
        // 'required': true,
        description: '',
      },
      {
        slug: 'showValue',
        label: 'Show Value',
        component: 'checkbox',
        default: false,
        description: '',
      },

    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] } // change in future for better performance            //
    // this.commonSettings.children.push()
  },
  methods: {
    change() {
      if (!this.isDirty)
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
    <div v-if="isView" class="form-group toranj-view">
      <div v-if="showViewLabels" class="toranj-label">
        {{ block.label }}:
      </div>

      {{ value }}
    </div>

    <!--        TODO: Validation | MORE COMPONENT | Tabs -->
    <!--        <div v-if="isView"> -->
    <!--            -->
    <!--        </div> -->
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

      <b-form-rating
        :id="`${block.id}-input`"
        v-model="value"
        :name="block.slug"
        :required="block.required"
        :size="block.size || options.size"
        :stars="block.max"
        v-bind="$attrs"
        :readonly="block.readOnly ? true : false"
        :disabled="block.disabled ? true : false"
        inline
        no22-2border
        :color="block.color || '#ff8800'"
        style="background-color: transparent !important;"

        precision="1"
        :show-value="block.showValue"
        @change="change"
      />

      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <!--                //security risk?? -->
        <p v-html="block.description" />
      </template>
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

</style>
