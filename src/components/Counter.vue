<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)
const isEven = computed(() => store.getters.isEven)
const isOdd = computed(() => store.getters.isOdd)
const increment = () => store.commit('increment')
const incrementAsync = () => store.dispatch('incrementAsync')
</script>

<template>
  <div>
    count is: {{ count }}
  </div>
  <div>
    isEven is: {{ isEven }}
    |
    isOdd is: {{ isOdd }}
  </div>
  <button @click="increment">increment sync</button>
  &nbsp;
  <button @click="incrementAsync">increment async</button>
</template>
