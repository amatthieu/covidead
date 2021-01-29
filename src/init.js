import {useFilters, useActiveFilter} from "./store/filter"

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
  const [filters, setFilters] = useFilters()
  const [activeFilter, setActiveFilter] = useActiveFilter()

  axios.get(`https://api.covid19api.com/summary`).then(({data}) => {
    setFilters(extractFilters(data))
    setActiveFilter(filters[0])
  })
}
