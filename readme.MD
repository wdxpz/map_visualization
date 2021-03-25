This project shows how to use [Thing'in Plan2D](https://wiki.thinginthefuture.com/public/Map_and_graph_viewers) to show your own Thing'in avatars on an indoor map(scaned by robot SLAM)

Steps to do this:

1. create avatar with "locationPayload" to specify the avatar's position in the indoor map

   ```
   POST https://coreapi.thinginthefuture.com/avatars/
   body:
   {
       "_iri": "...",
       "_class": "...",
       "_visibility": 0,
       "http://www.opengis.net/gml/pos": "{\"type\": \"Point\", \"coordinates\": [116.409978, 39.968284]}",
       "http://orange.com/labs/china/ontologies/Sniffer_Object.owl#device_description": "Orange Beijing Office",
       "http://orange-labs.fr/fog/ont/object-location.owl#locationPayload": "{\"coordX\":3,\"coordY\":3,\"coordZ\":0}",
       
   }
   ```

   

2. in js of web application, configure the map, load avatar from Thing'in and define 

   ```
   var graphConfig = {
       'settings': {
         'thinginToken': userToken, //required
         'thinginEndpoint': 'https://coreapi.thinginthefuture.com/', //required
         'niceNameFields': ['http://www.w3.org/2006/vcard/ns#given-name', 'http://www.w3.org/2006/vcard/ns#street-address', 'http://www.w3.org/ns/td#id'], //required
         'blueprint': {
           'url': 'https://github.com/wdxpz/map_visualization/raw/main/assets/map2.png', //required, the url to your own map
           'id': 'map2',
           'scale': 20, //required, pixels in meter
           'indoorLocation': {
             'origin': {
               'x': 51.224998 * 20, //required, the pixels from orgin_x of the map picture's orginin (left_bottom point)
               'y': 51.224998 * 20 //required, the pixels from orgin_y of the map picture's orginin (left_bottom point)
             },
             'rotation': 0
           },
           'ifc': {  //required, but not meaningful if your avatars are loaded by querying from Thing'in
             'origin': {
               'x': 198,
               'y': 248
             },
             'rotation': (100 / 180) - Math.PI
           }
         }
       },
       // specify "request" payload to load required avatar from Thing'in
       'request': {
         'payload':
         {
           'query': {
             '$class': {
               '$in': [
                 'http://orange.com/labs/china/ontologies/Sniffer_Object.owl#Sniffer_Room'
               ]
             }
           },
           'view': {}
         },
         'options': {
           'size': 1000,
           'index': 0
         }
       }
     }
   ```

   3. in web application, deine the the message action for user interaction

   ```
   // receive avatar UUID when avatar was clicked in Plan2D
     addEventListenerForEl(window, 'message', function (event) {
       if (event.data.type === 'nodeSelected') {
         document.getElementById('uuid_label').innerText = 'avatar selected: ' + event.data.params._uuid
       }
     })
   
     // Highlight a avatar by send its uuid to Plan2D
     var msg_sender = document.getElementById('sendToWindow')
     addEventListenerForEl(msg_sender, 'click', function () {
       const message = JSON.stringify({
         type: 'selectAvatar',
         data: {
           uuid: '35ba2bbc-c996-4aab-9aea-fc21fe025d60'
         },
       })
       graphEl.contentWindow.postMessage(message, '*')
     })
   ```

   

   

   