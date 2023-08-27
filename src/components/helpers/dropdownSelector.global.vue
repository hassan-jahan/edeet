<script>
export default {
  name: 'dropdownSelector.global.vue',
  // mixins: [fieldMixin],
  props: ['value', 'options'],
  data() {
    return {
      selected: {
        text: '',
        value: '',
        html: '',
      },
      tempOptions: {},
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      this.initial(newVal)
    },
  },
  created() {
    if (!Array.isArray(this.options)) {
      return
    }

    this.tempOptions = []
    this.options.forEach((item, i) => {
      // console.log('val', item)
      if (item && !item.value && item.value !== '') {
        this.tempOptions.push({
          text: item,
          value: item,
        })
      } else {
        this.tempOptions.push(item)
      }
    })
  },
  mounted() {
    this.initial(this.value)
  },
  methods: {
    initial(newVal) {
      if (newVal || newVal === '') {
        // console.log('drop down value changed', newVal)
        // if (newVal) {
        const current = this.$helper.findOneObjectInArray(this.tempOptions, 'value', newVal)
        // console.log('2drop down value changed', newVal)

        // console.log('m current lue', current, this.value)

        if (current && (current.value || current.value === '')) {
          this.$set(this.selected, 'value', current.value)
          this.$set(this.selected, 'text', current.text)
          this.$set(this.selected, 'html', current.html)
          // console.log('mounted tiwth value' , this.selected)
        } else {
          this.$set(this.selected, 'value', '')
          this.$set(this.selected, 'text', '')
        }
      }
    },
    changeTo(value, text = '', html = '') {
      this.$set(this.selected, 'value', value)
      this.$set(this.selected, 'text', text)
      this.$set(this.selected, 'html', html)

      this.$emit('input', this.selected.value)
    },

  },
}
</script>

<template>
  <b-dropdown v-bind="$attrs">
    <template #button-content>
      {{ selected.text }}
      <div v-if="selected.html" v-html="selected.html"/>
    </template>

    <b-dropdown-item
        v-for="(option, index) in tempOptions" :key="`dropdown-option-${index}`"
        @click.prevent="changeTo(option.value, option.text, option.html)"
    >
      <template v-if="option.value == value">
        <svg
            style="margin-left:-18px;vertical-align: -0.125em; transform: rotate(360deg);"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"
            data-v-de71b1b8="" data-icon="mdi:check" data-inline="true" class="iconify big"
        >
          <path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/>
        </svg>
      </template>

      {{ option.text }}
      <div v-if="option.html" v-html="option.html"/>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style scoped>

</style>
