<template>
  <div class="bg-gray-100 p-4 rounded-lg w-full">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <VueDraggable
      v-model="columnTasks"
      :group="{ name: 'tasks' }"
      item-key="id"
      class="min-h-[200px]"
      @change="(event) => handleChange(event)"
    >
      <template #item="{ element }">
        <div class="bg-white p-4 rounded shadow-md mb-2">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">{{ element.name }}</h3>
            <span :class="getStatusBadgeClass(element.status)">
              {{ element.status }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-2 whitespace-pre-wrap">{{ element.comment }}</p>
          <p class="text-xs text-gray-500">Start: {{ formatDate(element.startDate) }}</p>
          <p v-if="element.endDate" class="text-xs text-gray-500">
            End: {{ formatDate(element.endDate) }}
          </p>
        </div>
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import type { Task } from '~/types/task'

const props = defineProps<{
  title: string
  status: 'start' | 'ongoing' | 'done'
  tasks: Task[]
}>()

const emit = defineEmits<{
  taskMoved: [event: any, status: 'start' | 'ongoing' | 'done']
}>()

const columnTasks = computed({
  get: () => props.tasks,
  set: () => { /* handled by parent */ }
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'text-xs px-2 py-1 rounded-full'
  switch (status) {
    case 'start':
      return `${baseClasses} bg-blue-100 text-blue-800`
    case 'ongoing':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'done':
      return `${baseClasses} bg-green-100 text-green-800`
    default:
      return baseClasses
  }
}

const handleChange = (event: any) => {
  emit('taskMoved', event, props.status)
}</script>