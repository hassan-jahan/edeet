<script lang="ts">
// import {CoolBoxItem, VueCoolBoxSelector} from './../dist/'
import {CoolBoxItem, VueCoolBoxSelector} from 'vue-cool-box-selector'
import 'vue-cool-box-selector/dist/style.css'

import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/ielements.css'
import './assets/ielements-dialog.css'
import '@iconify/iconify'

import toranjComponents from './components/toranj/index'
import edeet from './index.ts'
import edeetBlocks from './blocks.ts'

import helper from './plugins/helper'

import './helper/components'
import './helper/filters'
import {ShadowRoot as ShadowRoot} from './components/helpers/shadow'

// Empty component disable if you use Nuxt
import clientOnly from './components/helpers/clientOnly.vue'

// import compileToHTML from 'vue2html/dist/compile-to-html-d9b06fbe'
import path from 'path'
// Empty component disable if you use Nuxt
import VueServerRenderer from 'vue-server-renderer'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const renderer = require('vue-server-renderer').createRenderer()

// Vue.use(toranjComponents)
Vue.use(edeet, {})
Vue.use(edeetBlocks, {})

Vue.prototype.$helper = helper
Vue.prototype.$currentApp = {settings: {}}
Vue.prototype.$axios = {
  get: (arg1 = '', arg2 = '') => {
  },
  post: (arg1 = '', arg2 = '') => {
  }
}
Vue.prototype.axios = {}
Vue.prototype.axios.defaults = {
  get: (arg1 = '', arg2 = '') => {
  },
  post: (arg1 = '', arg2 = '') => {
  }
}
Vue.prototype.$route = {
  params: {id: '123'},
  query: {id: '123'}
}
Vue.prototype.$auth = {
  settings: {},
  isStaff: () => {
  },
  token: '123'
} // uploader sun-editor
// isStaff

// Async component gallery

// this.$currentApp
Vue.component('ClientOnly', clientOnly)
Vue.component('ShadowRoot', ShadowRoot)

Vue.component('router-link')

// how to release: commit first / create a new tag (maybe from the commit in git log tab) push it with push tag all (you may need create first)
// you can also create release from github simpler but not npm publish

export default {
  name: 'App',
  components: {
    // HelloWorld,
    VueCoolBoxSelector,
    CoolBoxItem,
  },
  data() {
    return {
      selected: 'Item2',
      theApp: {},
      formOptions: {edit: false},
      pageOptions: {
        edit: true,
        sections: [],
        widgets: []
      },
      html: '',
      layout: [],
      model: {},
      scope: {},
      fields: {
        component: 'form',
        children: [
          {
            slug: '_style',
            label: 'Style Builder',
            component: 'style',
          },
          {
            slug: 'settings.description',
            label: 'SEO Description',
            component: 'textarea',
            required: false,
            description: '',
            showIf: '(!settings || !settings.noIndex)',
            // "showIf": {"slug": "settings.noIndex", "op": "neq", "value": true},
            // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
          },
          {
            slug: 'settings.keywords',
            label: 'SEO Keywords (Separate with commas)',
            component: 'textarea',
            required: false,
            maxLength: 150,
            description: '',
            showIf: '(!settings || !settings.noIndex)',

          },

          {
            slug: 'settings.noIndex',
            label: 'Do not allow search engines to index page',
            component: 'checkbox',
            required: false,
            default: true,
            description: '',
            // "switch": true,
          },
          // {
          // "slug": "isPrivate",
          // "label": "test something",
          // "component": "checkbox",
          // "required": false,
          // "description": "",
          // "switch": "1",
          // },
        ],
      },
    }
  },
  methods: {
    getHTML() {
      // this.html = await compileToHTML('./components/toranj/toranj.vue', {
      //   props: {},
      //   // Pass vue-server-renderer's `context`
      //   context: {
      //     'v-model': this.layout,
      //     'class': 'dasht-body',
      //     'options': this.pageOptions,
      //     'scope': this.scope,
      //     'model': this.model,
      //   },
      //   writeToFile: true,
      // })

      let tempEditState = this.pageOptions.edit
      this.pageOptions.edit = false
      setTimeout(() => {
        this.html = this.$refs.toranj.$el.outerHTML
        this.pageOptions.edit = tempEditState
      }, 1000)
    },
  },
  // data:{
  //   selected: 'initialValue',
  // }
}
</script>

<template>
  <div style="background:#e6e6e6">
    <div style="max-width:90%;margin:30px auto;padding: 10px;">
      <div class="browser-container">
        <div class="browser-row">
          <div class="browser-column browser-left">
            <span class="browser-dot" style="background:#ED594A;"/>
            <span class="browser-dot" style="background:#FDD800;"/>
            <span class="browser-dot" style="background:#5AC05A;"/>
          </div>
          <div class="browser-column browser-middle">
            <input type="text" value="https://edeet.me">
          </div>
          <div class="browser-column browser-right">
            <div style="float:right">
              <span class="browser-bar"/>
              <span class="browser-bar"/>
              <span class="browser-bar"/>
            </div>
          </div>
        </div>

        <div class="browser-content" style="background: #fff;">
          <toranj
              ref="toranj"
              v-model="layout"
              class="dasht-body"
              :options="pageOptions"
              :scope="scope"
              :model="model"
          />
        </div>
      </div>

      <h4 class="mt-5">Output</h4>
      <small>
        <pre class="ltr bg-dark text-white p-3">{{ layout }}</pre>
      </small>

      <h4 class="mt-5">HTML</h4>
      <button @click.prevent="getHTML">Get HTML</button>
      <small>
        <pre class="ltr bg-dark text-white p-3">{{ html }}</pre>
      </small>

      <div class="mt-5" v-html="html"></div>
    </div>

    <div style="max-width:500px;margin:30px;">
      {{ theApp }}
      <input v-model="formOptions.edit" type="checkbox">
      <formFields
          class="toranj-section" :model="theApp" :block="fields" :parent="[]"
          :index="0"
          :options="formOptions" :scope="{}" :type="{}"
      />

      <div style="font-family: Verdana;margin:20px;">
        Selected box: {{ selected }}
        <VueCoolBoxSelector v-model="selected" active-class="cb__active">
          <CoolBoxItem key="1" name="Item1" class="vue-cool-box-selector__item">
            Item Box 1
          </CoolBoxItem>
          <CoolBoxItem key="2" name="Item2" class="vue-cool-box-selector__item">
            Item Box 2
          </CoolBoxItem>
          <CoolBoxItem key="3" name="Item3" class="vue-cool-box-selector__item">
            Item Box 3
          </CoolBoxItem>
        </VueCoolBoxSelector>

        <div style="margin-top:20px;"/>

        <VueCoolBoxSelector v-model="selected" active-class="cb__active cb__circle">
          <CoolBoxItem
              key="1" name="Item1" class="vue-cool-box-selector__item px-3"
              style="width:48px;text-align:center"
          >
            <!--        <img src="/img.svg" alt=""/> -->
            <small>Img1</small>
          </CoolBoxItem>
          <CoolBoxItem
              key="2" name="Item2" class="vue-cool-box-selector__item px-3"
              style="width:48px;text-align:center"
          >
            <!--        <img src="/img2.svg" alt=""/> -->
            <small>Img2</small>
          </CoolBoxItem>
        </VueCoolBoxSelector>

        <div style="margin-top:20px;"/>

        <VueCoolBoxSelector v-model="selected" active-class="cb__active cb__triangle">
          <CoolBoxItem key="1" name="Item1" class="vue-cool-box-selector__item px-3" style="width:38px;">
            <!--        <img src="/img.svg" alt=""/> -->
            one
          </CoolBoxItem>
          <CoolBoxItem key="2" name="Item2" class="vue-cool-box-selector__item px-3" style="width:38px;">
            <!--        <img src="/img2.svg" alt=""/> -->
            two
          </CoolBoxItem>
        </VueCoolBoxSelector>

        <div style="margin-top:20px;"/>

        <VueCoolBoxSelector v-model="selected" active-class="cb__active cb__square">
          <CoolBoxItem
              key="1" name="Item1" class="vue-cool-box-selector__item small"
              style="padding-right:18px;padding-left:18px;"
          >
            One
          </CoolBoxItem>
          <CoolBoxItem
              key="2" name="Item2" class="vue-cool-box-selector__item small"
              style="padding-right:18px;padding-left:18px;"
          >
            Two
          </CoolBoxItem>
        </VueCoolBoxSelector>
      </div>
    </div>
  </div>
</template>

<style>

.dropdown-toggle::after {
  display: none
}

/* The browser window */
.browser-container {
  border: 3px solid #f1f1f1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/* Container for columns and the top "toolbar" */
.browser-row {
  padding: 10px;
  background: #f1f1f1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* Create three unequal columns that floats next to each other */
.browser-column {
  float: left;
}

.browser-left {
  width: 15%;
}

.browser-right {
  width: 10%;
}

.browser-middle {
  width: 75%;
}

/* Clear floats after the columns */
.browser-row:after {
  content: "";
  display: table;
  clear: both;
}

/* Three dots */
.browser-dot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 4px 3px 0 3px;
}

/* Style the input field */
.browser-container input[type=text] {
  width: 100%;
  border-radius: 3px;
  border: none;
  background-color: white;
  margin-top: -8px;
  height: 25px;
  color: #666;
  padding: 5px;
}

/* Three bars (hamburger menu) */
.browser-bar {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}

/* Page content */
.browser-content {
  padding: 10px;
}
</style>
