<script setup>
  import { onMounted, computed } from 'vue'
  import { useTaskStore } from '@/stores/useTaskStore'
  import Chart from 'primevue/chart'
  
  const taskStore = useTaskStore()
  
  onMounted(() => {
    if (!taskStore.tasks || !taskStore.tasks.length) {
      taskStore.fetchTasks()
    }
  })
  
  const chartData = computed(() => {
    const tasks = taskStore.tasks || []
    const done = tasks.filter(t => t.done).length
    const todo = tasks.length - done
  
    return {
      labels: ['Faites', 'À faire'],
      datasets: [{
        data: [done, todo],
        backgroundColor: ['#22c55e', '#ef4444']
      }]
    }
  })
  </script>
  

<!-- src/components/TaskStats.vue -->
<template>
    <div>
      <h2 class="mb-4 text-xl font-semibold">Statistiques</h2>
      <Chart type="pie" :data="chartData" />
    </div>
  </template>