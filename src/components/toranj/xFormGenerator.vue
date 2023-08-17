<script>
// <!--todo: roadmap
//  done async Component no SSR
//  input field date
//  label and hint header and footer slot
//  css and other fields
//  simple inline validation
//  pagination and grouping
// checklist or multiselect
// persian datepicker
//  -->

import camelCase from 'lodash/camelCase'
import objGet from 'lodash/get'

const ASYNC_TYPES = ['map', 'long-text', 'daterange-fa', 'datepicker', 'datepicker-fa', 'daterange']

// const ASYNC_TYPES = ['map','long-text']

function emptyObject(obj) {
  return Object.values(obj).every(x => (x === null || x === '' || (Array.isArray(x) && !x.length)))
}

export default {
  name: 'XFormGenerator',
  props: ['fields', 'model', 'options', 'xfg', 'errors', 'groupIndex'], // later group
  data() {
    return {
      // loadedComponents: [],
      groups: [],
    }
  },

  created() {
    console.log('thisdasdfields')
    console.log(this.fields)
    this.fields.map((field, index) => {
      const name = `field-${field.type}`
      const fileName = camelCase(name)
      // this.messages[field.model] = ''

      if (ASYNC_TYPES.includes(field.type))
        return field.loadedComponent = () => this.asyncComponent(fileName)
      else
        return field.loadedComponent = name
    })

    this.groups = this.Groupify(this.fields)
    console.log(this.groups)
  },
  beforeCreate() {
    // this.componentInstance = 'Logo'

    // if (process.server)
    //   this.componentInstance = () => this.loadComponent('Loading')
    // else
    //   this.componentInstance = () => this.asyncComponent('components/fields/fieldMap' )
    // console.log(this.fields)

  },

  methods: {
    showIf(field) { // moved to fieldmixin
      // console.log(field.model)

      if (!field.showIf || !field.showIf.model)
        return true

      // console.log('model depnedcy:', this.model[field.showIf.model])
      const currentValue = objGet(this.model, field.showIf.model) // instead this.model[field.showIf.model]
      if ((!field.showIf.op || field.showIf.op.toLowerCase() == 'eq') && currentValue != field.showIf.value)
        return false

      return true
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

    Validate() {
      console.log(this.earray)
      console.log('changed validates')
      this.xerrors = ''
      if (this.value.length == 2) {
        this.xerrors = 'only 2'
        this.$set(this.earray, this.schema.model, 'only 2')

        // this.earray.push(['only 2'])
        // this.earray[this.schema.model].push(['only 2'])
        // this.errors.push()
      }
      else if (this.value.length == 3) {
        this.xerrors = 'this is   3'
        // this.earray.push(['this is   3'])
        // this.earray[this.schema.model].push(['only 3'])
        this.$set(this.earray, this.schema.model, 'only 3')
      }
      else {
        this.xerrors = 'this is not  32'
        // this.earray.push(['this is not  32'])
        this.$set(this.earray, this.schema.model, 'not 2 3')
      }

      this.$emit('update:earray', this.earray)

      console.log(this.earray)
    },
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
        // console.log('chunk', chunk)
        groups.push(chunk)
      })
      console.log(this.groups)
      return groups
    },
    //
    // getComponent(type) {
    //   let name = 'field-' + type
    //   let path = 'components/fields/' + camelCase(name)
    //   console.log(path)
    //
    //   // return name
    //   if (type == 'map') {
    //     console.log('this is map')
    //     console.log(path)
    //     // console.log(this.asyncComponent(path))
    //     return this.asyncComponent(path)
    //   } else {
    //     return name
    //   }
    //
    // },
    asyncComponent(name) {
      return {
        component: import(`@/components/fields/${name}.vue` /* webpackChunkName: "components/text" */),
        error: {
          template: '<div>Error in Loading, Reload page.</div>',
        },
        loading: {
          template: '<div>Loading...</div>',
        },
        // Delay before showing the loading component. Default: 200ms.
        delay: 100,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 5000,
      }
    },
    // loadComponent(name) {
    //   return {
    //     component: import(`@/components/${name}.vue`),
    //     error: require('@/components/Loading')
    //   }
    // },
    // camelCase (str){
    //   return camelCase(str)
    // }
  }
  ,
}
</script>

<template>
  <div class="xfg-group form-group">
    <!-- <no-ssr placeholder="Please Wait..."> -->
    msg22:
    {{ errors }}

    <template v-for="(field, index) in fields">
      <component
        :is="field.loadedComponent" v-show="ShowIf(field)" v-model:errors1="errors" :model="model"
        :key="field.model"
        :value="model[field.model]" :schema="field" :class="`form-group xfg-field xfg-${field.type}`"
        :form-options="options" :xfg="xfg" :index="index" :group-index="groupIndex"
      />
    </template>

    <!-- this is ins: errors: -->
    <!-- &lt;!&ndash;{{errors}}&ndash;&gt; -->
    <!-- {{earray}} -->

    <!-- <component :is="componentInstance" :model="model" :value="model[fields[0].model]" :schema="fields[0]" -->
    <!-- :formOptions="options" :xfg="xfg"></component> -->

    <!-- </no-ssr> -->
  </div>
</template>

<style>
.xfg-field .required {
    color: #ff9900;
    margin: 0 3px;
  }

  .xfg-group .invalid {
    color: red !important;
  }

  /*.xfg-field{*/
  /*margin-bottom: 1rem;*/
  /*}*/

  /*.xfg-field .hint {*/
  /*font-size: 0.8rem;*/
  /*}*/

  /*.xfg-label {*/
  /*display: block;*/
  /*margin-bottom: .5rem;*/
  /*}*/
</style>
