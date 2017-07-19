#!/usr/bin/env node

const sec = require('sec')
const logUpdate = require('log-update')

const args = process.argv.slice(2)

let percDigits = NaN

const getNumber = (string, postfix) =>
  Number(string.slice(0, postfix ? -postfix.length : -1))

const hasNumber = (string, postfix) =>
  string.endsWith(postfix)
  && !Number.isNaN(getNumber(string, postfix))

const totalSecs = args.map(time => {
  if (time === '%')
    percDigits = 0
  else if (hasNumber(time, '%'))
    percDigits = getNumber(time)
  else if (hasNumber(time, 's'))
    return getNumber(time)
  else if (hasNumber(time, 'm'))
    return getNumber(time) * 60
  else if (hasNumber(time, 'h'))
    return getNumber(time) * 3600
  else
    return sec(time)
})
.filter(time => !!time)
.reduce((prev, curr) => prev + curr, 0) || 0

const calcPartials = secsLeft => {
  const hours = Math.floor(secsLeft / 3600)
  const mins = Math.floor((secsLeft % 3600) / 60)
  const secs = secsLeft - (hours * 3600 + mins * 60)
  return [hours, mins, secs]
}

const padTwoZeros = number =>
  String(number).padStart(2, '0')

const formatDefault = secsLeft =>
  calcPartials(secsLeft).map(padTwoZeros).join(':')

const formatPercent = secsLeft => {
  const percentage = secsLeft / totalSecs * 100
  return percentage.toFixed(percDigits) + '%'
}

scheduleNextLog(totalSecs)

function scheduleNextLog (secsLeft) {
  const isPercent = !Number.isNaN(percDigits)
  const format = isPercent ? formatPercent : formatDefault
  logUpdate(format(secsLeft))
  if (secsLeft)
    setTimeout(() => scheduleNextLog(secsLeft - 1), 1000)
}
