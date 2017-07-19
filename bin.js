#!/usr/bin/env node

const sec = require('sec')
const logUpdate = require('log-update')

const args = process.argv.slice(2)

let percDigits = NaN

const getNumber = string =>
  Number(string.slice(0, -1))

const hasNumber = string =>
  !Number.isNaN(getNumber(string))

const totalSecs = args.map(time => {
  if (time === '%')
    percDigits = 0
  else if (time.endsWith('%') && hasNumber(time))
    percDigits = getNumber(time)
  else if (time.endsWith('s') && hasNumber(time))
    return getNumber(time)
  else if (time.endsWith('m') && hasNumber(time))
    return getNumber(time) * 60
  else if (time.endsWith('h') && hasNumber(time))
    return getNumber(time) * 3600
  else
    return sec(time)
})
.filter(time => !!time)
.reduce((prev, curr) => prev + curr, 0) || 0

const calcPartials = totalSecs => {
  const hours = Math.floor(totalSecs / 3600)
  const mins = Math.floor((totalSecs % 3600) / 60)
  const secs = totalSecs - (hours * 3600 + mins * 60)
  return [hours, mins, secs]
}

const padTwoZeros = number =>
  String(number).padStart(2, '0')

const formatDefault = secsLeft => {
  const [hours, mins, secs] = calcPartials(secsLeft)
  return `${padTwoZeros(hours)}:${padTwoZeros(mins)}:${padTwoZeros(secs)}`
}

const formatPercent = secsLeft => {
  const percentage = secsLeft / totalSecs * 100
  return `${percentage.toFixed(percDigits)}%`
}

scheduleNextLog(totalSecs)

function scheduleNextLog (secsLeft) {
  const isPercent = !Number.isNaN(percDigits)
  const format = isPercent ? formatPercent : formatDefault
  logUpdate(format(secsLeft))
  if (secsLeft)
    setTimeout(() => scheduleNextLog(secsLeft - 1), 1000)
}
