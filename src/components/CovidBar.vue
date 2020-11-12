<template>
  <div class="country">
    <img :src="flagUrl" class="flag" :title="countryName"/>
    <div class="bar" :style="style" :title="barStats"/>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useActiveFilter} from '@/state/filter.js'

export default {
    name: 'CovidBar',
    props: {
      country: Object,
      totalConfirmed: Number,
    },
    setup(props) {
      const filter = useActiveFilter()
      const flagUrl = computed(() => `https://www.countryflags.io/${props.country.CountryCode}/flat/48.png`)
      const style = computed(() => ({
        width: `${(props.country[filter.value.name]/filter.value.max) * 100}%`,
        'background-color': `#${props.country.color}`,
      }))
      const countryName = computed(() => props.country.Country)
      const barStats = computed(() => props.country[filter.value.name])

      return {
        flagUrl,
        style,
        countryName,
        barStats,
      }
    },
}
</script>

<style scoped>
.country {
  display: flex;
  flex-flow: row;
  align-items: center;
  margin: 5px 0;
}
.bar {
  height: 32px;
  border-radius: 15px;
  box-shadow: 1px 2px 2px #2c3e50;
  transition: all 0.8s ease;
}
.flag {
  margin-right: 10px;
}
</style>
