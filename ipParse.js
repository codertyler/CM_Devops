const axios = require("axios");

//Setting request url into a variable
const requestURL = "https://ip-ranges.atlassian.com/";


//Making axios call to parse the JSON response from the url

axios({
  method: "GET",
  url: requestURL,
  //Although the json responses are automatically parsed in axios, for clarity including the responseType

  responseType: 'json',
}).then(function (response) {
  const ipRange = response.data;
  console.log(ipRange)
});


