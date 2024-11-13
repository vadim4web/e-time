<template>
  <div class="lunar-calendar container">
    <svg viewBox="0 0 2000 2000" id="back-box">
      <defs>
        <g id="back-angles" class="back-design">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use
          v-for="angle in backAngles"
          :key="angle"
          href="#back-angles"
          :transform="`rotate(${angle})`"
        ></use>
      </g>
    </svg>

    <svg viewBox="0 0 2000 2000" id="six-box">
      <defs>
        <g id="six-cardinal" class="six-cardinal">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use
          v-for="angle in cardinalAngles"
          :key="angle" href="#six-cardinal"
          :transform="`rotate(${angle})`"
        ></use>
      </g>
    </svg>


    <svg
      v-for="lda, i in getMoonDay()"
      viewBox="0 0 2000 2000"
      :class="'lunar-day-angle lunar-day-angle' + lda"
      :key="i"
    >
      <polygon
        points="1000 1000 1000 0 1215 0"
        stroke="green"
        :fill="lda == getMoonDay() ? '#0066cc' : '#0066cc66'"
        stroke-width="0"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getMoonDay } from '@/utils/dateUtils.js'

const { date, refresh } = defineProps(['background', 'date', 'refresh'])

const backAngles = ref(Array.from({ length: 37 }, (_, index) => index * 12))
const cardinalAngles = ref(Array.from({ length: 7 }, (_, index) => index * 60))

function passMoonDayFromJsToCss() {
  const lunarDayAngles = document.querySelectorAll('.lunar-day-angle')

  for (let i = 0; i < lunarDayAngles.length; i++) {
    lunarDayAngles[i].style.setProperty('--moon-day', `${i + 1}`)
  }
}

onMounted(() => {
  passMoonDayFromJsToCss()
  if (refresh) setInterval(() => passMoonDayFromJsToCss(), refresh)
})
</script>

<style lang="scss">
%abs100dv {
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  z-index: 1;
}

.lunar-calendar {
  @extend %abs100dv;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.lunar-calendar::after {
  @extend %abs100dv;
  content: '';
}

#back-box,
#six-box {
  @extend %abs100dv;
  top: 0;
  left: 0;
  transform: scale(2.5);
}

#six-box {
  opacity: 0.5;
}

.back-design {
  stroke: #0066cc88;
  stroke-width: 1px;
}

.six-cardinal {
  stroke: #0066cc;
  stroke-width: 6px;
}

.lunar-day-angle {
  position: absolute;
  opacity: 0.571428;
  transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -webkit-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -moz-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -ms-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -o-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
}
</style>
