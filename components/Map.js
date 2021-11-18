import { useState } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {

  const [selectedLocation, setSelectedLocation] = useState({});


  //Transformamos el objeto searchResult en el que queremos {latitude: 24.333, longitude: 42.44}
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // lat and long of the center of location coordinates
  const center = getCenter(coordinates);


  //constante para pasarle luego el prop al mapGl con el spread operator
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude - 0.1,
    longitude: center.longitude - 0.005,
    zoom: 12,
  });



  return (
    <ReactMapGL
      mapStyle="mapbox://styles/dab360/ckw51bzzh47lu15o6q0mqsgty"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      //Para hacer scroll en el mapa
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            // offsetLeft={-20}
            // offsetTop={-100}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              🏚️📌
            </p>
          </Marker>

        {/* Popup that should show if we click on a marker */}
        {selectedLocation.long === result.long ? (
            <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
            >
                {result.title}
            </Popup>
        ) : (
            false
        )}

        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
