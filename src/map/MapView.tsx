import React, { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZG9jaG8iLCJhIjoiY204b29tdTIyMDJpeDJrcTBuM2ozeTN6NSJ9.SomvqZfNAEG7hLiSOYM-Kw";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [longitude, latitude],
        zoom: 15,
      });

      new mapboxgl.Marker({ color: "#14b8a6" })
        .setLngLat([longitude, latitude])
        .addTo(map.current!);
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}