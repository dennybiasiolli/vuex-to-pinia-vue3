import { describe, test, beforeEach, expect, vi } from 'vitest'
import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue'
import { GET_TODO_LIST } from '@/store/modules/todo-types'

describe('TodoList.vue', () => {
  let store;
  let todoActions = {
    [GET_TODO_LIST]: vi.fn(),
  }
  beforeEach(() => {
    store = createStore({
      modules: {
        todo: {
          namespaced: true,
          state: () => ({
            todoList: [
              { id: 1, name: 'test', completed: true },
              { id: 2, name: 'test2', completed: false },
            ],
            todoListLoading: false,
            todoListLoadingError: null,
          }),
          actions: todoActions,
        },
      },
    })
  })
  test('should respect the snapshot', () => {
    const wrapper = shallowMount(TodoList, { global: { plugins: [store] } })
    expect(wrapper.element).toMatchSnapshot()
  })
})
