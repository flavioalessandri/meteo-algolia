
      export function algoliaSearch(){   
       
        var placesAutocomplete = places({
          appId: 'plGPWDV8VY59',
          apiKey: '900795b0e7c3b96684c8b1340af0f72a',
          container: document.querySelector('#address-input')
        });
        
            var address = document.querySelector('#address-input');
            placesAutocomplete.on('change', function(e) {

              var latlong = e.suggestion.hit._geoloc; 
              console.log('latLongLenght', Object.keys(latlong).length);
              
                        getWeatherForecast(latlong);
            });  

            var map = L.map ('map-example-container', {
              scrollWheelZoom: false,
              zoomControl: false
            });
          
            var osmLayer = new L.TileLayer(
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 1,
                maxZoom: 13,
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              }
            );
          
            var markers = [];
          
            map.setView(new L.LatLng(0, 0), 1);
            map.addLayer(osmLayer);
          
            placesAutocomplete.on('suggestions', handleOnSuggestions);
            placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
            placesAutocomplete.on('change', handleOnChange);
            placesAutocomplete.on('clear', handleOnClear);
          
            function handleOnSuggestions(e) {
              markers.forEach(removeMarker);
              markers = [];
          
              if (e.suggestions.length === 0) {
                map.setView(new L.LatLng(0, 0), 1);
                return;
              }
          
              e.suggestions.forEach(addMarker);
              findBestZoom();
            }
          
            function handleOnChange(e) {
              markers
                .forEach(function(marker, markerIndex) {
                  if (markerIndex === e.suggestionIndex) {
                    markers = [marker];
                    marker.setOpacity(1);
                    findBestZoom();
                  } else {
                    removeMarker(marker);
                  }
                });
            }
          
            function handleOnClear() {
              map.setView(new L.LatLng(0, 0), 1);
              markers.forEach(removeMarker);
            }
          
            function handleOnCursorchanged(e) {
              markers
                .forEach(function(marker, markerIndex) {
                  if (markerIndex === e.suggestionIndex) {
                    marker.setOpacity(1);
                    marker.setZIndexOffset(1000);
                  } else {
                    marker.setZIndexOffset(0);
                    marker.setOpacity(0.5);
                  }
                });
            }
          
            function addMarker(suggestion) {
              var marker = L.marker(suggestion.latlng, {opacity: .4});
              marker.addTo(map);
              markers.push(marker);
            }
          
            function removeMarker(marker) {
              map.removeLayer(marker);
            }
          
            function findBestZoom() {
              var featureGroup = L.featureGroup(markers);
              map.fitBounds(featureGroup.getBounds().pad(0.5), {animate: false});
            }
            
          

            
      }

// -------------------------------- getWeatherForecast ---------------------

      export const getWeatherForecast = (data) => { 
        $('#carousel-target').html('');       
        return axios.get(`http://api.weatherapi.com/v1/forecast.json?key=59723a46f32442b5886110030200308&q=${data.lat},${data.lng}&days=3`)
        .then(( success) => {  

                              printResults(success);
                              return success;
        })

        .catch(error => {
          console.log("getWeatherForecast ERROR:",error);
          throw error;
        });   
      }
// -------------------------------- printResults ---------------------

      export const printResults = (data) => {        
        const forecast_day = data.data.forecast.forecastday;
        
            const template = $('#template').html();            
            const compiled = Handlebars.compile(template);
            const target = $("#carousel-target");    
                               
            for (let i = 0; i < 3; i++) {
            const datas = forecast_day[i];

            var location = data.data.location;
            console.log(location);
            
            if(datas == forecast_day[0]){
              datas.active = "active";
              datas.first = "first";
            }
            
            datas.city = location.name;
            datas.region = location.region;
            datas.country = location.country;

            datas.dayname = moment(datas.date).format('dddd');
            datas.date = moment(datas.date, "YYYY-MM-DD").format('DD MMMM YYYY');
            var elementHTML = compiled(datas);           
            
            $(target).append(elementHTML);
          }    
          $('div#carouselExampleIndicators').removeClass('invisible');      
      }

// -------------------------------- funzione non utilizzata ---------------------
// -------------------------------- funzione non utilizzata ---------------------

        export function algoliaSearch2(){
          var placesAutocomplete = places({
            appId: 'plGPWDV8VY59',
            apiKey: '900795b0e7c3b96684c8b1340af0f72a',
            container: document.querySelector('#address-input')
          });   
        }


        export const getLatLongLocation2 = (address) => {
            return axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=0EPQgX0aGItyR2DqltwDirSjnriHAnEG&location=${address}`)
              .then(( success) => {
                let coordinates = success.data.results[0].locations[0].latLng;
                return coordinates;                  
            })
              .catch(error => {
                console.log("ERROR:",error);
                  throw error;
            });
          }
        
                            
        export const getWeatherForecast2 = (data) => {          
          return axios.get(`http://api.weatherapi.com/v1/forecast.json?key=59723a46f32442b5886110030200308&q=${data.lat},${data.lng}&days=3`)
          .then(( success) => {
            return success;
            })

          .catch(error => {
            console.log("getWeatherForecast ERROR:",error);
            throw error;
            }); 
        }


          export const printResults2 = (data) => {    
            const forecast_day = data.data.forecast.forecastday;

            const template = $('#template').html();            
            const compiled = Handlebars.compile(template);
            const target = $("#carousel-target");        

            for ( let i = 0; i < 3; i++ ) {
              const datas = forecast_day[i];

              if( datas == forecast_day[0] ) {
                datas.dataid = "active";
              }

              datas.dayname = moment(datas.date).format('dddd');
              datas.date = moment(datas.date, "YYYY-MM-DD").format('DD MMMM YYYY');
              var elementHTML = compiled(datas);           

              $(target).append(elementHTML);
            }
          }