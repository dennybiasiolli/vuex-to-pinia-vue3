import axios from 'axios'
import { describe, test, expect, vi } from 'vitest'
import { defaultState, actions } from '@/stores/todo'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('pinia main store', () => {
  describe('state', () => {
    test('should be as expected', () => {
      expect(defaultState).toEqual({
        todoList: [],
        todoListLoading: false,
        todoListLoadingError: null,
      })
    })
  })

  describe('actions', () => {
    test('getTodoList success', async () => {
      const resolvedValue = { data: [{ id: 1, title: 'test' }, { id: 2, title: 'test2' }] }
      axios.get.mockReset().mockResolvedValue(resolvedValue)
      const state = {}
      const params = { page: 1 }
      const promise = actions.getTodoList.call(state, params)
      expect(state.todoListLoading).toBe(true)
      expect(state.todoListLoadingError).toBeNull()
      expect(axios.get).toHaveBeenCalledWith('data/todoList.json', { params })
      await promise;
      expect(state.todoList).toEqual(resolvedValue.data)
      expect(state.todoListLoading).toBe(false)
    })
    test('getTodoList failure', async () => {
      const rejectedValue = 'foo'
      axios.get.mockReset().mockRejectedValue(rejectedValue)
      const state = {}
      const params = { page: 1 }
      const promise = actions.getTodoList.call(state, params)
      expect(state.todoListLoading).toBe(true)
      expect(state.todoListLoadingError).toBeNull()
      expect(axios.get).toHaveBeenCalledWith('data/todoList.json', { params })
      await promise;
      expect(state.todoListLoadingError).toBe(rejectedValue)
      expect(state.todoList).toEqual([])
      expect(state.todoListLoading).toBe(false)
    })
  })
})