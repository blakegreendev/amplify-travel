import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import { locations } from 'data/locations';
import { FaTwitter } from 'react-icons/fa';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;

    leafletElement.eachLayer((layer) => leafletElement.removeLayer(layer));

    const tripPoints = createTripPointsGeoJson({ locations });

    const tripPointsGeoJsonLayers = new L.geoJson(tripPoints, {
      pointToLayer: tripStopPointToLayer
    });

    tripPointsGeoJsonLayers.addTo(leafletElement);

    const bounds = tripPointsGeoJsonLayers.getBounds();

    leafletElement.fitBounds(bounds);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Travel Map</title>
      </Helmet>

      <Map {...mapSettings} />

      <Container type="content" className="text-center home-start">
        <h2>blakegreen.dev</h2>
        <p>Follow me on Twitter</p>
        <p className="header-subtitle">
          <a target= "_blank" href="https://twitter.com/TSgt_Green">
            <FaTwitter />
            @TSgt_Green
          </a>
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;

/**
 * tripStopPointToLayer
 */

function createTripPointsGeoJson({ locations } = {}) {
  return {
    "type": "FeatureCollection",
    "features": locations.map(({ placename, location = {}, image, date, todo = [] } = {}) => {
      const { lat, lng } = location;
      return {
        "type": "Feature",
        "properties": {
          placename,
          todo,
          date,
          image
        },
        "geometry": {
          "type": "Point",
          "coordinates": [ lng, lat ]
        }
      }
    })
  }
}

/**
 * tripStopPointToLayer
 */

function tripStopPointToLayer( feature = {}, latlng ) {
  const { properties = {} } = feature;
  const { placename, todo = [], image, date } = properties;

  const list = todo.map(what => `<li>${ what }</li>`);
  let listString = '';
  let imageString = '';

  if ( Array.isArray(list) && list.length > 0 ) {
    listString = list.join('');
    listString = `
      <ul>${listString}</ul>
    `
  }

  if ( image ) {
    imageString = `
      <span class="trip-stop-image" style="background-image: url(${image})">${placename}</span>
    `;
  }

  const text = `
    <div class="trip-stop">
      ${ imageString }
      <div class="trip-stop-content">
        <h2>${placename}</h2>
        <p class="trip-stop-date">${date}</p>
        ${ listString }
      </div>
    </div>
  `;

  const popup = L.popup({
    maxWidth: 400
  }).setContent(text);

  const layer = L.marker( latlng, {
    icon: L.divIcon({
      className: 'icon',
      html: `<span class="icon-trip-stop"></span>`,
      iconSize: 20
    }),
    riseOnHover: true
  }).bindPopup(popup);

  return layer;
}