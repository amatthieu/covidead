import {ref, computed} from 'vue'

const state = ref({
  countries: [],
})

function setCountries(countries) {
  state.value.countries = countries
}
export function useCountries() {
  return computed({
    get: () => state.value.countries,
    set: (value) => setCountries(value),
  })
}
