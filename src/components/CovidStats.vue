<template>
  <div class="stats">
    <h2><time :datetime="`${date.toISOString().slice(0,10)}`">{{date.toLocaleDateString()}}</time>'s stats</h2>
    <Filter/>
    <CovidBar v-for="country in countries" :key="country" :country="country"/>
  </div>
</template>

<script>
import {computed} from 'vue'
import CovidBar from '@/components/CovidBar'
import Filter from '@/components/Filter'

import {useActiveFilter} from '@/state/filter'
import {useCountries} from '@/state/countries'
import {useDate} from '@/state/date'

import {fetchData} from '@/init'

export default {
  name: "CovidStats",
  components: {
    CovidBar,
    Filter,
  },
  setup() {
    const countries = useCountries()
    const date = useDate()
    const filter = useActiveFilter()

    fetchData()

    const orderedCountries = computed(
      () => countries.value.sort((c1, c2) => c2[filter.value.value] - c1[filter.value.value])
    )

    return {
      countries: orderedCountries,
      date,
    }
  }
}
</script>

<style scoped>
.stats {
  width: 75%;
  background-color: rgb(240, 240, 240);
  padding: 20px;
  border-radius: 20px;
}
</style>
