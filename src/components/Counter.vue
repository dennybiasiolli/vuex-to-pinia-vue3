<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)
const isEven = computed(() => store.getters.isEven)
const increment = () => store.commit('increment')
const incrementAsync = () => store.dispatch('incrementAsync')
</script>

<template>
  <div>
    count is: {{ count }}
  </div>
  <div>
    <span v-if="isEven">&nbsp;is even</span>
    <span v-else>&nbsp;is odd</span>
  </div>
  <button @click="increment">increment sync</button>
  &nbsp;
  <button @click="incrementAsync">increment async</button>
</template>
