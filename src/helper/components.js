import Vue from 'vue'

// Vue.prototype.$ELEMENT = { size: 'small' }
// import shadow from 'vue-shadow-dom'
// Vue.use(shadow)
import draggable from 'vuedraggable'
import VRuntimeTemplate from 'v-runtime-template'
import iUpload from '../components/helpers/iUpload.vue'
// import iSunEditor from '../components/helpers/iSunEditor.vue'
import iUploadZone from '../components/helpers/iUploadZone.vue'


import toranj from './../components/toranj/toranj.vue'

import imageBlock from '../components/toranj/widgets/imageBlock.vue'

//
// import FontPicker from 'font-picker-vue';
// // Vue.use(FontPicker);
// Vue.component('FontPicker', FontPicker)
import editable from '../components/toranj/widgets/editable.vue'

// import ulBlock from '../xarchive/last-toranj-tests/ulBlock'
// Vue.component('ul-editable', ulBlock)
// import liUlBlock from '../xarchive/last-toranj-tests/liUlBlock'
// Vue.component('li-editable', liUlBlock)
// Vue.component('liUlBlock', liUlBlock)
import formFields from '../components/toranj/fields/formFields.vue'

import htmlTagBlock from '../components/toranj/widgets/htmlTagBlock.vue'

import simpleEditable from '../components/toranj/widgets/simpleEditable.vue'

import codeSectionBlock from '../components/toranj/sections/codeSectionBlock.vue'

// import gwHeaderBlock from '../xarchive/last-toranj-tests/gwHeaderBlock'
// Vue.component('gwHeaderBlock', gwHeaderBlock)
import sectionWrapper from '../components/toranj/sectionWrapper.vue'

import widgetWrapper from '../components/toranj/widgetWrapper.vue'

import fieldWrapper from '../components/toranj/fieldWrapper.vue'

import addFieldPopover from '../components/toranj/addFieldPopover.vue'

import AppLink from '../components/helpers/AppLink.vue'

Vue.component('IUpload', iUpload)

Vue.component('IUploadZone', iUploadZone)
// Vue.component('iSunEditor', iSunEditor)

Vue.component('Toranj', toranj)

Vue.component('Draggable', draggable)

Vue.component('ImageBlock', imageBlock)
// editable.mixins.push({data(){return {type: 'imagggee'}}})
// console.log(editable)

// widget editor / div editor / widget list or so
Vue.component('Editable', editable)
// Vue.component('Editable2', editable)

Vue.component('ImgEditable', editable)
Vue.component('H1Editable', editable)
Vue.component('H2Editable', editable)
Vue.component('H3Editable', editable)
Vue.component('H4Editable', editable)
Vue.component('H5Editable', editable)
Vue.component('H6Editable', editable)
Vue.component('AEditable', editable)
Vue.component('PEditable', editable)
Vue.component('ButtonEditable', editable)
Vue.component('FormFields', formFields)

Vue.component('HtmlTagBlock', htmlTagBlock) // Text only / No array / no object
Vue.component('SimpleEditable', simpleEditable)
Vue.component('LabelEditable', simpleEditable)
Vue.component('SpanEditable', simpleEditable)
Vue.component('CodeSectionBlock', codeSectionBlock)
Vue.component('SectionWrapper', sectionWrapper)
Vue.component('WidgetWrapper', widgetWrapper)
Vue.component('FieldWrapper', fieldWrapper)
Vue.component('AddFieldPopover', addFieldPopover)

Vue.component('VRuntimeTemplate', VRuntimeTemplate)

Vue.component('AppLink', AppLink)
//
// if (process.browser) {
//   // require('chartist/dist/chartist.min.css')
//   // // require('chartist-plugin-tooltips-updated')
//   //
//   // Vue.use(require('vue-chartist'), {
//   //     messageNoData: 'You have not enough data',
//   //     classNoData: 'empty'
//   // })
//   // Vue.component('vue-chartist', VueChartist)
//
//   // import * as ChartistTooltips from 'chartist-plugin-tooltips-updated';
//
// }

// import {
//     Rate,
//     InputNumber
// } from 'element-ui'
//
// Vue.use(Rate)
// Vue.use(InputNumber)

// import VueDND from 'awe-dnd'
// Vue.use(VueDND)

// import { VueContext } from 'vue-context'
// import 'vue-context/dist/css/vue-context.css'
//
// Vue.component('VueContext', VueContext)

// import buttonBlock from '../components/helpers/buttonBlock.vue'
// Vue.component('buttonBlock', buttonBlock)

// import fieldDatepicker2 from '../components/fields/fieldDatepicker2.vue'
// Vue.component('field-datepicker2', fieldDatepicker2)

// export default ({
//     app
// }, inject) => {
//
//     // inject('auth', auth) //not reactive with data so not $auth.set()
//     // todo: test
//     inject('track', (o, t, th, f) => {
//     })
//     // if mixin and is array push it
//     if (typeof app.mixins === 'undefined') {
//         app.mixins = []
//     } else if (!Array.isArray(app.mixins)) {
//         app.mixins = [app.mixins]
//     }
//
//     // app.mixins.push(apiMixin)
// }
