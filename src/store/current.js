import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default ({
  namespaced: true,

  //data goes here
  state () {
    return {
      currentData: {},
      currentLocData: {},
      hourlyData: [],
      tenDayData: []
    };
  },


  //set/update/add data with these methods (step 3)
  mutations: {
    updateCurrentData (state, currentData) {
      state.currentData = Object.assign(
        {},
        state.currentData,
        currentData
      );
    },

    updateCurrentLocData (state, currentLocData) {
      state.currentLocData = Object.assign(
        {},
        state.currentLocData,
        currentLocData
      );
    },


    updateHourlyData (state, hourlyData) {
      state.hourlyData = hourlyData;
    },


    updateTenDayData (state, tenDayData) {
      state.tenDayData = tenDayData;
    },


  },


  //call mutations and getters from here (step 2)
  actions: {
    callUpdateCurrentLocation (state, currentLocData) {
      //(mutation name, data-to-pass-in)
      state.commit('updateCurrentLocData', currentLocData);
    },

    callUpdateCurrentData (state, currentData) {
      //(mutation name, data-to-pass-in)
      state.commit('updateCurrentData', currentData);
    },


    callUpdateHourlyData (state, hourlyData) {
      console.log(state, hourlyData);
      //(mutation name, data-to-pass-in)
      state.commit('updateHourlyData', hourlyData);
    },


    callUpdateTenDayData (state, tenDayData) {
      //(mutation name, data-to-pass-in)
      state.commit('updateTenDayData', tenDayData);
    }


  }


});