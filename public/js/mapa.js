const url = 'http://localhost:3300/dadosArea';

// Função para demarcação no mapa
const initDrawing = (map, req, res) => {
  const allowedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-29.713401053864278, -50.97854050546876),
    new google.maps.LatLng(-29.447669707081545, -50.370859231054695)
  );

  // Dados do mapa e do polígono
  const drawingManager = new google.maps.drawing.DrawingManager({
    map: map,
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#55ad63",
      strokeColor: "#55ad63",
      strokeWeight: 2,
      clickable: true,
      editable: true,
      zIndex: 1,
    },
  });

  const polygons = new Map();

  // Verificação se a área está dentro dos limites permitidos
  google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;

      const path = polygon.getPath();
      let isPolygonInsideBounds = true;

      path.forEach((vertex) => {
        if (!allowedBounds.contains(vertex)) {
          isPolygonInsideBounds = false;
        };
      });
      if (!isPolygonInsideBounds) {
        polygon.setMap(null);
        alert("Sua demarcação está fora da área permitida. Cadastre-a somente no Vale do Paranhana.");
      } else {
            const ownerInputDiv = document.getElementById("dados-polygon");
            const ownerNameInput = document.getElementById("owner-name");
            const submitButton = document.getElementById("submit-owner");

            ownerInputDiv.style.display = "block";

            submitButton.addEventListener("click", () => {
              const proprietario = ownerNameInput.value;

              if (proprietario) {
                  console.log(`Nome do proprietário: ${proprietario}`);
                  ownerInputDiv.style.display = "none";
                  polygons.set(polygon, proprietario);
              } else {
                  console.log("Nome do proprietário não fornecido.");
              }
            });
        };

      // Coordenadas
      google.maps.event.addListener(polygon, "click", () => {
        const paths = polygon.getPaths();
        let bounds = new google.maps.LatLngBounds();
        let coordinates = [];

        paths.forEach((path) => {
          path.forEach((vertex) => {
            bounds.extend(vertex);
            coordinates.push({
              lat: vertex.lat(),
              lng: vertex.lng(),
            });
          });
        });

        // Informações da área
        const proprietario = polygons.get(polygon);
        console.log(`Nome do proprietário: ${proprietario}`);

        const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
        const perimetro = google.maps.geometry.spherical.computeLength(polygon.getPath());

        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ proprietario, area, perimetro })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
        
        /*let proprietarioArea = req.session.area.proprietario;
        
        const proprietarioInfo = document.getElementById("proprietario-info");
        proprietarioInfo.textContent = `Proprietário: ${proprietarioArea}m²`;*/

        const areaInfo = document.getElementById("area-info");
        areaInfo.textContent = `Área: ${area}m²`;

        const perimetroInfo = document.getElementById("perimetro-info");
        perimetroInfo.textContent = `Perímetro: ${perimetro}m`;
        const coordinatesInfo = document.getElementById("coordinates-info");

        coordinatesInfo.textContent = `${JSON.stringify(coordinates)}`;

        const areaCard = document.getElementById("area-card");
        areaCard.style.display = "block";

        document.getElementById("fechar-card").addEventListener("click", () => {
          const areaCard = document.getElementById("area-card");
          areaCard.style.display = "none";

          window.location.href = '/mapa/cadastro';
        });
      });
    };
  });
};

// Inicialização do mapa na tela
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -29.584006, lng: -50.6736699 },
    zoom: 12,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  });

  // Mudança para modo satélite
  const toggleSatelliteButton = document.getElementById("toggleSatellite");
  toggleSatelliteButton.addEventListener("click", function () {
    if (map.getMapTypeId() === google.maps.MapTypeId.ROADMAP) {
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    } else {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }
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

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  initDrawing(map);

  // Busca por endereços
  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("Falha: '" + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(13);
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
    autocomplete.setOptions({ strictBounds: strictBoundsInputElement.checked });
    if (strictBoundsInputElement.checked) {
      biasInputElement.checked = strictBoundsInputElement.checked;
      autocomplete.bindTo("bounds", map);
    }
    input.value = "";
  });
}

window.initMap = initMap;