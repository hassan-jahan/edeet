<script>
function emptyObject(obj) {
  return Object.values(obj).every(x => (x === null || x === '' || (Array.isArray(x) && !x.length)))
}

export default {
  name: 'VfgPages',
  props: ['fields', 'model', 'options', 'xfg', 'errors'], // later group
  data() {
    return {
      // loadedComponents: [],
      groups: [],
      tabIndex: 0,
    }
  },

  created() {
    //
    //       this.fields.map((field, index) => {
    //         let name = 'field-' + field.type
    //         let fileName = camelCase(name)
    // // this.messages[field.model] = ''
    //
    //         if (ASYNC_TYPES.includes(field.type))
    //           return field.loadedComponent = () => this.asyncComponent(fileName)
    //         else
    //           return field.loadedComponent = name
    //       })

    this.groups = this.Groupify(this.fields)
    console.log('gtrop')
    console.log(this.groups)
  },

  methods: {
    Next() {
      this.$root.$emit(`validate::${this.options.id}`, `group__${this.tabIndex}`)

      // validate here
      this.tabIndex++
      this.goToTop()
    },
    Previous() {
      this.tabIndex--
      this.goToTop()
    },

    // Submit(){
    //   this.$root.$emit('validate')
    //
    //   if (emptyObject(this.errors))
    //     alert('success')
    //   else
    //     alert('error')
    //
    //   console.log('msgs')
    //
    // },
    // hasError() {
    //   return (Array.isArray(this.tempErrors[this.schema.model]) && this.tempErrors[this.schema.model].length)
    // },

    Groupify(fields) {
      const breakIndexes = []
      const groups = []
      // add page separator to the top
      if (fields[0].type != 'break')
        fields.unshift({ type: 'break', label: '' })

      // add page separator to the bottom
      if (fields[this.fields.length - 1].type != 'break')
        fields.push({ type: 'break', label: '' })

      fields.map((field, index) => {
        if (field.type == 'break')
          breakIndexes.push(index)
      })

      console.log(breakIndexes)
      breakIndexes.forEach((breakIndex, i) => {
        if (!breakIndexes[i + 1])
          return

        console.log('from', breakIndex)
        console.log('to', breakIndexes[i + 1])
        const chunk = fields.slice(breakIndex, breakIndexes[i + 1])
        console.log('chunk')
        console.log(chunk)
        groups.push(chunk)
      })
      console.log(this.groups)
      return groups
    },
    goToTop() {
      console.log(this)
      const element = this.$el
      const top = element.offsetTop

      window.scrollTo(0, top)
    },
  },
}
</script>

<template>
  <div class="xfg-group form-group">
    <!-- <no-ssr placeholder="Please Wait..."> -->

    {{ errors }}

    <b-tabs v-model="tabIndex" small card>
      <template v-for="(group, index) in groups">
        <b-tab :title="(group[0] && group[0].label) ? group[0].label : `${index + 1}` ">
          <no-ssr placeholder="SSR PLACEHOLDER">
            <x-form-generator :fields="group" :model="model" :options="options" :group-index="index" :errors="[]" />
          </no-ssr>
        </b-tab>
      </template>
    </b-tabs>
    <!-- class="text-center" -->
    <div>
      <b-button-group class="mt-2">
        <b-btn v-show="tabIndex > 0" @click="Previous()">
          Previous
        </b-btn>
        <b-btn @click="Next()">
          Next
        </b-btn>
        <b-btn @click="goToTop()">
          up
        </b-btn>
      </b-button-group>
      <br>
      <span class="text-muted">Current Tab: {{ tabIndex }}</span>
    </div>

    <!-- this is ins: errors: -->
    <!-- &lt;!&ndash;{{errors}}&ndash;&gt; -->
    <!-- {{earray}} -->

    <!-- <component :is="componentInstance" :model="model" :value="model[fields[0].model]" :schema="fields[0]" -->
    <!-- :formOptions="options" :xfg="xfg"></component> -->

    <!-- </no-ssr> -->
  </div>
</template>

<style>

</style>
