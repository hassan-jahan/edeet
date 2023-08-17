<script>
// import blockMixin from '../toranj/blockMixin'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import fieldMixin from '../fieldMixin'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      settingsForm: {},
      suggestedSlots: [],
      selectedSlot: '',
      day: '',
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
    console.log('this.value', this.value)
    if ((!this.value || typeof this.value === 'undefined' || this.value == '' || this.$helper.isEmptyObject(this.value)) && this.block.slug) {
      this.value = {
        // day: '',
        from: '',
        to: '',
      }
    }

    if (this.value.to) { // set a timeout?
      this.selectedSlot = `${this.value.to},${this.value.from}`
    }

    console.log('this.value2', this.value)
    const settings = [
      {
        slug: 'futureOnly',
        label: 'Future Only',
        component: 'checkbox',
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: 'Only future dates can be selected',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'timezone',
        label: 'Timezone',
        component: 'input-text',
        // 'html': 'Timezon Based on <b>' + this.$helper.clientTimezone() + '</b>',
        default: this.$helper.clientTimezone(),
        description: 'DO NOT CHANGE if you are not sure what to enter. e.g. Asia/Singapore, America/New_York',

      },

      // {
      //     'slug': 'showTimezone',
      //     'label': '',
      //     'component': 'html-field',
      //     'html': 'Timezon Based on <b>' + this.$helper.clientTimezone() + '</b>',
      //     'description': '',
      // },
      // {
      //     'slug': 'tz',
      //     'label': 'Timezone',
      //     'component': 'hidden',
      //     'formula': '"' + this.$helper.clientTimezone() + '"',
      // },
      {
        slug: 'workingFrom',
        label: 'Working From',
        component: 'input-text',
        type: 'time',
        default: '09:00', //  not '9:00'two-digits
      },

      {
        slug: 'workingTo',
        label: 'Working To',
        component: 'input-text',
        type: 'time',
        default: '17:00',
      },
      {
        slug: 'slotDuration',
        label: 'Time for each slot',
        component: 'input-text',
        append: 'Minutes',
        type: 'number',
        default: 30,
      },
      {
        slug: 'enableBuffer',
        label: 'Buffer Time',
        component: 'checkbox',
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: 'Add Rest Time',
        // 'showIf': {"slug": "type", "value": 'number'}
      },
      {
        slug: 'buffer',
        label: 'Rest Time',
        component: 'input-text',
        append: 'Minutes',
        type: 'number',
        description: 'Add a break time after each booking e.g. 15, 120',
        default: 15,
        showIf: { slug: 'enableBuffer', op: 'neq', value: false },
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
    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] } // change in future for better performance
  },
  methods: {
    updateValue(newVal) {
      // newVal = newVal.split(',')
      // this.value.from = parseInt(newVal[0])
      // this.value.to = parseInt(newVal[1])
      this.value = newVal
      // this.value.day =
      // day base on app owner timezone
    },

    changeDay() {
      // '2018-04-04T16:00:00.000Z'
      this.suggestedSlots = []

      console.log('type', this.type)

      this.$axios.get(`types/${this.type.id}/slots/${this.block.slug}/${this.day}?clientTimezone=${this.$helper.clientTimezone()}`).then(
        (res) => {
          this.suggestedSlots = res.data
          // return res.data.balance
        },
      )
    },

    disabledDates(ymd, date) {
      // todo: not sure! should be calculated base on on timezone?

      if (!Array.isArray(this.block.disabledWeekdays))
        this.block.disabledWeekdays = []

      if (!Array.isArray(this.block.disabledDates))
        this.block.disabledDates = []

      const now = new Date()
      if (now > date && this.block.futureOnly)
        return true
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month

      const weekday = date.getDay()
      const day = date.getDate() // day === 13
      // Return `true` if the date should be disabled
      return this.block.disabledWeekdays.includes(weekday) || this.block.disabledDates.includes(ymd)
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

      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>
      {{ value }}
      <b-row>
        <b-col md="auto">
          <b-calendar
            :id="`${block.id}-input`"
            v-model="day"
            :name="block.slug"
            :required="block.required"
            :size="block.size || options.size"
            :class="block.inputClasses"
            :min="block.min"
            :max="block.max"
            :readonly="block.readOnly"
            v-bind="$attrs"
            :locale="block.locale || 'en'"
            label-help=""
            direction="ltr"
            :date-disabled-fn="disabledDates"
            @input="changeDay"
          />
        </b-col>

        <b-col>
          <b-form-group label="">
            <b-form-radio-group
              v-model="selectedSlot"
              :options="suggestedSlots"
              buttons
              button-variant="outline-success"
              stacked
              size="md"
              @change="updateValue"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" -->
      <!--            <div v-if="value.day" class="text-right "><a class="small text-muted" href="#" -->
      <!--                                                     @click.prevent="value = undefined" -->
      <!--            > [Clear]</a></div> -->

      <!--            :readonly="options.edit" -->
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
