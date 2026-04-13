import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TrainingForm from '../views/TrainingForm.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/add', component: TrainingForm },
  { path: '/edit/:id', component: TrainingForm }
]

export default createRouter({
  history: createWebHistory(),
  routes
})