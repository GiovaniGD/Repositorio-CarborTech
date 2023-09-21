function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(-29.580949709461247, -50.685606563799965),
    zoom: 11.5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

const initDrawing = (map) => {
  const drawingManager = new google.maps.drawing.DrawingManager({
    map: map,
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [ 'polygon', 'rectangle']
      },
      polygonOptions: {
        fillColor: "#55ad63",
        strokeColor: "#55ad63",
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
      rectangleOptions: {
        fillColor: "#55ad63",
        strokeColor: "#55ad63",
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
  });
  google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;

      // Calcula a área do polígono
      const areaMetrosQuadrados = google.maps.geometry.spherical.computeArea(polygon.getPath());

      // Exiba a área calculada (você pode exibir a área como quiser)
      console.log(`Área do Polígono (metros quadrados): ${areaMetrosQuadrados}`);
    }
  });

};

      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -29.584006, lng: -50.6736699 },
          zoom: 12,
          mapTypeControl: false,
        });

        const card = document.getElementById("pac-card");
        const input = document.getElementById("pac-input");
        const biasInputElement = document.getElementById("use-location-bias");
        const strictBoundsInputElement = document.getElementById("use-strict-bounds");
        const options = {
          fields: ["formatted_address", "geometry", "name"],
          strictBounds: false,
          types: ["establishment"],
        };

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

        const autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.bindTo("bounds", map);

        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");

        infowindow.setContent(infowindowContent);

        const marker = new google.maps.Marker({map, anchorPoint: new google.maps.Point(0, -29)});
        initDrawing(map)

        autocomplete.addListener("place_changed", () => {
          infowindow.close();
          marker.setVisible(false);

          const place = autocomplete.getPlace();
          
          if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          infowindowContent.children["place-name"].textContent = place.name;
          infowindowContent.children["place-address"].textContent = place.formatted_address;
          infowindow.open(map, marker);
        });

        function setupClickListener(id, types) {
          const radioButton = document.getElementById(id);

          radioButton.addEventListener("click", () => {
            autocomplete.setTypes(types);
            input.value = "";
          });
        }

        setupClickListener("changetype-all", []);
        setupClickListener("changetype-address", ["address"]);
        setupClickListener("changetype-establishment", ["establishment"]);
        setupClickListener("changetype-geocode", ["geocode"]);
        setupClickListener("changetype-cities", ["(cities)"]);
        setupClickListener("changetype-regions", ["(regions)"]);

        biasInputElement.addEventListener("change", () => {
          if (biasInputElement.checked) {
            autocomplete.bindTo("bounds", map);
          } else {
            autocomplete.unbind("bounds");
            autocomplete.setBounds({
              east: 180,
              west: -180,
              north: 90,
              south: -90,
            });
            strictBoundsInputElement.checked = biasInputElement.checked;
          }

          input.value = "";
        });
        strictBoundsInputElement.addEventListener("change", () => {
          autocomplete.setOptions({strictBounds: strictBoundsInputElement.checked});
          if (strictBoundsInputElement.checked) {
            biasInputElement.checked = strictBoundsInputElement.checked;
            autocomplete.bindTo("bounds", map);
          }

          input.value = "";
        });
      };

      window.initMap = initMap;