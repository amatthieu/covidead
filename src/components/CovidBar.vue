<template>
  <div class="country">
    <img :src="flagUrl" class="flag"/>
    <div class="bar" :style="style"/>
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
    name: 'CovidBar',
    props: {
      country: Object,
      totalConfirmed: Number,
    },
    setup(props) {
      const flagUrl = computed(() => `https://www.countryflags.io/${props.country.CountryCode}/flat/48.png`)
      const style = computed(() => ({
        width: `${props.country.percentageOfMax * 100}%`,
        'background-color': `#${props.country.color}`,
      }))

      return {
        flagUrl,
        style,
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
}
</style>
