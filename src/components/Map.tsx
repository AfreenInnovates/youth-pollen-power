import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  center: [number, number];
  markers: Array<{ position: [number, number]; name: string }>;
  loading: boolean;
};

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Map({ center, markers, loading }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView(center, 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || loading) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    markers.forEach((marker) => {
      L.marker(marker.position, { icon })
        .bindPopup(
          `
          <div class="p-2">
            <h3 class="font-semibold">${marker.name}</h3>
            <p class="text-sm">Data syncing...</p>
          </div>
        `
        )
        .addTo(map);
    });
  }, [markers, loading]);

  return <div ref={containerRef} className="h-full w-full" />;
}

export default Map;
