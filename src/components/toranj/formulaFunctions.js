import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

export default {

  dayjs,
  dateAdd(date, amount = 0, unit = 'day') { // default values are important
    if (!date)
      return // or error?

    const res = dayjs(date)

    if (amount >= 0)
      return res.add(amount, unit)
    else
      return res.subtract(amount, unit)
  },

  dateDiff(firstDate, secondDate, unit = 'day', float = false) { // default values are important
    if (!secondDate)
      secondDate = dayjs()
    else
      secondDate = dayjs(secondDate)

    firstDate = dayjs(firstDate)

    return firstDate.diff(secondDate, unit, float)
  },

  dateFormat(date, format = 'YYYY-MM-DD') {
    if (!date)
      return // or error?

    return dayjs(date).format(format)
  },

  addDays(date, days = 0, format = 'YYYY-MM-DD') { // default values are important
    if (!date)
      return // or error?

    return dayjs(date).add(days, 'days').format(format)
  },

  dateDay(setData = undefined) {
    return new dayjs().day(setData)
  },

  abs: Math.abs,

  // todo: add more func
  now() {
    const date = new Date()

    const cut = 10 // 19 with time / 10 with time
    return date.toISOString().slice(0, cut).replace('T', ' ')
  },

  // bug not for next day hours | https://stackoverflow.com/questions/60226101/difference-between-two-time-using-dayjs
  timeDifferenceSameDay(from, to, minute = false, local = 'en-US') {
    const ft = dayjs(`2000-01-01 ${from}`)
    const tt = dayjs(`2000-01-01 ${to}`)
    const min = tt.diff(ft, 'minutes', true)
    const totalHours = parseFloat(min / 60)
    const totalMins = dayjs().minute(min).$m
    if (minute)
      return totalMins
    else if (Intl)
      return new Intl.NumberFormat(local, { minimumFractionDigits: 2 }).format(totalHours)
    else
      return totalHours

    // return new Intl.NumberFormat(local, {minimumFractionDigits: fraction}).format(amount)
  },

  strDate(string = '') {
    const date = new Date(string)
    // return date.getTime is raw int but can not be save in mysql
    return date.toISOString().slice(0, 19).replace('T', ' ')
  },
  substr(input, from, length) {
    return input.toString().slice(from, length)
  },
  test(ttt) {
    return `${ttt} 123`
  },
  Date(d = undefined) {
    return new Date(d) // can use ${Date().getFullYear()}
  },

  Math() {
    return Math // can use ${Math().abs}
  },
  today() {
    const date = new Date()

    const cut = 19 // 19 with time / 10 with time
    return date.toISOString().slice(0, cut).replace('T', ' ')
  },
  getYear() {
    const date = new Date()
    return date.getYear() // adds 1 to year numbder after 2000!
  },
  getFullYear() {
    const date = new Date()
    return date.getFullYear() // //can use ${Date.getFullYear()}
  },
  getMonth() {
    const date = new Date()
    return date.getMonth()
  },
  getDate() {
    const date = new Date()
    return date.getDate()
  },
  getHours() {
    const date = new Date()
    return date.getHours()
  },
  getMinutes() {
    const date = new Date()
    return date.getMinutes()
  },
  getSeconds() {
    const date = new Date()
    return date.getSeconds()
  },
  getMilliseconds() {
    const date = new Date()
    return date.getMilliseconds()
  },

  getTime() {
    const date = new Date()
    return date.getTime()
  },
  getDay() {
    const date = new Date()
    return date.getDay()
  },

  if(condition, trueResult, falseResult = '') {
    return condition ? trueResult : falseResult
  },

  randomNumber(min = 1, max) {
    return Math.floor((Math.random() * max) + min)
  },

  randomString(length = 22) { // Note: No more than 22 chars
    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substr(0, length)
  },
  slice(str, start, length) {
    if (str)
      return str.toString().slice(start, length)
  },
  number(amount, maximumFractionDigits = 2, local = 'en-US') { // just set local fa-IR
    if (isNaN(amount) || amount === '')
      return ''

    amount = parseFloat(amount)
    if (typeof Intl === undefined)
      return amount

    return new Intl.NumberFormat(local, {
      minimumFractionDigits: 0,
      maximumFractionDigits,
    }).format(amount)
  },
}
