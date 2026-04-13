<template>
  <div>
    <h1>Расписание тренировок</h1>
    <button @click="$router.push('/add')">+ Добавить тренировку</button>

    <div v-if="store.trainings.length === 0">Нет тренировок</div>

    <div v-for="training in store.trainings" :key="training.id" class="training-card">
      <div>
        {{ training.type }} | 
        Длительность: {{ training.duration }} мин | 
        Статус: 
        <span :class="training.status" @click="store.toggleStatus(training.id)" style="cursor:pointer">
          {{ training.status }}
        </span>
      </div>
      <div>Дата: {{ training.date }} | Время: {{ training.startTime }} | Тренер: {{ training.trainer }}</div>
      <div>
        <button @click="$router.push(`/edit/${training.id}`)">Редактировать</button>
        <button @click="store.deleteTraining(training.id)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useTrainingStore } from '../stores/trainingStore'
const store = useTrainingStore()

</script>

<style scoped>
.training-card {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
}

.запланирована { color: rgb(255, 165, 0); }
.выполнена { color: rgb(0, 128, 0); }
.пропущена { color: rgb(255, 0, 0); }

button {
  margin-right: 8px;
}
</style>