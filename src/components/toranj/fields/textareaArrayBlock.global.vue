<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      tempModel: {},
    }
  },
  computed: {
    tempValue: {
      // getter
      get() {
        const val = this.tempModel[this.block.slug]
        let out
        if (val) {
          out = val.split(/\r?\n/).map((item) => {
            const arr = item.split('=')
            if (!arr[1])
              return item
            else
              return { text: arr[0], value: arr[1] }
          })
        }
        else { out = [] }

        return out
      },
      // setter
      set(newVal) {
        // SHould work with meta.sd.path slugs but not tested. because it is slug name (because it is different with main value in this component)
        if (Array.isArray(newVal)) {
          const string = newVal.map((item) => {
            if (item && item.text)
              return `${item.text}=${item.value}`
            else
              return item
          }).join('\n')

          this.$set(this.tempModel, this.block.slug, string)
        }
        else {
          this.$set(this.tempModel, this.block.slug, '')
          // this.tempModel[this.block.slug] = ''
        }
      },
    },
  },
  watch: {
    tempValue(newVal) {
      this.value = newVal
    },
    // "tempModel[tempBlock.slug]"(val){
    //     if (val)
    //         this.value = val.split(/\r?\n/)
    //     this.value = []
    // }
    // temp
  },
  mounted() {
    this.tempModel = { ...this.model }
    this.tempValue = this.value
  },
  created() {
    // this.tempBlock = {...this.block}

  },
  methods: {},
}
</script>

<template>
  <div>
    <textarea-block
      :model="tempModel" :block="block" :parent="parent" :index="index" :options="options"
      :scopoe="scope"
    />
    <!--        {{value}} -->
  </div>
</template>

<style>

</style>
