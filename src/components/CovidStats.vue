<template>
  <div class="stats">
    <h2><time :datetime="`${date.toISOString().slice(0,10)}`">{{date.toLocaleDateString()}}</time>'s stats</h2>
    <covid-bar v-for="country in countries" :key="country" :country="country"/>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import axios from "axios"
import CovidBar from "./CovidBar.vue"

function generateColor() {
  let color;
  do {
    color = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
  } while(color === 'FFFFFF')
  return color
}

export default {
  name: "CovidStats",
  components: {CovidBar},
  setup() {
    const countries = ref([])
    const maxConfirmed = ref(0)
    const date = ref(new Date())

    const orderedCountries = computed(() => countries.value.sort((c1, c2) => c2.NewConfirmed - c1.NewConfirmed))

    axios.get(`https://api.covid19api.com/summary`).then(({data}) => {
      date.value = new Date(data.Date)
      maxConfirmed.value = Math.max(...data.Countries.map((country) => country.NewConfirmed))
      countries.value = data.Countries.map((country) => {
        country.percentageOfMax = country.NewConfirmed / maxConfirmed.value
        country.color = generateColor()
        return country
      })
    })

    return {
      countries: orderedCountries,
      date
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
