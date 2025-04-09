<template>
  <div class="compact">
    <span>{{ teamAName }} {{ teamAScore }} x {{ teamBScore }} {{ teamBName }}</span>
  </div>
</template>

<script setup>
defineProps([
  'teamAName',
  'teamBName',
  'teamAScore',
  'teamBScore'
])
</script>

<style scoped>
.compact {
  background-color: #003893;
  color: white;
  padding: 8px;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
}
</style>
