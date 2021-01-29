import {useActiveFilter, useFilters} from '../store/filter'

function FilterOption({filter}) {
  return (
    <option key={filter.name} value={filter}>
      {filter.text}
    </option>
  )
}
function Filter() {
  const [filters] = useFilters()
  const [activeFilter, setActiveFilter] = useActiveFilter()
  return (
    <div>
      <label htmlFor="filter">Data displayed : </label>
      <select id="filter">
        {filters.map(filter => 
          <FilterOption filter={filter}></FilterOption>
        )}
      </select>
    </div>
  )
}

export default Filter
