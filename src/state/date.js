import {ref, computed} from 'vue'

const state = ref({
  date: new Date(),
})

function setDate(date) {
  state.value.date = date
}
export function useDate() {
  return computed({
    get: () => state.value.date,
    set: (value) => setDate(value),
  })
}
