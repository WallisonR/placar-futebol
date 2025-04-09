<template>
  <div>
    <GameScoreboard
      :teamAName="scoreData.teamAName"
      :teamBName="scoreData.teamBName"
      :teamAScore="scoreData.teamAScore"
      :teamBScore="scoreData.teamBScore"
      :teamALogo="scoreData.teamALogo"
      :teamBLogo="scoreData.teamBLogo"
      :matchTime="matchTime"
      :half="half"
      :compactMode="true"
    />
    <ControlPanel
      @update-data="handleUpdate"
      @control-timer="handleTimerControl"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import GameScoreboard from './components/GameScoreboard.vue'
import ControlPanel from './components/ControlPanel.vue'

const socket = io('http://localhost:3000')

const scoreData = ref({
  teamAName: 'Fortaleza',
  teamBName: 'Racing',
  teamAScore: 0,
  teamBScore: 0,
  teamALogo: '',
  teamBLogo: '',
  half: '1ºT'
})

const matchTime = ref('00:00')
const half = ref('1ºT')

onMounted(() => {
  socket.on('update-score', (data) => {
    scoreData.value = data
    half.value = data.half || '1ºT'
  })

  socket.on('match-time', (time) => {
    matchTime.value = time
  })
})

function handleUpdate(data) {
  scoreData.value = data
  half.value = data.half || '1ºT'
  socket.emit('update-score', data)
}

function handleTimerControl(action) {
  switch (action) {
    case 'start':
      socket.emit('start-timer')
      break
    case 'pause':
      socket.emit('pause-timer')
      break
    case 'reset':
      socket.emit('reset-timer')
      break
  }
}
</script>
