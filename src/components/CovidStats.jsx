import Filter from './Filter'
import {useActiveFilter} from '../store/filter'

function CovidStats() {
  const [activeFilter] = useActiveFilter()
  return (
    <div className="stats">
      <h2>{activeFilter} stats</h2>
      <Filter/>
    </div>
  )
}

export default CovidStats
