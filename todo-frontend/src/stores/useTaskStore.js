import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:1337/api/tasks')
        console.log('Réponse API:', res.data) // Log pour vérifier la structure
        // Vérifie bien que res.data.data contient les informations que tu veux
        this.tasks = res.data.data.map(item => ({
          id: item.id,
          title: item.title,  // Utilisation de item.title directement
          done: item.done    // Utilisation de item.done directement
        }))
      } catch (err) {
        this.error = err
        console.error('Erreur API:', err)
      } finally {
        this.loading = false
      }
    },
    async addTask(title) {
      const newTask = {
        data: {
          title,
          done: false
        }
      }
      const res = await axios.post('http://localhost:1337/api/tasks', newTask)
      const savedTask = {
        id: res.data.data.id,
        title: res.data.data.title,  // Assure-toi d'adapter comme il faut
        done: res.data.data.done
      }
      this.tasks.push(savedTask)
    },
    async updateTask(task) {
      await axios.put(`http://localhost:1337/api/tasks/${task.id}`, {
        data: {
          title: task.title,
          done: task.done
        }
      })
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:1337/api/tasks/${id}`)
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})
