/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const LOCATION = {
  center: [37.588144, 55.733842],
  zoom: 15,
};

export const Map = () => {
  const [location, setLocation] = useState(LOCATION);
  const [ymaps, setYmaps] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      const [ymaps3React] = await Promise.all([
        ymaps3.import('@yandex/ymaps3-reactify'),
        ymaps3.ready,
      ]);

      ymaps3.import.registerCdn(
        'https://cdn.jsdelivr.net/npm/{package}',
        '@yandex/ymaps3-default-ui-theme@0.0',
      );

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
      } = reactify.module(ymaps3);

      const { YMapDefaultMarker } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-default-ui-theme'),
      );

      setYmaps({
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapDefaultMarker,
        reactify,
      });
    })();

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLocation({
        ...LOCATION,
        center: [position.coords.longitude, position.coords.latitude],
      });
    });
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location, ymaps]);

  return (
    ymaps && (
      <div style={{ width: '100%', height: '100%' }}>
        <ymaps.YMap location={ymaps.reactify.useDefault(location, [location])}>
          <ymaps.YMapDefaultSchemeLayer />
          <ymaps.YMapDefaultFeaturesLayer />
          <ymaps.YMapDefaultMarker
            {...{
              coordinates: location.center,
              color: 'red',
              size: 'normal',
              iconName: 'fallback',
            }}
          />
        </ymaps.YMap>
      </div>
    )
  );
};
