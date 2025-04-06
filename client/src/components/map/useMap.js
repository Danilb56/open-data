/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LOCATION } from './vars';

export const useMap = () => {
  const [ymaps, setYmaps] = useState(null);
  const [location, setLocation] = useState(LOCATION);

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
      ymaps3.import.registerCdn(
        'https://cdn.jsdelivr.net/npm/{package}',
        '@yandex/ymaps3-minimap@0.0',
      );

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControls,
      } = reactify.module(ymaps3);

      const { YMapDefaultMarker } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-default-ui-theme'),
      );
      const { YMapMiniMap } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-minimap'),
      );

      setYmaps({
        YMap,
        YMapMiniMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControls,
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

  return { ymaps, location };
};
