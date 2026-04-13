import { defineStore } from 'pinia'

export const useTrainingStore = defineStore('training', {
  state: () => ({
    trainings: []
  }),
  actions: {
    addTraining(training) {
      const newTraining = {
        ...training,
        id: Date.now().toString(),
        status: 'запланирована'
      }
      this.trainings.push(newTraining)
    },
    updateTraining(id, updatedData) {
      const index = this.trainings.findIndex(t => t.id === id)
      if (index !== -1) {
        this.trainings[index] = { ...this.trainings[index], ...updatedData }
      }
    },
    deleteTraining(id) {
      this.trainings = this.trainings.filter(t => t.id !== id)
    },

    toggleStatus(id) {
      const training = this.trainings.find(t => t.id === id)
      if (training) {
        const statuses = ['запланирована', 'выполнена', 'пропущена']
        const currentIndex = statuses.indexOf(training.status)
        training.status = statuses[(currentIndex + 1) % statuses.length]
      }
    }
  }
})