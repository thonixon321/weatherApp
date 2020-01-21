import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/hourly',
      //this alias could add another name for the page route - can be helpful in SEO
      alias: '/hours',
      name: 'Hourly',
      component: () => import('./components/hourly-conditions.vue'),
      meta: {
        title: 'Hourly Forecast'
      }
    },
    {
      path: '/ten_day',
      name: 'Ten Day',
      component: () => import('./components/ten-day-conditions.vue'),
      meta: {
        title: 'Ten-Day Forecast'
      }
    }

  ]
});