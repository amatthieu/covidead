import {ref, computed} from 'vue'

const store = ref({
  countries: [],
})

function setCountries(countries) {
  store.value.countries = countries
}
export function useCountries() {
  return computed({
    get: () => store.value.countries,
    set: (value) => setCountries(value),
  })
}
