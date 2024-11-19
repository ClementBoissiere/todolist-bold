<template>
  <div class="min-h-screen bg-gray-200 p-8">
    <h1 class="text-3xl font-bold text-center mb-8">Task Management Board</h1>
    
    <ClientOnly>
      <AddTaskForm @add-task="addTask" />
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn
          title="To Start"
          status="start"
          :tasks="startTasks"
          @task-moved="handleTaskMove"
        />
        <TaskColumn
          title="Ongoing"
          status="ongoing"
          :tasks="ongoingTasks"
          @task-moved="handleTaskMove"
        />
        <TaskColumn
          title="Done"
          status="done"
          :tasks="doneTasks"
          @task-moved="handleTaskMove"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task'

const tasks = ref<Task[]>([])

const startTasks = computed(() => tasks.value.filter(task => task.status === 'start'))
const ongoingTasks = computed(() => tasks.value.filter(task => task.status === 'ongoing'))
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'))

const addTask = (newTask: Task) => {
  tasks.value.push(newTask)
}

const handleTaskMove = (event: any, columnStatus: 'start' | 'ongoing' | 'done') => {
  if (event.added) {
    const taskToUpdate = tasks.value.find(t => t.id === event.added.element.id)
    if (taskToUpdate) {
      taskToUpdate.status = columnStatus
      if (columnStatus === 'done') {
        taskToUpdate.endDate = new Date().toISOString().split('T')[0]
      } else {
        taskToUpdate.endDate = null
      }
    }
  }
}</script>