import { describe, test, expect, vi } from 'vitest'
import store, { defaultState, getters, mutations, actions, modules } from '@/store'
import todoModule from '@/store/modules/todo'

describe('store', () => {
  describe('state', () => {
    test('should be as expected', () => {
      expect(defaultState).toEqual({
        count: 0,
      })
    })
  })

  describe('getters', () => {
    test('isEven should work as expected', () => {
      expect(getters.isEven({ count: 0 })).toBe(true)
      expect(getters.isEven({ count: 1 })).toBe(false)
      expect(getters.isEven({ count: 2 })).toBe(true)
    })

    test('isOdd should work as expected', () => {
      expect(getters.isOdd(undefined, { isEven: true })).toBe(false)
      expect(getters.isOdd(undefined, { isEven: false })).toBe(true)
    })
  })

  describe('mutations', () => {
    test('increment should work as expected', () => {
      const state = { count: 0 }
      mutations.increment(state)
      expect(state.count).toBe(1)
      mutations.increment(state)
      expect(state.count).toBe(2)
    })
  })

  describe('actions', () => {
    test('incrementAsync should work as expected', () => {
      vi.useFakeTimers()
      const context = { commit: vi.fn() }
      actions.incrementAsync(context)
      expect(context.commit).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1000)
      expect(context.commit).toHaveBeenCalledTimes(1)
      expect(context.commit).toHaveBeenCalledWith('increment')
      vi.useRealTimers()
    })
  })

  describe('modules', () => {
    test('should have expected modules', () => {
      expect(Object.keys(modules)).toEqual(['todo'])
      expect(modules.todo).toBe(todoModule)
    })
  })

  test('real store', () => {
    vi.useFakeTimers()
    expect(store.state.count).toBe(0)
    expect(store.getters.isEven).toBe(true)
    store.commit('increment')
    expect(store.state.count).toBe(1)
    expect(store.getters.isEven).toBe(false)
    store.commit('increment')
    expect(store.state.count).toBe(2)
    expect(store.getters.isEven).toBe(true)
    store.dispatch('incrementAsync')
    expect(store.state.count).toBe(2)
    vi.advanceTimersByTime(1000)
    expect(store.state.count).toBe(3)
    vi.useRealTimers()
  })
})
