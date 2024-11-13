const SYNODIC_MONTH_DAYS = 29.530588853 // commonly used approximation || another value - 29.53058867
const SYNODIC_MONTH_MILLIS = SYNODIC_MONTH_DAYS * 24 * 60 * 60 * 1000

const getBareDate = (date) => {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
}

function getMoonDay(date = new Date()) {
  const newMoonTime = new Date('1970-01-07T20:35:50.73Z').getTime()
  const synodicMonths = (date.getTime() - newMoonTime) / SYNODIC_MONTH_MILLIS
  const daysSinceNewMoon = synodicMonths * SYNODIC_MONTH_DAYS
  const moonDay = Math.floor((daysSinceNewMoon % SYNODIC_MONTH_DAYS) + 1)
  return moonDay
}

function getFirstSunday(date = new Date()) {
  const firstDate = new Date(date.setDate(1))
  const firstDay = firstDate.getDay()
  return firstDay > 0
    ? new Date(firstDate.setDate(firstDate.getDate() - firstDay))
    : firstDate
}

function getLastSaturday(date = new Date()) {
  const lastDate = new Date(new Date(date.setMonth(date.getMonth() + 1)).setDate(0))
  const lastDay = lastDate.getDay()
  return lastDay < 6
    ? new Date(lastDate.setDate(lastDate.getDate() + (6 - lastDay)))
    : lastDate
}

function getMoonPhaseDates(currentDate = new Date()) {
  const newMoonTime = new Date('1970-01-07T20:35:50.73Z').getTime()
  const currentMoonMonth = Math.floor((currentDate.getTime() - newMoonTime) / SYNODIC_MONTH_MILLIS)
  const previousNewMoon = new Date(newMoonTime + currentMoonMonth * SYNODIC_MONTH_MILLIS)
  const prevNewMoonCeil = getBareDate(
    new Date( new Date( previousNewMoon.setDate( new Date(previousNewMoon.getTime()).getDate() + 1 ) ) )
  )
  const preBeforeNewMoon = new Date(prevNewMoonCeil.getTime() - SYNODIC_MONTH_MILLIS)
  const beforeNewMoon = new Date(previousNewMoon)
  const afterNewMoon = new Date(previousNewMoon.getTime() + SYNODIC_MONTH_MILLIS)
  const postAfterNewMoon = new Date(previousNewMoon.getTime() + 2 * SYNODIC_MONTH_MILLIS)

  const castedDates = [
    getBareDate(preBeforeNewMoon),
    getBareDate(beforeNewMoon),
    getBareDate(afterNewMoon),
    getBareDate(postAfterNewMoon),
  ]

  return castedDates
}

export {
  getFirstSunday,
  getLastSaturday,
  getMoonDay,
  getMoonPhaseDates,
}
