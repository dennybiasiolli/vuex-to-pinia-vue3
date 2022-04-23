<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GET_TODO_LIST } from '@/store/modules/todo-types'

const store = useStore()
const todoList = computed(() => store.state.todo.todoList)
store.dispatch(`todo/${GET_TODO_LIST}`)
</script>

<template>
  <div v-for="todoItem of todoList" :key="todoItem.id">
    <input type="checkbox" v-model="todoItem.completed" />
    <span v-text="todoItem.name"></span>
  </div>
</template>
