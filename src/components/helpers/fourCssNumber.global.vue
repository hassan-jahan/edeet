<script>
export default {
  name: 'fourCssNumber',
  // mixins: [fieldMixin],
  props: {
    value: {
      // type: Object,
      // default: () => {
      //   return {}
      // },
    },
    label: {
      type: String,
    },
    names: {
      type: Array,
      // default: () => {
      //   return ['', '', '', '']
      // },
    },
    placeholders: {
      type: Array,
      // default: () => {
      //   return ['', '', '', '']
      // },
    },
    // units: {
    //   type: Array,
    //   default: () => {
    //     return ['px', '%', 'em', 'rem', 'vw', {
    //       value: '',
    //       text: '✎',
    //     },]
    //   }, // outside
    // },
    size: {
      type: String,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {

    // value(newVal) {
    //
    // },
  },
  mounted() {

  },
  created() {

  },
  methods: {
    sendValue(index) {
      if (this.value && (this.value[this.names[index]] || this.value[this.names[index]] === '0')) {
        return this.value[this.names[index]]
      } else {
        return ''
      }
    },
    handleUpdate(val, index) {
      // console.log('e', e)
      if (this.value && this.names && this.names[index]) {
        this.$set(this.value, this.names[index], val)
      }
    },
  }
  ,
}
</script>

<template>
  <div
      class="padding-box align-self-center"
      style="border: 1px solid #bbb;width:250px;border-radius: 10px;padding: 8px 5px; margin:5px; "
  >
    <div class="d-flex justify-content-between">
      <div class="text-muted input-xs bg-g2rey m22t-1" style="font-size:.8rem">
        {{ label }}
      </div>
      <css-number
          :value="sendValue(0)"
          @input="handleUpdate($event, 0)"
          class="input-xs"
          placeholder="Top"
      />
      <div class="input-xs"/>
    </div>

    <div class="d-flex justify-content-between">
      <css-number
          :value="sendValue(1)"
          @input="handleUpdate($event, 1)"
          class="input-xs"
          placeholder="Left"
      />
      <css-number
          :value="sendValue(3)"
          @input="handleUpdate($event, 3)"
          class="input-xs"
          placeholder="Right"
      />
    </div>

    <div class="d-flex justify-content-center">
      <css-number
          :value="sendValue(2)"
          @input="handleUpdate($event, 2)"
          class="input-xs"
          placeholder="Bottom"
      />
      <!--      <b-form-input-->
      <!--          v-model="value.paddingBottom" type="text" size="sm"-->
      <!--          placeholder="Bottom" class="input-xs"-->
      <!--      />-->
    </div>
  </div>
</template>

<style >
.input-xs {
  width: 77px;
}
</style>
