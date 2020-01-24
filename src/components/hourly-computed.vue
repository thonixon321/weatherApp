<template>
  <h3>
    {{ fullTime }}
  </h3>
</template>

<script>

  export default {

    name: 'HourlyComputed',

    data: function() {
      return{

      }
    },



    computed: {
      //convert military time to standard
      fullTime: function() {
        var startTime = new Date(this.time.startTime).toString(),
            startSplit = startTime.split(' '),
            militaryStart = startSplit[4],
            miliTime = militaryStart.toString(),
            time,
            hours,
            minutes,
            timeValue;

        time = miliTime.split(':'); // convert to array

        // fetch
        hours = Number(time[0]);
        minutes = Number(time[1]);

        // calculate
        if (hours > 0 && hours <= 12) {
          timeValue= "" + hours;
        } else if (hours > 12) {
          timeValue= "" + (hours - 12);
        } else if (hours == 0) {
          timeValue= "12";
        }

        // get minutes
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        // get AM/PM
        timeValue += (hours >= 12) ? " PM" : " AM";

        return timeValue;
      }
    },



    props: ['time'],



    methods: {

    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style scoped>

</style>