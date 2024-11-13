<template>
  <div class="greg-calendar container">
    <table
      v-for="month, index in months"
      :key="index"
      class="table"
      :class="'--table' + index"
    >
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in month" :key="week">
          <td
            class="greg"
            v-for="day in week"
            :key="day.date"
            :data-date="day.date"
            :data-moon="day.moon"
            @click="(e) => $parent.handleDateClick(e, day, e.target)"
            :class="{
              'moon-day': day.moon === getMoonDay(currentDate) && day.current
              && new Date(day.date).getMonth() === new Date().getMonth()
              && new Date(day.date).getDate() === new Date().getDate(),
              current: day.current
            }"
            :title="`${day.date.slice(0, 10)} Solar date`"
          >
            {{ new Date(day.date).getDate() }}
          </td>
        </tr>

        <tr v-if="!month[5]">
          <th v-for="day in weekDays" :key="day" class="day-name">{{ day }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirstSunday, getLastSaturday, getMoonDay } from '@/utils/dateUtils.js'
import { getGregCalendar } from '@/utils/getCalendar.js'

const { date, eventHandler } = defineProps(['date', 'eventHandler'])
const currentDate = date || new Date()

const prevMonthData = getGregCalendar(new Date(getFirstSunday(new Date())))
const currMonthData = getGregCalendar(new Date(), true)
const nextMonthData = getGregCalendar(new Date(getLastSaturday(new Date())))

const months = ref([prevMonthData, currMonthData, nextMonthData])
const weekDays = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
</script>

<style lang="scss">
.greg-calendar {
  .current {
    background: #ffcc0044;
  }

  .moon-day,
  .--table1 thead th {
    background: #ffcc0088;
    filter: contrast(2);
  }

  .--table0,
  .--table2 {
    thead th {
      background: #ffcc0044;
    }
  }
}
</style>
