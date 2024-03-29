const url = 'https://carbortech.onrender.com/dadosArea';
let poligonoEditavel;
const polygons = new Map();

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
            const areaDescriptionInput = document.getElementById("area-description");
            const emailProprietarioInput = document.getElementById("email-proprietario");
            const municipioInput = document.getElementById("municipio");
            const enderecoInput = document.getElementById("endereco");
            const cepInput = document.getElementById("cep");
            const idInput = document.getElementById("usuario_cadastrante");
            const emailCadastranteInput = document.getElementById("email-cadastrante");
            const submitButton = document.getElementById("submit-owner");

            ownerInputDiv.style.display = "block";

            const disableMapInteraction = () => {
              map.setOptions({ draggable: false, scrollwheel: false, keyboardShortcuts: false });
            };

            const enableMapInteraction = () => {
              map.setOptions({ draggable: true, scrollwheel: true, keyboardShortcuts: true });
            };

            function disableDrawingManager() {
              drawingManager.setMap(null);
            }
            
            function enableDrawingManager() {
              drawingManager.setMap(map);
            }
            
            disableMapInteraction();
            disableDrawingManager();

            fetch('https://carbortech.onrender.com/areas')
              .then(response => response.json())
              .then(data => {
                const areasRegistradas = data.areas;

            submitButton.addEventListener("click", () => {
              enableMapInteraction();
              enableDrawingManager();

              const proprietario = ownerNameInput.value;
              const descricaoArea = areaDescriptionInput.value;
              const email = emailProprietarioInput.value;
              const municipio = municipioInput.value;
              const endereco = enderecoInput.value;
              const tipo = cepInput.value;
              const usuario_cadastrante = idInput.value;
              const email_cadastrante = emailCadastranteInput.value;

              if (proprietario && email && municipio && endereco && tipo) {
                ownerInputDiv.style.display = "none";
                polygons.set(polygon, { proprietario, descricaoArea, email, municipio, endereco, tipo, usuario_cadastrante, email_cadastrante });

                const clickAlert = document.getElementById("click-alert");
                clickAlert.style.display = "block";
                
                disableDrawingManager();
            } else {
                console.log("Algum dos valores não foi fornecido.");
              }
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
      };
 
    // Coordenadas
    google.maps.event.addListener(polygon, "click", () => {
      const disableMapInteraction = () => {
        map.setOptions({ draggable: false, scrollwheel: false, keyboardShortcuts: false });
      };
      function disableDrawingManager() {
        drawingManager.setMap(null);
      };
      disableMapInteraction();
      disableDrawingManager();

      const clickAlert = document.getElementById("click-alert");
      clickAlert.style.display = "none";

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
      const dadosPoligono = polygons.get(polygon);

      const proprietario = dadosPoligono.proprietario;
      const descricao = dadosPoligono.descricaoArea;
      const emailProprietario = dadosPoligono.email;
      const municipio = dadosPoligono.municipio;
      const endereco = dadosPoligono.endereco;
      const tipo = dadosPoligono.tipo;
      const usuario_cadastrante = dadosPoligono.usuario_cadastrante;
      const email_cadastrante = dadosPoligono.email_cadastrante;

        const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
        const perimetro = google.maps.geometry.spherical.computeLength(polygon.getPath());

        const coordinatesInfo = document.getElementById("coordinatesInit-info");
        coordinatesInfo.textContent = `${JSON.stringify(coordinates)}`;
        let coordinatesJSON = JSON.stringify(coordinates);

        const descricaoAreaInfo = document.getElementById("area-description-infoInit");
        descricaoAreaInfo.textContent = `Título/descrição: ${descricao}`;

        const emailProprietarioInfo = document.getElementById("email-proprietario-infoInit");
        emailProprietarioInfo.textContent = `Email do proprietário: ${emailProprietario}`;

        const municipioInfoInit = document.getElementById("municipio-infoInit");
        municipioInfoInit.textContent = `Município: ${municipio}`;

        const enderecoInfoInit = document.getElementById("endereco-infoInit");
        enderecoInfoInit.textContent = `Endereço: ${endereco}`;
        
        const cepInfoInit = document.getElementById("cep-infoInit");
        cepInfoInit.textContent = `Tipo de área: ${tipo}`;

        const usuarioCadastranteInit = document.getElementById("usuario_cadastrante-infoInit");
        usuarioCadastranteInit.textContent = `Área cadastrada por: ${usuario_cadastrante}`;


        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ proprietario, area, perimetro, coordinatesJSON, usuario_cadastrante, descricao, emailProprietario, municipio, endereco, tipo, email_cadastrante })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

        const areaInfo = document.getElementById("areaInit-info");

        const proprietarioInfo = document.getElementById("proprietarioInit-info");
        proprietarioInfo.textContent = `Proprietário: ${proprietario}`;

        areaInfo.textContent = `Área: ${area}m²`;
        const perimetroInfo = document.getElementById("perimetroInit-info");

        perimetroInfo.textContent = `Perímetro: ${perimetro}m`;

        coordinatesInfo.textContent = `${JSON.stringify(coordinates)}`;
        
        const ownerInputDiv = document.getElementById("dados-polygon");
        const areaInitCard = document.getElementById("areaInit-card");

        areaInitCard.style.display = "block";

        document.getElementById("submit-owner").addEventListener("click", () => {
          const ownerInputDiv = document.getElementById("dados-polygon");
          
          ownerInputDiv.style.display = "none";
          areaInitCard.style.display = "block";
        });

        document.getElementById("cadastrarInit-cardButton").addEventListener("click", () => {
          
          const areaInitCard = document.getElementById("areaInit-card");
          areaInitCard.style.display = "none";

          window.location.href = '/mapa/cadastro';
        });
        document.getElementById("cancelarInit-cardButton").addEventListener("click", () => {
          window.location.href = '/mapa';
          const areaInitCard = document.getElementById("areaInit-card");
          areaInitCard.style.display = "none";
          ownerInputDiv.style.display = "none";
        });
      });
    };
  });
};


const coordinates = [];


// Inicialização do mapa na tela
function initMap(req, res) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -29.584006, lng: -50.6736699 },
    zoom: 12,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  });

  // Exibir áreas salvas no mapa
  fetch('https://carbortech.onrender.com/areas')
  .then(response => response.json())
  .then(data => {
    data.areas.forEach(area => {
      const parsedCoordinates = JSON.parse(area.coordinates);
      const coordinates = parsedCoordinates.map(coord => ({
        lat: coord.lat,
        lng: coord.lng
      }));

      const polygon = new google.maps.Polygon({
        paths: coordinates,
        fillColor: "#55ad63",
        strokeColor: "#55ad63",
        strokeWeight: 2,
        clickable: true,
        zIndex: 1,
      });
      polygon.setMap(map);

      google.maps.event.addListener(polygon, "click", () => {
          const email_cadastrante = area.email_cadastrante;
          const coordinatesJSON = area.coordinates;
      
          poligonoEditavel = polygon;

          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_cadastrante, coordinatesJSON })
          })
          .then(response => response.json())
          .then(data => {
              console.log('Resposta do servidor:', data);
          })
          .catch(error => {
              console.error('Erro:', error);
          });

          const coordinatesInfo = document.getElementById("coordinates-info");
          coordinatesInfo.textContent = `${area.coordinates}`;

          const proprietarioInfo = document.getElementById("proprietario-info");
          proprietarioInfo.textContent = `Proprietário: ${area.proprietario}`;

          const descricaoAreaInfo = document.getElementById("area-description-info");
          descricaoAreaInfo.textContent = `Título/descrição: ${area.descricao}`;

          const areaInfo = document.getElementById("area-info");
          areaInfo.textContent = `Área: ${area.area}m²`;

          const perimetroInfo = document.getElementById("perimetro-info");
          perimetroInfo.textContent = `Perímetro: ${area.perimetro}m`;

          const emailProprietarioInfo = document.getElementById("email-proprietario-info");
          emailProprietarioInfo.textContent = `Email do proprietário: ${area.email_proprietario}`;
          
          const municipioInfo = document.getElementById("municipio-info");
          municipioInfo.textContent = `Município: ${area.municipio}`;
          
          const enderecoInfo = document.getElementById("endereco-info");
          enderecoInfo.textContent = `Endereço: ${area.endereco}`;
          
          const cepInfo = document.getElementById("cep-info");
          cepInfo.textContent = `Tipo de área: ${area.tipo}`;

          const usuario_cadastranteInfo = document.getElementById("usuario_cadastrante-info");
          usuario_cadastranteInfo.textContent = `Área cadastrada por: ${area.usuario_cadastrante}`;

          const registerButtons = document.getElementById('register-buttons');
          registerButtons.style.display = "none";

          if (area.email_cadastrante === data.user) {
            registerButtons.style.display = "block";

            document.getElementById('btn-apagar-area').onclick = function() {
              window.location.href = '/apagarArea';
            };

            document.getElementById('btn-editar-area').onclick = function () {

              const ownerInputDiv = document.getElementById("dados-polygon");
            
              const ownerNameInput = document.getElementById("owner-name");
              ownerNameInput.value = area.proprietario;

              const tituloInput = document.getElementById("titulo/descricao");
              tituloInput.style.display = "none";
            
              const areaDescriptionInput = document.getElementById("area-description");
              areaDescriptionInput.style.display = "none";
            
              const emailProprietarioInput = document.getElementById("email-proprietario");
              emailProprietarioInput.value = area.email_proprietario;
            
              const municipioInput = document.getElementById("municipio");
              municipioInput.value = area.municipio;
            
              const enderecoInput = document.getElementById("endereco");
              enderecoInput.value = area.endereco;
            
              const cepInput = document.getElementById("cep");
              cepInput.value = area.tipo;
            
              const submitButton = document.getElementById("submit-owner");
            
              ownerInputDiv.style.display = "block";
            
              const disableMapInteraction = () => {
                map.setOptions({ draggable: false, scrollwheel: false, keyboardShortcuts: false });
              };
            
              const enableMapInteraction = () => {
                map.setOptions({ draggable: true, scrollwheel: true, keyboardShortcuts: true });
              };
            
              disableMapInteraction();
            
              submitButton.addEventListener("click", () => {
                enableMapInteraction();
            
                const isValid = ownerNameInput.value && emailProprietarioInput.value && municipioInput.value && enderecoInput.value && cepInput.value;
            
                if (isValid) {
                  ownerInputDiv.style.display = "none";
            
                  const descricao = area.descricao;
            
                  const areaCard = document.getElementById("area-card");
                  areaCard.style.display = "none";
            
                  const divSalvarArea = document.getElementById("div-salvar-area");
                  divSalvarArea.style.display = "block";
            
                  poligonoEditavel.setEditable(true);
                  poligonoEditavel.setDraggable(true);
            
                  const enviarDadosArea = () => {
                    const newCoordinates = poligonoEditavel.getPath().getArray().map(vertex => ({
                      lat: vertex.lat(),
                      lng: vertex.lng()
                    }));
            
                    const coordinatesJSON = JSON.stringify(newCoordinates);
                    const computedArea = google.maps.geometry.spherical.computeArea(poligonoEditavel.getPath());
                    const perimetro = google.maps.geometry.spherical.computeLength(poligonoEditavel.getPath());
            
                    const usuario_cadastrante = area.usuario_cadastrante;
                    const proprietario = ownerNameInput.value;
                    const emailProprietario = emailProprietarioInput.value;
                    const municipio = municipioInput.value;
                    const endereco = enderecoInput.value;
                    const tipo = cepInput.value;
                    const email_cadastrante = area.email_cadastrante;
            
                    console.log(`akguns dados: ${proprietario}, ${emailProprietario}, ${municipio}, ${endereco}, ${usuario_cadastrante}`);
            
                    fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ coordinatesJSON, descricao, area: computedArea, perimetro, usuario_cadastrante, proprietario, emailProprietario, municipio, endereco, tipo, email_cadastrante })
                    })
                      .then(response => response.json())
                      .then(data => {
                        console.log('Resposta do servidor:', data);
                      })
                      .catch(error => {
                        console.error('Erro:', error);
                      });
                  };
            
                  enviarDadosArea();
            
                  google.maps.event.addListener(poligonoEditavel.getPath(), 'set_at', function (index) {
                    enviarDadosArea();
                  });
            
                  google.maps.event.addListener(poligonoEditavel.getPath(), 'insert_at', function (index) {
                    enviarDadosArea();
                  });
                } else {
                  console.log("Algum dos valores não foi fornecido.");
                }
              });
            
              document.getElementById('btn-salvar-area').onclick = function () {
                window.location.href = '/editarArea';
              };
            };
            
            
            document.getElementById('btn-solicitar-servico').onclick = function() {
              let endereco = area.endereco;
              let municipio = area.municipio;
              
              console.log(`endereCo: ${area.endereco}`);

              fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ endereco, municipio })
              })
              .then(response => response.json())
              .then(data => {
                  console.log('Resposta do servidor:', data);
              })
              .catch(error => {
                  console.error('Erro:', error);
              });
              
              window.location.href = '/servicoArea';
            };
          } else {
            registerButtons.style.display = "none";
          }
    
          const areaCard = document.getElementById("area-card");
          areaCard.style.display = "block";

          document.getElementById("fechar-card").addEventListener("click", () => {
            const areaCard = document.getElementById("area-card");
            areaCard.style.display = "none";
          });
        });
    });
  })
  .catch(error => {
    console.error('Erro ao buscar áreas do servidor:', error);
  });

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