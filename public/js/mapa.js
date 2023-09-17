function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(-29.580949709461247, -50.685606563799965),
    zoom: 11.5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
