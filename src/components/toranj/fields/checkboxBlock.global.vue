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
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
    this.settingsForm.children.push({ // maybe it's html?
      slug: 'values',
      label: 'Options',
      component: 'textarea-array',
      required: false,
      rows: 5,
      description: 'For multiple options, one per line',
      placeholder: 'Option 1\nOption 2',
    })

    // this.settingsForm.children.push({
    //     'slug': 'switch',
    //     'label': 'Enable Switches',
    //     'component': 'checkbox',
    //     'required': false,
    //     'description': '',
    // })

    // if (!this.block.values || !this.block.values.length) {
    //     this.$set(this.block, 'values', ['Option 1', 'Option 2'])
    // }
  },
  methods: {},
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
    <!--        TODO: FIX Label on click or disable somehow to no loss focus on typing | Validation | MORE COMPONENT | Tabs -->
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
      <template v-if="Array.isArray(block.values) && block.values.length">
        <template slot="label">
          <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
          <span-editable name="label" :block="block" :options="options" :editor="false">
            Enter Label
          </span-editable>
          <span v-if="block.required" class="required">*</span>
        </template>

        <!--  block.type not numbers! but pasasword|url and so| -->
        <b-form-checkbox-group
          :id="`${block.id}-input`"
          v-model="value"
          :options="block.values"
          :stacked="block.stacked"
          :buttons="block.buttons"

          :button-variant="block['button-variant'] ? block['button-variant'] : 'outline-black'"
          :switches="block.hasOwnProperty('switch') ? block.switch : true"
          :name="block.slug"
          :required="block.required"
          :size="block.size || options.size"
          :value="block.hasOwnProperty('value') ? block.value : true"
          :unchecked-value="block.hasOwnProperty('uncheckedValue') ? block.uncheckedValue : false"
          :class="block.inputClasses"
          :disabled="block.disabled"

          :plain="block.plain "
          v-bind="$attrs"
        />
      </template>

      <b-form-checkbox
        v-else
        :id="`${block.id}-input`"
        v-model="value"
        :name="block.slug"
        :required="block.required"
        :size="block.size || options.size"
        :value="block.hasOwnProperty('value') ? block.value : true"
        :unchecked-value="block.hasOwnProperty('uncheckedValue') ? block.uncheckedValue : false"
        :class="block.inputClasses"
        :disabled="block.disabled"
        :switch="block.hasOwnProperty('switch') ? block.switch : true"

        :plain="block.plain "
        v-bind="$attrs"
      >
        <!--                <span-editable @click.prevent="" name="label" :block="block" :options="options" :editor="true"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <span v-if="block.required" class="required">*</span>
      </b-form-checkbox>
      <!--            :value="block.value || true" -->
      <!--            :unchecked-value="block.value || false " -->
      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />

        <!-- <span class="required" v-if="block.required">*</span> -->
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
