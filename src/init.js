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

export function fetchData() {
  const date = useDate()
  const filters = useFilters()
  const activeFilter = useActiveFilter()
  const countries = useCountries()

  axios.get(`https://api.covid19api.com/summary`).then(({data}) => {
    date.value = new Date(data.Date)
    filters.value = Object.keys(data.Global).map((filter) => {
      const words = filter.split(/([A-Z])/)
      return {
        text: `${words[1]}${words[2]} ${words[3]}${words[4]}`,
        name: filter,
      }
    })
    filters.value = filters.value.map((filter) => {
      return {
        ...filter,
        max: Math.max(...data.Countries.map((country) => country[filter.name]))
      }
    })
    activeFilter.value = filters.value[0]

    countries.value = data.Countries.map((country) => {
      country.color = generateColor()
      return country
    })
  })
}
