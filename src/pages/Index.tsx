
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { SensorData } from "../components/SensorData";
import { InteractiveMap } from "../components/InteractiveMap";

const stats = [
  { id: 1, name: "Active Gardens", value: "2,000+" },
  { id: 2, name: "Pollinators Tracked", value: "50,000+" },
  { id: 3, name: "Community Members", value: "10,000+" },
];

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/10">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Tracking Pollinators,
            <br />
            Protecting Ecosystems
          </h1>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Join our global initiative to monitor and protect vital pollinator populations through cutting-edge technology and community action.
          </p>
          <div className={`space-x-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all">
              Get Started
            </button>
            <button className="bg-white text-primary px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Pollinator Map</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our network of pollinator gardens and track real-time activity across different locations.
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* Live Data Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Pollinator Activity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track real-time pollinator activity across our network of gardens and sensors.
            </p>
          </div>
          <div className="flex justify-center">
            <SensorData />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
