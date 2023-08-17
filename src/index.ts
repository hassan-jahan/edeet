// export * from './helloWorld.vue'
// @ts-ignore
import camelCase from 'lodash/camelCase'
import toranj from './components/toranj/toranj.vue'

let installed = false

console.log('to be install')

// Declare install function executed by Vue.use()
function install(Vue, opts = {}) {
    console.log('run intsall')
    // Don't install more than once
    if (installed)
        return
    installed = true

    // Vue.component('VueCoolBoxSelector', VueCoolBoxSelector)
    // Vue.component('CoolBoxItem', CoolBoxItem)

    // Register components
    // Object.entries(components).forEach(([componentName, component]) => {
    //     Vue.component(`${defaults.componentPrefix}${componentName}`, component);
    // });


    const componentFiles = import.meta.globEager(['./components/toranj/*.global.vue',

        './components/toranj/fields/*.global.vue',
        //  './components/toranj/actions/*.global.vue',
        // './components/toranj/sections/*.global.vue',
        //  './components/toranj/statuses/*.global.vue',
        //   './components/toranj/widgets/*.global.vue',
        './components/helpers/*.global.vue'])
    console.log('gh', componentFiles)

    Object.entries(componentFiles).forEach(([path, m]) => {
        const componentName =
            // _.upperFirst(
            camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
                // ,
                // )
                .replaceAll('Global', '')

        console.log(componentName)
        if (!componentName.includes('bkp')) {
            Vue.component(`${componentName}`, m.default,
            )
        }
    })

    // GLOBAL PROPS $test
    // const props = vue.observable({
    //     theme: options?.theme || "light", //'dark'
    // });
    // Vue.prototype.$test = props;
}

// Create module definition for Vue.use()
const plugin = {
    install,
    // ...components,
    // ...utils,
}

// Use automatically when global Vue instance detected (CDN / Vue 2) Maybe with import Vue from 'vue (??)
let GlobalVue = null
if (typeof window !== 'undefined')
    GlobalVue = window.Vue
else if (typeof global !== 'undefined')
    GlobalVue = global.Vue

if (GlobalVue)
    GlobalVue.use(plugin)


// Allow component use individually
// export * from './components';


export {toranj}
// Default export is library as a whole, registered via Vue.use()
export default plugin
