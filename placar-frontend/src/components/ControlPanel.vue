<template>
  <div class="control-panel">
    <h3>Painel de Controle</h3>

    <div class="input-row">
      <input v-model="teamAName" placeholder="Nome Time A" />
      <input v-model="teamBName" placeholder="Nome Time B" />
    </div>

    <div class="input-row">
      <input v-model.number="teamAScore" type="number" placeholder="Placar Time A" />
      <input v-model.number="teamBScore" type="number" placeholder="Placar Time B" />
    </div>

    <div class="input-row">
      <input v-model="teamALogo" placeholder="URL Logo Time A" />
      <input v-model="teamBLogo" placeholder="URL Logo Time B" />
    </div>

    <div class="input-row">
      <label>Tempo:</label>
      <select v-model="half">
        <option value="1ºT">1º Tempo</option>
        <option value="2ºT">2º Tempo</option>
      </select>
    </div>

    <div class="input-row">
      <label>
        <input type="checkbox" v-model="compactMode" /> Modo Compacto
      </label>
    </div>

    <button @click="emitUpdate">Atualizar Placar</button>

    <div class="timer-buttons">
      <button @click="emitControl('start')">Iniciar</button>
      <button @click="emitControl('pause')">Pausar</button>
      <button @click="emitControl('reset')">Zerar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const emit = defineEmits(['update-data', 'control-timer'])

const teamAName = ref('Fortaleza')
const teamBName = ref('Racing')
const teamAScore = ref(0)
const teamBScore = ref(0)
const teamALogo = ref('')
const teamBLogo = ref('')
const half = ref('1ºT')
const compactMode = ref(false)

function emitUpdate() {
  emit('update-data', {
    teamAName: teamAName.value,
    teamBName: teamBName.value,
    teamAScore: teamAScore.value,
    teamBScore: teamBScore.value,
    teamALogo: teamALogo.value,
    teamBLogo: teamBLogo.value,
    half: half.value,
    compactMode: compactMode.value
  })

  socket.emit('set-half', half.value)
}

function emitControl(action) {
  emit('control-timer', action)
}

onMounted(() => {
  socket.on('set-half', (newHalf) => {
    half.value = newHalf
  })
})
</script>

<style scoped>
.control-panel {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.input-row {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

input, select {
  padding: 5px;
  flex: 1;
}

button {
  background-color: #003087;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #0050c1;
}

.timer-buttons {
  margin-top: 15px;
}
</style>
