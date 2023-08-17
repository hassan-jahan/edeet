import Vue from 'vue'
// import relativeDate from 'relative-date'
import slugify from 'slugify'
// import helper from './helper' //also register it as a Nuxt plugin
// import momentj from 'moment-jalaali'
// console.log(window.moment)
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

// todo: fix this
const app = {}
const $config = {}

// Vue.options.filters.sizify
// export default ({app, $config}, inject) => {

// console.log('confff', $config)
Vue.filter('sizify', (file, size) => {
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
})

Vue.filter('fullURL', (path) => {
    return $config.baseUrl + '/' + path
})

Vue.filter('cdnURL', (path) => {
    return $config.cdnUrl + '/' + path
})

Vue.filter('tileURL', (empty) => {
    // https://wiki.openstreetmap.org/wiki/Tile_servers
    // https://{s}.tile.osm.org/{z}/{x}/{y}.png
    // http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg
    return 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png	'
    // return $config.protocol + '{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
})

Vue.filter('pageURL', (page, app) => {
    return Vue.$helper.appURL(app, false) + Vue.$helper.slugToPath(page.slug)
})

Vue.filter('postURL', (post, page, app) => {
    return Vue.$helper.appURL(app, false) + Vue.$helper.slugToPath(page.slug) + '?id=' + post.id
})

Vue.filter('pageSlug', (page) => {
    return Vue.$helper.slugToPath(page.slug)
})

Vue.filter('pageEditURL', (page, app, relative = true) => {
    // let appSlug =

    //maybe todo to use it globally change inject  and set Vue.$currentapp

    if (relative)
        return '/a/' + app.slug + '/page/' + page.slug
    // return '/a/' + app.slug + '/page' + helper.slugToPath(page.slug) has problem with __

    return $config.baseUrl + '/a/' + app.slug + '/page/' + page.slug
    // return $config.baseUrl + '/a/' + app.slug + '/page' + helper.slugToPath(page.slug)
})


Vue.filter('typeURL', (type, app) => {
    return Vue.$helper.appURL(app, false) + Vue.$helper.slugToPath(type.slug)
})

Vue.filter('typeSlug', (type) => {
    return Vue.$helper.slugToPath(type.slug)
})

Vue.filter('typeEditURL', (type, app, relative = true) => {
    // let appSlug =

    //maybe todo to use it globally change inject  and set Vue.$currentapp

    if (relative)
        return '/a/' + app.slug + '/type/' + type.slug
    // return '/a/' + app.slug + '/type' + helper.slugToPath(type.slug) has problem with __

    return $config.baseUrl + '/a/' + app.slug + '/type/' + type.slug
    // return $config.baseUrl + '/a/' + app.slug + '/type' + helper.slugToPath(type.slug)
})

Vue.filter('appEditURL', (app = '', path = '', relative = true) => {
    if (relative)
        return '/a/' + app.slug + '/' + path

    return $config.baseUrl + '/a/' + app.slug + '/' + path
})

Vue.filter('appURL', (app = '', noProtocol = false, withDomain = true) => {
    return Vue.$helper.appURL(app, noProtocol, withDomain)
})


// Vue.filter('postURL', (id, title = '', network = '') => {
//     return $config.baseUrl + '/p/' + id + '/' + title.slice(0, 10) //or speaking url
// })

Vue.filter('profileURL', (username, network = '') => {
    return $config.baseUrl + '/' + username //or speaking url
})

Vue.filter('postTitle', (title, post) => {
    if (title) {
        return title
    }

    if (post.content) {
        return Vue.options.filters.slice(post.content, 0, 40)
    }

    return '#' + post.id
})

//slice with noHTML
Vue.filter('slice', (str, start, length) => {
    if (str) {
        const threeDots = (str.length > length) ? '...' : ''
        return Vue.options.filters.noHTML(str).slice(start, length) + threeDots
    }
})

Vue.filter('noHTML', (str) => {
    if (str) {
        return str.replace(/(<([^>]+)>)/ig, '').replace(/\&nbsp;/ig, '')
    }
})

// Vue.filter('releativeDate', (date) => {
//     if (date) {
//         return relativeDate(new Date(date))
//     }
// })

Vue.filter('date', (date, format = 'date', options = {}, local = 'default') => { //fa-IR default browser or en-US
    //short numberic or long

    if (typeof date === 'string')
        date = new Date(date) //new is important

    if (typeof Intl === undefined) {
        return Vue.$helper.strDate(date)
    }
    if (Vue.$helper.isEmptyObject(options)) { //empty options
        //     https://tc39.es/ecma402/#datetimeformat-objects
        switch (format.toLocaleUpperCase()) {
            case 'DATE' :
                options = {
                    year: 'numeric', //short|long|numeric|2-digits
                    month: 'numeric',
                    day: 'numeric',
                    // hour: 'numeric',
                    // minute: 'numeric',
                    // second: 'numeric'
                }
                break

            case 'DATETIME' :
                options = {
                    year: 'numeric', //short|long|numeric|2-digits
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }
                break
            // case 'time' :
            //     options = {
            //         hour: 'numeric',
            //         minute: 'numeric',
            //     }
            //     break
            case 'FULL' :
                options = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric'
                }
                break
            case 'FULLTZ' :
                options = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric',
                    timeZoneName: 'short',
                }
                break
        }
    }


    return new Intl.DateTimeFormat(local, options).format(date)

//     // let options = {
//     //     hour: 'numeric', minute: 'numeric', second: 'numeric',
//     //     timeZone: 'Australia/Sydney',
//     //     timeZoneName: 'short'
//     // };
    // "Monday, 12/17/2012, 3:00:42.000 AM"

})

Vue.filter('persianDigits', (string) => {
    if (!string) {
        return
    }

    let id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return string.toString().replace(/[0-9]/g, function (w) {
        return id[+w]
    })
})


Vue.filter('currency', (value, currency = "USD", local = 'en-US',) => {

        if (isNaN(value) || value === '') {
            return ''
        }

        value = parseFloat(value)
        if (typeof Intl === undefined) {
            return value
        }

        try {
            const formatter = Intl.NumberFormat(local, {
                style: "currency",
                currency,
                minimumFractionDigits: 0
            });

            // console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// expected output: "123.456,79 €"

            return formatter.format(value);
        } catch (e) {
            console.log('error currency value', e)
            return value
        }


    }
)

Vue.filter('number', (amount, local = 'en-US') => { //just set local fa-IR

    if (isNaN(amount) || amount === '') {
        return ''
    }
    amount = parseFloat(amount)
    if (typeof Intl === undefined) {
        return amount
    }

    let fraction = 0
    let dotPost = amount.toString().lastIndexOf('.')
    if (dotPost > 0) {
        fraction = amount.toString().length - dotPost - 1
    }

    return new Intl.NumberFormat(local, {minimumFractionDigits: fraction, maximumFractionDigits: 2}).format(amount)
})

Vue.filter('noEmoji', (value) => {
    if (!value) {
        return
    }

    let ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
    ]
    return value.replace(new RegExp(ranges.join('|'), 'g'), '')
})

Vue.filter('englishNumber', (value) => {
    let newValue = ''
    for (let i = 0; i < value.length; i++) {
        let ch = value.charCodeAt(i)
        if (ch >= 1776 && ch <= 1785) // For Persian digits.
        {
            let newChar = ch - 1728
            newValue = newValue + String.fromCharCode(newChar)
        } else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
        {
            let newChar = ch - 1584
            newValue = newValue + String.fromCharCode(newChar)
        } else {
            newValue = newValue + String.fromCharCode(ch)
        }
    }
    return newValue

})
Vue.filter('moment', (date, outputFormat = 'MM-DD-YYYY', inputFormat = '', relative = false) => {
// .tz(block.timezone)
//    fromNow for relative
    if (relative)
        return dayjs(date).fromNow()

    return dayjs(date).format(outputFormat)
})
// Vue.filter('moment', (date, outputFormat = 'jYYYY/jMM/jDD', inputFormat = '', relative = false) => {
//     momentj.loadPersian({usePersianDigits: false, dialect: 'persian-modern'}) //persiadigit problem with datepicker
//
//     if (!date) {
//         return
//     }
//
//     let m, output
//     if (inputFormat == 'X') {
//         m = momentj.unix(date)
//     } else {
//         m = momentj(date)
//     }
//
//     if (!relative) {
//         return Vue.options.filters.persianDigits(m.format(outputFormat))
//     }
//
//     // Display a moment in relative time, either from now or from a specified date.
//     // http://momentjs.com/docs/#/displaying/fromnow/
//
//     return Vue.options.filters.persianDigits(m.fromNow(false))
//
// })

Vue.filter('capitalize', (value) => {
    if (!value) {
        return ''
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)

})

Vue.filter('simpleSlugify', (value) => {
    if (!value) {
        return ''
    }
    return value.toString().toLowerCase()
        .replace(/(\w)\'/g, '$1')           // Special case for apostrophes
        .replace(/\s/g, '_')                // spaces
        .replace(/[^a-z0-9_\-]+/g, '_')     // Replace all non-word (no a-z09-A-Z_) chars with _
        .replace(/\-\-+/g, '_')             // Replace multiple _ with single _
        .replace(/^-+/, '')                 // Trim _ from start of text
        .replace(/-+$/, '')                // Trim - from end of text

})
slugify.extend({
    //doesn't work
    'ای': 'i', 'اي': 'i',

    // arabic
    'أ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'g', 'ح': 'h', 'خ': 'kh', 'د': 'd',
    'ذ': 'th', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't',
    'ظ': 'th', 'ع': 'aa', 'غ': 'gh', 'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm',
    'ن': 'n', 'ه': 'h', 'و': 'o', 'ي': 'y',

    // farsi
    'آ': 'a', 'ا': 'a', 'پ': 'p', 'ژ': 'zh', 'گ': 'g', 'چ': 'ch', 'ک': 'k', 'ی': 'i',
    //numbers
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٤': '4', '٥': '5', '٦': '6',

})
Vue.filter('slugify', (value, exclude = '/', lower = true, separator = '-') => { //todo add option to include / or utf-8
    if (!value) {
        return ''
    }

    if (exclude)
        value = value.replace(new RegExp('\\' + exclude, 'g'), '___exc___')

    return slugify(value, {
        replacement: separator,    // replace spaces with replacement
        remove: null,        // regex to remove characters
        lower: lower,         // result in lower case
    }).replace(/[^a-z0-9A-Z_\-]+/g, '')     // Replace all non-word (no a-z09-A-Z_) chars with _
        .replace(/\-\-+/g, '-')         // Replace multiple _ with single _
        .replace(/^-+/, '')                 // Trim _ from start of text
        .replace(/-+$/, '')                // Trim - from end of text
        .replace(/___exc______exc___/g, '___exc___') //two exclude to one
        .replace(/___exc___/g, exclude)
})


const VueFiltersPlugin = {
    install(Vue, options) {
        Vue.$filters = Vue.prototype.$filters = Vue.options.filters  //add $ for custom method
    }
}
Vue.use(VueFiltersPlugin, {})

// inject('filters', Vue.options.filters) //Alias for Vue.options.filters
// }
