<template>
  <div>
    <h2>{{ isEdit ? 'Редактирование тренировки' : 'Добавление тренировки' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Тип тренировки:</label>
        <select v-model="form.type" required>
          <option value="">Выберите</option>
          <option value="бег">Бег</option>
          <option value="йога">Йога</option>
          <option value="зал">Зал</option>
          <option value="плавание">Плавание</option>
        </select>
      </div>

      <div>
        <label>Дата тренировки:</label>
        <input type="date" v-model="form.date" :min="minDate" required>
      </div>

      <div>
        <label>Время начала:</label>
        <input type="time" v-model="form.startTime" required>
      </div>

      <div>
        <label>Длительность (минуты):</label>
        <input type="number" v-model="form.duration" min="15" max="180" required>
      </div>

      <div>
        <label>Тренер (Имя Фамилия):</label>
        <input type="text" v-model="form.trainer" placeholder="Иван Петров" required>
      </div>

      <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>

      <button type="submit">Сохранить</button>
      <button type="button" @click="$router.push('/')">Отмена</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrainingStore } from '../stores/trainingStore'

const route = useRoute()
const router = useRouter()
const store = useTrainingStore()

const isEdit = ref(false)
const errorMessage = ref('')
const minDate = new Date().toISOString().split('T')[0]

const form = ref({
  type: '',
  date: '',
  startTime: '',
  duration: 15,
  trainer: ''
})


const validate = () => {
  if (!form.value.type) return 'Выберите тип'
  if (form.value.date < minDate) return 'Дата не раньше текущей'
  if (form.value.duration < 15 || form.value.duration > 180) return 'Длительность 15-180 мин'
  
  const parts = form.value.trainer.trim().split(' ')
  if (parts.length !== 2) return 'Введите имя и фамилию'
  if (parts[0][0] !== parts[0][0].toUpperCase() || parts[1][0] !== parts[1][0].toUpperCase())
    return 'Имя и фамилия с заглавной буквы'
  return null
}

const formatTrainer = (name) => name.trim().split(' ').map(p => p[0].toUpperCase() + p.slice(1).toLowerCase()).join(' ')

const handleSubmit = () => {
  
  form.value.trainer = formatTrainer(form.value.trainer)
  
  const error = validate()
  if (error) {
    errorMessage.value = error
    return
  }
  
  if (isEdit.value) {
    store.updateTraining(route.params.id, form.value)
  } else {
    store.addTraining(form.value)
  }
  router.push('/')
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    const training = store.trainings.find(t => t.id === route.params.id)
    if (training) {
      form.value = { ...training }
    }
  }
})
</script>

<style scoped>
form > div {
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 150px;
}
button {
  margin-right: 10px;
}
</style>