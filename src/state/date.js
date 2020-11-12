import {ref, computed} from 'vue'

const store = ref({
  date: new Date(),
})

function setDate(date) {
  store.value.date = date
}
export function useDate() {
  return computed({
    get: () => store.value.date,
    set: (value) => setDate(value),
  })
}
