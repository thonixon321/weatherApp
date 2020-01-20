<template>
  <div id="app" class="appStyles">
    <!-- title -->
    <div class='appTitle'>
      <h1 >Weather App</h1>
    </div>
    <div class='appTitle'>
      <h3>Coordinates: </h3>
      <div class='columnFlex'>
        <label for='locationX'>Latitude</label>
        <input type="number" v-model="xCoord" name='locationX' id='locationX'>
      </div>
      <div class='columnFlex'>
        <label for='locationY'>Longitude</label>
        <input type="number" v-model="yCoord" name='locationY' id='locationY'>
      </div>

      <button class='searchButton' @click="checkLocation">Search</button>

      <!-- <router-link class='nav hourlyNav' to="/hourly">
       <active-arrow v-if='hourlyActive'/>
       <span @click="hourlyActivate">Hourly</span>
      </router-link>

      <router-link class='nav weekNav' to="/ten_day">
        <active-arrow v-if='weekActive'/>
        <span @click="weekActivate">Week</span>
      </router-link> -->

      <a href='https://www.google.com/maps' target="_blank" class='maps'>Google Maps</a>
    </div>
    <!-- currentData after : are in other file, in "" it is in this data in this file -->
    <div class='content'>
      <!-- current conditions stays -->
      <transition
      mode='out-in'
      appear>
        <!-- <current-conditions
        :cityName="cityName"
        @loadMethod='loaded'
        v-if='initDataLoaded'
        /> -->
      </transition>

      <!-- switch between hour and ten-day -->
      <transition
      name='fromRight'
      mode='out-in'
      appear>
        <!-- <router-view :cityName="cityName">

        </router-view> -->
      </transition>
    </div>
  </div>
</template>

<script>
//you can import multiple exports from a file by doing:
//import {thingOne, thingtwo} from 'blah'
//always use {} on import of a file that doesn't export 'default'
import { axiosHandler }  from './mixins/axiosHandler.js'
// import activeArrow from './components/active-arrow.vue';
// import currentConditions from './components/current-conditions.vue';
import currentWeatherStore from '@/store/modules/current.js';
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'app',

  data: function() {
    return {
      currentData: {},
      initDataLoaded: false,
      hourlyActive: false,
      weekActive: false,
      xCoord: '43.1768',
      yCoord: '-124.1735',
      cityName: ''
    }
  },


  mixins: [axiosHandler],


  computed: {
    ...mapState({

      currentLocData: state => state.currentWeatherStore.currentLocData,

    })
  },


  methods: {
    //spread '...' unpacks all the actions object keys defined in vuex store
    //also, the 'currentWeatherStore' in front of the
    //callUpdateCurrentData refers to the namespaced store,
    //if you get rid of it, then it takes you to main store (both stores have 'callUpdateCurrentData' method)
    ...mapActions({
      callUpdateCurrentData: 'currentWeatherStore/callUpdateCurrentData',
      callUpdateCurrentLocation: 'currentWeatherStore/callUpdateCurrentLocation',
      callUpdateHourlyData: 'currentWeatherStore/callUpdateHourlyData',
      callUpdateTenDayData: 'currentWeatherStore/callUpdateTenDayData',
    }),



    loaded: function () {
      // console.log(passedObj);
    },

    hourlyActivate: function() {

      this.hourlyActive = true;
      this.weekActive = false;

    },

    weekActivate: function() {

      this.hourlyActive = false;
      this.weekActive = true;

    },

    checkActive: function() {
      var hourly = document.querySelector('.hourlyNav'),
          week = document.querySelector('.weekNav')
      console.log(hourly.classList.contains('router-link-active'));
      if (hourly.classList.contains('router-link-active')) {
        this.hourlyActive = true;
      }else{
        this.hourlyActive = false;
      }

      if (week.classList.contains('router-link-active')) {
        this.weekActive = true;
      }else{
        this.weekActive = false;
      }
    },

    //have to register a store with a namespace to use it
    getCurrentStore: function () {
      this.$store.registerModule('currentWeatherStore', currentWeatherStore)
    },

    //use actual coordinates to get info about city
    checkLocation: function() {
      var payLoadObj = {},
          coords,
          settingsObj;
      console.log(this.xCoord, this.yCoord);
      if (this.xCoord !== '' && this.yCoord !== '') {
        coords = parseFloat(this.xCoord).toFixed(4)+','+parseFloat(this.yCoord).toFixed(4);
      }else{
        alert('invalid coordinates');
        coords = '43.1768,-124.1735'
      }

      settingsObj = {
        url: 'https://api.weather.gov/points/'+coords+'',
        method: 'GET',
        callBack: this.checkLocationResponse
      };


      this.sendAxios(payLoadObj, settingsObj);
    },

    //after getting response about city, use the data to get weather
    checkLocationResponse: function(result) {
      console.log(result.data.properties);
       var resultProps = result.data.properties,
          useableData = {
            cwa: resultProps.cwa,
            coords: resultProps.gridX+","+resultProps.gridY,
            cityName: resultProps.relativeLocation.properties.city
          };

      //call the action in the store
      //(which then mutates the state which holds all the data)
      this.callUpdateCurrentLocation(useableData);
      console.log(this.currentLocData);
      this.cityName = this.currentLocData.cityName;
      this.initAjax(this.currentLocData.coords, this.currentLocData.cwa);
      this.getHourly(this.currentLocData.coords, this.currentLocData.cwa);
      this.getTenDay(this.currentLocData.coords, this.currentLocData.cwa);
    },

    //send request to api for ajax weather data (current conditions)
    initAjax: function (coords, cwa) {
      var payLoadObj = {},
      // use my custom api if weather.gov doesn't work:
      // https://my-json-server.typicode.com/thonixon321/weatherDb1/hourlyData
          settingsObjHourly = {
            url: 'https://api.weather.gov/gridpoints/'+cwa+'/'+coords+'/forecast/hourly',
            method: 'GET',
            callBack: this.initResponse
          };


      this.sendAxios(payLoadObj, settingsObjHourly);
    },

    //our response from ajax/axios
    initResponse: function (result) {
      var resultProps = result.data.properties.periods,
          useableData = {
            textDesc: resultProps[0].shortForecast,
            windDir: resultProps[0].windDirection,
            windSpeed: resultProps[0].windSpeed,
            temperature: resultProps[0].temperature,
            startTime: resultProps[0].startTime,
            endTime: resultProps[0].endTime
          };

      //call the action in the store
      //(which then mutates the state which holds all the data)
      this.callUpdateCurrentData(useableData);

      this.initDataLoaded = true;

    },


     //send request to api for ajax weather data (hourly conditions)
     getHourly: function(coords, cwa) {
      var payLoadObj = {},
      // use my custom api if weather.gov doesn't work:
      // https://my-json-server.typicode.com/thonixon321/weatherDb1/hourlyData
          settingsObjHourly = {
            url: 'https://api.weather.gov/gridpoints/'+cwa+'/'+coords+'/forecast/hourly',
            method: 'GET',
            callBack: this.getHourlyResponse
          };


      this.sendAxios(payLoadObj, settingsObjHourly);
     },


    //hourly ajax response
    getHourlyResponse: function(result) {
      var resultProps = result.data.properties.periods,
          useableData = [],
          tempObj;

      for (var i = 0; i < 10; i++) {
        tempObj = {
          textDesc: resultProps[i].shortForecast,
          windDir: resultProps[i].windDirection,
          windSpeed: resultProps[i].windSpeed,
          temperature: resultProps[i].temperature,
          startTime: resultProps[i].startTime,
          endTime: resultProps[i].endTime,
        }
        useableData.push(tempObj);
      }
      console.log(useableData);
      //call the action in the store
      //(which then mutates the state which holds all the data)
      this.callUpdateHourlyData(useableData);

     },


    //send request to api for ajax weather data (ten day conditions)
    getTenDay: function(coords, cwa) {
      var payLoadObj = {},
          settingsObjTenDay = {
            //for a custom api I made use:
            //https://my-json-server.typicode.com/thonixon321/weatherDb2/tenDayData
            url: 'https://api.weather.gov/gridpoints/'+cwa+'/'+coords+'/forecast',
            method: 'GET',
            callBack: this.getTenDayResponse
          };

      this.sendAxios(payLoadObj, settingsObjTenDay);
    },



    getTenDayResponse: function(result) {
      console.log('Ten Day: '+result);
      var resultProps = result.data.properties.periods,
          days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Thanksgiving Day'],
          useableData = [],
          tempObj;

      for (var i = 0; i < resultProps.length; i++) {
        if (days.indexOf(resultProps[i].name) >= 0) {
          tempObj = {
            textDesc: resultProps[i].shortForecast,
            windDir: resultProps[i].windDirection,
            windSpeed: resultProps[i].windSpeed,
            temperature: resultProps[i].temperature,
            time: resultProps[i].name
          }
          useableData.push(tempObj);
        }
      }
      console.log(useableData);

      //call the action in the store
      //(which then mutates the state which holds all the data)
      this.callUpdateTenDayData(useableData);

     }
  },



  created: function () {

    this.getCurrentStore();
    this.checkLocation('Coquille');

  },

  //updated will get called with every route change and reload -
  //mounted only gets called on the initial load
  updated: function () {
    var self = this;
    //when using setTimeout, self is needed to set the this
    setTimeout(function(){
      self.checkActive();
    }, 500);

  },


  mounted: function () {

  },



  components: {
    // currentConditions,
    // activeArrow
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  html {
    background-color: #c7fc98;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .nav {
    position: relative;
    display: flex;
    color: blanchedalmond;
    text-decoration: none;
    margin-top: .25em;
    margin-left: 3em;
    border: 1px solid blanchedalmond;
  }

  .searchButton {
    color: blanchedalmond;
    padding: 0.32em 1em;
    margin-top: 0.58em;
    background: transparent;
    border: 1px solid blanchedalmond;
    cursor: pointer;
  }

    .nav:hover,
    .searchButton:hover,
    .router-link-active{
      background-color: #232d74;
      cursor: pointer;
    }

  .appStyles {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #4d4b4b;
    fill: #555555;
  }

  .appTitle {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-bottom: -1.67em;
    padding: 0.25em;
    font-size: 1.5em;
    background-color: #555555;
    color: blanchedalmond;
  }

  .content {
    display: flex;
  }

  #location {
    cursor: pointer;
    width: 15em;
    height: 2.5em;
    margin-left: 1em;
    margin-top: .51em;
  }

  .currentIcon {
    width: 10em;
  }

  .currentDescription {
    white-space: nowrap;
  }

  .fromLeft-enter, .fromRight-enter {
    transform: translateX(320%);
  }

  .fromLeft-leave-to, .fromRight-leave-to {
    transform: translateX(320%);
  }

  .fromLeft-enter-active, .fromRight-enter-active {
    transition: 500ms ease-out;
  }

  .fromLeft-leave-active, .fromRight-leave-active {
    transition: 500ms ease-in;
  }

  .nav span {
    padding: 0.3em 1em 0.3em 1em;
  }

  .columnFlex {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    padding: .41em;
  }

  .activeArrow {
    position: absolute;
    top: 33%;
    left: -24%;
    width: .752em;
    height: .752em;
    background: transparent;
    border-top: 7px solid #42b883;
    border-right: 7px solid #42b883;
    border-left: transparent;
    border-bottom: transparent;
    border-radius: 15%;
    border-style: double;
    transform: rotate(45deg);
    animation: showActive 1s cubic-bezier(.17,.67,.83,.67) infinite forwards;
  }

  .maps {
    color: blanchedalmond;
    font-size: 1.3em;
    margin-left: 2em;
  }


  @keyframes showActive {
    0% {
      left: -27%;
    }

    50% {
      left: -12%;
    }

    100% {
      left: -27%;
    }
  }


</style>
