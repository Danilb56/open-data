/* eslint-disable no-undef */

import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

export const useMap = (markers, selectable) => {
  const [ymaps, setYmaps] = useState(null);
  const [location, setLocation] = useState({
    center: [37.576748, 55.660195],
    zoom: 10,
    duration: 300,
    easing: 'ease-out',
  });

  const [currentLocation, setCurrentLocation] = useState({
    center: [37.576748, 55.660195],
    zoom: 10,
  });

  const [points, setPoints] = useState(
    markers.map((marker) => ({
      type: 'Feature',
      geometry: { coordinates: [marker.x, marker.y] },
      selected: false,
      id: marker.id,
    })),
  );

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
        '@yandex/ymaps3-clusterer@0.0.1',
      );

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapFeatureDataSource,
        YMapControls,
        YMapListener,
        YMapScaleControl,
        YMapLayer,
      } = reactify.module(ymaps3);

      const { YMapDefaultMarker, YMapGeolocationControl } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-default-ui-theme'),
      );
      const { YMapClusterer, clusterByGrid } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-clusterer'),
      );

      setYmaps({
        YMap,
        YMapDefaultSchemeLayer,
        YMapScaleControl,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControls,
        YMapDefaultMarker,
        YMapFeatureDataSource,
        YMapLayer,
        YMapGeolocationControl,
        YMapClusterer,
        reactify,
        clusterByGrid,
        YMapListener,
      });
    })();
  }, []);

  const SelectableMarker = ({ coordinates, selected, toggleSelected }) => {
    return (
      <ymaps.YMapDefaultMarker
        coordinates={coordinates}
        iconName="pin"
        source="clusterer-source"
        color={!selected ? 'blue' : 'red'}
        onClick={toggleSelected}
      />
    );
  };

  const marker = useCallback(
    (feature) => {
      return selectable ? (
        <SelectableMarker
          coordinates={feature.geometry.coordinates}
          selected={feature.selected}
          toggleSelected={() => {
            setPoints((prev) =>
              prev.map((p) =>
                p.id === feature.id ? { ...p, selected: !p.selected } : p,
              ),
            );
          }}
        />
      ) : (
        <ymaps.YMapDefaultMarker
          coordinates={feature.geometry.coordinates}
          iconName="pin"
          source="clusterer-source"
          color="blue"
        />
      );
    },
    [ymaps],
  );

  const cluster = useCallback(
    (coordinates, features) => {
      return (
        <ymaps.YMapMarker
          key={`${features[0].id}-${features.length}`}
          coordinates={coordinates}
          source="clusterer-source"
          onClick={() => {
            setLocation((prev) => ({
              ...prev,
              center: coordinates,
              zoom: currentLocation.zoom + 2,
            }));
          }}
        >
          <div className={styles.point}>
            <div className={styles.pointContent}>{features.length}</div>
          </div>
        </ymaps.YMapMarker>
      );
    },
    [ymaps, currentLocation],
  );

  return {
    ymaps,
    location,
    currentLocation,
    setCurrentLocation,
    marker,
    cluster,
    points,
  };
};
