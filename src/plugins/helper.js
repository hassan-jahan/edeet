import Vue from 'vue'
import isEmpty from 'lodash/isEmpty'
import trimChars from 'lodash/trim'

import formulaFunctions from "../components/toranj/formulaFunctions";

// import {evaluate} from "bcx-expression-evaluator";
import {evaluate} from "./../helper/formula/src";


// function evaluate(one, two, three, four){
//     return true
// }
// Vue.options.filters.sizify
// export default (context, inject) => {
export default  {
        appURL(app = '', noProtocol = false, withDomain = true) {
            let protocol = (noProtocol) ? '' : $config.protocol
            if (app && app.domain && withDomain) {
                return protocol + app.domain
            }
            return protocol + app.slug + '.' + $config.mainHost
        },
        pathToSlug(path) {
            // console.log('pathToSlug', path)

            if (!path)
                return '__'

            let slug = path.toString().replace(/\//g, '__')
            if (slug != '__')
                slug = trimChars(slug, '__')

            if (Number.isInteger(parseInt(slug))) { //slug should always be string with first letter non-number
                slug = '__' + slug
            }

            // console.log('pathToSlug', slug)
            return slug
        },

        slugToPath(path) {

            if (!path)
                return ''

            let slug = path.toString().replace(/\_\_/g, '/')

            if (slug == '/')
                return '/'

            if (!slug.startsWith('/')) //todo: maybe remove starting / to be the same as db
                return '/' + slug

            return slug
        },

        isMainApp(currentHost = '', ctx = '') {
            //security: it is used for origin

            if (!currentHost)
                currentHost = (process.server) ? ctx.req.headers.host : window.location.host

            currentHost = currentHost.split('://')[1] //remove protocol if any (ok this is not host!)

            currentHost = currentHost.split(':')[0] //remove port
            currentHost = currentHost.replace(/www\./, '')

            let mainHost = $config.mainHost.split(':')[0]
            mainHost = mainHost.replace(/www\./, '')

            // console.log(currentHost)
            if (['localhost', '127.0.0.1', mainHost].includes(currentHost))
                return true
            return false
        },


        // //not tested not recommended
        // // var myEfficientFn = debounce(function() {}, 200)
        // // const processChange = debounce(() => saveInput());
        // // <input type="text" onKeyUp="processChange()"/>
        // debounce(func, wait, immediate) { //not tested
        //     let timeout;
        //
        //     return function () {
        //         console.log('deb')
        //         let context = this, args = arguments;
        //         let later = function () {
        //             timeout = null;
        //             if (!immediate) func.apply(context, args);
        //         };
        //         let callNow = immediate && !timeout;
        //         clearTimeout(timeout);
        //         timeout = setTimeout(later, wait);
        //         // if (callNow) func.apply(context, args);
        //         if (callNow) return func.apply(context, args); // for return?? i don't know
        //     }
        // },

        sortBasedOnKey(property) {
            let sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                /* next line works with strings and numbers,
                 * and you may want to customize it to your needs
                 */
                let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        },
        makeDropdownList(array, textField, valueField) {
            if (!Array.isArray(array))
                return

            return array.map((item, index) => {
                return {text: item[textField], value: item[valueField]}
            })

        },
        getFontHeadMeta(font) {
            // <link href="https://v1.fontapi.ir/css/Sahel:400" rel="stylesheet">
            let output = ''
            if (!font.type || font.type == 'google')
                output = `<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
                    <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
                    <link href="https://fonts.googleapis.com/css2?family=${font.family}:wght@400&amp;" rel="stylesheet">`

            else if (font.type == 'custom')
                output = `<link rel="preconnect" href="https://fdn.fontcdn.ir/" crossorigin>
                    <link rel="dns-prefetch" href="https://fdn.fontcdn.ir/">
                    <link href="https://v1.fontapi.ir/css/${font.family}:400" rel="stylesheet">`


            return output
        },

        generatePageHead(app={}, page={}) {
            //provide app or page but not both of them if you want server side rendering because we can not create meta json during rendering on server side so we create json during save and then combine them later for serverside rendering)

            let appMeta = {}
            let pageMeta = ''
            let output = {}

            // if (app && app.settings && app.settings.headerCode) {
            //     if (app.settings.mainFont)
            //         app.settings.headerCode += this.$helper.generateFontMeta(app.settings.mainFont)
            //
            //     console.log('apphead' , app.settings.headerCode)
            //     app.settings.headerCode += this.$helper.generateFontMeta(app.settings.headFont)
            //     appMeta = this.generateMetaJson(app.settings.headerCode)
            // }

            if (page?.settings && page.settings.mainFont && page.settings.mainFont.family)
                pageMeta += this.getFontHeadMeta(page.settings.mainFont)
            else if (app?.settings && app.settings.mainFont && app.settings.mainFont.family)
                pageMeta += this.getFontHeadMeta(app.settings.mainFont)

            if (page?.settings && page.settings.headingFont && page.settings.headingFont.family)
                pageMeta += this.getFontHeadMeta(page.settings.headingFont)
            else if (app?.settings && app.settings.headingFont && app.settings.headingFont.family)
                pageMeta += this.getFontHeadMeta(app.settings.headingFont)

            if (app && app.settings && app.settings.headerCode)
                pageMeta += app.settings.headerCode

            if (page && page.settings && page.settings.headerCode)
                pageMeta += page.settings.headerCode


            pageMeta = this.generateMetaJson(pageMeta)
            console.log('pagephead', pageMeta)


            // console.log('appMeta')
            // console.log(pageMeta, pageMeta)

            // output = appMeta
            // output.title = page.title + ' - ' + app.title
            return pageMeta
        },

        generateMetaJson(string) {
            let json = {
                META: [],
                STYLE: [],
                STYLE2: [],
                SCRIPT: [],
                TITLE: [],
                LINK: [],
            }
            let listNodes = this.htmlToElements(string)
            // console.log(listNodes)

            listNodes.forEach((listNode) => {
                if (!listNode.tagName) {
                    return
                }
                // console.log('listNode')
                // console.log(listNode)
                let object = {}
                if (json[listNode.tagName]) {
                    // console.log(listNode.attributes)
                    if (listNode.attributes) {
                        Array.from(listNode.attributes).forEach((attr) => {
                            object[attr.name] = attr.value || true
                        })
                    }

                    if (listNode.innerHTML) {
                        object['innerHTML'] = listNode.innerHTML
                    }

                    json[listNode.tagName].push(object)

                }
            })

// if (!listNode.tag || listNode.tag.toLowerCase() != 'li') {
//     return
// }
//
// let liClass = listNode.elm.classList.toString()
// let html = listNode.elm.innerHTML
//
// let linkEl = listNode.elm.getElementsByTagName('a')[0]
            return json
        },

        htmlToElements(html) {
            //todo: not for server! cause problem with ssr
            if (!process.client)
                return []

            let template = document.createElement('template')
            template.innerHTML = html
            return template.content.childNodes
        },

        replaceAllArray(str, find, replace) {
            let replacedStr = str;
            for (let i = 0; i < find.length; i++) {
                replacedStr = replacedStr.split(find[i]).join(replace[i]);
            }
            return replacedStr;
        },

        isObject(item) {
            return typeof item === 'object' && !Array.isArray(item) && item !== null
        },

        mergeAll(objects, deep = false) {
            let res = {}
            for (const obj of objects) {
                if (this.isObject(obj)) {
                    res = this.merge(res, obj, deep)
                }
            }
            return res
        },

        merge(target, source, deep = false) {
            if (!target)
                target = {}

            if (!source)
                source = {}
            if (deep || !Object.assign) {
                const isDeep = (prop) =>
                    this.isObject(source[prop]) &&
                    target !== null &&
                    Object.prototype.hasOwnProperty.call(target, prop) &&
                    this.isObject(target[prop])

                const replaced = Object.getOwnPropertyNames(source)
                    .map((prop) => ({
                        [prop]: isDeep(prop)
                            ? this.merge(target[prop], source[prop], deep)
                            : source[prop]
                    }))
                    .reduce((a, b) => ({...a, ...b}), {})

                return {
                    ...target,
                    ...replaced
                }
            } else {
                return Object.assign(target, source)
            }
        },

        evaluate(formula, asString = false, scope = {}, model = {}, asNumber = false) {

            if (!formula)
                return ''

            // console.log('cal culate: this.scope, this.block, objGet(this.scope, this.block.formula)', this.block.formula)
            let context = {...scope, ...model} //maybe add '_' oor this or $parent || model || route and etc.

            console.log('context', context)
            //(might change $parent to $helper in future releases.)
            //
            // evaluate('a', {a:1}, {a:2}); // => 1
            // evaluate('$this.a', {a:1}, {a:2}); // => 1
            // evaluate('$parent.a', {a:1}, {a:2}); // => 2

            let helpers = {...scope, ...formulaFunctions} //functions or helpers //maybe add '_' or use $parent.data or data.scope scope.data only if model changed filters

            let res = evaluate(formula.toString(), context, helpers, {stringInterpolationMode: asString})


            console.log('res', res, typeof res, typeof res !== 'undefined')
            if (typeof res !== 'undefined' && res !== null && res.toString() !== 'undefined' && res.toString() !== 'NaN') {//has string undifined todo:
                if (res.toString().includes('undefined'))
                    res = res.toString().replaceAll('undefined', '')

                if (res.toString().includes('NaN'))
                    res = res.toString().replaceAll('NaN', '')

                if (asNumber)
                    return parseFloat(res)

                return res
            } else {
                console.log('Dasht: Formula produced undefined or NaN value for Formula: ' + formula.toString())
            }
        },

        randomNumber(min = 1, max) { //from 1 to max (Not secure)
            return Math.floor((Math.random() * max) + min)
        },
        randomString(length = 22) { //Note: No more than 22 chars
            return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substr(0, length)
        },
        isEmptyObject: function (val) {
            return isEmpty(val) //not for strings, numbers (or array with lenngth 0)
        },

        isAppUser(currentApp = '') {
            if (!currentApp)
                currentApp = context.$currentApp

            if (!Vue.$auth.user || !currentApp) //appUserRole maye be zero so not !appUserRole
                return false

            // console.log('eeeee app use', Vue.$auth.user, currentApp )
            return Vue.$auth.user.role > 75 || currentApp.appUserRole > 0
        },

        isAppAdmin(currentApp = '') {
            if (!currentApp)
                currentApp = Vue.$currentApp

            if (!Vue.$auth.user || !currentApp)  //appUserRole maye be zero so not !appUserRole
                return false

            console.log('eeeee app admin', Vue.$auth.user, currentApp)
            return Vue.$auth.user.role > 75 || currentApp.appUserRole >= 90
        },
        toCamelCase(str) {
            str.toString().replace(/-./g, (m) => m[1].toUpperCase()) // --> 'unoDueTre'
        },
        pluck(obj, key) { //used for chart
            if (!obj) return
            // console.log(obj)
            // console.log(typeof obj)

            return obj.map(v => {
                return v[key]
            })
        },

        pluckArray(arr, key) {
            if (!Array.isArray(arr)) return

            return arr.map(v => {
                return v[key]
            })
        },

        findObjectsInArray(arr, key, value) {
            if (!Array.isArray(arr)) return

            return arr.filter(v => v[key] == value) //return array
        },

        findOneObjectInArray(arr, key, value) {
            if (!Array.isArray(arr)) return

            return arr.find(v => v[key] == value) //return array
        },

        removeInArray(arr, item) {
            let i = 0;
            while (i < arr.length) {
                if (arr[i] === item) {
                    arr.splice(i, 1)
                } else {
                    ++i
                }
            }
            return arr
            //only first item, use for loop to remove all duplicates:
            // let index = arr.indexOf(item);
            // if (index > -1) {
            //     arr.splice(index, 1);
            // }
            // return arr;
        },
        clientTimezone() {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        },

        strDate(date) {
            if (!date) {
                date = new Date()
            }

            // return date.getTime is raw int but can not be save in mysql
            return date.toISOString().slice(0, 19).replace('T', ' ')
        },

        trackRouteChange(to, from) {

        },

        trackUser(username) {
            if (typeof _paq != 'undefined') // should be before pageviews
            {
                _paq.push(['setUserId', username])
            }
        },

        track(category, action, value, int_value = '') { //label is string label is number ofr ga

            if (action == 'Fail') {
                if (value.data && value.data.error) {
                    value = value.data.error
                } //todo: use data.data for 400 erros
                int_value = value.status
            }

            if (typeof _paq != 'undefined') // null or undefined
            {
                _paq.push(['trackEvent', category, action, value])
            }

            return

        },

        readableFormData(fields, model, output = 'string') {
            let array = []
            let string = ''
            console.log('readlabledat', fields, model)
            if (!Array.isArray(fields) || !fields.length)
                return (output == 'string') ? '' : []

            fields.forEach((field, index) => {
                let title = field.label || field.slug
                let value = ''
                if (model[field.slug] && model[field.slug]) {
                    value = typeof value === 'object' ? JSON.stringify(model[field.slug]) : String(model[field.slug])
                }
                string += title + ":\n" + value + "\n\n"
                array.push({key: title, val: value, field: field})
            })

            if (output == 'string')
                return string

            return array
        },

        sendToChrome(data) {
            var extnId = 'agjmnikfnkodnkplkekhinphcpcbinpf'
            // console.log('sendchromeee')

            if (typeof chrome == 'undefined') // null or undefined
            {
                return
            }

            chrome.runtime.sendMessage(extnId, data,
                function (response) {
                    console.log('Sent externally')
                    // console.log(response)
                })

            //      window.postMessage({type: 'user', body: 'something'}, 'https://twitter.com');
//      window.addEventListener('message', (event) => {
//        console.log('new message', event)
//        if (event.origin !== 'https://twitter.com' || !this.$auth.user)
//          return;
//
//        if (event.data && event.data.type == 'connect_request') {
//          setTimeout(() => {
//            event.source.postMessage({type: 'user', body: this.$auth.user}, event.origin);
//            console.log('sent.')
//          }, 2000)
//
//        }

        },

        //or v-html="$options.filters.highlight(option.title, searchTerm)".
        sizify(file, size) {

            if (!file) {
                return
            }

            if (size == 'max') {
                return file
            }

            return file.replace(/\.png/ig, '-' + size + '.png')
                .replace(/\.jpg/ig, '-' + size + '.jpg')
                .replace(/\.jpeg/ig, '-' + size + '.jpeg')
                .replace(/\.gif/ig, '-' + size + '.gif')
        },

        unlinkify(content) {
            var regex = /<a class=\"autolink_.*?\" href=\"(.*?)\"(.*?)>(.*?)<\/a>/gim
            return content.replace(regex, '$3')
        },

        linkify(value, network = '') {
            if (!value) {
                return ''
            }
            let regex, targetAttr = ''

            regex = /(^|\s|;|>)(#|＃)(\S+)/gim //; for nbsp;# and > for <p>@addad (?:<)

            let content = value.replace(regex, '$1<a class="autolink_hashtag" href=""' + network + '/tag/$3"' + targetAttr + '>#$3</a>')

            regex = /(^|\s|;|>)(@|＠)([a-zA-Z0-9_]+)/gim
            content = content.replace(regex, '$1<a class="autolink_mention" href="/$3"' + targetAttr + '>@$3</a>')

            return content
        }
    }

    // const VueHelperPlugin = {
    //     install(Vue, options) {
    //         Vue.$helper = Vue.prototype.$helper = helperFunctions  //add $ for custom method
    //     }
    // }
    // Vue.use(VueHelperPlugin, {})
    //
    // inject('helper', helperFunctions)
// }

// export default ({app}, inject) => {
//     inject('helper', helperFunctions)
// }
