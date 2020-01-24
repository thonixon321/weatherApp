<template>

  <div class="currentWeather">
    <h1>Hourly Forecast for {{ cityName }}</h1>
    <div class="forecastContainer">
      <div class='forecastInnerContainer' v-for="(item, index) in hourlyData" :key="index">

        <div class="forecastItem" >
          <div class='currentDescription'>
            <Time :time='item' />
          </div>
          <!-- icon/description -->

          <Moon class='icon' v-if="item.textDesc == 'Dark'" />
          <Snow class='icon' v-else-if="item.textDesc == 'Snowy'" />
          <Wind class='icon' v-else-if="item.textDesc == 'Windy'" />
          <Cloud class='icon' v-else-if="item.textDesc == 'Mostly Cloudy'" />
          <Cloud class='icon' v-else-if="item.textDesc == 'Cloudy'" />
          <Storm class='icon' v-else-if="item.textDesc == 'Rain'" />
          <Storm class='icon' v-else-if="item.textDesc == 'Heavy Rain'" />
          <Storm class='icon' v-else-if="item.textDesc == 'Chance Showers And Thunderstorms'" />
          <Storm class='icon' v-else-if="item.textDesc == 'Showers And Thunderstorms'" />
          <Storm class='icon' v-else-if="item.textDesc == 'Showers And Thunderstorms Likely'" />
          <Ice class='icon' v-else-if="item.textDesc == 'Icy'" />
          <Rain class='icon' v-else-if="rain(item.textDesc)" />
          <Rain class='icon' v-else-if="item.textDesc == 'Widespread Rain Showers'" />
          <Rain class='icon' v-else-if="item.textDesc == 'Chance Rain Showers'" />
          <Rain class='icon' v-else-if="item.textDesc == 'Slight Chance Rain Showers'" />
          <Rain class='icon' v-else-if="item.textDesc == 'Rain Showers'" />
          <Sun class='icon' v-else />

        </div>

        <div class="forecastItem">
           <h3>{{ item.textDesc }}</h3>
        </div>

        <div class="forecastItem">
          <div class='currentConditions'>

            <!-- temp -->
            <div class='infoContainer currentTemp'>
               <span class='infoItem'>Temp:</span>  <span class='infoItem'>{{ item.temperature }}°F</span>
            </div>
            <!-- wind -->
            <div class='infoContainer currentWind'>
               <span class='infoItem'>Wind speed:</span>  <span class='infoItem'> {{ item.windSpeed }}</span>
            </div>
            <div class='infoContainer currentWind'>
               <span class='infoItem'>Wind direction:</span>  <span class='infoItem'>{{ item.windDir }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import Time from '@/components/hourly-computed.vue';
import Moon from '../assets/weather_assets/moon.vue';
import Cloud from '../assets/weather_assets/cloud.vue';
import Sun from '../assets/weather_assets/sun.vue';
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

    ...mapState({
      hourlyData: state => state.currentWeatherStore.hourlyData,
    })


  },



  methods: {
    rain: function(item) {
      if (item == 'Chance Light Rain') {
        return true;
      }else if (item == 'Light Rain') {
        return true;
      }else if (item == 'Partly Cloudy') {
        return true;
      }else if (item == 'Rain') {
        return true;
      }
      else if (item == 'Chance Rain Showers') {
        return true;
      }
      else if (item == 'Chance Rain Showers then Chance Light Rain') {
        return true;
      }
      else if (item == 'Chance Light Rain then Chance Rain Showers') {
        return true;
      }
      else if (item == 'Light Rain Likely') {
        return true;
      }
      else if (item == 'Rain Showers Likely') {
        return true;
      }
      else{
        return false;
      }
    }
  },


  //on load - this fires
  mounted: function() {
    //just practice for $emit (goes upwards to parent)
    this.$emit('loadMethod', {loaded: true});
  },

  components: {
    Time,
    Moon,
    Sun,
    Cloud,
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
    width: 69%;
    margin: 3em;
  }

  .forecastContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .forecastInnerContainer {
    width: 18em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .forecastItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .52em;
  }

  .infoContainer {
    display: flex;
    justify-content: space-between;
  }

  .currentDescription {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
  }
  .currentConditions {
    font-weight: bold;
    width: 15em;
  }
  .forecastItem h3{
    text-align: center;
  }
  .currentConditions div{
    border-top: 1px dashed #9b9797;
  }
  .icon {
    width: 7em;
    height: 8em;
  }
</style>
