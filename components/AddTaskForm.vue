<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-4 rounded-lg shadow-md mb-6">
    <div class="grid gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Task Name</label>
        <input
          v-model="task.name"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Comment</label>
        <textarea
          v-model="task.comment"
          required
          rows="3"
          class="w-full p-2 border rounded resize-vertical"
          placeholder="Enter task details..."
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '~/types/task'

const task = ref({
  name: '',
  comment: ''
})

const emit = defineEmits<{
  addTask: [task: Task]
}>()

const handleSubmit = () => {
  const newTask: Task = {
    id: uuidv4(),
    name: task.value.name,
    comment: task.value.comment,
    startDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    endDate: null,
    status: 'start'
  }
  
  emit('addTask', newTask)
  
  // Reset form
  task.value = {
    name: '',
    comment: ''
  }
}</script>