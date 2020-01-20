import Vuex from 'vuex';
import Vue from 'vue';
import current from './modules/current';

//load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
    modules: {
        current
    }
});