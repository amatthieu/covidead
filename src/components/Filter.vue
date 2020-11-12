<template>
  <div>
    <select v-model="activeFilter">
      <option v-for="filter in filters" :key="filter.value" :value="filter">{{filter.text}}</option>
    </select>
  </div>
</template>

<script>
import {useActiveFilter, useFilters} from '@/state/filter.js'

export default {
  name: "Filter",
  setup() {
    const activeFilter = useActiveFilter()
    const filters = useFilters()

    return {
      activeFilter,
      filters,
    }
  },
}
</script>

<style scoped>

</style>
