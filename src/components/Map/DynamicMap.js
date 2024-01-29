import React, { useEffect, useRef, useState } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents, Marker, Popup } from "react-leaflet";

import styles from "./Map.module.scss";

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;
  const mapRef = useRef(null);
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  useEffect(() => {
    const markerBounds = Leaflet.latLngBounds();
    React.Children.forEach(children, (child) => {
      if (child && child.props.position) {
        markerBounds.extend(child.props.position);
      }
    });

    if (markerBounds.isValid() && mapRef.current) {
      mapRef.current.fitBounds(markerBounds);
    }
  }, [children]);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer ref={mapRef} className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
