import { getFirstSunday, getLastSaturday, getMoonPhaseDates, getMoonDay } from './dateUtils'

function getGregCalendar(date = new Date(), isCurrent = false) {
  const calendar = []
  let currentDate = getFirstSunday(date)
  let endDate = getLastSaturday(date)

  while (currentDate <= endDate) {
    const week = []

    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate),
        current: currentDate.getMonth() === new Date().getMonth() && isCurrent,
      })
      currentDate.setDate(currentDate.getDate() + 1)

    }

    calendar.push(week)
  }

  return calendar
}

function getMoonCalendar(date = new Date()) {
  const calendar = []
  const moonPhaseDates = getMoonPhaseDates(date)

  for (let i = 0; calendar.length < moonPhaseDates.length - 1; i ++) {
    const startDate = new Date(moonPhaseDates[i])
    const endDate = new Date(moonPhaseDates[i + 1])
    const weeks = generateMonthWeeks(startDate, endDate, moonPhaseDates)
    calendar.push(weeks)
  }

  return calendar
}

function generateMonthWeeks(startDate, endDate, moonPhaseDates) {
  const weeks = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate && weeks.length < 6) {
    const week = []

    for (let i = 0; i < 5; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate) === 1 && i === 4 ? 30 : getMoonDay(currentDate),
        current: currentDate >= moonPhaseDates[1]
          && currentDate <= moonPhaseDates[2],
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    weeks.push(week)
  }

  return weeks
}

export {
  getGregCalendar,
  getMoonCalendar,
}
