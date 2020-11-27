import axios from 'axios'
import {useDate} from '@/state/date'
import {useFilters, useActiveFilter} from '@/state/filter'
import {useCountries} from '@/state/countries'

function generateColor() {
  let color;
  do {
    color = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
  } while(color === 'FFFFFF')
  return color
}
function extractDate(data) {
  return new Date(data.Date)
}
function extractFilters(data) {
  return Object.keys(data.Global).map((filter) => {
    const words = filter.split(/([A-Z])/)
    return {
      text: `${words[1]}${words[2]} ${words[3]}${words[4]}`,
      name: filter,
    }
  }).map((filter) => {
    return {
      ...filter,
      max: Math.max(...data.Countries.map((country) => country[filter.name]))
    }
  })
}
function extractCountries(data) {
  return data.Countries.map((country) => {
    country.color = generateColor()
    return country
  })
}

export function fetchData() {
  const date = useDate()
  const filters = useFilters()
  const activeFilter = useActiveFilter()
  const countries = useCountries()

  axios.get(`https://api.covid19api.com/summary`).then(({data}) => {
    date.value = extractDate(data)
    filters.value = extractFilters(data)
    countries.value = extractCountries(data)
    activeFilter.value = filters.value[0]
  })
}
