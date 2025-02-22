
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      bees: Math.floor(Math.random() * 50) + 10,
      butterflies: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

export const SensorData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateFakeData());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-float">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Live Pollinator Activity</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="bees"
          stroke="#8BA888"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="butterflies"
          stroke="#F6B352"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
};
