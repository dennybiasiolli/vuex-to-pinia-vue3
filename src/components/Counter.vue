<script setup>
// import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/main'


const store = useStore()
// const count = computed(() => store.count)
// const isEven = computed(() => store.isEven)
// const isOdd = computed(() => store.isOdd)
const { count, isEven, isOdd } = storeToRefs(store)
const { increment, incrementAsync } = store
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
