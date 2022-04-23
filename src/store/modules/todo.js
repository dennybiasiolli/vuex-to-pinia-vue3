import axios from 'axios'
import { GET_TODO_LIST } from './todo-types'

export const defaultState = {
  todoList: [],
  todoListLoading: false,
  todoListLoadingError: null,
}

export const mutations = {
  [`${GET_TODO_LIST}_REQUEST`](state) {
    state.todoListLoading = true
    state.todoListLoadingError = null
  },
  [`${GET_TODO_LIST}_SUCCESS`](state, todoList) {
    state.todoListLoading = false
    state.todoListLoadingError = null
    state.todoList = todoList
  },
  [`${GET_TODO_LIST}_FAILURE`](state, error) {
    state.todoListLoading = false
    state.todoListLoadingError = error
    state.todoList = []
  },
}

export const actions = {
  async [GET_TODO_LIST]({ commit }, params) {
    commit(`${GET_TODO_LIST}_REQUEST`)
    try {
      const { data } = await axios.get(`data/todoList.json`, { params })
      commit(`${GET_TODO_LIST}_SUCCESS`, data)
    } catch (err) {
      commit(`${GET_TODO_LIST}_FAILURE`, err)
    }
  },
}

export default {
  namespaced: true,
  state: () => ({ ...defaultState }),
  mutations,
  actions,
}
