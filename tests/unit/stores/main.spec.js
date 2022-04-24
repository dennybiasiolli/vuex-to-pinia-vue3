import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, test, expect, vi } from 'vitest'
import { useStore, defaultState, getters, actions } from '@/stores/main'

describe('pinia main store', () => {
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
      expect(getters.isOdd.call({ isEven: true })).toBe(false)
      expect(getters.isOdd.call({ isEven: false })).toBe(true)
    })
  })

  describe('actions', () => {
    test('increment should work as expected', () => {
      const state = { count: 0 }
      actions.increment.call(state)
      expect(state.count).toBe(1)
      actions.increment.call(state)
      expect(state.count).toBe(2)
    })

    test('incrementAsync should work as expected', () => {
      vi.useFakeTimers()
      const state = { increment: vi.fn() }
      actions.incrementAsync.call(state)
      expect(state.increment).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1000)
      expect(state.increment).toHaveBeenCalled();
      vi.useRealTimers()
    })
  })

  describe('real store', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    test('should work as expected', () => {
      vi.useFakeTimers()
      const store = useStore()
      expect(store.count).toBe(0)
      expect(store.isEven).toBe(true)
      store.increment()
      expect(store.count).toBe(1)
      expect(store.isEven).toBe(false)
      store.increment()
      expect(store.count).toBe(2)
      expect(store.isEven).toBe(true)
      store.incrementAsync()
      expect(store.count).toBe(2)
      vi.advanceTimersByTime(1000)
      expect(store.count).toBe(3)
      vi.useRealTimers()
    })
  })
})