<script>
// https://github.com/jonwatkins/vue-runtime-template-compiler todo: NOT NEED VUE COMPILE VERSION alias remove from nuxt config VERY BIG DECREASE SIZE WITH REMOVVING BUNDLEED VUE
'use strict'
import Vue from 'vue'

// import { compileToFunctions } from 'vue'
// import { mergeAll, merge } from '../utils/helpers'
// import config from '../utils/config'

const config = {
  defaultRuntimeTemplate: '<div></div>',
  defaultCompilerOptions: {
    outputSourceRange: false,
    whitespace: 'preserve',
  },
}

export default {
  inheritAttrs: false,
  props: {
    parent: {
      type: Object,
      default: undefined,
    },
    template: {
      type: String,
      default: config.defaultRuntimeTemplate,
    },
    compilerOptions: {
      type: Object,
      default: () => config.defaultCompilerOptions,
    },
    templateProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isCompiling: false,
      compiled: null,
    }
  },
  computed: {
    componentProps() {
      const data = [
        this.parentData,
        this.parentProps,
        this.parentComponent._provided,
      ]
      return {
        filters: this.parentFilters,
        components: this.parentComponents,
        computed: this.parentComputed,
        methods: this.parentMethods,
        data: () => this.$helper.mergeAll(data),
      }
    },
    parentComponent() {
      return this.parent || this.$parent
    },
    parentData() {
      return this.parentComponent.$data || {}
    },
    parentProps() {
      return this.parentComponent.$props || {}
    },
    parentOptions() {
      return this.parentComponent.$options || {}
    },
    parentComputed() {
      return this.parentOptions.computed || {}
    },
    parentComponents() {
      return this.parentOptions.components || {}
    },
    parentMethods() {
      return this.parentOptions.methods || {}
    },
    parentFilters() {
      return this.parentOptions.filters || {}
    },
  },
  beforeMount() {
    this.compile()
  },
  methods: {
    compile() {
      // const component = Vue.compileToFunctions(this.template, this.compilerOptions)
      const component = Vue.compile(this.template, this.compilerOptions)
      this.compiled = this.$helper.merge(component, this.componentProps)
    },
  },
}
</script>

<template>
  <component :is="compiled" v-if="compiled" />
</template>
