<script setup>
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import TaskManager from './TaskManager.vue'
import TaskStats from './TaskStats.vue'
</script>

<template>
  <Splitter style="height: calc(100vh - 2rem); border-radius: 8px; padding: 10px; overflow: hidden" class="shadow-lg border border-gray-200">
    <!-- Colonne gauche : gestion des tâches -->
    <SplitterPanel size="60" minSize="30" class="p-4 overflow-auto">
      <TaskManager />
    </SplitterPanel>

    <!-- Colonne droite : statistiques -->
    <SplitterPanel size="40" minSize="20" class="p-4 overflow-auto bg-gray-50">
      <TaskStats />
    </SplitterPanel>
  </Splitter>
</template>

<style scoped>
</style>
