<script setup>
// import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
// const todoList = computed(() => todoStore.todoList)
const { todoList } = storeToRefs(todoStore)
todoStore.getTodoList()
</script>

<template>
  <div v-for="todoItem of todoList" :key="todoItem.id">
    <input type="checkbox" v-model="todoItem.completed" />
    <span v-text="todoItem.name"></span>
  </div>
</template>
