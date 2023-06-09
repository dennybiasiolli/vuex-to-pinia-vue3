import axios from 'axios'
import { defineStore } from 'pinia'

export const defaultState = {
  todoList: [],
  todoListLoading: false,
  todoListLoadingError: null,
}

export const actions = {
  async getTodoList(params) {
    this.todoListLoading = true
    this.todoListLoadingError = null
    try {
      const { data } = await axios.get('data/todoList.json', { params })
      this.todoList = data
    } catch (err) {
      this.todoListLoadingError = err
      this.todoList = []
    } finally {
      this.todoListLoading = false
    }
  },
}

export const useTodoStore = defineStore('todo', {
  state: () => defaultState,
  actions,
})
