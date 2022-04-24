import { defineStore } from 'pinia'

export const defaultState = {
  count: 0,
}

export const getters = {
  isEven: state => state.count % 2 === 0,
  isOdd() {
    return !this.isEven
  },
}

export const actions = {
  increment() {
    this.count++
  },
  incrementAsync() {
    setTimeout(() => {
      this.increment()
    }, 1000)
  },
}

export const useStore = defineStore('main', {
  state: () => defaultState,
  getters,
  actions,
})
