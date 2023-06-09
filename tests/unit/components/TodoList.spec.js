import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todo'

describe('TodoList.vue', () => {
  let pinia;
  let todoStore;
  beforeEach(() => {
    pinia = createTestingPinia({
      /**
       * using spy function from vitest when `globals: false` (default)
       * to explicitly defining the `spy` function,
       * set `globals: true` in `vite.config.js`, section `test`
       */
      createSpy: vi.fn,
      initialState: {
        todo: {
          todoList: [
            { id: 1, name: 'test', completed: true },
            { id: 2, name: 'test2', completed: false },
          ],
          todoListLoading: false,
          todoListLoadingError: null,
        },
      },
    })
    todoStore = useTodoStore()
  })
  test('should respect the snapshot', () => {
    const wrapper = shallowMount(TodoList, { global: { plugins: [pinia] } })
    expect(wrapper.element).toMatchSnapshot()
    expect(todoStore.getTodoList).toHaveBeenCalledWith()
  })
})
