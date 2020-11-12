import {ref, computed} from 'vue'

const state = ref({
  activeFilter: {
    value: '',
    text: '',
    max: 0,
  },
  filters: []
})

function setActiveFilter(stat) {
  state.value.activeFilter = stat
}
export function useActiveFilter() {
  return computed({ 
    get: () => state.value.activeFilter, 
    set: (value) => setActiveFilter(value),
  })
}

function setFilters(filters) {
  state.value.filters = filters
}
export function useFilters() {
  return computed({ 
    get: () => state.value.filters, 
    set: (value) => setFilters(value),
  })
}
