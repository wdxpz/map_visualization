var map = L.map('mapid', {
    minZoom: 1,
    maxZoom: 4,
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple
});

var img_src = './map2.png'
// var image = L.imageOverlay('./map2.png', bounds).addTo(mymap);
var map_width = getImgSize(img_src)[0]
var map_height = getImgSize(img_src)[1]
console.log(map_width, map_height)

// mymap.fitBounds(bounds)
// calculate the edges of the image, in coordinate space
var southWest = map.unproject([0, map_height], map.getMaxZoom() - 1);
var northEast = map.unproject([map_width, 0], map.getMaxZoom() - 1);
var bounds = new L.LatLngBounds(southWest, northEast);
console.log("image bounds: ", bounds)

// add the image overlay, 
// so that it covers the entire map
var overlay = L.imageOverlay(img_src, bounds).addTo(map);

// tell leaflet that the map is exactly as big as the image
map.setMaxBounds(bounds);


var popup = L.popup();

function onMapClick(e) {

    //Project the map click to x,y coordinates
    var clientClick = map.project(e.latlng);
    
    //Grab the original overlay
    var overlayImage = overlay._image;
    
    //Calculate the current image ratio from the original
    var yR = overlayImage.clientHeight / overlayImage.naturalHeight;
    var xR = overlayImage.clientWidth / overlayImage.naturalWidth;
    console.log("overlay client height: ", overlayImage.clientHeight)
    console.log("overlay natural height: ", overlayImage.naturalHeight)
    
    //scale the x,y coordinate of the click based on tile scaling of the overlay layer
    var x = clientClick.x / xR;
    var y = overlayImage.naturalHeight - clientClick.y / yR;
    console.log(x,y);

    var pointXY = pixel2MapLocation(x, y)

    // popup
    //     .setLatLng(e.latlng)
    //     .setContent("pixle location: " + e.latlng.toString() + "\n; map location: " + pointXY.toString())
    //     .openOn(map);

 
    var numMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: 12,
        markerColor: 'blue'
        });
   
    var marker = L.marker(e.latlng, {icon: numMarker}).addTo(map);
    marker.bindPopup(pointXY.toString()).openPopup()
}

var original_pixel_x_in_map = -51.224998 //unit is meter
var original_pixel_y_in_map = -51.224998 //unit is meter
var pixel_resolution = 0.05 //unit is meter

function pixel2MapLocation (x, y) {

    var x_in_map  = x * pixel_resolution + original_pixel_x_in_map 
    var y_in_map  = y * pixel_resolution + original_pixel_y_in_map
    return L.point(x_in_map, y_in_map)
}

function map2PixelLocation(x, y) {
    var x_in_pixel = (x - original_pixel_x_in_map) / pixel_resolution
    var y_in_pixel = (y - original_pixel_y_in_map) / pixel_resolution

    return L.point(x_in_pixel, y_in_pixel)
}

function getImgSize(src) {
    var img = new Image()
    img.src = src
    return [img.width, img.height]
}
map.on('click', onMapClick);