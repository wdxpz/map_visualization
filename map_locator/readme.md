### how to get pixel coordinates

refer [this fiddel](http://jsfiddle.net/muglio/h5st7bpt/)



### numbered marker

Refer Leaflet.extra-markers plugin [github](https://github.com/coryasilva/Leaflet.ExtraMarkers) and [howto](https://stackoverflow.com/questions/22622393/leaflet-awesome-markers-adding-numbers)

```
var numMarker = L.ExtraMarkers.icon({
icon: 'fa-number',
number: 12,
markerColor: 'blue'
});
L.marker([41.77, -72.69], {icon: numMarker}).addTo(map);
```

