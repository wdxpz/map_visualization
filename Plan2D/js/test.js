var messageNotSent = true;
var graphData = {
  "settings": {
    "canFireNodeSelected": true,
    "infoWindowTransparency": true,
    "legend": false,
    "toolbar": true,
    "backgroundColor": "lightgray",
    // "thinginToken" can be retrieve by ThinginAdaper api: post /auth with fixed basic token of the developer account, like si.wu@orange.com 
    "thinginToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI2MGVhMmM5MC04NzgzLTExZWItYmNlNy1mYTE2M2U5YjQyYzciLCJzdWIiOiJjOGIwNjc3Ny1lY2I5LTQ4Y2YtOTA3Yy1jMDEyMzI5ZDc3Y2MiLCJleHRlcm5hbGlkIjoic2kud3VAb3JhbmdlLmNvbSIsImlzcyI6IlRoaW5nX2luIiwiaWF0IjoxNjE2MDI4MzkwLCJleHAiOjE2MTYxMTQ3OTAsImRvbWFpbnMiOlsiaHR0cDovLyIsImh0dHBzOi8vIl0sInNjb3BlcyI6WyJwcm92aWRlciJdfQ.Ss_ESa4dm3qLyDZvA4hSSL5F438xFXPmVjpxiPmG6vU5hWmJa6XKJcWFKOk8UnfliJYf6jSJ6DN0vGD2-ZVYpJK7LI5vyDJncMsqEXE2drQ8VLai_ncTJYnUOPf19RaukvD-5dYwAIFCjBTyKUmajzI9e0qfA0L_MH9InKlBitdsYC0pcZ0Nwqc9urWnuNmRkPBbjw7toG5NzRdLhaTGGLRDrYE3wFCus6fEOkkY_RQirSs0tUsSTHNLzmQ7U9mqGdre_b7hSqk91lo8niVumRVOq_xaaDOGNxRjJTxxpI3kO9pugFfahcO71HNYYIcoqJdzr_KbRnUExVMHGLew1Q",
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
    // console.log('message received: ' + event);
    if (event.data == 'rearm') messageNotSent = true;
    else {
      if (event.data.type === 'nodeSelected') {
        console.log('avatar selected: ' + event.data.params._uuid);
        document.getElementById('uuid_label').innerText = 'avatar selected: ' + event.data.params._uuid
      }
    }
  },
  false);

  var msg_sender = document.getElementById('sendToWindow');
  msg_sender.addEventListener('click', function() {
    const message = JSON.stringify({
        type: 'selectAvatar',
        data: {
          uuid: "35ba2bbc-c996-4aab-9aea-fc21fe025d60"
        },
    });
    console.log(message)
    // msg_sender.parent.postMessage(message, '*');
    iframe.contentWindow.postMessage(message, '*');
});

iframe.src = "https://tech.thinginthefuture.com/assets/plan2d-svg/index.html";
