
import { Suspense, lazy, useEffect, useState } from 'react';

type SensorData = {
  beeActivity: number | string;
  butterflySightings: number | string;
  temperature: number | string;
};

const generateRandomLocation = (center: [number, number], radiusInKm: number) => {
  const radiusInDeg = radiusInKm / 111;
  const [lat, lng] = center;
  const r = radiusInDeg * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  
  return [
    lat + r * Math.cos(theta),
    lng + r * Math.sin(theta),
  ] as [number, number];
};

// Use dynamic import with a small delay to ensure proper initialization
const DynamicMap = lazy(() => 
  new Promise<{ default: typeof import('./Map').default }>(resolve => 
    setTimeout(() => import('./Map'), 100)
  )
);

export const InteractiveMap = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    beeActivity: "Loading...",
    butterflySightings: "Loading...",
    temperature: "Loading...",
  });
  const [markers, setMarkers] = useState<Array<{ position: [number, number], name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const center: [number, number] = [37.7749, -122.4194];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadData = setTimeout(() => {
      setSensorData({
        beeActivity: Math.floor(Math.random() * 100),
        butterflySightings: Math.floor(Math.random() * 50),
        temperature: 28,
      });
      
      const newMarkers = Array(5).fill(null).map((_, index) => ({
        position: generateRandomLocation(center, 10),
        name: `Bee Colony ${index + 1}`,
      }));
      
      setMarkers(newMarkers);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadData);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Bee Activity</div>
          <div className="text-2xl font-semibold text-primary">
            {loading ? (
              <div className="animate-pulse">🐝 Loading...</div>
            ) : (
              `🐝 ${sensorData.beeActivity}`
            )}
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Butterfly Sightings</div>
          <div className="text-2xl font-semibold text-secondary">
            {loading ? (
              <div className="animate-pulse">🦋 Loading...</div>
            ) : (
              `🦋 ${sensorData.butterflySightings}`
            )}
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Temperature</div>
          <div className="text-2xl font-semibold text-accent-foreground">
            {loading ? (
              <div className="animate-pulse">🌡️ Loading...</div>
            ) : (
              `🌡️ ${sensorData.temperature}°C`
            )}
          </div>
        </div>
      </div>
      
      <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            Loading map...
          </div>
        }>
          <DynamicMap center={center} markers={markers} loading={loading} />
        </Suspense>
      </div>
    </div>
  );
};
