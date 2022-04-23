import { describe, test, beforeEach, expect, vi } from 'vitest'
import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  let store;
  let mutations = {
    increment: vi.fn(),
  }
  let actions = {
    incrementAsync: vi.fn(),
  }
  beforeEach(() => {
    store = createStore({
      state: () => ({
        count: 0,
      }),
      getters: {
        isEven: () => true,
      },
      mutations,
      actions,
    })
  })
  test('should respect the snapshot', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [store] } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('increment button should call store mutation', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [store] } })
    wrapper.findAll('button')[0].trigger('click')
    expect(mutations.increment).toHaveBeenCalled()
  })

  test('incrementAsync button should call store action', () => {
    const wrapper = shallowMount(Counter, { global: { plugins: [store] } })
    wrapper.findAll('button')[1].trigger('click')
    expect(actions.incrementAsync).toHaveBeenCalled()
  })
})
