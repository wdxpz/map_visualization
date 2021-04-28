/**
 * Author: WU Si, email: si.wu@orange.com; QIU Chen, email: chen.qiu@orange.com
 * Plan2D by Alain Dechorgnat, email: alain.dechorgnat@orange.com
 */

/**
 * AddEventListenerForEl
 * @description Bind event for selected element
 * @param {HTMLElement} targetEl 
 * @param {string} eventName 
 * @param {Function} func 
 * @param {boolean} useCapture
 */
function addEventListenerForEl(targetEl, eventName, func, useCapture = false) {
  targetEl.addEventListener(eventName, func, useCapture)
}

/**
 * GetBase64String
 * @description Encode string to base64 string
 * @param {string} sourceString
 * @return {string} targetString sourceString encode on Base64
 */
function getBase64String(s) {
  return btoa(unescape(encodeURIComponent(s)))
}

/**
 * GetToken
 * @description Get user's token to use other api without cookies
 * @return {string} userToken
 */
function getToken() {
  var ret = ''

  // Build & Send Request
  var url = 'https://coreapi.thinginthefuture.com/auth'
  var request = new XMLHttpRequest()
  request.open('GET', url, false)
  // Fill username:password here, ex: 'chen.qiu@orange.com:666Abc'
  var secretString = 'si.wu@orange.com:Abc123!@#'
  request.setRequestHeader('Authorization', 'Basic ' + getBase64String(secretString))
  request.send()

  // Process Response
  if (request.status === 200) {
    ret = request.responseText
  } else {
    console.error('Get Token error!', request.response)
  }

  return ret
}

/**
 * GenerateGraphConfig
 * @description Generate an configuration object for graph
 * @description 'thinginToken' can be retrieve by ThinginAdaper api: post /auth with fixed basic token of the developer account, like si.wu@orange.com
 * @description 'blueprint.url' means the image url of tilelayer
 * @description 'blueprint.id' means the id of svg element in file
 * @description 'blueprint.scale' means pixels/m, it should be equal to 1.0/map.yaml.resolution
 * @description 'blueprint.indoorLocation' means it should be equal to 'x': map.yaml.origin[0]/map.yaml.resolution, 'y': map_height - map.yaml.origin[1]/map.yaml.resolution
 * @description see more params' meaning in https://wiki.thinginthefuture.com/public/Map_and_graph_viewers
 * @return {object} graphConfig
*/
function generateGraphConfig() {
  var userToken = getToken()
  var graphConfig = {
    'settings': {
      'canFireNodeSelected': true,
      'infoWindowTransparency': true,
      'legend': false,
      'toolbar': true,
      'backgroundColor': 'lightgray',
      'thinginToken': userToken,
      'thinginEndpoint': 'https://coreapi.thinginthefuture.com/',
      'niceNameFields': ['http://www.w3.org/2006/vcard/ns#given-name', 'http://www.w3.org/2006/vcard/ns#street-address', 'http://www.w3.org/ns/td#id'],
      'blueprint': {
        //'url': 'https://github.com/wdxpz/map_visualization/raw/main/assets/map2.png',
        'url': "https://raw.githubusercontent.com/wdxpz/map_visualization/main/assets/bj03_modified.png",
        'id': 'bj03_modified',
        'scale': 20,
        'indoorLocation': {
          'origin': {
            'x': 27.6 * 20,
            'y': 1088 - 32.4 * 20
          },
          'rotation': 0
        },
        'ifc': {
          'origin': {
            'x': 198,
            'y': 248
          },
          'rotation': (100 / 180) - Math.PI
        }
      }
    },
    'request': {
      'payload':
      {
        'query': {
          "$domain": "http://orange.bj.com/",
          "$classes": {
               "$in": [
                  "http://orange.com/labs/china/ontologies/Sniffer_Object.owl#Sniffer_Tv",
                  "http://orange.com/labs/china/ontologies/Sniffer_Object.owl#Sniffer_CoffeeMaker",
                  "http://elite.polito.it/ontologies/dogont.owl#Sofa",
                  "http://elite.polito.it/ontologies/dogont.owl#Printer"
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
  return JSON.stringify(graphConfig)
}

/**
 * Entry Point
 */
function main() {
  // Select the graph element(Iframe)
  var graphEl = document.getElementById('map-container')
  // Inject config into Graph
  addEventListenerForEl(graphEl, 'load', function () {
    var graphConfig = generateGraphConfig()
    graphEl['contentWindow'].postMessage(graphConfig, '*')
  })

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
        uuid: 'ba648820-0a4b-4efb-9502-df1acef0ac49'
      },
    })
    graphEl.contentWindow.postMessage(message, '*')
  })

  graphEl.src = 'https://tech.thinginthefuture.com/assets/plan2d-svg/index.html'
}

// DEMO START
main()
// DEMO END
