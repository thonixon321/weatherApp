import axios from 'axios';



export const axiosHandler = {

  methods: {
    sendAxios: function (payLoadObj, settingsObj) {
      var axiosUrl = settingsObj.url,
      axiosMethod = settingsObj.method,
      data = {},
      params = {},
      //need this to avoid CORS error
      headerObj = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      if (settingsObj.url == 'https://my-json-server.typicode.com/thonixon321/weatherDb1/hourlyData' || settingsObj.url == 'https://my-json-server.typicode.com/thonixon321/weatherDb2/tenDayData') {

        const response = axios.get(
          settingsObj.url
        );

        response.then((result) => {
          console.log(result);
          settingsObj.callBack(result);
        });




      }else{

        if (axiosMethod == 'GET') {
          params = payLoadObj;
        }else {
          data = payLoadObj;
        }

        //send the request
        axios({
          method: axiosMethod,
          url: axiosUrl,
          headers: headerObj,

          data: data,
          params: params
        })
        //done call (promise)
        .then((result) => {
          console.log(result);
          settingsObj.callBack(result);
        })
        //catch errors
        .catch((error) => {
          console.log(error);
        });

      }





    }

  }
};