var messageNotSent = true;
var graphData = {
  "settings": {
    "infoWindowTransparency": true,
    "legend": false,
    "toolbar": true,
    "backgroundColor": "lightgray",
    // "thinginToken" can be retrieve by ThinginAdaper api: post /auth with fixed basic token of the developer account, like si.wu@orange.com 
    "thinginToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlMjU5M2ZjYy04MmNhLTExZWItYjY3OC1mYTE2M2U5YjQyYzciLCJzdWIiOiJjOGIwNjc3Ny1lY2I5LTQ4Y2YtOTA3Yy1jMDEyMzI5ZDc3Y2MiLCJleHRlcm5hbGlkIjoic2kud3VAb3JhbmdlLmNvbSIsImlzcyI6IlRoaW5nX2luIiwiaWF0IjoxNjE1NTA5MzQ1LCJleHAiOjE2MTU1OTU3NDUsImRvbWFpbnMiOlsiaHR0cDovLyIsImh0dHBzOi8vIl0sInNjb3BlcyI6WyJwcm92aWRlciJdfQ.WIz5DrFaUrd8GwXGNbF1EMkIZyw9Ai99eJAIXkkb59bOckv_v8eziVHACCpMy37ovqEqN_XJkUkykOirna3GKd8OkjPEspW4_tpb5vvmHFxkWI5gacaG3ll834KzISpBsP9sqGkOET3wN4EIWuSQn178pVYYyZkVaciMj93Sp2dAnCGnOJrw0hGWNnctAmj8lh7ky0ptN_dam5Wichh9-GHu3E5Wkbck-ByFR7TYsi-rSozeiOOZoh14l5MTy_c36jgZDyzYdNQAvxFZkur6x6KikENkOmlYqMoG1i6ZyWCCIZx7HzTCpXv-ooB_PY9GClZqJKwlfsjEDJAH3ioKGQ",
    "thinginEndpoint": "https://coreapi.thinginthefuture.com/",
    "niceNameFields": ['http://www.w3.org/2006/vcard/ns#given-name','http://www.w3.org/2006/vcard/ns#street-address', "http://www.w3.org/ns/td#id"],
    "blueprint": {
      "url" : "http://localhost:5500/assets/map2.png",         // image url
      "id": "map2",                   // id of svg element in file
      "scale": 20,  // pixels/m  it should be equal to 1.0/map.yaml.resolution
      "indoorLocation":{
         "origin": {"x": 51.224998*20, "y": 51.224998*20},  //it should be equal to "x": map.yaml.origin[0]/map.yaml.resolution, "y": map.yaml.origin[1]/map.yaml.resolution
         "rotation" : 0
      },
      "ifc" : {
        "origin": {"x": 198, "y": 248},
        "rotation": (100 / 180) - Math.PI
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
