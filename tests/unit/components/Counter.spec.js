import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue'
import { useStore } from '@/stores/main'

describe('Counter.vue', () => {
  let pinia
  let store
  beforeEach(() => {
    pinia = createTestingPinia({
      /**
       * using spy function from vitest when `globals: false` (default)
       * to explicitly defining the `spy` function,
       * set `globals: true` in `vite.config.js`, section `test`
       */
      createSpy: vi.fn,
      initialState: {
        main: {
          count: 0,
        },
      },
    })
    store = useStore()
    store.isEven = true // getters are writable only in tests
    store.isOdd = false // getters are writable only in tests
  })
  test('should respect the snapshot', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [pinia] } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('increment button should call store mutation', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [pinia] } })
    wrapper.findAll('button')[0].trigger('click')
    expect(store.increment).toHaveBeenCalled()
  })

  test('incrementAsync button should call store action', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [pinia] } })
    wrapper.findAll('button')[1].trigger('click')
    expect(store.incrementAsync).toHaveBeenCalled()
  })
})
