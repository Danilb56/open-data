import { useState } from 'react';
import { useMap } from './useMap';
import { MINIMAP_PROPS } from './vars';

export default function Map() {
  const { ymaps, location } = useMap();
  const [showBounds, setShowBounds] = useState(MINIMAP_PROPS.showBounds);

  return (
    ymaps && (
      <div style={{ width: '100%', height: '100%' }}>
        <ymaps.YMap location={ymaps.reactify.useDefault(location, [location])}>
          <ymaps.YMapDefaultSchemeLayer />
          <ymaps.YMapDefaultFeaturesLayer />
          <ymaps.YMapControls position="right bottom"></ymaps.YMapControls>
          <ymaps.YMapDefaultMarker
            coordinates={location.center}
            color="red"
            size="small"
            iconName="fallback"
            onClick={() => {
              console.log('click');
            }}
          />
        </ymaps.YMap>
      </div>
    )
  );
}
