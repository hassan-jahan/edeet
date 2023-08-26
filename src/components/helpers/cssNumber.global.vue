<script>
export default {
  name: 'cssNumber.global.vue',
  // mixins: [fieldMixin],
  props: ['value', 'units', 'size'],
  data() {
    return {
      tempValue: '',
      tempUnit: 'px',
      customValue: '',
    }
  },
  watch: {

    // value(newVal) {
    //
    // },
  },
  computed: {},
  mounted() {
    this.initial(this.value)
  },
  created() {
    // console.log('ghiddd', this.value)
    // if (this.value) {
    //   this.tempUnit = this.value.toString().match(/[a-zA-Z]+/)
    //   if (Array.isArray(this.tempUnit)) {
    //     this.tempUnit = this.tempUnit[0]
    //   }
    //   this.tempValue = this.value.toString().match(/[0-9]+/)
    //   if (Array.isArray(this.tempValue)) {
    //     this.tempValue = this.tempValue[0]
    //   }
    //
    //   if (!this.tempValue && this.tempUnit){
    //     this.tempValue = this.tempUnit
    //     this.tempUnit = ''
    //   }
    //
    // }
  },
  methods: {
    initial(newVal) {
      // console.log('newVal nit', newVal)
      if (newVal || newVal === 0) {
        const unitPart = newVal.toString().match(/[a-zA-Z]+/)
        console.log('unitPart', unitPart, this.units)
        if (Array.isArray(unitPart)) {
          console.log('unit part is array')
          if (this.units.includes(unitPart[0])) {
            console.log('includes')
            this.tempUnit = unitPart[0]
            const numPart = newVal.toString().match(/[0-9]+/)
            console.log('numPart', numPart)
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
  }
  ,
}
</script>

<template>
  <b-input-group :size="size" v-bind="$attrs" class="">
    <b-form-input
        v-if="tempUnit"
        v-model="tempValue" type="number" size="sm" @input="updateValue" step="any"
    />

    <b-form-input
        v-else
        v-model="customValue" type="text" size="sm" @input="updateValue"
    />

    <template #append>
<!--      better unit props -->
      <dropdown-selector
          v-model="tempUnit" class="float-right" size="xs" variant="dark" right :options="units" @input="updateValue"
      />

      <!--      @change="(val) => newFilter.field = $helper.findOneObjectInArray(type.postFields, 'slug', val)"-->
      <b-form-select
          v-model="tempUnit" :options="units" size="sm"
          class="cssNumberSelector"
          @input="updateValue"
      />

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
