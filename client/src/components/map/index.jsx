import { useMap } from './useMap.jsx';

export default function Map(props) {
  const { markers, selectable } = props;
  const { ymaps, location, setCurrentLocation, marker, cluster, points } =
    useMap(markers, selectable);

  return (
    ymaps && (
      <div style={{ width: '100%', height: '100%' }}>
        <ymaps.YMap location={ymaps.reactify.useDefault(location, [location])}>
          <ymaps.YMapDefaultSchemeLayer />
          <ymaps.YMapDefaultFeaturesLayer />
          <ymaps.YMapFeatureDataSource id="clusterer-source" />
          <ymaps.YMapLayer
            source="clusterer-source"
            type="markers"
            zIndex={1800}
          />
          <ymaps.YMapControls position="right top">
            <ymaps.YMapGeolocationControl zoom="15" />
          </ymaps.YMapControls>
          <ymaps.YMapControls position="left top">
            <ymaps.YMapScaleControl />
          </ymaps.YMapControls>
          <ymaps.YMapClusterer
            marker={marker}
            cluster={cluster}
            method={ymaps.clusterByGrid({ gridSize: 64 })}
            features={points}
          />
          <ymaps.YMapListener
            onUpdate={({ location }) => {
              setCurrentLocation((prev) => ({
                center: location.center,
                zoom: location.zoom,
              }));
            }}
          />
        </ymaps.YMap>
      </div>
    )
  );
}
