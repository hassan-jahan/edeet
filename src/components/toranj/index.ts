import _ from 'lodash/camelCase'

export default {
  install(app) {
    const componentFiles = import.meta.globEager(
      ['./*.global.vue',
        './actions/*.global.vue',
        './fields/*.global.vue',
        './sections/*.global.vue',
        './statuses/*.global.vue',
        './widgets/*.global.vue',
        './../helpers/*.global.vue']
    )

    Object.entries(componentFiles).forEach(([path, m]) => {
      const componentName =
          // _.upperFirst(
        _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
            // ,
      // )
    .replaceAll('Global','')

        console.log(componentName)
      if (!componentName.includes('bkp')) {
        app.component(`${componentName}`, m.default,
        )
      }
    })
  },
}
