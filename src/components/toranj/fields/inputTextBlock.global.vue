<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin], // for testing
  inheritAttrs: false,
  props: ['type'],

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

      {
        slug: 'type',
        label: 'Validation Type',
        component: 'select',
        // 'values': [{text: 'Email', value: 'email'}, {text: 'Number', value: 'number'}, {
        //     text: 'Large',
        //     value: 'lg'
        // }],
        values: ['text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'datetime',
          'range',
          'color',
          'month',
          'week',
          'hidden',
        ],
        // 'default': 'info',
        description: '',
        // 'size': 'sm',
        // 'stacked': true,

      },

      // {
      //     'slug': 'default',
      //     'label': 'Default Value',
      //     'component': 'input-text',
      //     'type': 'text',
      //     'description': 'Default value for empty fields',
      // },

      {
        slug: 'min',
        label: 'Min',
        component: 'input-text',
        type: 'number',
        description: '',
        showIf: 'type == \'number\' || type== \'time\' ',
      },
      {
        slug: 'max',
        label: 'Max',
        component: 'input-text',
        type: 'number',
        description: '',
        showIf: { slug: 'type', value: 'number' },

        // 'showIf': []
      },
      { // IMPORTANT: Also copy for input-text with showif
        slug: 'format',
        label: 'Preferred Format',
        component: 'select',
        values: [
          { text: 'Smart (2 days ago)', value: 'relative' },
          { text: '08/16/2018', value: 'MM/DD/YYYY' },
          { text: 'August 16, 2018', value: 'MMMM D, YYYY' },
          { text: '8/16/2018', value: 'M/D/YYYY' },
          { text: 'Aug 16, 2018', value: 'MMM D, YYYY' },
          { text: 'Aug 16, 2018 8:02 PM', value: 'MMM D, YYYY h:mm A' },
          { text: 'August 16, 2018 8:02 PM', value: 'MMMM D, YYYY h:mm A' },
          { text: 'Thu, Aug 16, 2018 8:02 PM', value: 'ddd, MMM D, YYYY h:mm A' },
          { text: 'Thursday, August 16, 2018 8:02 PM', value: 'dddd, MMMM D, YYYY h:mm A' },
        ],
        // 'placeholder': "2025-05-21\n2025-06-31",
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: '',
        showIf: 'type == \'date\' || type == \'datetime\' ',
      },

    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] } // change in future for better performance            //
    // this.commonSettings.children.push()
  },
  methods: {
    input() {
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
      <!--            :label-cols-lg="block.horizental" -->
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

      <!--  block.type not numbers! but pasasword|url and so| -->
      <b-input-group :size="block.size || options.size" :prepend="block.prepend" :append="block.append">
        <b-form-input
          :id="`${block.id}-input`"
          v-model="value"
          :type="block.type || 'text'"
          :name="block.slug"
          :required="block.required"
          :size="block.size || options.size"
          :placeholder="block.placeholder || block.label"
          :list="`${block.id}-suggestions`"
          :class="block.inputClasses"
          dir="auto"
          :minlength="block.minLength"
          :maxlength="block.maxLength"
          :min="block.min"
          :max="block.max"
          :step="block.step || 'any'"
          v-bind="$attrs"
          :readonly="block.readOnly ? true : false"
          :formatter="block.formatter"
          :lazy-formatter="block.lazyFormatter"
          :plaintext="block.plainText || isView"
          no-wheel
          :number="block.type == 'number'"
          :trim="['email', 'url'].includes(block.type)"
          @input="input"
        >
          <!--                    v-bind="block" or $attr -->

          <!--                @blur="Validate" -->
        </b-form-input>
      </b-input-group>

      <datalist v-if="block.values && block.values.length" :id="`${block.id}-suggestions`">
        <option v-for="val in block.values" :key="val">
          {{ val }}
        </option>
      </datalist>
      <!--            :readonly="options.edit" -->
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
