var messageNotSent = true;
var graphData = {
  "settings": {
    "infoWindowTransparency": true,
    "legend": false,
    "toolbar": true,
    "backgroundColor": "lightgray",
    "thinginToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0NGU4MjVlYS04MWFlLTExZWItYjY3OC1mYTE2M2U5YjQyYzciLCJzdWIiOiJjOGIwNjc3Ny1lY2I5LTQ4Y2YtOTA3Yy1jMDEyMzI5ZDc3Y2MiLCJleHRlcm5hbGlkIjoic2kud3VAb3JhbmdlLmNvbSIsImlzcyI6IlRoaW5nX2luIiwiaWF0IjoxNjE1Mzg3MTA0LCJleHAiOjE2MTU0NzM1MDQsImRvbWFpbnMiOlsiaHR0cDovLyIsImh0dHBzOi8vIl0sInNjb3BlcyI6WyJwcm92aWRlciJdfQ.LbDZD189yIlyRIwPazErHGB7O3ASAuf57zFdKN0iKBXK-cGMcQZOpXLEqIcW81p_YJX4vj0gHGWyuo2LB177Im8DrdBJRwBzF3pWJdUKxavGqwTDrkIa0pfUbyTAO61lsUdXqB8JKJneM2bYhaX8FxCG3Gg4UutSXMa4weXt056Z476PPfxCCQ2MnXvxQMHk1HeMUjRCuLw_vISjVItFjNtRx-PBs0IazCJcN79lCrZwtnRsdY0IY9DmzLsV8sW6utGm_Jor_VaQDQyHkQ0sO8MrCwWDKuspOSjaE3dOWU9djVKIN9dz8drbglAhc4BS3s4DNFWLdvG9j6H1I3CJBg",
    "thinginEndpoint": "https://coreapi.thinginthefuture.com",
    "blueprint": {
      "url" : "../assets/map2.png",         // image url
      "id": "map2",                   // id of svg element in file
      "scale": 1.063 - 500/37.85,  // pixels/m
      "indoorLocation":{
         "origin": {"x": 100, "y": 100},
         "rotation" : 0
      }
   }
  },
  "request" : {
    "payload" :
        {
          "query": {
            "$class": {
              "$in": [
                "http://orange.com/labs/china/ontologies/Sniffer_Object.owl#Sniffer_Room"
              ]
            }
          },
          "view": {}
        },
    "options" : {
        "size": 1000,
        "index": 0
    }
}
}
var graphDataMessage = JSON.stringify(graphData, false);

var iframe = document.getElementById('myIframe');
iframe.addEventListener('load', function() {
  console.log('load event received');
  if (messageNotSent) {
    iframe['contentWindow'].postMessage(graphDataMessage, "*");
    messageNotSent = false;
  }
});

window.addEventListener('message',
  function(event) {
    console.log('message received: ' + event.data);
    if (event.data == 'rearm') messageNotSent = true;
    else {
      if (event.data.type === 'nodeSelected') {
        // your code
      }
    }
  },
  false);

iframe.src = "https://tech.thinginthefuture.com/assets/plan2d-svg/index.html";
