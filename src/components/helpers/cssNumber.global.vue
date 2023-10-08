<script>
export default {
  name: 'CssNumber',
  // mixins: [fieldMixin],
  props: {
    value: {
      type: String,
    },
    units: {
      type: Array,
      default: () => {
        return ['px', '%', 'em', 'rem', 'vw', {
          value: '',
          text: '✎',
        },]
      }, // outside
    },
    size: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      tempValue: '',
      tempUnit: 'px',
      customValue: '',
    }
  },
  computed: {},
  watch: {

    // value(newVal) {
    //
    // },
  },
  mounted() {
    this.initial(this.value)
  },
  created() {
    if (this.custom && Array.isArray(this.units)) {
      this.units.push({
        value: '',
        text: '✎',
      })
    }
  },
  methods: {
    initial(newVal) {
      // console.log('newVal nit', newVal)
      if (newVal || newVal === 0) {
        const unitPart = newVal.toString().match(/[a-zA-Z]+/)
        // console.log('unitPart', unitPart, this.units)
        if (Array.isArray(unitPart)) {
          // console.log('unit part is array')
          if (this.units.includes(unitPart[0])) {
            // console.log('includes')
            this.tempUnit = unitPart[0]
            const numPart = newVal.toString().match(/[0-9]+/)
            // console.log('numPart', numPart)
            if (Array.isArray(numPart)) {
              this.tempValue = numPart[0]
              // this.tempUnit = 'px'
            } else {
              this.tempUnit = ''// customValue
              this.customValue = newVal
            }
          } else { // no defined unit
            this.tempUnit = ''
            this.customValue = newVal
          }
        } else { // number only
          this.tempUnit = 'px'
          this.tempValue = newVal
        }
        this.updateValue()
      }
    },
    updateValue(newVal = '') {
      if (this.tempUnit === '') {
        this.$emit('input', this.customValue.toString())
      } else {
        this.$emit('input', this.tempValue.toString() + this.tempUnit)
      }
    }
    ,
  }
  ,
}
</script>

<template>
  <b-input-group :size="size" v-bind="$attrs" class="">
    <b-form-input
        v-if="tempUnit"
        v-model="tempValue" type="number" size="sm" step="any" @input="updateValue"
        :placeholder="placeholder"
    />

    <b-form-input
        v-else
        v-model="customValue" type="text" size="sm" @input="updateValue"
        :placeholder="placeholder"
    />

    <template #append>
      <dropdown-selector
          v-model="tempUnit" class="float-right" size="xs" variant="light" right :options="units" @input="updateValue"
      />

<!--      <b-form-select-->
<!--          v-model="tempUnit" :options="units" size="sm"-->
<!--          class="cssNumberSelector"-->
<!--          @input="updateValue"-->
<!--      />-->
    </template>
  </b-input-group>
</template>

<style scoped>
.cssNumberSelector {
  padding-left: 1px;
  padding-right: 1px;
  color: #666;
  background-image: none
}
</style>
