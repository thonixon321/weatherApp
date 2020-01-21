<template>

  <div class="currentWeather">
    <div class="forecastContainer">
      <div class="forecastItem">
        <h1>Current Conditions for {{ cityName }}</h1>
        <!-- icon/description -->

          <Moon class='icon' v-if="currentData.textDesc == 'Dark'" />
          <Snow class='icon' v-else-if="currentData.textDesc == 'Snowy'" />
          <Wind class='icon' v-else-if="currentData.textDesc == 'Windy'" />
          <Cloud class='icon' v-else-if="currentData.textDesc == 'Mostly Cloudy'" />
          <Cloud class='icon' v-else-if="currentData.textDesc == 'Cloudy'" />
          <Storm class='icon' v-else-if="currentData.textDesc == 'Stormy'" />
          <Storm class='icon' v-else-if="currentData.textDesc == 'Heavy Rain'" />
          <Ice class='icon' v-else-if="currentData.textDesc == 'Icy'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Partly Cloudy'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Rain'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Rain Showers'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Light Rain'" />
          <Snow class='icon' v-else-if="currentData.textDesc == 'Chance Rain And Snow Showers'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Widespread Rain Showers'" />
          <Rain class='icon' v-else-if="currentData.textDesc == 'Chance Rain Showers'" />
          <Sun class='icon' v-else />

          <h3>{{ currentData.textDesc }}</h3>

        <div class='currentConditions'>
          <!-- temp -->
          <div class='infoContainer currentTemp' :class="currentData.temperature > 81 ? 'hot' : ''">
          <span class='infoItem'>Current Temperature:</span> <span class='infoItem'>{{ currentData.temperature }}°F</span>
          </div>
          <!-- wind -->
          <div class='infoContainer currentWind'>
             <span class='infoItem'>Wind speed:</span> <span class='infoItem'> {{ currentData.windSpeed }}</span>
          </div>
          <div class='infoContainer currentWind'>
             <span class='infoItem'>Wind direction:</span> <span v-if="currentData.windDir !== null" class='infoItem'>{{ currentData.windDir }}</span>
          </div>

          <!-- time -->
          <div class='currentTime'>

          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { mapState } from 'vuex';
import Moon from '../assets/weather_assets/moon.vue';
import Sun from '../assets/weather_assets/sun.vue';
import Cloud from '../assets/weather_assets/cloud.vue';
import Snow from '../assets/weather_assets/snow.vue';
import Wind from '../assets/weather_assets/wind.vue';
import Ice from '../assets/weather_assets/ice.vue';
import Storm from '../assets/weather_assets/storm.vue';
import Rain from '../assets/weather_assets/rain.vue';
//props have to be in the file that will use them (declared in msg from App.vue)
export default {
  name: 'current-conditions',

  data: function() {
    return {

    }
  },

  props: ['cityName'],


  computed: {
    //anytime data point tempC is updated,
    //tempF runs
    tempF: function () {
      if (this.currentData.temperature !== null) {
        return Math.round(this.currentData.temperature * (9/5) + 32);
      }else{
        return ('');
      }
    },


    windSpeedMPH: function () {
      if (this.currentData.windSpeed !== null) {
        return (this.currentData.windSpeed * 2.237).toFixed(2);
      }else{
        return ('');
      }
    },


    pressureHg: function () {

      return (this.currentData.pressure * 0.00029530).toFixed(2);
    },

    ...mapState({

      currentData: state => state.currentWeatherStore.currentData,
      //example of bringing in another store
      // currentData2: state => state.currentData

      // //namespace (module name)
      // 'currentWeatherStore',
      // //state properties
      // ['currentData']
    }
    )




  },



  methods: {},



  created: function() {

  },


  //on load - this fires
  mounted: function() {
    //just practice for $emit (goes upwards to parent)
    this.$emit('loadMethod', {loaded: true});
  },

    components: {
      Moon,
      Cloud,
      Sun,
      Snow,
      Wind,
      Ice,
      Storm,
      Rain

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .currentWeather {
    width: 23em;
    margin: 1em 6em;
  }

  .forecastContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .forecastItem{
    width: 23em;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .infoContainer {
    display: flex;
    justify-content: space-between;
  }

  .currentDescription {
    font-size: 1.42em;
    font-weight: bold;
    text-align: center;
  }
  .currentConditions {
    width: 90%;
    font-weight: bold;
  }
  .currentConditions div{
    border-top: 1px dashed #9b9797;
  }

  .invalid {
    border: 1px solid red;
  }

  .hot {
    color: red;
  }
</style>
