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
      dataTemp: {},
    }
  },

  watch: {
    value(newVal) {
      if (!newVal)
        this.value = []
    },
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
    if (typeof this.value === 'undefined' || this.value == '' || this.$helper.isEmptyObject(this.value) || this.value === null)

      this.value = []
    // this.value = [{
    //     'slug': 'title',
    //     'label': 'Title',
    //     'component': 'input-text',
    //     'required': true,
    //     'description': '',
    // },
    // {
    //     'slug': 'slug',
    //     'label': 'Slug',
    //     'component': 'slug',
    //     'classes': '',
    //     // 'prepend': this.$options.filters.appURL(this.$currentApp, true),
    //     // 'append': '',
    //     // 'required': true,
    //     'description': '',
    //     'size': 'md',
    //     'exclude': '/:',
    //     'lower': true,
    //
    // },
    // ]
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
      <div class="toranj-label">
        {{ block.label }}:
      </div>

      [Form Builder]
    </div>

    <div v-if="options.edit" class="text-center big text-muted p-3">
      <!--            <div class="small text-22right mb-1">Admin Field</div> -->

      [{{ block.label || block.slug }}]
      <div class="small mt-1">
        Form Designer
      </div>
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

      <form :id="`${block.id}-input`" action="" :name="block.slug">
        <formFields
          :model="dataTemp"
          :block="{ id: `${block.id}__fields`, children: value }"
          :parent="value" :index="index"
          :scope="scope"
          :options="{ ...options, edit: true }"
          class="p-3"
        />
      </form>

      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <!--                //security risk?? -->
        <p v-html="block.description" />
      </template>
    </b-form-group>

    <template #menu-right>
      <!-- todo: use this form deisgner for default fields of it  -->

      <!--            Add Default Field -->
      <!--            <b-btn size="sm" :id="'add-field-' + block.id" -->
      <!--                   @click.prevent="$root.$emit('bv::show::popover', 'add-field-' + block.id)" -->
      <!--            > -->
      <!--                <span class="iconify" data-icon="dashicons:plus-alt2" data-inline="true"></span> Add Default Field -->
      <!--            </b-btn> -->

      <b-btn
        size="sm"
        @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
      >
        <span class="iconify" data-icon="ic:baseline-settings" data-inline="true" />
      </b-btn>
      <!--            should always be bottom of co -->
      <addFieldPopover :target-id="`add-field-${block.id}`" :block="block" :parent="value" />
    </template>
  </field-wrapper>
</template>

<style>

</style>
