<script setup>
import { ref, onMounted, h } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

const taskStore = useTaskStore()
const tasks = ref([])
const newTaskTitle = ref('')

onMounted(async () => {
  await taskStore.fetchTasks()
  tasks.value = taskStore.tasks
})

const add = async () => {
  if (newTaskTitle.value.trim() === '') return
  await taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}

const toggleDone = async (task) => {
  task.done = !task.done
  await taskStore.updateTask(task)
}

const remove = async (task) => {
  await taskStore.deleteTask(task.id)
}

const doneTemplate = (row) => {
  return h(Checkbox, {
    binary: true,
    modelValue: row.done,
    'onUpdate:modelValue': () => toggleDone(row)
  })
}

const actionTemplate = (row) => {
  return h(Button, {
    icon: 'pi pi-trash',
    severity: 'danger',
    rounded: true,
    onClick: () => remove(row)
  })
}
</script>


<!-- src/components/TaskManager.vue -->
<template>
    <div>
      <h2 class="mb-4 text-xl font-semibold">Mes Tâches</h2>
  
      <div class="flex gap-2 mb-4">
        <InputText v-model="newTaskTitle" placeholder="Ajouter une tâche..." class="w-full" />
        <Button label="Ajouter" icon="pi pi-plus" @click="add" />
      </div>
  
      <DataTable :value="tasks" class="p-datatable-sm" responsiveLayout="scroll">
        <Column field="title" header="Titre" />
        <Column field="done" header="Fait ?" :body="doneTemplate" />
        <Column header="Actions" :body="actionTemplate" />
      </DataTable>
    </div>
  </template>