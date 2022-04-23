import axios from 'axios'
import { describe, test, expect, vi } from 'vitest'
import todoModule, { defaultState, mutations, actions } from '@/store/modules/todo'
import { GET_TODO_LIST } from '@/store/modules/todo-types'

vi.mock('axios',  () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('store/modules/todo', () => {
  test('should be namespaced', () => {
    expect(todoModule.namespaced).toBe(true)
  })

  describe('state', () => {
    test('should be as expected', () => {
      expect(defaultState).toEqual({
        todoList: [],
        todoListLoading: false,
        todoListLoadingError: null,
      })
    })
  })

  describe('mutations', () => {
    test(`${GET_TODO_LIST}_REQUEST should work as expected`, () => {
      const state = {}
      mutations[`${GET_TODO_LIST}_REQUEST`](state)
      expect(state.todoListLoading).toBe(true)
      expect(state.todoListLoadingError).toBe(null)
    })
    test(`${GET_TODO_LIST}_SUCCESS should work as expected`, () => {
      const state = {}
      const todoList = [{ id: 1, title: 'test' }, { id: 2, title: 'test2' }]
      mutations[`${GET_TODO_LIST}_SUCCESS`](state, todoList)
      expect(state.todoListLoading).toBe(false)
      expect(state.todoListLoadingError).toBe(null)
      expect(state.todoList).toEqual(todoList)
    })
    test(`${GET_TODO_LIST}_FAILURE should work as expected`, () => {
      const state = {}
      const error = 'error message'
      mutations[`${GET_TODO_LIST}_FAILURE`](state, error)
      expect(state.todoListLoading).toBe(false)
      expect(state.todoListLoadingError).toBe(error)
      expect(state.todoList).toEqual([])
    })
  })

  describe('actions', () => {
    test(`${GET_TODO_LIST} success`, async () => {
      const commit = vi.fn()
      const resolvedValue = { data: [{ id: 1, title: 'test' }, { id: 2, title: 'test2' }] }
      axios.get.mockReset().mockResolvedValue(resolvedValue)
      const params = { page: 1 }
      const promise = actions[GET_TODO_LIST]({ commit }, params)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(`${GET_TODO_LIST}_REQUEST`)
      expect(axios.get).toHaveBeenCalledWith('data/todoList.json', { params })
      await promise
      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).toHaveBeenCalledWith(`${GET_TODO_LIST}_SUCCESS`, resolvedValue.data)
    })
    test(`${GET_TODO_LIST} failure`, async () => {
      const commit = vi.fn()
      const rejectedValue = 'foo'
      axios.get.mockReset().mockRejectedValue(rejectedValue)
      const params = { page: 1 }
      const promise = actions[GET_TODO_LIST]({ commit }, params)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(`${GET_TODO_LIST}_REQUEST`)
      expect(axios.get).toHaveBeenCalledWith('data/todoList.json', { params })
      await promise
      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).toHaveBeenCalledWith(`${GET_TODO_LIST}_FAILURE`, rejectedValue)
    })
  })
})
