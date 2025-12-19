import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'big-count',
  () => {
    const count = ref(100)
    const setCount = (newCount) => {
      count.value = newCount
    }
    return {
      count,
      setCount
    }
  },
  {
    persist: true
  }
)
