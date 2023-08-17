<script>
import fieldMixin from '../fieldMixin'
import formulaFunctions from '../formulaFunctions'

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
    const settings = [{
      slug: 'futureOnly',
      label: 'Future Only',
      component: 'checkbox',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'Only future dates can be selected',
      // 'showIf': {"slug": "type", "value": 'number'}
    },
    {
      slug: 'relativeMin',
      label: 'Min days forward',
      component: 'input-text',
      type: 'number',
      append: 'Days',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'e.g. At least 2 days from today',
      showIf: 'futureOnly',
    },
    {
      slug: 'relativeMax',
      label: 'Max days forward',
      component: 'input-text',
      type: 'number',
      append: 'Days',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'e.g. Maximum 30 days from to day',
      showIf: 'futureOnly',
    },
    {
      'slug': 'disabledWeekdays',
      'label': 'Disable Week Days',
      'component': 'checkbox',
      'buttons': true,
      // stacked: true,
      'button-variant': 'outline-dark',
      'size': 'xs',
      'values': [{ text: 'Sun', value: 0 }, { text: 'Mon', value: 1 }, { text: 'Tue', value: 2 }, {
        text: 'Wed',
        value: 3,
      }, { text: 'Thu', value: 4 }, { text: 'Fri', value: 5 }, { text: 'Sat', value: 6 }],
      'description': 'Users can not choose these days',
      // 'showIf': {"slug": "type", "value": 'number'}
    },
    {
      slug: 'min',
      label: 'Min Date',
      component: 'date',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'Selected date can not be before this date',
      // 'showIf': {"slug": "type", "value": 'number'}
    },
    {
      slug: 'max',
      label: 'Max Date',
      component: 'date',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'Selected date can not be after this date',
      // 'showIf': {"slug": "type", "value": 'number'}
    },
    {
      slug: 'disabledDates',
      label: 'Other Disable Dates',
      component: 'textarea-array',
      placeholder: '2025-05-21\n2025-06-31',
      // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
      description: 'One per line, YYYY-MM-DD ',
      // 'showIf': {"slug": "type", "value": 'number'}
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
      // 'showIf': {"slug": "type", "value": 'number'}
    },
    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] } // change in future for better performance
  },
  methods: {
    disabledDates(ymd, date) {
      if (!Array.isArray(this.block.disabledWeekdays))
        this.block.disabledWeekdays = []

      if (!Array.isArray(this.block.disabledDates))
        this.block.disabledDates = []

      const now = new Date()

      if (this.block.futureOnly) {
        const relativeMin = this.block.relativeMin ? formulaFunctions.dateAdd(now, this.block.relativeMin, 'day') : false
        const relativeMax = this.block.relativeMax ? formulaFunctions.dateAdd(now, this.block.relativeMax, 'day') : false
        const yesterday = formulaFunctions.dateAdd(now, -1, 'day')

        if (this.block.relativeMin) {
          if (date < relativeMin)
            return true
        }

        if (this.block.relativeMax) {
          if (date > relativeMax)
            return true
        }

        if (date < yesterday && this.block.futureOnly)
          return true
      }

      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate() // day === 13
      // Return `true` if the date should be disabled
      return this.block.disabledWeekdays.includes(weekday) || this.block.disabledDates.includes(ymd)
    },
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

      <b-form-datepicker
        :id="`${block.id}-input`"
        v-model="value"
        :name="block.slug"
        :required="block.required"
        :size="block.size || options.size"
        :placeholder="block.placeholder || block.label"
        :class="block.inputClasses"
        :min="block.min"
        :max="block.max"
        :readonly="block.readOnly"
        v-bind="$attrs"
        :locale="block.locale || 'en'"
        label-help=""
        direction="ltr"
        :date-disabled-fn="disabledDates"
        @input="input"
      />
      <!--            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" -->
      <div v-if="value" class="text-right ">
        <a
          class="small text-muted" href="#"
          @click.prevent="value = undefined"
        > [Clear]</a>
      </div>

      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
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
