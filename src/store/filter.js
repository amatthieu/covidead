import {useRef} from "react"

const [filters, setFilters] = useRef([])
export {filters, setFilters}

const [activeFilter, setActiveFilter] = useRef({
  name: '',
  text: '',
  max: 0
})
export {activeFilter, setActiveFilter}
