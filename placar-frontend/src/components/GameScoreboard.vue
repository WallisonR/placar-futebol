<template>
  <div class="scoreboard" :class="{ compact: isCompact }">
    <div class="logos">
      <img :src="teamALogo" class="team-logo" v-if="teamALogo" />
      <span class="versus">{{ teamAName }} vs {{ teamBName }}</span>
      <img :src="teamBLogo" class="team-logo" v-if="teamBLogo" />
    </div>

    <div class="scores">
      <h2>
        <span :class="{ score: true, highlight: highlightA }">{{ teamAScore }}</span>
        <span>x</span>
        <span :class="{ score: true, highlight: highlightB }">{{ teamBScore }}</span>
      </h2>
    </div>

    <div class="match-info">
      <span class="half">{{ half }}</span>
      <span class="timer">{{ matchTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const teamAName = ref('Fortaleza')
const teamBName = ref('Racing')
const teamAScore = ref(0)
const teamBScore = ref(0)
const teamALogo = ref('')
const teamBLogo = ref('')
const matchTime = ref('00:00')
const half = ref('1ºT')
const highlightA = ref(false)
const highlightB = ref(false)
const isCompact = ref(false)

// Áudio do gol
const goalAudio = new Audio('/sounds/fortaleza-verdinha.mp3')

onMounted(() => {
  socket.on('update-score', (data) => {
    if (data.teamAScore > teamAScore.value) {
      highlightA.value = true
      goalAudio.play()
      setTimeout(() => highlightA.value = false, 1000)
    }

    if (data.teamBScore > teamBScore.value) {
      highlightB.value = true
      setTimeout(() => highlightB.value = false, 1000)
    }

    teamAName.value = data.teamAName
    teamBName.value = data.teamBName
    teamAScore.value = data.teamAScore
    teamBScore.value = data.teamBScore
    teamALogo.value = data.teamALogo
    teamBLogo.value = data.teamBLogo
    half.value = data.half || '1ºT'
  })

  socket.on('match-time', (time) => {
    matchTime.value = time
  })

  socket.on('set-half', (newHalf) => {
    half.value = newHalf
  })

  socket.on('set-compact', (value) => {
    isCompact.value = value
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.scoreboard {
  background-color: #001F54;
  color: white;
  padding: 10px 20px;
  text-align: center;
  border-radius: 10px;
  font-family: 'Bebas Neue', sans-serif;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.scoreboard.compact {
  max-width: 320px;
  padding: 5px 10px;
}

.logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 5px;
}

.scoreboard.compact .logos {
  gap: 10px;
}

.team-logo {
  width: 40px;
  height: 40px;
}

.versus {
  font-size: 26px;
  font-weight: bold;
}

.scoreboard.compact .versus {
  font-size: 16px;
}

.scores h2 {
  font-size: 26px;
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.score {
  font-weight: 900;
  font-size: 48px;
  margin: 0 8px;
  transition: all 0.3s ease-in-out;
}

.scoreboard.compact .score {
  font-size: 32px;
}

.match-info {
  margin-top: 5px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0.9;
}

.scoreboard.compact .match-info {
  font-size: 14px;
}

.half {
  font-weight: bold;
  color: #ffffff;
}

.timer {
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  background: #ffffff22;
  padding: 2px 8px;
  border-radius: 5px;
}

.scoreboard.compact .timer {
  font-size: 16px;
  padding: 1px 6px;
}

.highlight {
  color: white;
  font-weight: bold;
  font-size: 52px;
  animation: explodeColor 0.8s ease-in-out;
}

@keyframes explodeColor {
  0% {
    transform: scale(1);
    color: white;
  }
  30% {
    transform: scale(1.4);
    color: #e60026;
  }
  60% {
    color: #ffffff;
  }
  100% {
    transform: scale(1);
    color: #0044aa;
  }
}
</style>
