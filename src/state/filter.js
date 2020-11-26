import {ref, computed} from 'vue'

const store = ref({
  activeFilter: {
    name: '',
    text: '',
    max: 0,
  },
  filters: []
})

function setActiveFilter(stat) {
  store.value.activeFilter = stat
}
export function useActiveFilter() {
  return computed({ 
    get: () => store.value.activeFilter, 
    set: (value) => setActiveFilter(value),
  })
}

function setFilters(filters) {
  store.value.filters = filters
}
export function useFilters() {
  return computed({ 
    get: () => store.value.filters, 
    set: (value) => setFilters(value),
  })
}
